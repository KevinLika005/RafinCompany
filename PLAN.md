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

### Tasks

- Audit initial-page dependencies for the homepage:
  - HTML
  - CSS
  - JS
  - fonts
  - hero/parallax imagery
- Inventory all CSS sources:
  - vendor CSS
  - project CSS
  - inline `<style>` blocks
  - JS-injected style tags
- Inventory all JS sources:
  - vendor bundle
  - page-specific scripts
  - globally loaded scripts that are not needed on every page
- Identify above-the-fold assets on the homepage
- Identify obvious dead or legacy files that are not part of current live routes
- Define practical budgets for:
  - initial CSS
  - initial JS
  - above-the-fold image weight
  - loader maximum blocking time

### Deliverables

- dependency inventory
- CSS/JS/style-debt inventory
- list of likely removable or deferrable assets
- target performance budget for homepage and secondary pages

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
