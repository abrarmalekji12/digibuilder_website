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

An alternative **URL-prefix property** supports a unique HTML meta tag or HTML verification file supplied by Google. That token/file must be added to the published site before clicking Verify. The email address alone cannot be used to establish site ownership.

## Location and local SEO

DigiBuilder describes its base as **Modasa, Gujarat** and availability for remote work in Sydney, Brampton and London. These are service markets, **not claimed branch addresses or verified physical offices**. Do not create city landing pages, business listings or fake address schema without genuine local business evidence. Update content once local client and service details are available.

The 11 project names are listed without invented service assignments, results or testimonials. Add case studies with verified project scope, assets, permission and outcomes later.

## Privacy and compliance

The privacy and terms pages describe the form, hosting, optional CDN and current website practices. The business owner should verify actual data handling, record retention, provider terms and any relevant jurisdiction-specific legal requirements before publishing those pages as legal policy.

## Performance and access

- HTML is prerendered for crawlers and quick content display.
- Small phones, reduced-motion, save-data and low-memory contexts use the tower's CSS fallback.
- WebGL initializes only when the tower approaches the viewport.
- Pointer animation runs only on fine-pointer non-reduced-motion devices.
- No analytics or advertising pixel is installed in this source.
