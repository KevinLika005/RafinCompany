# Mail Testing

This mailform is trustworthy only when `bat/rd-mailform.php` returns the right `MF` code after a real transport attempt.

`MF000` means PHPMailer `send()` returned `true`, which proves SMTP submission was accepted by the configured mail server.

It does not prove final inbox placement.

## Response codes

- `MF000`: message accepted by the configured mail transport
- `MF001`: `MAIL_RECIPIENT` is missing or invalid
- `MF004`: invalid or missing form type
- `MF005`: form validation failed
- `MF006`: mail transport is blocked or misconfigured
- `MF007`: anti-spam rejected the submission
- `MF254`: SMTP or mail transport failed after a real send attempt
- `MF255`: unexpected server-side failure

## Recommended local proof: Mailpit

Use `cmd.exe` so the same environment variables are inherited by `php -S`.

1. Start Mailpit.

   Binary:

   ```bat
   mailpit.exe --smtp 127.0.0.1:1025 --ui 127.0.0.1:8025
   ```

   Docker:

   ```bat
   docker run --rm -p 1025:1025 -p 8025:8025 axllent/mailpit
   ```

2. In the same `cmd.exe`, set:

   ```bat
   set MAIL_USE_SMTP=true
   set MAIL_RECIPIENT=localtest@example.test
   set MAIL_FROM_EMAIL=no-reply@example.test
   set MAIL_SMTP_HOST=127.0.0.1
   set MAIL_SMTP_PORT=1025
   set MAIL_SMTP_USERNAME=
   set MAIL_SMTP_PASSWORD=
   set MAIL_SMTP_SECURE=none
   set MAIL_DEBUG=true
   set MAIL_ALLOW_LOCALHOST_LIVE_DELIVERY=false
   ```

3. Start PHP from the same shell:

   ```bat
   php -S localhost:8000
   ```

4. Open `http://localhost:8000/`, wait at least 2 seconds, and submit a valid contact form.

5. Confirm all three of these:

- browser UI shows the success message only after submit
- the network response body is `MF000`
- Mailpit UI at `http://127.0.0.1:8025/` contains the message

That is the local proof that the frontend, PHP handler, and SMTP transport path work end to end.

## MailHog alternative

If you use MailHog instead of Mailpit, keep the same env vars.

Typical startup:

```bat
MailHog.exe
```

or:

```bat
docker run --rm -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

Open `http://127.0.0.1:8025/` and confirm the message appears there after an `MF000`.

## Gmail SMTP test

Use Gmail only after the Mailpit/MailHog path is working.

1. In `cmd.exe`, set:

   ```bat
   set MAIL_USE_SMTP=true
   set MAIL_RECIPIENT=your-target-inbox@gmail.com
   set MAIL_FROM_EMAIL=your-gmail-address@gmail.com
   set MAIL_SMTP_HOST=smtp.gmail.com
   set MAIL_SMTP_PORT=587
   set MAIL_SMTP_USERNAME=your-gmail-address@gmail.com
   set MAIL_SMTP_PASSWORD=your-app-password
   set MAIL_SMTP_SECURE=tls
   set MAIL_DEBUG=true
   set MAIL_ALLOW_LOCALHOST_LIVE_DELIVERY=true
   ```

2. Start `php -S localhost:8000` from that same shell.

3. Submit a valid contact form after waiting at least 2 seconds.

4. Interpret results like this:

- `MF000`: Gmail SMTP accepted the submission
- `MF254`: Gmail SMTP rejected the submission or auth/transport failed
- `MF006`: configuration is missing, invalid, or localhost live delivery is blocked

Notes:

- Use a Gmail App Password, not the normal account password.
- `MAIL_FROM_EMAIL` should usually match the authenticated Gmail account, unless that account is configured to send as a verified alias.
- `MF000` proves SMTP submission acceptance. Gmail inbox placement can still be affected by spam filtering or recipient-side rules.

## Safe diagnostics

When `MAIL_DEBUG=true`, the backend appends structured diagnostics to `data/mail-debug.jsonl`.

It records:

- request id
- response code
- request host and remote IP
- transport type
- SMTP host, port, security mode, and whether auth was used

It does not log SMTP passwords.

## Quick test cases

### Valid submission

- wait at least 2 seconds after page load
- submit name, phone, email, and a real message
- expected: `MF000` only when transport accepted the message

### Invalid email

- submit `email=not-an-email`
- expected: `MF005`

### Honeypot spam

- submit a non-empty `company_website`
- expected: `MF007`

### Too-fast anti-bot

- submit with `form_started_at` equal to the current second
- expected: `MF007`

### SMTP misconfiguration

- leave `MAIL_RECIPIENT` empty or set `MAIL_SMTP_HOST` with `MAIL_USE_SMTP=true`
- expected: `MF001` or `MF006`

### SMTP transport failure

- point SMTP at a non-listening port, for example `MAIL_SMTP_PORT=1026`
- expected: `MF254`
