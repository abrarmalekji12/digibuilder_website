# DigiBuilder Website

This repository contains one production website: the static, scroll-driven DigiBuilder building experience deployed at `digibuilderai.com`.

## Production source of truth

GitHub Pages publishes only these files:

- `index.html`
- `styles.css`
- `experience.css`
- `app.js`
- `experience.js`
- `digibuilder-logo.webp`
- `CNAME`

There is no React/Vite production app and no build-output ambiguity. The deployment workflow stages only the files above into `_site` and publishes that clean directory to the `gh-pages` branch.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`. The workflow recreates the production artifact from the static building site and force-publishes a clean `gh-pages` branch, preventing old source files or alternate landing implementations from being served.
