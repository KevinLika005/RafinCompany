# Hostinger Mail Deployment

This site sends both the homepage contact form and the career application form through `bat/rd-mailform.php`.

The repository does not store live SMTP credentials. `rd-mailform.php` now reads mail configuration in this order:

1. Environment variables exposed by Hostinger / Apache / PHP.
2. A private PHP config file outside `public_html`:
   `dirname(__DIR__, 2) . '/rafin-mail-config.php'`
3. An untracked local development file, but only for localhost / CLI development:
   `bat/rd-mailform.local.php`

`bat/rd-mailform.config.example.json` and `bat/rd-mailform.local.example.php` are reference files only. They are not loaded in production.

## Required production values

Use these values for production:

- `MAIL_RECIPIENT=info@rafincompany.com`
- `MAIL_FROM_EMAIL=info@rafincompany.com`
- `MAIL_USE_SMTP=true`
- `MAIL_SMTP_HOST=smtp.hostinger.com`
- `MAIL_SMTP_PORT=465`
- `MAIL_SMTP_SECURE=ssl`
- `MAIL_SMTP_USERNAME=info@rafincompany.com`
- `MAIL_SMTP_PASSWORD=<real Hostinger mailbox password>`
- `MAIL_ALLOW_PHP_MAIL_FALLBACK=false`
- `MAIL_DISABLE_ANTI_SPAM=false`

## Hostinger setup

1. In Hostinger hPanel, create or verify the mailbox `info@rafincompany.com`.
2. Confirm you can sign in to that mailbox and that SMTP is enabled for it.
3. Store the SMTP password only in Hostinger server configuration or in a private PHP config file outside `public_html`.
4. Do not commit the SMTP password, mailbox password, or a live config file into Git.

## Private config file option

If Hostinger does not expose custom environment variables for this site, create this file one directory above `public_html`, because `dirname(__DIR__, 2)` resolves from `public_html/bat/rd-mailform.php` to the parent of `public_html`.

If your deployed script is here:

`/home/USERNAME/domains/rafincompany.com/public_html/bat/rd-mailform.php`

create the private config here:

`/home/USERNAME/domains/rafincompany.com/rafin-mail-config.php`

Example:

```php
<?php

return array(
    'MAIL_RECIPIENT' => 'info@rafincompany.com',
    'MAIL_FROM_EMAIL' => 'info@rafincompany.com',
    'MAIL_USE_SMTP' => true,
    'MAIL_SMTP_HOST' => 'smtp.hostinger.com',
    'MAIL_SMTP_PORT' => 465,
    'MAIL_SMTP_SECURE' => 'ssl',
    'MAIL_SMTP_USERNAME' => 'info@rafincompany.com',
    'MAIL_SMTP_PASSWORD' => 'replace-with-the-real-mailbox-password',
    'MAIL_ALLOW_PHP_MAIL_FALLBACK' => false,
    'MAIL_DISABLE_ANTI_SPAM' => false
);
```

Keep this file outside the web root. Do not upload it into `public_html`.

## Form testing

1. Deploy the updated site files.
2. Open `index.html` on the live site and submit the contact form with a real email address.
3. Confirm the page stays in place and shows an in-page success or validation message.
4. Confirm the email arrives at `info@rafincompany.com`.
5. Open `career.html` on the live site and submit the job application form.
6. If you use the CV upload field, test with a valid `.pdf`, `.doc`, or `.docx` file.
7. Confirm the page stays in place and shows an in-page success or validation message.
8. Confirm the application email arrives at `info@rafincompany.com`.
9. Confirm the visitor/applicant email appears as `Reply-To`, not as the SMTP `From` address.

## Notes

- Direct browser posts should no longer land on a raw `MF005` page. AJAX requests receive JSON, and non-AJAX posts redirect back with `?formStatus=success` or `?formStatus=error`.
- If mail delivery fails with `MF006` or `MF254`, the frontend shows a generic same-page message and does not expose SMTP diagnostics.
- If any SMTP password was committed to GitHub before, revoke/rotate it immediately.

## Existing GitHub deployment workflow

This repository already includes `.github/workflows/deploy-hostinger.yml` for FTP deployment. Keep Hostinger FTP credentials in GitHub repository secrets, not in tracked files.
