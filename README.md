# EDRP V1

Static GitHub Pages prototype for EDRP.net.

## Source of truth for listings
All listing data lives in `data/inventory.json`.

Do not duplicate listing records in JavaScript or HTML. `index.html`, `browse.html` and `listing.html` all read the same inventory file.

## Images
Use one folder per listing:

`assets/listings/EDRP-000001/01.jpg`
`assets/listings/EDRP-000001/02.jpg`

Add those relative paths to the listing's `images` array in `data/inventory.json`.

## Forms
Set the EDRP destination mailbox once in `js/config.js`:

```js
window.EDRP_CONFIG = {
  formRecipient: "your-address@example.com"
};
```

V1 uses the visitor's mail application. No external form service is required.

## Prototype inventory
The six bundled records are explicitly marked `sample: true`, are not represented as verified inventory, and cannot receive buyer inquiries. Remove the sample records when genuine inventory is ready to publish.

## Adding a real listing
1. Assign the next permanent EDRP ID.
2. Create the listing image folder under `assets/listings/<ID>/`.
3. Add one complete record to `data/inventory.json` with `status: "Active"`, `sample: false`, and the appropriate verification state.
4. Add the listing URL to `sitemap.xml`.
5. Commit to `main`.
6. Test browse/search/filter, listing page, image gallery, inquiry link and mobile layout.

## Lifecycle
Use `Active`, `Sold`, `Unavailable` (and later `Archived`) for genuine inventory. Never reuse an EDRP ID.

## Freeze rule
After V1 passes QA and the form recipient is configured, freeze the website. Routine changes after Freeze should be limited to listing additions/status updates/factual corrections and genuine bug fixes.

## Production
Do not retrofit this static prototype into the future database-backed production application. Preserve the validated UX, data model and business rules, then implement the production system separately.
