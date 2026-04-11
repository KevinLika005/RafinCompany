Final Release Hardening Plan
Goal

Complete a fast final hardening pass for the RafinCompany website before release, focusing only on the remaining important issues:

hosting/release hygiene
live contact email readiness
final live verification

This plan must preserve:

the current static HTML/CSS/JS/PHP stack
the approved design and layout
the current query-based routing model:
category.html?slug=...
project.html?slug=...

No redesigns, framework migrations, route rewrites, or broad refactors are allowed.

Scope
In scope
remove or neutralize risky hosting dependencies
protect internal files from public access on live Apache hosting
align robots.txt and sitemap.xml with the actual live release
make the contact form production-ready using environment-based mail configuration
verify that the contact form can send mail on the real server
perform a short live release smoke test
Out of scope
redesigning any page or component
changing approved styling
migrating to another framework
converting query routes to clean URLs
broad PHPMailer modernization unless mail remains broken after correct configuration
large codebase cleanup unrelated to release blockers
Phase 1 — Hosting / release hygiene
Objective

Remove risky release leftovers and make the deployed site cleaner and safer without changing design or routing.

Tasks
Review the root .htaccess
Remove the forced PHP 7.0 handler dependency unless the current host explicitly requires it
Preserve or improve deny rules for internal docs/config/template artifacts
Ensure legacy public pages are not part of the intended release output
Update robots.txt so it matches the actual release state
Update sitemap.xml so it reflects the intended live URLs only
Decide whether both ?lang=en and ?lang=sq should be indexed; if yes, include both consistently
Keep all active routes working exactly as before
Deliverables
updated .htaccess if needed
cleaned robots.txt
cleaned sitemap.xml
confirmation that legacy pages are no longer part of the release set
short summary of files changed
Acceptance criteria
no unnecessary PHP 7.0 dependency remains
internal docs/config artifacts are blocked on Apache-hosted production
robots.txt and sitemap.xml reflect the actual release
no layout or routing regressions are introduced
Phase 2 — Contact email production readiness
Objective

Make the contact form ready to send real emails from the live server using environment-based configuration.

Tasks
Keep the current form UI and posting flow
Keep bat/rd-mailform.php as the backend flow
Ensure mail sending depends on environment variables only
Do not commit secrets
Confirm required variables are documented clearly
Confirm contact forms submit to the correct backend endpoint
Preserve anti-spam and validation behavior unless valid submissions are blocked
Improve safe failure visibility if necessary
Do not expose credentials, stack traces, or sensitive server details
Required environment variables
MAIL_USE_SMTP
MAIL_RECIPIENT
MAIL_FROM_EMAIL
MAIL_SMTP_HOST
MAIL_SMTP_PORT
MAIL_SMTP_USERNAME
MAIL_SMTP_PASSWORD
MAIL_SMTP_SECURE
Deliverables
environment-driven mail setup confirmed
updated mail/config code only if required
exact deployment variable list
exact live-server email test steps
short summary of files changed
Acceptance criteria
no secrets are committed
contact form is ready for real SMTP-backed mail sending
valid submissions can succeed on the live server
invalid/spam submissions fail cleanly
design and routing remain unchanged
Phase 3 — Final live smoke verification
Objective

Run a short release-focused verification pass on the live server and confirm the site is ready.

Tasks
Verify homepage in EN and SQ
Verify projects page in EN and SQ
Verify one category route in EN and SQ
Verify one project route in EN and SQ
Verify robots.txt
Verify sitemap.xml
Verify blocked internal files return forbidden/inaccessible on Apache hosting
Verify one valid contact submission
Verify one invalid or spam-style contact submission
Verify no placeholder/provisional content appears in shipped UI
Verify no obvious mobile/desktop regressions on key pages
Deliverables
pass/fail checklist
blockers found, if any
minimal fixes only if necessary
final go / no-go recommendation
Acceptance criteria
active routes work in EN and SQ
SEO files reflect real release state
internal sensitive artifacts are not publicly accessible
contact form works on the real server
no obvious release blockers remain
Risks / technical debt to defer unless blocking
old PHPMailer version can remain for now if mail works correctly after SMTP setup
deeper mailer modernization can be done post-launch
broader repo cleanup can happen later if it does not affect release