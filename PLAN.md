# Rafin Website Performance, CSS Cleanup, and Scalability Plan

## Goal

Turn the current Rafin static website into a faster, cleaner, and more maintainable production site without redesigning the approved UI, changing the stack, or breaking existing routes.

This plan is focused on:

- slow initial page opening
- heavy CSS and JS loading
- cleanup of unnecessary or duplicated code
- removal of inline and JS-injected styling debt
- professional production hardening for a scalable static site

This is not a redesign plan.

## Constraints

- Keep the current static HTML/CSS/JS/PHP stack
- Keep the current route structure:
  - `index.html`
  - `projects.html`
  - `category.html?slug=...`
  - `project.html?slug=...`
- Preserve the approved design direction
- Do not migrate frameworks
- Do not rewrite the app into a build-tool-based SPA
- Do not remove functional anti-spam, validation, or mail behavior

## Current Diagnosis

The homepage feels slow to open mainly because of the current critical rendering path.

Primary causes already visible in the repo:

- full-page loader at [index.html](c:/Users/kevin/Documents/Rafin/index.html) stays active until `window.load`
- page-loader release is tied to `window.load` in [js/script.js](c:/Users/kevin/Documents/Rafin/js/script.js), which waits for images, fonts, CSS, and JS
- large early assets:
  - [js/core.min.js](c:/Users/kevin/Documents/Rafin/js/core.min.js) is large
  - [css/style.css](c:/Users/kevin/Documents/Rafin/css/style.css) is large
  - several homepage images are large, including multi-hundred-KB to multi-MB assets
- blocking external font request to Google Fonts in [index.html](c:/Users/kevin/Documents/Rafin/index.html)
- styling debt spread across:
  - monolithic CSS
  - page-level `<style>` blocks
  - JS-injected styles
  - patch-layer CSS
- probable legacy code and assets that still ship but are not necessary for current live functionality

Secondary maintainability issues:

- styling is not centralized enough
- vendor and project-specific styles are not cleanly separated
- data/debug artifacts are sitting in project directories and can bloat local workflows
- global plugin loading is broader than the actual page needs

## Success Criteria

The work is done when:

- the homepage becomes visible quickly without waiting for every asset to finish loading
- the page-loader no longer blocks first render unnecessarily
- inline and JS-injected styles are removed or minimized into maintainable CSS files
- the CSS architecture becomes easier to reason about and extend safely
- unnecessary code/assets are identified and either removed or clearly isolated
- heavy assets above the fold are optimized
- current design, routes, forms, and content behavior still work
- the site is easier to scale and maintain without adding framework complexity

## Guiding Principles

- Optimize the critical rendering path first
- Prefer bounded, predictable behavior over clever hacks
- Centralize styling instead of adding more patch layers
- Remove dead weight before adding new abstraction
- Keep vendor files stable when possible; layer changes around them
- Measure visible improvements by user-perceived loading first, then by code cleanliness

## Phase 1: Baseline Audit and Performance Budget

### Objective

Create a reliable inventory of what is slowing the site down and define safe target budgets before changing behavior.

### Audit Method and Confidence Labels

- This Phase 1 revision is static-inspection only (HTML/CSS/JS/data file review and file-size baselines).
- Confidence labels used consistently in this section:
  - `Confirmed by static inspection`
  - `Likely from static inspection`
  - `Requires runtime verification`

### Major Findings (Phase 1)

- **Loader release is tied to full page load** (`Confirmed by static inspection`):
  - `#page-loader` release is bound to `window.load` in [js/script.js](c:/Users/kevin/Documents/Rafin/js/script.js), so reveal waits for full document resource load, not just first meaningful render.
- **Shared baseline payload is heavy across all active routes** (`Confirmed by static inspection`):
  - Shared CSS raw size: `660,111 B` (`~103,380 B` gzip estimate).
  - Shared heavy JS raw size: `js/core.min.js` `642,054 B`, `js/script.js` `50,677 B` (`~193,493 B` gzip combined).
  - Total route startup payload (HTML excluded), raw/gzip estimate:
    - `index.html`: `1,454,726 B` / `328,238 B`
    - `projects.html`: `1,436,611 B` / `322,277 B`
    - `category.html`: `1,435,712 B` / `321,854 B`
    - `project.html`: `1,439,507 B` / `322,678 B`
- **External Google Fonts stylesheet is render-path linked with no preconnect hints** (`Confirmed by static inspection`).
- **Styling debt remains centralized but still mixed by ownership** (`Likely from static inspection`):
  - Very large template stylesheet ([css/style.css](c:/Users/kevin/Documents/Rafin/css/style.css)) plus project override layer ([css/redesign.css](c:/Users/kevin/Documents/Rafin/css/redesign.css)).
  - No active page-level `<style>` blocks found on active routes, but inline style attributes and runtime `element.style` mutations remain in route scripts.
- **Global loading breadth is larger than per-route needs** (`Likely from static inspection`):
  - `data/certificates.js` and `data/jobs.js` are loaded on all project routes, but route logic does not consume them outside homepage sections.
- **Legacy/diagnostic artifacts are present in repo** (`Likely from static inspection`):
  - Debug capture files and legacy browser assets exist and should be classified before deletion.

### Route Dependency Inventory (Explicit Tables)

#### `index.html`

| Dependency Type | Dependency | Classification | Notes |
| --- | --- | --- | --- |
| CSS | `css/bootstrap.css` | critical for first render | Grid/layout baseline. |
| CSS | `css/style.css` | critical for first render | Main theme/template layer. |
| CSS | `css/fonts.css` | required after first render | Icon fonts and icon class mapping. |
| CSS | `css/redesign.css` | critical for first render | Project override layer and header behavior. |
| JS | `data/categories.js` | required after first render | Category nav + home category cards. |
| JS | `data/projects.js` | likely unnecessary on that route | Not required for homepage render logic in current script graph. |
| JS | `data/site.js` | required after first render | Footer/site stats data. |
| JS | `data/departments.js` | required after first render | Footer departments rendering. |
| JS | `data/certificates.js` | required after first render | Certificates section dataset. |
| JS | `data/jobs.js` | required after first render | Jobs section dataset. |
| JS | `data/materials.js` | required after first render | Materials section dataset. |
| JS | `data/contacts.js` | required after first render | Contacts section dataset. |
| JS | `data/translations.js` | required after first render | i18n dictionary. |
| JS | `js/content-store.js` | required after first render | Data accessor abstraction. |
| JS | `js/i18n.js` | required after first render | Language toggle + text replacement. |
| JS | `js/nav-projects.js` | required after first render | Dynamic projects dropdown. |
| JS | `js/home-categories.js` | required after first render | Homepage categories injection. |
| JS | `js/certificates-section.js` | required after first render | Certificates section render. |
| JS | `js/jobs-section.js` | required after first render | Jobs filter/cards render. |
| JS | `js/materials-section.js` | required after first render | Materials section render. |
| JS | `js/contacts-section.js` | required after first render | Contacts section render. |
| JS | `js/footer-company.js` | required after first render | Footer and stats render. |
| JS | `js/seo-head.js` | likely deferrable | Metadata updates can occur after first reveal. |
| JS | `js/core.min.js` | required after first render | Framework/plugin runtime (large). |
| JS | `js/script.js` | required after first render | Global plugin init + loader release path. |
| Fonts | `//fonts.googleapis.com/css?family=Lato:300,300italic|Montserrat:400,700` | likely deferrable | Can be non-blocking with font-display strategy. |
| Fonts | `../fonts/fontawesome-webfont.{eot,woff2,woff,ttf,svg}` | required after first render | Social/nav icon rendering. |
| Fonts | `../fonts/materialdesignicons-webfont.{eot,woff2,woff,ttf,svg}` | likely deferrable | Mostly feedback/snackbar icon classes. |
| Fonts | `../fonts/Linearicons.ttf` | required after first render | UI icons used across hero/nav/buttons. |
| Major media | `images/logo-inverse-304x39.png` | critical for first render | Header brand image. |
| Major media | `images/parallax-2.jpg` | critical for first render | First hero slide background. |
| Major media | `images/parallax-1.jpg`, `images/parallax-3.jpg` | likely deferrable | Additional hero slides. |
| Major media | `images/home-1-652x491.jpg` | likely deferrable | About section image (below first viewport on most screens). |
| Major media | `images/slider-slide-1-1920x1080.jpg`, `images/project-category-healthcare.jpg` | likely deferrable | Parallax section backgrounds below fold. |
| Major media | `images/home-post-1-418x315.jpg`, `images/home-post-2-418x315.jpg`, `images/home-post-3-418x315.jpg` | likely deferrable | News cards. |
| Major media | `images/equipement/aircompressor.jpg`, `images/equipement/generator.jpg`, `images/equipement/MechanicalControls.jpg`, `images/equipement/stabilizator.jpg`, `images/equipement/transformator.jpg`, `images/excavator22.jpg`, `images/infrastucture/mo2.jpg`, `images/materials/PE-Water-Supply-Pipes.jpg`, `images/truck1.jpg` | likely deferrable | Data-driven jobs/materials media. |
| Major media | `images/favicon.ico` | likely deferrable | Browser chrome only. |
| Major media | `images/ie8-panel/warning_bar_0000_us.jpg` | likely unnecessary on that route | Only legacy IE conditional path. |

#### `projects.html`

| Dependency Type | Dependency | Classification | Notes |
| --- | --- | --- | --- |
| CSS | `css/bootstrap.css` | critical for first render | Shared layout baseline. |
| CSS | `css/style.css` | critical for first render | Shared theme/template layer. |
| CSS | `css/fonts.css` | required after first render | Shared icon font mapping. |
| CSS | `css/redesign.css` | critical for first render | Project-owned override layer. |
| JS | `data/categories.js` | required after first render | Filter labels/nav data. |
| JS | `data/projects.js` | required after first render | Projects grid cards. |
| JS | `data/site.js` | required after first render | Footer/site metadata. |
| JS | `data/departments.js` | required after first render | Footer departments data. |
| JS | `data/certificates.js` | likely unnecessary on that route | Not consumed by projects page scripts. |
| JS | `data/jobs.js` | likely unnecessary on that route | Not consumed by projects page scripts. |
| JS | `data/translations.js` | required after first render | i18n dictionary. |
| JS | `js/content-store.js` | required after first render | Data access for route scripts. |
| JS | `js/i18n.js` | required after first render | Translation/system language. |
| JS | `js/nav-projects.js` | required after first render | Dynamic projects dropdown. |
| JS | `js/projects-page.js` | required after first render | Projects filter + cards rendering. |
| JS | `js/footer-company.js` | required after first render | Footer rendering. |
| JS | `js/seo-head.js` | likely deferrable | Meta patching can run later. |
| JS | `js/core.min.js` | required after first render | Shared plugin runtime. |
| JS | `js/script.js` | required after first render | Global init + loader lifecycle. |
| Fonts | `//fonts.googleapis.com/css?family=Lato:300,300italic|Montserrat:400,700` | likely deferrable | External font CSS request. |
| Fonts | `../fonts/fontawesome-webfont.{eot,woff2,woff,ttf,svg}` | required after first render | Footer and nav icon classes. |
| Fonts | `../fonts/materialdesignicons-webfont.{eot,woff2,woff,ttf,svg}` | likely deferrable | Form/snackbar related iconography. |
| Fonts | `../fonts/Linearicons.ttf` | required after first render | UI icon set used across template. |
| Major media | `images/logo-inverse-304x39.png` | critical for first render | Header brand image. |
| Major media | `images/parallax-3.jpg` | critical for first render | Projects hero background. |
| Major media | `images/home-1-652x491.jpg`, `images/home-post-1-418x315.jpg`, `images/home-post-2-418x315.jpg`, `images/home-post-3-418x315.jpg`, `images/parallax-1.jpg`, `images/parallax-2.jpg`, `images/project-1-480x361.jpg`, `images/project-2-480x361.jpg`, `images/project-3-480x361.jpg`, `images/project-4-480x361.jpg`, `images/project-5-480x361.jpg`, `images/project-category-healthcare.jpg`, `images/slider-slide-1-1920x1080.jpg` | required after first render | `coverImage`/`heroImages` pool from `data/projects.js` (cards are lazy image-tagged). |
| Major media | `images/favicon.ico` | likely deferrable | Browser chrome only. |
| Major media | `images/ie8-panel/warning_bar_0000_us.jpg` | likely unnecessary on that route | Legacy IE conditional path only. |

#### `category.html`

| Dependency Type | Dependency | Classification | Notes |
| --- | --- | --- | --- |
| CSS | `css/bootstrap.css` | critical for first render | Shared layout baseline. |
| CSS | `css/style.css` | critical for first render | Shared theme/template layer. |
| CSS | `css/fonts.css` | required after first render | Icon font mapping. |
| CSS | `css/redesign.css` | critical for first render | Project override layer. |
| JS | `data/categories.js` | required after first render | Category title/hero and nav source. |
| JS | `data/projects.js` | required after first render | Category project grid source. |
| JS | `data/site.js` | required after first render | Footer/site metadata. |
| JS | `data/departments.js` | required after first render | Footer data. |
| JS | `data/certificates.js` | likely unnecessary on that route | Not consumed by `category-page.js`. |
| JS | `data/jobs.js` | likely unnecessary on that route | Not consumed by `category-page.js`. |
| JS | `data/translations.js` | required after first render | i18n dictionary. |
| JS | `js/content-store.js` | required after first render | Data accessor utilities. |
| JS | `js/i18n.js` | required after first render | Route translation behavior. |
| JS | `js/nav-projects.js` | required after first render | Nav dropdown generation. |
| JS | `js/category-page.js` | required after first render | Hero/content/grid renderer. |
| JS | `js/footer-company.js` | required after first render | Footer render. |
| JS | `js/seo-head.js` | likely deferrable | Metadata updates can run later. |
| JS | `js/core.min.js` | required after first render | Shared plugin runtime. |
| JS | `js/script.js` | required after first render | Global init + loader lifecycle. |
| Fonts | `//fonts.googleapis.com/css?family=Lato:300,300italic|Montserrat:400,700` | likely deferrable | External font CSS request. |
| Fonts | `../fonts/fontawesome-webfont.{eot,woff2,woff,ttf,svg}` | required after first render | Footer/navigation icon classes. |
| Fonts | `../fonts/materialdesignicons-webfont.{eot,woff2,woff,ttf,svg}` | likely deferrable | Non-critical feedback icons. |
| Fonts | `../fonts/Linearicons.ttf` | required after first render | Common iconography. |
| Major media | `images/logo-inverse-304x39.png` | critical for first render | Header brand image. |
| Major media | `images/home-post-2-418x315.jpg`, `images/parallax-1.jpg`, `images/parallax-2.jpg`, `images/parallax-3.jpg`, `images/project-1-480x361.jpg`, `images/project-2-480x361.jpg`, `images/project-3-480x361.jpg`, `images/project-4-480x361.jpg`, `images/project-5-480x361.jpg`, `images/project-category-healthcare.jpg`, `images/slider-slide-1-1920x1080.jpg` | required after first render | Category hero image + project card media pools from `data/categories.js` and `data/projects.js`. |
| Major media | `images/favicon.ico` | likely deferrable | Browser chrome only. |
| Major media | `images/ie8-panel/warning_bar_0000_us.jpg` | likely unnecessary on that route | Legacy IE conditional path only. |

#### `project.html`

| Dependency Type | Dependency | Classification | Notes |
| --- | --- | --- | --- |
| CSS | `css/bootstrap.css` | critical for first render | Shared layout baseline. |
| CSS | `css/style.css` | critical for first render | Shared theme/template layer. |
| CSS | `css/fonts.css` | required after first render | Icon font mapping. |
| CSS | `css/redesign.css` | critical for first render | Project override layer. |
| JS | `data/categories.js` | required after first render | Category labels for metadata/nav. |
| JS | `data/projects.js` | required after first render | Project hero/content/nav data. |
| JS | `data/site.js` | required after first render | Footer/site metadata. |
| JS | `data/departments.js` | required after first render | Footer departments data. |
| JS | `data/certificates.js` | likely unnecessary on that route | Not consumed by `project-page.js`. |
| JS | `data/jobs.js` | likely unnecessary on that route | Not consumed by `project-page.js`. |
| JS | `data/translations.js` | required after first render | i18n dictionary. |
| JS | `js/content-store.js` | required after first render | Data accessor utilities. |
| JS | `js/i18n.js` | required after first render | Translation behavior. |
| JS | `js/nav-projects.js` | required after first render | Nav dropdown generation. |
| JS | `js/project-page.js` | required after first render | Hero/content/prev-next rendering. |
| JS | `js/footer-company.js` | required after first render | Footer render. |
| JS | `js/seo-head.js` | likely deferrable | Metadata updates can run later. |
| JS | `js/core.min.js` | required after first render | Shared plugin runtime. |
| JS | `js/script.js` | required after first render | Global init + loader lifecycle. |
| Fonts | `//fonts.googleapis.com/css?family=Lato:300,300italic|Montserrat:400,700` | likely deferrable | External font CSS request. |
| Fonts | `../fonts/fontawesome-webfont.{eot,woff2,woff,ttf,svg}` | required after first render | Footer/project nav icon classes. |
| Fonts | `../fonts/materialdesignicons-webfont.{eot,woff2,woff,ttf,svg}` | likely deferrable | Non-critical feedback icons. |
| Fonts | `../fonts/Linearicons.ttf` | required after first render | Common iconography. |
| Major media | `images/logo-inverse-304x39.png` | critical for first render | Header brand image. |
| Major media | `images/home-1-652x491.jpg`, `images/home-post-1-418x315.jpg`, `images/home-post-2-418x315.jpg`, `images/home-post-3-418x315.jpg`, `images/parallax-1.jpg`, `images/parallax-2.jpg`, `images/parallax-3.jpg`, `images/project-1-480x361.jpg`, `images/project-2-480x361.jpg`, `images/project-3-480x361.jpg`, `images/project-4-480x361.jpg`, `images/project-5-480x361.jpg`, `images/project-category-healthcare.jpg`, `images/slider-slide-1-1920x1080.jpg` | required after first render | Project `heroImages` + `coverImage` media pool from `data/projects.js`. |
| Major media | `images/favicon.ico` | likely deferrable | Browser chrome only. |
| Major media | `images/ie8-panel/warning_bar_0000_us.jpg` | likely unnecessary on that route | Legacy IE conditional path only. |

### Route-by-Route Script Loading Map

#### `index.html`

| View | Script Set |
| --- | --- |
| currently loaded | `data/categories.js`, `data/projects.js`, `data/site.js`, `data/departments.js`, `data/certificates.js`, `data/jobs.js`, `data/materials.js`, `data/contacts.js`, `data/translations.js`, `js/content-store.js`, `js/i18n.js`, `js/nav-projects.js`, `js/home-categories.js`, `js/certificates-section.js`, `js/jobs-section.js`, `js/materials-section.js`, `js/contacts-section.js`, `js/footer-company.js`, `js/seo-head.js`, `js/core.min.js`, `js/script.js` |
| appears truly required for this page | All listed except `data/projects.js` and potentially deferred `js/seo-head.js` |
| appears loaded globally but not needed on this page | `data/projects.js` (`Likely from static inspection`) |

#### `projects.html`

| View | Script Set |
| --- | --- |
| currently loaded | `data/categories.js`, `data/projects.js`, `data/site.js`, `data/departments.js`, `data/certificates.js`, `data/jobs.js`, `data/translations.js`, `js/content-store.js`, `js/i18n.js`, `js/nav-projects.js`, `js/projects-page.js`, `js/footer-company.js`, `js/seo-head.js`, `js/core.min.js`, `js/script.js` |
| appears truly required for this page | `data/categories.js`, `data/projects.js`, `data/site.js`, `data/departments.js`, `data/translations.js`, `js/content-store.js`, `js/i18n.js`, `js/nav-projects.js`, `js/projects-page.js`, `js/footer-company.js`, `js/core.min.js`, `js/script.js` |
| appears loaded globally but not needed on this page | `data/certificates.js`, `data/jobs.js` (`Likely from static inspection`) |

#### `category.html`

| View | Script Set |
| --- | --- |
| currently loaded | `data/categories.js`, `data/projects.js`, `data/site.js`, `data/departments.js`, `data/certificates.js`, `data/jobs.js`, `data/translations.js`, `js/content-store.js`, `js/i18n.js`, `js/nav-projects.js`, `js/category-page.js`, `js/footer-company.js`, `js/seo-head.js`, `js/core.min.js`, `js/script.js` |
| appears truly required for this page | `data/categories.js`, `data/projects.js`, `data/site.js`, `data/departments.js`, `data/translations.js`, `js/content-store.js`, `js/i18n.js`, `js/nav-projects.js`, `js/category-page.js`, `js/footer-company.js`, `js/core.min.js`, `js/script.js` |
| appears loaded globally but not needed on this page | `data/certificates.js`, `data/jobs.js` (`Likely from static inspection`) |

#### `project.html`

| View | Script Set |
| --- | --- |
| currently loaded | `data/categories.js`, `data/projects.js`, `data/site.js`, `data/departments.js`, `data/certificates.js`, `data/jobs.js`, `data/translations.js`, `js/content-store.js`, `js/i18n.js`, `js/nav-projects.js`, `js/project-page.js`, `js/footer-company.js`, `js/seo-head.js`, `js/core.min.js`, `js/script.js` |
| appears truly required for this page | `data/categories.js`, `data/projects.js`, `data/site.js`, `data/departments.js`, `data/translations.js`, `js/content-store.js`, `js/i18n.js`, `js/nav-projects.js`, `js/project-page.js`, `js/footer-company.js`, `js/core.min.js`, `js/script.js` |
| appears loaded globally but not needed on this page | `data/certificates.js`, `data/jobs.js` (`Likely from static inspection`) |

### CSS Ownership Classification

- `vendor base` (`Confirmed by static inspection`):
  - [css/bootstrap.css](c:/Users/kevin/Documents/Rafin/css/bootstrap.css)
- `theme/template layer` (`Confirmed by static inspection`):
  - [css/style.css](c:/Users/kevin/Documents/Rafin/css/style.css) (`Trunk version 2.0.0` template/theme bundle)
- `font/icon layer` (`Confirmed by static inspection`):
  - [css/fonts.css](c:/Users/kevin/Documents/Rafin/css/fonts.css)
  - Google Fonts stylesheet (`Lato`, `Montserrat`)
  - Local webfonts under `fonts/` (FontAwesome, Material Design Icons, Linearicons)
- `project-owned override layer` (`Confirmed by static inspection`):
  - [css/redesign.css](c:/Users/kevin/Documents/Rafin/css/redesign.css)
  - Route-script runtime style mutations in [js/category-page.js](c:/Users/kevin/Documents/Rafin/js/category-page.js) and [js/project-page.js](c:/Users/kevin/Documents/Rafin/js/project-page.js)

### Dead / Removable Candidates (Checked Against Four Reference Types)

| Candidate | HTML refs | JS refs | data-file refs | CSS refs | Status |
| --- | --- | --- | --- | --- | --- |
| `data/local-mail-capture.jsonl` | no | no | no | no | checked against all four; likely removable from release payload |
| `data/mail-debug.jsonl` | no | no | no | no | checked against all four; likely removable from release payload |
| `fonts/FontAwesome.otf` | no | no | no | no | checked against all four; likely removable if no external tooling dependency |
| `css/style.css.map` | no | no | no | yes (`sourceMappingURL` in `css/style.css`) | checked against all four; removable only with matching source-map directive handling |
| `js/html5shiv.min.js` | yes (legacy IE conditional include) | no | no | no | checked against all four; not safe for deletion if IE<10 fallback remains in scope |
| `js/pointer-events.min.js` | no | yes (lazy-loaded in `js/script.js` for IE<11) | no | no | checked against all four; not safe for deletion if IE<11 fallback remains in scope |
| `images/ie8-panel/warning_bar_0000_us.jpg` | yes (legacy IE conditional markup) | no | no | no | checked against all four; not safe for deletion if legacy IE warning path retained |

### Performance Budgets (Type-Qualified)

| Budget Item | Budget | Budget Type | Phase 1 Baseline Snapshot |
| --- | --- | --- | --- |
| Homepage critical CSS | `<= 120 KB` | compressed transfer size | ~`103 KB` gzip estimate across current 4 CSS files |
| Homepage startup JS+data before interaction | `<= 220 KB` | compressed transfer size | ~`225 KB` gzip estimate |
| Shared CSS total | `<= 500 KB` | raw size | `660 KB` raw currently |
| Shared JS core (`core.min.js` + `script.js`) | `<= 350 KB` | raw size | `693 KB` raw currently |
| Main-thread parse+execute bootstrap scripts | `<= 250 ms` | execution/parsing budget | `Requires runtime verification` |
| Homepage first-view media | `<= 350 KB` | compressed transfer size | `Requires runtime verification` |
| Loader blocking window | target `<= 800 ms`, hard cap `<= 1500 ms` | execution/timing budget | current logic waits full `window.load` (`Confirmed by static inspection`) |

### Homepage First-View Critical Path (Concise)

- What must appear first (`Confirmed by static inspection`):
  - Header/nav shell, brand mark, first hero slide content, primary CTA text.
- Assets actually needed for first reveal (`Likely from static inspection`):
  - HTML shell from [index.html](c:/Users/kevin/Documents/Rafin/index.html)
  - Critical CSS: `css/bootstrap.css`, `css/style.css`, `css/redesign.css`
  - Brand image: `images/logo-inverse-304x39.png`
  - First hero background image: `images/parallax-2.jpg`
  - Minimal script path that currently controls reveal: `js/script.js` loader code
- What is currently delaying it (`Confirmed by static inspection`):
  - Loader reveal is gated on full `window.load`, so non-critical images/fonts/scripts can delay first visible paint.
  - Large shared script payload and external font CSS are in the startup path.

### Runtime Verification Still Needed

- `network waterfall verification` (`Requires runtime verification`)
- `LCP candidate confirmation` (`Requires runtime verification`)
- `request order validation` (`Requires runtime verification`)
- `offscreen image fetch behavior` (`Requires runtime verification`)
- `actual loader reveal timing` (`Requires runtime verification`)

## Phase 2: Critical Rendering Path and Loader Rework

### Objective

Make the site feel fast because the page becomes visible earlier for the right reasons, not because of a cosmetic shortcut.

### Tasks

- Replace the current loader behavior so it does not wait on full `window.load`
- Redefine loader release based on critical readiness:
  - DOM readiness
  - critical layout readiness
  - bounded fallback timeout
- Ensure the loader can never trap the page for too long
- Preserve visual polish while removing full-page perceived blocking
- Verify the loader behavior on:
  - homepage
  - projects page
  - category page
  - project page
- Ensure no flash-of-broken-layout regression is introduced

### Deliverables

- revised loader lifecycle
- documented rule for when the page is allowed to reveal
- regression-tested loader behavior across active routes

### Acceptance Criteria

- page becomes visible before all images finish loading
- no permanent loader stalls
- no broken initial layout on first paint

## Phase 3: CSS Architecture Cleanup and Inline Style Removal

### Objective

Move the styling system toward a maintainable, centralized structure and remove scattered style debt.

### Tasks

- Identify all page-local `<style>` blocks and move them into proper CSS files
- Remove JS-injected CSS from render scripts and move it into static stylesheets
- Define a clean CSS layering strategy:
  - vendor base
  - site base
  - redesign/site overrides
  - page/component styles
- Reduce duplication between:
  - homepage
  - projects page
  - category page
  - project page
- Consolidate one-off selector patches into named sections with clear ownership
- Normalize spacing, naming, and organization in project-owned CSS
- Review whether [css/redesign.css](c:/Users/kevin/Documents/Rafin/css/redesign.css) should become the main project-owned layer or whether a clearer split is needed

### Deliverables

- centralized CSS ownership model
- reduced inline CSS usage
- reduced JS-injected CSS usage
- documented CSS file responsibilities

### Acceptance Criteria

- no new inline `<style>` blocks are required for active pages
- no active UI components depend on JS-created style tags
- project-owned styling is easier to trace and extend safely

## Phase 4: JavaScript Loading Strategy and Plugin Pruning

### Objective

Reduce unnecessary blocking JavaScript and make script loading match actual page needs.

### Tasks

- Audit [js/core.min.js](c:/Users/kevin/Documents/Rafin/js/core.min.js) usage versus what active pages actually need
- Audit [js/script.js](c:/Users/kevin/Documents/Rafin/js/script.js) for:
  - global initialization work
  - page-specific logic running everywhere
  - legacy plugin setup that can be deferred or gated
- Defer non-critical scripts where safe
- Gate feature initialization by page presence instead of always running
- Remove or isolate legacy integrations not used by the current release path
- Review whether some `data/*.js` files can load later instead of all at once on the homepage

### Deliverables

- script loading map by page
- reduced blocking JS on initial load
- cleanup list of legacy plugin behavior kept, deferred, or removed

### Acceptance Criteria

- initial script execution is reduced
- non-critical features do not block primary content visibility
- no active route loses required interactivity

## Phase 5: Asset, Image, and Font Optimization

### Objective

Reduce weight of the assets that matter most to first impression and page stability.

### Tasks

- Audit the homepage and other live pages for oversized images
- Compress and resize early-loading images appropriately
- Prioritize optimization of:
  - hero imagery
  - parallax backgrounds
  - large homepage visuals
  - repeated project/staff thumbnails
- Review whether some decorative images should load later or in lighter variants
- Improve font loading strategy:
  - add `preconnect` where appropriate
  - reduce blocking impact of external fonts
  - ensure acceptable fallback typography behavior
- Review favicon and non-critical media loading

### Deliverables

- optimized early-loading images
- reduced above-the-fold asset weight
- font loading strategy aligned with faster first render

### Acceptance Criteria

- homepage opens faster on first load
- above-the-fold imagery no longer dominates initial load cost
- font loading does not unnecessarily delay usable rendering

## Phase 6: Cleanup of Unnecessary Files, Dead Code, and Shipping Noise

### Objective

Reduce long-term maintenance cost by cleaning what the release does not need.

### Tasks

- Audit root-level docs and temporary artifacts that should not affect the shipped site
- Separate runtime data from local diagnostic artifacts
- Review whether local debug files should be gitignored or isolated
- Identify unused or orphaned legacy HTML files and decide:
  - remove from release scope
  - keep but isolate as non-production artifacts
- Audit CSS/JS for dead selectors, dead initializers, and dead utilities related to inactive features
- Audit images/assets for files not referenced by active routes
- Remove or clearly quarantine obsolete patch layers and temporary files

### Deliverables

- cleanup list with keep/remove/isolate decisions
- reduced release noise
- clearer distinction between production assets and local testing artifacts

### Acceptance Criteria

- active release output is easier to understand
- non-production artifacts do not clutter maintenance or shipping decisions
- dead code is reduced without breaking live functionality

## Phase 7: Production Delivery Hardening

### Objective

Make the optimized site behave professionally under real hosting conditions.

### Tasks

- Review cache strategy for:
  - CSS
  - JS
  - images
  - fonts
- Review Apache delivery settings in `.htaccess`
- Ensure internal docs/config/testing artifacts are not publicly exposed
- Review compression strategy where hosting supports it
- Confirm robots and sitemap still match actual release scope after cleanup
- Confirm contact form and PHP mail behavior remain compatible with the final delivery flow

### Deliverables

- delivery hardening checklist
- updated hosting guidance
- cache/compression recommendations or implementation where safe

### Acceptance Criteria

- production delivery supports the optimized front-end path
- no internal files are unintentionally public
- no release regression is introduced by caching or routing rules

## Phase 8: QA, Regression Testing, and Documentation

### Objective

Close the work with confidence and leave a maintainable reference for future updates.

### Tasks

- Test active routes on desktop and mobile widths
- Verify:
  - loader behavior
  - page reveal timing
  - layout stability
  - nav behavior
  - projects/category/project rendering
  - contact form behavior
- Check for visual regressions caused by CSS consolidation
- Check for broken references after asset cleanup
- Record final architecture decisions:
  - CSS ownership
  - script loading rules
  - asset optimization rules
  - cleanup conventions

### Deliverables

- regression checklist
- final cleanup summary
- maintainability notes for future work

### Acceptance Criteria

- active pages are faster and still visually correct
- the codebase is cleaner and easier to extend
- future work can follow a clearer structure instead of adding more patch debt

## Recommended Execution Order

1. Phase 1: Baseline Audit and Performance Budget
2. Phase 2: Critical Rendering Path and Loader Rework
3. Phase 3: CSS Architecture Cleanup and Inline Style Removal
4. Phase 4: JavaScript Loading Strategy and Plugin Pruning
5. Phase 5: Asset, Image, and Font Optimization
6. Phase 6: Cleanup of Unnecessary Files, Dead Code, and Shipping Noise
7. Phase 7: Production Delivery Hardening
8. Phase 8: QA, Regression Testing, and Documentation

## What This Plan Intentionally Avoids

- framework migration
- route rewrite
- redesign of approved UI
- broad backend rewrites unrelated to delivery/performance
- cosmetic-only speed hacks that do not improve the underlying loading path

## Definition of Done

The site is considered complete for this effort when:

- it opens quickly for users because the critical rendering path is fixed
- CSS is centralized and maintainable
- inline and JS-injected style debt are removed or minimized
- unnecessary code and files are cleaned up responsibly
- heavy early assets are optimized
- production delivery behavior is hardened
- the existing site remains stable, professional, and scalable within the current stack
