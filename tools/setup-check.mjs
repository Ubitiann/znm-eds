// Verifies the AEM setup step by step and says what is still missing.  Run: npm run setup:check
import { execSync } from 'child_process';
import fs from 'fs';

try {
  process.loadEnvFile('.env');
} catch (e) {
  // optional
}

const results = [];
const check = (name, ok, fix) => results.push({ name, ok, fix });

check('Node 20.12+', Number(process.versions.node.split('.')[0]) >= 20, 'Install Node 20 or newer');
check('Generated content exists', fs.existsSync('content/en/index.plain.html'), 'Run: npm run content');

let remote = '';
try {
  remote = execSync('git remote get-url origin', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
} catch (e) {
  remote = '';
}
check(
  'Git remote points to your GitHub repo',
  remote && !remote.includes('local-dev'),
  'Create the repo on GitHub, then: git remote set-url origin https://github.com/<owner>/<repo>.git && git push -u origin main',
);

const { DA_ORG, DA_SITE, DA_TOKEN } = process.env;
check('.env has DA_ORG, DA_SITE, DA_TOKEN', !!(DA_ORG && DA_SITE && DA_TOKEN), 'Copy .env.example to .env and fill it in');

if (DA_ORG && DA_SITE && DA_TOKEN) {
  try {
    const res = await fetch(`https://admin.da.live/list/${DA_ORG}/${DA_SITE}/`, {
      headers: { Authorization: `Bearer ${DA_TOKEN}` },
    });
    check(`DA access to ${DA_ORG}/${DA_SITE}`, res.ok, `DA answered ${res.status}: check org/site names and refresh the token`);
  } catch (e) {
    check('DA reachable', false, e.message);
  }
}

results.forEach((r) => console.log(`${r.ok ? '[ok]     ' : '[missing]'} ${r.name}${r.ok ? '' : `\n          -> ${r.fix}`}`));
process.exitCode = results.every((r) => r.ok) ? 0 : 1;
