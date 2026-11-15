# ZNM replica on AEM Edge Delivery Services

## How content flows
- **Source of truth:** pages are AEM documents (`content/**/*.plain.html`, generated from `tools/pages.mjs`).
  In production they live in **DA (da.live)** and Edge Delivery serves them; nothing is hard-coded in blocks.
- **Dynamic bits:** `nav` and `footer` are fragments loaded from `/nav` and `/footer`;
  the `page-cards` block fetches each linked page's `.plain.html` and renders its title, image and intro,
  so editing a page in AEM updates every card that links to it.
- **Blocks (authorable):** `breadcrumb`, `hero`, `pillars`, `faq`, `contact-form` (rows: label | type | options), `page-cards`.
- **Section styles:** add a `section-metadata` block with `style` = `alt`, `dark`, `banner`, `hero-section`.

## Local preview
```bash
npm run dev          # regenerates content, builds drafts/, runs aem up
# open http://localhost:3000/drafts/en/index
```

## Push content to AEM (DA)
```bash
DA_ORG=<github-org> DA_SITE=<repo> DA_TOKEN=<token> npm run da:upload
```
Use `node tools/da-upload.mjs --dry-run` to list what would be uploaded. Then Preview/Publish with the AEM Sidekick.
Once content is in DA, run `aem up` (without `--html-folder`) to see it locally.

## Notes
- Text and image paths come from zayednationalmuseum.ae; images are hotlinked from api.zayednationalmuseum.ae.
- Intro copy on inner pages is partial (first paragraph only) and the contact/volunteer/partnership forms are demos.
