# Rafin Company Website — Codex Client Update Implementation Plan

## 1. Purpose

This document is the technical implementation reference for Codex while applying the latest client-requested updates to the Rafin Company website.

The website structure has already been redesigned and must remain stable. Codex must only update the specific requested content, data, styling, and behavior listed in this plan.

The main objective is to apply the client changes without triggering a broad redesign, without changing the existing routing model, and without breaking the current dynamic data-driven architecture.

---

## 2. Critical Scope Rule

### Do not change the website structure.

Codex must not restructure the website, rewrite full pages, replace the current architecture, or redesign unrelated sections.

Allowed changes are limited to:

- Updating existing data files.
- Making minimal renderer updates only where the data structure requires it.
- Updating specific UI behavior requested by the client.
- Updating project-owned CSS theme variables and scoped overrides.
- Adding missing assets only where requested.
- Keeping the existing page flow, sections, and routes intact.

Not allowed:

- No full redesign of the homepage.
- No replacement of the current layout system.
- No removal of existing pages.
- No unrelated HTML rewrites.
- No vendor file edits.
- No Bootstrap/vendor CSS edits.
- No unnecessary JavaScript rewrites.
- No fake project data unless explicitly marked as temporary/demo and required for layout testing.
- No breaking changes to form submission, navigation, project filtering, or mobile behavior.

---


### Current codebase

Use the GitHub repository as the source of truth for implementation, file structure, components, current data modules, JavaScript renderers, and CSS:

```text
https://github.com/KevinLika005/RafinCompany.git
```

### Visual direction

When a section needs to feel “like the Eberhard website,” use this as visual inspiration only:

```text
https://eberhard.ch/
```

Important: do not copy Eberhard directly. Use it only as inspiration for clean construction-industry visual hierarchy, strong imagery, dark sections, structured spacing, and confident typography.

---

## 4. Technical Architecture to Preserve

The current Rafin website uses static pages with dynamic client-side data modules.

Codex should preserve this pattern:

```text
HTML pages
  -> load shared CSS
  -> load data/*.js modules
  -> load js/* renderer scripts
  -> render dynamic sections into existing containers
```

Expected key pages:

```text
index.html
projects.html
category.html
project.html
```

Expected data files:

```text
data/jobs.js
data/materials.js
data/categories.js
data/projects.js
data/contacts.js
data/departments.js
data/site.js
```

Expected renderer / behavior files:

```text
js/jobs-section.js
js/materials-section.js
js/contacts-section.js
js/footer-company.js
js/projects-page.js
js/project-page.js
```

Expected project-owned CSS:

```text
css/redesign.css
```

Use data files as the primary source of truth whenever possible. Only update renderers when the current data model cannot support the new content.

---

## 5. Implementation Order

Codex should work in small controlled phases.

Recommended order:

1. Repository audit and scope confirmation.
2. Careers data update.
3. Contact form, department contacts, and footer contact behavior.
4. Materials section update and asset replacement.
5. Project category updates.
6. Individual project hero behavior update.
7. Contact map location update.
8. Color theme update.
9. Full QA pass.

Do not combine all changes into one uncontrolled rewrite.

---

# Phase 0 — Initial Audit

## Goal

Before changing files, inspect the current implementation and confirm which files control each affected section.

## Files to inspect

```text
index.html
projects.html
category.html
project.html
data/jobs.js
data/materials.js
data/categories.js
data/projects.js
data/contacts.js
data/departments.js
data/site.js
js/jobs-section.js
js/materials-section.js
js/contacts-section.js
js/footer-company.js
js/projects-page.js
js/project-page.js
css/redesign.css
```

## Acceptance criteria

- Codex identifies the exact files it will edit.
- Codex does not edit unrelated pages or sections.
- Codex confirms the existing dynamic structure is preserved.

---

# Phase 1 — Careers / Jobs Update

## Goal

Replace the current careers/job data with the new client-approved grouped structure.

Primary file:

```text
data/jobs.js
```

Secondary file only if required:

```text
js/jobs-section.js
```

CSS only if required:

```text
css/redesign.css
```

## Required careers structure

### Menaxhim Ndertimi

- Inxhinier Ndertimi
- Inxhinier Hidroteknik
- Ing. Elektrik
- Ing. Elektroteknik
- Ing. Mekanik
- Ing. Mekatronik

### Drejtues Mjetesh

- Shofer Kamioni
  - Shofer Kamioncine
  - Shofer Fugoni
- Manovrator
  - Eskavatorist
  - Buldozer
  - Grejder
  - Rrul
  - Asfaltshtrues
  - Fadrom

### Specialist Ndertimi

- Puntor Ndertimi
- Elektricist
- Hidroteknik
- Murator / Suvaxhi
- Pllaka Shtrues
- Hekur Thyes
- Karpentier
- Marangoz
- Saldator

### Mirmbajtje Makinerish

- Elektroaut
- Mekanik

## Technical guidance

- Keep the careers section dynamic.
- Prefer a grouped array/object model in `data/jobs.js`.
- Do not hardcode all jobs directly inside HTML.
- If the current renderer only supports flat job cards, minimally update it to support:
  - category title,
  - role list,
  - optional nested subroles.
- Keep existing CTA behavior, especially Apply / Contact actions.
- If the site supports Albanian and English values, keep the data extensible for both, but prioritize accurate Albanian display.

## Acceptance criteria

- The careers section displays four groups.
- Nested roles under Shofer Kamioni and Manovrator are visually clear.
- Existing contact/apply behavior still works.
- No unrelated homepage section changes.

---

# Phase 2 — Contact Form, Department Contacts, and Footer Links

## Goal

Update the contact area, department phone numbers, CV upload field, and footer email click behavior.

Primary files:

```text
data/departments.js
data/contacts.js
js/contacts-section.js
js/footer-company.js
```

HTML file only if the contact form is static:

```text
index.html
```

CSS only if required:

```text
css/redesign.css
```

## 2.1 CV / document upload field

Add a file input to the contact form.

Label:

```text
Ngarko CV / Dokument
```

Allowed file types:

```text
.pdf,.doc,.docx
```

Recommended HTML:

```html
<input type="file" name="cv" accept=".pdf,.doc,.docx">
```

## Important backend note

Do not break the existing contact form.

If the mail backend does not currently support attachments, Codex must not silently pretend that uploads are sent. Add a short technical comment near the form or backend integration point explaining:

```text
TODO: Backend attachment handling is required before uploaded CV files can be emailed or stored.
```

Only modify backend PHP if the current implementation already supports file handling or if the change is small and safe.

## 2.2 Department phone numbers

Update department phone numbers:

```text
Departamenti Teknik: 0688080606
Departamenti Finance: 0684085505
Departamenti Juridik: 0684085510
```

Use `data/departments.js` as the source of truth.

## 2.3 Footer email click behavior

Footer department emails must be clickable, but they should navigate/scroll to the contacts section instead of opening the user’s mail client.

Expected behavior:

```html
<a href="#contacts">email@example.com</a>
```

or use the existing contact section ID if it is different.

Phone numbers may remain clickable with `tel:` links.

## Acceptance criteria

- Contact form includes visible CV/document upload input.
- File input accepts PDF, DOC, and DOCX.
- Existing form fields still work.
- Department numbers are updated exactly.
- Footer emails scroll/navigate to the contact section.
- Footer layout is not redesigned.

---

# Phase 3 — Materials Section Update

## Goal

Replace the current materials section with exactly three material production items.

Primary file:

```text
data/materials.js
```

Renderer only if required:

```text
js/materials-section.js
```

Assets folder:

```text
images/materials/
```

## Required items

### 1. Prodhim Betoni

Suggested Albanian summary:

```text
Prodhim betoni për projekte civile, infrastrukturore dhe industriale me kontroll teknik të cilësisë.
```

### 2. Prodhim Inertesh

Suggested Albanian summary:

```text
Përpunim dhe furnizim inertesh për ndërtim, rrugë dhe shtresa infrastrukturore.
```

### 3. Prodhim Asfalti

Suggested Albanian summary:

```text
Prodhim asfalti për rrugë, sheshe industriale dhe projekte publike me standarde të larta zbatimi.
```

## Image requirements

Each item must have a realistic image.

Preferred asset names:

```text
images/materials/concrete-production.jpg
images/materials/aggregates-production.jpg
images/materials/asphalt-production.jpg
```

Image rules:

- Images must look realistic and industry-appropriate.
- Avoid fake-looking AI images.
- Avoid irrelevant stock images.
- Use free/royalty-safe images when downloading is possible.
- If image download is not possible, use the best existing realistic image temporarily and add a clear TODO comment with the target filename.

## Acceptance criteria

- Materials section has exactly three cards/items.
- Old material items are removed.
- Image paths work.
- Alt text is meaningful.
- Layout remains consistent with the existing materials section.

---

# Phase 4 — Project Categories and Project Labels

## Goal

Update project categories and filtering while preserving the existing project data architecture.

Primary file:

```text
data/categories.js
```

Secondary files only if needed:

```text
data/projects.js
js/projects-page.js
js/project-page.js
```

## Required category rename

Rename:

```text
Infrastrukturë Ujësjellësi
```

to:

```text
Infrastrukturë Ujore
```

Keep the English label as:

```text
Water Infrastructure
```

unless the current translation system uses another consistent pattern.

## New categories to add

```text
Monumente Kulturore
Rezidenca Banuese
```

Recommended English labels:

```text
Cultural Monuments
Residential Residences
```

Alternative for better English:

```text
Cultural Heritage
Residential Buildings
```

Use whichever fits the existing naming convention.

## Technical guidance

- Add categories to the central categories data file.
- Ensure they appear in:
  - Projects dropdown.
  - Projects overview filters/container.
  - Category page rendering.
  - Any project filtering logic.
- Do not create fake detailed project pages unless required for layout testing.
- If placeholder project entries are required, mark them clearly as temporary/demo in code comments.

## Acceptance criteria

- The old water-supply label is no longer visible.
- “Infrastrukturë Ujore” appears correctly.
- “Monumente Kulturore” appears as a category.
- “Rezidenca Banuese” appears as a category.
- Existing project categories and filters still work.

---

# Phase 5 — Individual Project Hero Behavior

## Goal

Change the image behavior on `project.html` only.

Primary files:

```text
project.html
js/project-page.js
css/redesign.css
```

## Current issue

The individual project detail page currently uses side arrow buttons and automatic image/slider animation.

## Required behavior

- Remove left/right side arrow buttons from the hero banner.
- Remove automatic image sliding.
- Keep support for multiple images.
- Change the visible hero image only when the user manually clicks a thumbnail, dot, or image selector.
- Use a smooth transition only after a manual click.
- Do not remove bottom “Previous Project” / “Next Project” navigation.
- Previous/Next project navigation must still stay within the same project category.

## Visual direction

The hero should be clean and strong:

- Large full-width project image.
- Dark overlay if needed for readability.
- Project title.
- Project category.
- Manual image selectors placed cleanly below or over the hero.

If the screenshot mentioned by the client is not present in the repository, implement the clean static hero pattern above.

## Acceptance criteria

- No side arrow buttons remain in the project hero.
- No timer or auto-slide behavior remains.
- Hero image changes only through user action.
- Bottom project navigation still works.
- Existing project detail data still renders.

---

# Phase 6 — Contact Map Update

## Goal

Update the first Tirana map location to the client-provided Google Maps location.

Primary file:

```text
data/contacts.js
```

Client location URL:

```text
https://maps.app.goo.gl/sSJKcZmiTMZPzwa77?g_st=com.apple.sharing.quick-note
```

## Technical guidance

- Keep location 1 as Tirana / Head Office.
- Replace the current map marker/embed for location 1 with the coordinates from the client-provided Google Maps link.
- If using OpenStreetMap embed, use a marker-based URL.
- Center the bbox around the marker so the point displays correctly.
- Keep location 2 unchanged or as placeholder/current data because the client will provide it later.
- Do not delete location 2 unless the existing UI cannot support an unknown second location.

## Acceptance criteria

- First map displays the new Tirana location.
- Marker appears at the correct location.
- Location 2 is not incorrectly invented.
- Contact section layout remains stable.

---

# Phase 7 — Color Theme Update

## Goal

Apply the approved client color palette while preserving readability.

Primary file:

```text
css/redesign.css
```

Do not edit:

```text
bootstrap.css
vendor CSS files
minified third-party files
```

## Approved palette

```text
Black:      #000000
Dark blue:  #14213D
Yellow:     #FCA311
Light gray: #E5E5E5
White:      #FFFFFF
```

## Required visual rules

### Header

```text
Background: #FFFFFF
Text: #14213D
```

### Hero overlay / dark sections

```text
Background / overlay: #14213D
Text: keep white where already intended
```

### Primary buttons

```text
Background: #FCA311
Text: #000000
```

### Secondary buttons in hero/dark areas

```text
Transparent or white
Border: #FFFFFF
Text: #FFFFFF
```

### Cards

```text
Background: #FFFFFF
Titles: #14213D
```

### Footer

```text
Background: #14213D
Text: #FFFFFF
```

### Hover states

Use a slightly darker yellow than:

```text
#FCA311
```

Example:

```text
#E6950F
```

## Suggested CSS variable mapping

If `:root` variables exist, update them first:

```css
:root {
  --rafin-ink: #14213D;
  --rafin-muted: #5f6b7a;
  --rafin-dark: #14213D;
  --rafin-dark-soft: #1b2a4a;
  --rafin-accent: #FCA311;
  --rafin-accent-hover: #E6950F;
  --rafin-light: #E5E5E5;
  --rafin-white: #FFFFFF;
  --rafin-black: #000000;
}
```

## Important readability rule

Do not globally convert white text to black.

White text must remain white in:

- Hero sections.
- Dark overlays.
- Dark cards.
- Footer.
- Any dark blue section.

## Acceptance criteria

- Header is white with dark blue text.
- Hero/dark sections use dark blue.
- Primary CTAs use yellow with black text.
- Footer is dark blue with white text.
- Cards remain white with dark blue titles.
- Mobile menu remains readable.
- No contrast regression.

---

# Phase 8 — Final QA Checklist

Codex must verify all requested changes before reporting completion.

## Careers

- [ ] Careers section shows four grouped career categories.
- [ ] Nested roles under Shofer Kamioni and Manovrator are visible and readable.
- [ ] Contact/apply action still works.

## Contacts

- [ ] Contact form includes CV/document upload.
- [ ] Upload accepts `.pdf`, `.doc`, `.docx`.
- [ ] Existing contact form behavior is not broken.
- [ ] Department numbers are correct:
  - [ ] Departamenti Teknik: 0688080606
  - [ ] Departamenti Finance: 0684085505
  - [ ] Departamenti Juridik: 0684085510
- [ ] Footer emails are clickable and scroll to contacts.
- [ ] Phone numbers are clickable where appropriate.

## Materials

- [ ] Materials section has exactly three items:
  - [ ] Prodhim Betoni
  - [ ] Prodhim Inertesh
  - [ ] Prodhim Asfalti
- [ ] Old material items are removed.
- [ ] Images exist and load correctly.
- [ ] Images look realistic and construction-related.
- [ ] Alt text is meaningful.

## Projects

- [ ] “Infrastrukturë Ujësjellësi” has been replaced with “Infrastrukturë Ujore”.
- [ ] “Monumente Kulturore” category exists.
- [ ] “Rezidenca Banuese” category exists.
- [ ] Project filtering still works.
- [ ] Project dropdown still works.
- [ ] Existing project detail pages still open correctly.

## Project detail hero

- [ ] Side arrow buttons are removed from the hero.
- [ ] Auto-slide behavior is removed.
- [ ] Image changes only on manual click.
- [ ] Manual transition is smooth.
- [ ] Bottom Previous/Next Project navigation still exists.
- [ ] Previous/Next Project navigation stays within same category.

## Map

- [ ] First Tirana map uses the client-provided location.
- [ ] Marker displays correctly.
- [ ] Second location remains unchanged/placeholder until client provides it.

## Theme

- [ ] Header: white background, dark blue text.
- [ ] Hero/dark sections: dark blue.
- [ ] Primary buttons: yellow background, black text.
- [ ] Secondary hero buttons: transparent/white with white border.
- [ ] Cards: white background, dark blue titles.
- [ ] Footer: dark blue background, white text.
- [ ] Hover color is a slightly darker yellow.
- [ ] White text remains white in dark sections.

## Responsive QA

- [ ] Desktop header works.
- [ ] Mobile menu works.
- [ ] Homepage layout is not broken.
- [ ] Projects page layout is not broken.
- [ ] Project detail page layout is not broken.
- [ ] Contacts section layout is not broken.
- [ ] Footer layout is not broken.

---

# Phase 9 — Reporting Format for Codex

After implementation, Codex should report:

```text
Summary:
- Short explanation of completed changes.

Files changed:
- path/to/file.js — reason
- path/to/file.css — reason

Validation:
- What was tested manually or by code inspection.

Known notes:
- Mention if backend CV attachment handling still needs server support.
- Mention if any material image is temporary.
- Mention if the second map location is still pending client input.
```

Do not report broad redesign work if it was not requested.

---

# 10. Suggested Commit Structure

Use small commits if possible:

```text
1. Update careers data and renderer
2. Update contacts, departments, and footer links
3. Update materials data and assets
4. Update project categories
5. Update project hero behavior
6. Update contact map location
7. Apply approved client color palette
8. Final QA fixes
```

---

# 11. One-Shot Codex Instruction

If Codex needs a single instruction before starting, use:

```text
Use Rafin_Codex_Client_Update_Plan.md as the implementation source of truth. Apply only the client-requested updates listed there. Preserve the existing website structure, routes, dynamic data architecture, and unrelated section layouts. Prefer data-file updates first, renderer updates second, and CSS overrides only where needed. Do not perform a broad redesign.
```
