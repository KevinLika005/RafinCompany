1. Repo and stack analysis
The project should be treated as a static HTML/CSS/JavaScript website unless repo inspection proves otherwise.
The current site structure appears to rely on physical HTML pages, shared styling, and plugin-based JavaScript behavior rather than a component framework.
The homepage is built in index.html.
The currently relevant sections for this task are:
the main navigation/header
the homepage services/categories area
the homepage projects-related grid/cards area
the footer area
the existing slider/plugin initialization scripts
The safest strategy is not to rewrite the project into a new framework.
Instead, extend the current structure with:
dedicated HTML templates for new pages
structured local content files
lightweight page-specific JavaScript render logic
The current codebase should be extended with light refactoring only where needed, not rebuilt.
2. Recommended content architecture

For phase 1, do not use a database yet.
Use structured local content files as the single source of truth.

Recommended structure
/data
  categories.js
  projects.js
  departments.js
  certificates.js
  jobs.js
  site.js
  translations.js

/js
  content-store.js
  i18n.js
  nav-projects.js
  home-categories.js
  projects-page.js
  category-page.js
  project-page.js
  ui-init.js
Why this is better than one large content.json
easier to maintain
easier to prompt Gemini with smaller focused tasks
safer for debugging
easier bilingual handling
easier future migration to CMS or DB later
Categories schema

Each category should contain:

id
slug
title.en
title.sq
shortDescription.en
shortDescription.sq
fullDescription.en
fullDescription.sq
thumbImage
heroImage
order
Projects schema

Each project should contain:

id
slug
categoryId
title.en
title.sq
excerpt.en
excerpt.sq
description.en
description.sq
coverImage
heroImages
location.en
location.sq
year
status
order
Other content files
departments.js
Holds Technical, Legal, and Finance department content and contacts.
certificates.js
Holds certificates in display order.
jobs.js
Holds careers/job entries.
site.js
Holds stats, address, social links, company-level settings.
translations.js
Holds static UI text translations.

This structure matches the content requirements from the project brief and keeps the projects system easy to scale.

3. Routing/page plan

Because phase 1 should stay close to the current static structure, the safest route strategy is:

index.html
projects.html
category.html?slug=road-infrastructure
project.html?slug=sample-road-project
Navigation behavior
Main “Projects” nav item
clicking it opens projects.html
Projects dropdown
shows all project categories
each category links to category.html?slug=...
All-projects page
shows category/service groups and projects for the selected group
Category page
shows category hero image, description, and project grid
Project page
shows project gallery/hero, details, and same-category prev/next links
Important rule

Do not use translated slugs in phase 1.
Use stable slugs and only translate visible labels/content.

4. Phased implementation roadmap
Phase 0: Repo verification and selector freeze

Goal

Confirm the real files, selectors, and plugin hooks used by the current codebase.

Likely files to inspect

index.html
main CSS file(s)
main JS file(s)
any shared header/footer markup

Risks

Changing classes/selectors that current scripts depend on

Acceptance criteria

Exact files to modify are identified
Header, homepage categories section, and slider initialization points are confirmed
Phase 1: Content/data layer

Goal

Create structured local content files for categories, projects, departments, certificates, jobs, and site data.

New files

/data/categories.js
/data/projects.js
/data/departments.js
/data/certificates.js
/data/jobs.js
/data/site.js
/data/translations.js

Risks

inconsistent data shape
missing placeholder entries preventing testing

Acceptance criteria

all six project categories are defined
placeholder bilingual content exists
at least two categories contain multiple projects for testing prev/next logic
stats and address reflect the project brief, not the old live site content
Phase 2: Shared helpers and bilingual foundation

Goal

Build shared content access logic and simple EN/SQ language switching.

New files

/js/content-store.js
/js/i18n.js

Likely files to edit

header/nav markup
language toggle location in shared header or index.html

Risks

mixing static labels and dynamic labels inconsistently

Acceptance criteria

language preference is stored
static UI labels can switch
dynamic project/category content switches correctly
slugs remain stable across languages
Phase 3: Projects dropdown and homepage integration

Goal

Connect the homepage category/service section and the main Projects dropdown to the new structured content.

New files

/js/nav-projects.js
/js/home-categories.js

Likely files to edit

index.html
existing nav markup
homepage categories/projects section
script include area

Risks

breaking current desktop/mobile nav behavior
losing current layout classes needed for responsiveness

Acceptance criteria

hovering “Projects” shows category dropdown on desktop
mobile navigation has a working fallback behavior
homepage category cards show the six required categories
clicking a homepage category card opens the corresponding category page
Phase 4: All-projects page

Goal

Build a dedicated all-projects page showing category groups and their relevant projects.

New file

projects.html
/js/projects-page.js

Risks

weak filtering UX
empty states not handled

Acceptance criteria

main Projects nav opens projects.html
page includes category/service group selector
selecting a group updates visible projects
project cards link correctly to project detail pages
Phase 5: Category pages

Goal

Build a reusable category template page.

New file

category.html
/js/category-page.js

Risks

invalid slugs
missing hero images or descriptions

Acceptance criteria

page reads category slug from URL
full-width hero image renders
category description renders
only matching projects appear
invalid slugs show a graceful fallback state
Phase 6: Single project pages

Goal

Build a reusable single-project template page.

New file

project.html
/js/project-page.js

Risks

dynamic slider/gallery markup not initializing correctly
missing placeholder data for project detail rendering

Acceptance criteria

page reads project slug from URL
project hero/slider renders images
project information renders below
invalid slug shows a fallback state
Phase 7: Previous/next same-category logic

Goal

Add previous/next navigation that stays inside the current project category only.

Likely files to edit

project.html
/js/project-page.js

Risks

incorrect ordering
cross-category navigation bugs

Acceptance criteria

previous/next only use projects from the same category
first item hides/disables previous
last item hides/disables next
navigation order follows explicit order value
Phase 8: QA and cleanup

Goal

Verify the whole projects flow and homepage integration before moving to other website sections.

Likely files to inspect

all new page files
all new JS helpers
CSS overrides

Risks

broken links
plugin timing issues
inconsistent translations
responsive regressions

Acceptance criteria

no dead category/project links
no slider/plugin init errors
dropdown works on desktop and mobile
homepage to category to project flow works end to end
bilingual switching works across all new project-related pages
5. File-by-file action plan
Files to modify
index.html
update Projects nav behavior
update homepage categories/services section
add language toggle if header is here
include new JS files
existing CSS file(s)
add styling for dropdown, filters, category pages, project pages, bilingual toggle, and responsive adjustments
existing global JS include/init area
ensure page scripts load in the correct order
Files to create
projects.html
category.html
project.html
Data files to create
/data/categories.js
/data/projects.js
/data/departments.js
/data/certificates.js
/data/jobs.js
/data/site.js
/data/translations.js
JS files to create
/js/content-store.js
/js/i18n.js
/js/nav-projects.js
/js/home-categories.js
/js/projects-page.js
/js/category-page.js
/js/project-page.js
/js/ui-init.js
Important planning rule

Even if some of these scripts are later merged, they should be planned separately first so the logic stays clean.

6. Previous/next navigation logic

The simplest and most reliable method is:

read current project slug from the URL
find the current project in projects.js
get all projects with the same categoryId
sort them by order
find the current index
set previous to index - 1 if it exists
set next to index + 1 if it exists
never cross category boundaries
Important decision

Do not wrap automatically from last to first in phase 1.
Only show valid previous/next within the same category.

7. Bilingual strategy

The most practical bilingual approach for phase 1 is:

store current language in localStorage
add a simple EN / SQ toggle in the header
use bilingual content objects:
title.en
title.sq
description.en
description.sq
keep static UI labels in translations.js
keep slugs the same in both languages
Why this is the best phase 1 solution
simple
low risk
works with static HTML
easy to expand later
avoids complexity from translated routes
8. Recommended implementation order
Verify repo structure and lock the exact files/selectors to preserve
Create structured data files with placeholder bilingual content
Create shared content loader and i18n helper
Add Projects dropdown rendering in the nav
Replace homepage category/service area with structured category rendering
Build projects.html
Build category.html
Build project.html
Add same-category previous/next logic
Run QA on desktop/mobile and both languages

This order minimizes breakage and avoids wasting time on deep UI work before the data structure is ready.

9. Review checkpoints
Checkpoint 1

After data files are created:

confirm category names
confirm bilingual data structure
confirm placeholder projects are enough for testing
Checkpoint 2

After nav + homepage integration:

confirm dropdown behavior
confirm homepage categories are correct
confirm links point to the right category pages
Checkpoint 3

After projects.html and category.html are working:

confirm category filtering/display logic
confirm hero/description pattern on category pages
Checkpoint 4

After project.html is working:

confirm slider/gallery rendering
confirm project info layout
confirm prev/next logic
Checkpoint 5

After bilingual QA:

confirm English/Albanian switching
confirm static labels and dynamic content both switch correctly
10. Risks and decisions
Risk 1: plugin initialization timing

If sliders/carousels are initialized before dynamic content is rendered, they can break.

Decision

render page markup first
initialize plugins only after markup exists
keep plugin init inside page-specific flow or ui-init.js
Risk 2: static-site routing limitations

A static site does not naturally support clean nested dynamic routes.

Decision

use projects.html, category.html?slug=..., and project.html?slug=... in phase 1
only consider clean URLs later if hosting supports rewrites
Risk 3: content sprawl

One large JSON or one giant script will become hard to maintain.

Decision

split data files
split JS responsibilities by page/domain
Risk 4: bilingual inconsistency

Static labels and dynamic labels can diverge if not planned together.

Decision

use a single language source of truth from localStorage
centralize static translations
require all project/category content to be bilingual from the start
Risk 5: mismatch between current live site and new brief

The live site contains older content and structure, while the new brief defines new categories, stats, address, and navigation behavior.

Decision

use the project brief as the source of truth for new content and required behavior
use the current site only as an implementation/layout reference where useful