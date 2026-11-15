# Setup checklist

Already done in this project: boilerplate, ZNM blocks and styles, 24 pages as AEM documents (`content/`),
local preview (`npm run dev`), DA upload and setup-check scripts, ignore rules.

What only you can do (needs your GitHub / Adobe accounts), in order:

1. **Create the GitHub repo** (public recommended) and push this project:
   ```bash
   git remote set-url origin https://github.com/<owner>/<repo>.git
   git push -u origin main
   ```
2. **Install the AEM Code Sync GitHub App** on that repo (Repository access: only this repo).
3. **Set the content source** to da.live. Easiest: the "Finish setup" screen of the AEM tutorial
   (https://www.aem.live/developer/tutorial). Alternative (API, needs an admin x-auth-token):
   `PUT https://admin.hlx.page/config/<owner>/sites/<repo>.json` with
   `{"code":{"owner":"<owner>","repo":"<repo>"},"content":{"source":{"url":"https://content.da.live/<owner>/<repo>/","type":"markup"}}}`.
   Then the site is at `https://main--<repo>--<owner>.aem.page/` (404 until content is previewed).
4. **Fill `.env`** (copy `.env.example`): `DA_ORG`, `DA_SITE`, `DA_TOKEN`.
5. **Check everything:** `npm run setup:check`
6. **Upload content:** `npm run da:upload` (use `node tools/da-upload.mjs --dry-run` first).
7. **Preview and publish** the pages with the AEM Sidekick (install the Chrome extension), or open
   `https://main--<repo>--<owner>.aem.page/en/index`.

Note: `/en/index` is the home page; set `/` to redirect to `/en/` in the site config if you want the root URL to work.
