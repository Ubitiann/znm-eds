// Local-preview helper: wraps each /content/**/*.plain.html into a full page under /drafts
// so `aem up --html-folder drafts` can serve it. Not needed once content lives in DA.
import fs from 'fs';
import path from 'path';

const SRC = 'content';
const OUT = 'drafts';
const head = fs.readFileSync('head.html', 'utf8');

const prefix = (html) => html
  .replace(/href="\/(en\/|nav|footer)/g, 'href="/drafts/$1')
  .replace(/href="\/drafts\/en\/"/g, 'href="/drafts/en/index"');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

fs.rmSync(OUT, { recursive: true, force: true });
walk(SRC).filter((f) => f.endsWith('.plain.html')).forEach((file) => {
  const rel = path.relative(SRC, file).replace(/\\/g, '/').replace(/\.plain\.html$/, '');
  const body = prefix(fs.readFileSync(file, 'utf8'));
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(`${dest}.plain.html`, body);
  if (rel === 'nav' || rel === 'footer') return;
  const h1 = (body.match(/<h1>(.*?)<\/h1>/) || [])[1] || 'Zayed National Museum';
  const title = h1.replace(/<[^>]+>/g, '');
  fs.writeFileSync(`${dest}.html`, `<!DOCTYPE html>
<html>
<head>
<title>${title} | Zayed National Museum</title>
<meta name="nav" content="/drafts/nav">
<meta name="footer" content="/drafts/footer">
${head}
</head>
<body>
<header></header>
<main>
${body}</main>
<footer></footer>
</body>
</html>
`);
});
console.log('Drafts built in drafts/');
