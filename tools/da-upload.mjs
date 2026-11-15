// Pushes /content documents to Document Authoring (da.live) so AEM serves them as live content.
//
//   DA_ORG=<github-org> DA_SITE=<repo> DA_TOKEN=<ims-bearer-token> node tools/da-upload.mjs [--dry-run]
//
// DA_TOKEN: copy it from da.live (browser devtools > a request to admin.da.live > Authorization header).
// After upload, preview/publish the pages with the AEM Sidekick (or the admin API / bulk tools).
import fs from 'fs';
import path from 'path';

const { DA_ORG, DA_SITE, DA_TOKEN } = process.env;
const dry = process.argv.includes('--dry-run');
if (!dry && (!DA_ORG || !DA_SITE || !DA_TOKEN)) {
  console.error('Set DA_ORG, DA_SITE and DA_TOKEN (or pass --dry-run).');
  process.exit(1);
}

const SRC = 'content';
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name);
  return e.isDirectory() ? walk(p) : [p];
});

// DA stores a full document: header/main/footer shells around the section divs
const wrap = (body) => `<body>\n<header></header>\n<main>\n${body}</main>\n<footer></footer>\n</body>`;

for (const file of walk(SRC).filter((f) => f.endsWith('.plain.html'))) {
  const rel = path.relative(SRC, file).replace(/\\/g, '/').replace(/\.plain\.html$/, '');
  const url = `https://admin.da.live/source/${DA_ORG}/${DA_SITE}/${rel}.html`;
  if (dry) {
    console.log(`[dry-run] would upload ${file} -> ${url}`);
  } else {
    const body = new FormData();
    body.append('data', new Blob([wrap(fs.readFileSync(file, 'utf8'))], { type: 'text/html' }));
    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${DA_TOKEN}` }, body });
    console.log(`${res.ok ? 'OK ' : 'ERR'} ${res.status} ${rel}`);
  }
}
