# Release Readiness Plan

## Summary
Prepare the current static site for release without changing the approved visual direction or architecture. Fix Phase A first: normalize bilingual content, remove encoding issues, finish translation coverage, and make all renderers use one consistent i18n path. Later phases harden SEO, responsiveness, contact delivery, and cleanup.

## Execution Phases
### Phase A: i18n + content normalization
- Normalize Albanian text in `data/translations.js`, `data/categories.js`, `data/projects.js`, and `data/departments.js` to real UTF-8.
- Replace remaining English-only live copy in the live templates with translation-backed strings, including hero, about, services, CTA, staff, modal labels/buttons, and route/page SEO strings.
- Refactor dynamic renderers to use shared `I18n.getLocalizedValue()` instead of per-file `localize()` helpers.
- Remove provisional contact/material placeholder copy that is currently exposed, or gate those pieces until final copy exists.
- Keep the current layout and visual styling intact.

### Phase B: SEO / indexing foundation
- Add `robots.txt` and `sitemap.xml` for the live pages plus slug-based category/project URLs.
- Add canonical and `hreflang` tags for EN/SQ across all live pages.
- Add route-aware head handling so page title, meta description, OG tags, and structured data are page-specific instead of globally overwritten.
- Add core JSON-LD for organization/business and route-specific page schema.

### Phase C: responsive / accessibility hardening
- Remove the zoom lock from all viewport tags.
- Consolidate overlapping responsive rules from `phase9-fixes.css` into `redesign.css`, then stop loading the legacy patch file.
- Re-test navbar, language switcher, project filters, category/project hero blocks, jobs cards, contacts layout, and footer on small and large screens.
- Relax phone validation to accept real international numbers and keep keyboard/focus behavior intact.

### Phase D: contact form / email productionization
- Make mail config production-safe and authoritative, with no demo settings or repo-stored live secrets.
- Harden `rd-mailform.php` with real validation, sanitization, length limits, and removal of unused attachment handling.
- Implement actual anti-spam protection for every live form.
- Resolve the footer subscribe/contact ambiguity and remove provisional contact location data.

### Phase E: code and asset cleanup
- Remove dead CSS duplication and redundant runtime translation normalization.
- Exclude or delete legacy HTML variants, temp files, SQL dumps, duplicate icons, and other non-production assets after reference checks.
- Clean empty placeholder config/content paths that are no longer part of the release.

### Phase F: final deploy checklist
- Verify EN and SQ on all live pages, including dynamic category/project routes.
- Verify head tags, sitemap URLs, canonical host, robots rules, and structured data output.
- Test contact submission success/failure paths and spam protection.
- Run mobile and desktop spot checks for nav, projects filters, contacts, footer, and modal forms.
- Confirm no placeholder/provisional text remains in shipped pages or data files.

## Test Plan
- Language switch updates every visible string correctly on homepage, projects, category, and project pages.
- Albanian characters render correctly without runtime mojibake repair.
- `robots.txt` and `sitemap.xml` include the intended live URLs only.
- Canonical, `hreflang`, OG, and JSON-LD match the active page and route.
- Mobile zoom works; layout remains stable at small widths and wide desktop widths.
- Contact forms accept realistic phone numbers, reject invalid payloads server-side, and send successfully with production config.

## Assumptions
- Keep query-based `category.html?slug=` and `project.html?slug=` routing for this release; do not migrate routes.
- Keep the current static HTML/CSS/JS stack and approved visual direction.
- Phase A is the only implementation phase to execute first; later phases wait for explicit approval.
- If final client-approved contact/material data is still unavailable, production should hide those provisional details rather than publish placeholders.
