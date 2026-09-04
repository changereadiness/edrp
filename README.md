# EDRP V1

Complete static prototype for EDRP.

## What is included
- Homepage
- Marketplace search/filter
- Individual listing engine
- Six initial prototype listings
- EDRP Verified trust signal
- Buyer inquiry form
- Seller submission form
- SEO basics
- Responsive layout
- QA page

## Deploy
This package is designed for GitHub Pages. Keep the repository on `main`. The website files are under `V1/`.

If GitHub Pages is configured to publish from a subdirectory, publish `V1`. If your Pages configuration requires the repository root, copy the contents of `V1` to the root.

`CNAME` contains `edrp.net`.

## Forms
Open `V1/js/forms.js` and replace `REPLACE_WITH_YOUR_EDRP_EMAIL` with the mailbox you want EDRP inquiries sent to. The prototype then uses the visitor's mail application to prepare the message.

This keeps V1 dependency-free. A proper transactional form service can replace this later without changing the product flow.

## Important
The six listings are prototype inventory. Replace them with real, human-verified listings before presenting them as live inventory.

## Production
Do not turn this prototype into the production database-backed application. Preserve its UX, content model and business rules, then implement production separately.
