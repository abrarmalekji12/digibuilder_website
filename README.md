# DigiBuilder Website

The source for [digibuilderai.com](https://digibuilderai.com) is a **static HTML/CSS/JavaScript website**. No framework, application server, tracking script, or package install is required to build or run it.

## Site structure

- `index.html`: shared header/footer template
- `app.js`: content and interactive forms/navigation, including all six service descriptions and project list
- `styles.css`: responsive layout, colors, global animated dot/grid atmosphere
- `experience.css` and `experience.js`: optional homepage 3D tower
- `build-site.js`: creates crawlable page HTML, metadata, JSON-LD, `sitemap.xml` and `robots.txt`
- `.github/workflows/deploy.yml`: deploys the generated `_site/` directory from pushes to `main`

Routes: `/`, `/about/`, `/services/`, `/work/`, `/contact/`, `/privacy/`, `/terms/`, and `/service/{strategy|brand|web|social|seo|ai}/`. Old `#/...` links redirect to their clean paths for returning visitors.

Every route has its **own HTML response**, title, meta description, canonical URL, social metadata, and structured data. This replaces fragment-based navigation, which is unreliable for page-level indexing.

## Local preview

```bash
node build-site.js
python3 -m http.server 8000 --directory _site
```

Visit http://localhost:8000. Re-run `node build-site.js` after editing site content or styles. No files in `_site/` need to be committed.

## Google Search Console: action needed from the owner

The site is **prepared for verification**, but ownership verification is not complete until someone with access to the website's domain DNS or a Google-provided verification token completes it.

1. Sign in to [Google Search Console](https://search.google.com/search-console/) with the Google account you want to use (for example, `abdussamadvhora@gmail.com`).
2. Add a **Domain property** for `digibuilderai.com`; copy the unique DNS TXT verification value Google supplies.
3. Add that exact TXT record at your domain's DNS host and click **Verify** in Search Console once DNS propagates. The value is unique to your account: do not invent or substitute a generic verification string.
4. After the updated site is deployed, submit `https://digibuilderai.com/sitemap.xml` through **Sitemaps** and inspect priority URLs with **URL Inspection**.
5. Check **Pages**, **Core Web Vitals** and **Search performance** over time; indexing and rankings are not guaranteed or immediate.

An alternative **URL-prefix property** supports a unique HTML meta tag or HTML verification file supplied by Google. To use the tag method, add only the **verification content/token** from the Google-provided tag to the GitHub repository Actions variable `GOOGLE_SITE_VERIFICATION`; the next `main` deployment will include it on the homepage. An HTML verification file must instead be added with its exact Google-provided name and contents. Click Verify after the live deployment. The email address alone cannot establish site ownership.

## Location and local SEO

DigiBuilder describes its base as **Modasa, Gujarat** and availability for remote work in Sydney, Brampton and London. These are service markets, **not claimed branch addresses or verified physical offices**. Do not create city landing pages, business listings or fake address schema without genuine local business evidence. Update content once local client and service details are available.

The 22 project names are listed without invented service assignments, results or testimonials. Location tags reflect the user's supplied project descriptions and do not imply DigiBuilder offices. Add case studies with verified project scope, assets, permission and outcomes later.

## Project showcase and client logos

The homepage includes **22 projects** in a vertical-scroll-driven, horizontally moving 3D-style card stack before the "Built in Gujarat" section. The Work page uses the same `projects` data in `app.js`. The stack uses no second 3D library, does not intercept scrolling and falls back to a swipeable row without JavaScript or when reduced motion is preferred.

**19 client logo images supplied by the owner** are displayed in both places from an optimized `project-logos/client-logos.avif` atlas (about 15 KB), with a `client-logos.webp` fallback for older browsers (about 32 KB). Each project's `spriteIndex` selects the corresponding tile. The atlas is a standard AVIF image; the original client artwork stays visible, including its supplied background colours. The logos for NDS Life Coaching and Sydney Taxi Service are still pending. Pink Nail Art uses a clearly labelled, hand-free CSS text wordmark for now because the supplied graphic was a hand-held photo, not a standalone logo. Replace it with an approved isolated logo when available.

Unique Led Light and Crabby Hunt have the requested **E-Commerce Business** caption below their logos. The additional projects Flutter Pilot and Scholar Career Academy have also been added, using the supplied logos. Region labels are limited to what the owner supplied.

### Adding or replacing logos later

1. Put an approved, compressed logo asset in `project-logos/`. Prefer an individually named AVIF, WebP or SVG where appropriate.
2. Add its `logo` path to the matching `projects` object in `app.js`, for example `{name:"Sharp Travel",regions:"Canada, India",logo:"/project-logos/sharp-travel.webp"}`. An individual logo always overrides the atlas slot, with no card markup changes.
3. Run `node build-site.js`; the generator copies `project-logos/` to `_site/` for the homepage and Work page.

Use only client artwork cleared for portfolio display. Do not invent project outcomes, services or customer testimonials without supporting facts.

## Privacy and compliance

The privacy and terms pages describe the form, hosting, optional CDN and current website practices. The business owner should verify actual data handling, record retention, provider terms and any relevant jurisdiction-specific legal requirements before publishing those pages as legal policy.

## Performance and access

- HTML is prerendered for crawlers and quick content display.
- Phones with WebGL support render the real 3D tower, including screens 480px and below. Small/touch devices use capped pixel ratios and no multisample antialiasing to control GPU cost. Reduced-motion visitors see the 3D tower without animated camera travel. The CSS tower remains available when WebGL is unavailable, loading fails, or Save-Data is enabled.
- WebGL initializes only when the tower approaches the viewport.
- Pointer animation runs only on fine-pointer non-reduced-motion devices.
- No analytics or advertising pixel is installed in this source.
