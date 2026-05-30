<?php

return array(
    'MAIL_RECIPIENT' => 'replace-with-production-recipient',
    'MAIL_FROM_EMAIL' => 'replace-with-production-from-address',
    'MAIL_USE_SMTP' => true,
    'MAIL_SMTP_HOST' => 'replace-with-production-smtp-host',
    'MAIL_SMTP_PORT' => 465,
    'MAIL_SMTP_SECURE' => 'replace-with-production-security-mode',
    'MAIL_SMTP_USERNAME' => 'replace-with-production-smtp-username',
    'MAIL_SMTP_PASSWORD' => 'set-this-only-in-an-untracked-private-file',
    'MAIL_ALLOW_PHP_MAIL_FALLBACK' => false,
    'MAIL_DISABLE_ANTI_SPAM' => false,
    'MAIL_MIN_FORM_AGE_SECONDS' => 2,
    'MAIL_MAX_FORM_AGE_SECONDS' => 86400,
    'MAIL_RATE_LIMIT_MAX_PER_WINDOW' => 8,
    'MAIL_RATE_LIMIT_WINDOW_SECONDS' => 3600,
    'MAIL_RATE_LIMIT_MIN_SECONDS_BETWEEN' => 10
);
