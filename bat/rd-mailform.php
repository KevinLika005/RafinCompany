<?php

date_default_timezone_set('Etc/UTC');
error_reporting(E_ALL);
@ini_set('display_errors', '0');
@ini_set('log_errors', '1');

if (ob_get_level() === 0) {
    ob_start();
}

function mfGenerateRequestId()
{
    try {
        return bin2hex(random_bytes(8));
    } catch (Exception $exception) {
        return uniqid('mf', true);
    }
}

$GLOBALS['mfRequestId'] = mfGenerateRequestId();
$GLOBALS['mfDebugContext'] = array();

function mfResponseHttpStatus($code)
{
    switch ($code) {
        case 'MF000':
            return 200;
        case 'MF005':
            return 422;
        case 'MF007':
            return 429;
        case 'MF006':
            return 503;
        case 'MF254':
            return 502;
        case 'MF255':
            return 500;
        default:
            return 400;
    }
}

function mfIsAjaxRequest()
{
    $requestedWith = '';
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
        $requestedWith = strtolower(trim((string)$_SERVER['HTTP_X_REQUESTED_WITH']));
    }

    if ($requestedWith === 'xmlhttprequest') {
        return true;
    }

    $accept = '';
    if (isset($_SERVER['HTTP_ACCEPT'])) {
        $accept = strtolower((string)$_SERVER['HTTP_ACCEPT']);
    }

    return strpos($accept, 'application/json') !== false;
}

function mfGetPublicMessageForCode($code)
{
    switch ($code) {
        case 'MF000':
            return 'Message sent successfully.';
        case 'MF001':
            return 'Mail delivery is temporarily unavailable. Please try again later or contact info@rafincompany.com.';
        case 'MF005':
            return 'Please review the highlighted form fields.';
        case 'MF006':
        case 'MF254':
            return 'Mail delivery is temporarily unavailable. Please try again later or contact info@rafincompany.com.';
        case 'MF007':
            return 'Submission blocked by anti-spam checks. Please wait and try again.';
        case 'MF004':
            return 'The form submission could not be processed.';
        default:
            return 'Unexpected server error. Please try again later.';
    }
}

function mfSanitizeHeaderValue($value)
{
    $value = preg_replace('/[\x00-\x1F\x7F]+/', ' ', (string)$value);
    $value = preg_replace('/\s+/', ' ', $value);
    return trim(substr($value, 0, 180));
}

function mfAppendDebugContext($context)
{
    if (!isset($GLOBALS['mfDebugContext']) || !is_array($GLOBALS['mfDebugContext'])) {
        $GLOBALS['mfDebugContext'] = array();
    }

    if (is_array($context)) {
        $GLOBALS['mfDebugContext'] = array_merge($GLOBALS['mfDebugContext'], $context);
    }
}

function mfDebugEnabled()
{
    return mfEnvBool('MAIL_DEBUG', false);
}

function mfDebugLog($stage, $context = array())
{
    if (!mfDebugEnabled()) {
        return;
    }

    $payload = array_merge(
        array(
            'loggedAt' => gmdate('c'),
            'requestId' => isset($GLOBALS['mfRequestId']) ? $GLOBALS['mfRequestId'] : '',
            'stage' => $stage
        ),
        isset($GLOBALS['mfDebugContext']) && is_array($GLOBALS['mfDebugContext']) ? $GLOBALS['mfDebugContext'] : array(),
        is_array($context) ? $context : array()
    );

    $encoded = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($encoded === false) {
        return;
    }

    $logPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'mail-debug.jsonl';
    @file_put_contents($logPath, $encoded . PHP_EOL, FILE_APPEND | LOCK_EX);
}

function mfClassifyMailErrorReason($errorInfo)
{
    $normalized = strtolower(trim((string)$errorInfo));
    if ($normalized === '') {
        return 'smtp_delivery_failed';
    }
    if (strpos($normalized, 'connect() failed') !== false) {
        return 'smtp_connect_failed';
    }
    if (strpos($normalized, 'starttls') !== false || strpos($normalized, 'crypto') !== false) {
        return 'smtp_tls_failed';
    }
    if (strpos($normalized, 'authenticate') !== false || strpos($normalized, 'username') !== false || strpos($normalized, 'password') !== false) {
        return 'smtp_auth_failed';
    }
    if (strpos($normalized, 'recipients are not set') !== false || strpos($normalized, 'invalid address') !== false) {
        return 'smtp_address_failed';
    }
    return 'smtp_delivery_failed';
}

function mfBuildSafeReturnUrl($status)
{
    $status = $status === 'success' ? 'success' : 'error';
    $fallbackPath = '../index.html';
    $requestHost = mfGetRequestHost();

    if (!isset($_SERVER['HTTP_REFERER'])) {
        return $fallbackPath . '?formStatus=' . rawurlencode($status);
    }

    $referer = trim((string)$_SERVER['HTTP_REFERER']);
    if ($referer === '') {
        return $fallbackPath . '?formStatus=' . rawurlencode($status);
    }

    $parts = @parse_url($referer);
    if ($parts === false) {
        return $fallbackPath . '?formStatus=' . rawurlencode($status);
    }

    if (isset($parts['host']) && $parts['host'] !== '') {
        $refererHost = strtolower(trim((string)$parts['host']));
        if ($requestHost !== '' && $refererHost !== $requestHost) {
            return $fallbackPath . '?formStatus=' . rawurlencode($status);
        }
    }

    $path = isset($parts['path']) && $parts['path'] !== '' ? $parts['path'] : '/index.html';
    $query = array();
    if (isset($parts['query']) && $parts['query'] !== '') {
        parse_str($parts['query'], $query);
    }

    $query['formStatus'] = $status;
    unset($query['code'], $query['requestId'], $query['message']);

    $target = $path;
    $encodedQuery = http_build_query($query);
    if ($encodedQuery !== '') {
        $target .= '?' . $encodedQuery;
    }

    return $target;
}

function mfRenderSafeHtmlResponse($status)
{
    $status = $status === 'success' ? 'success' : 'error';
    $backUrl = mfBuildSafeReturnUrl($status);
    $message = $status === 'success'
        ? 'Your form was processed. You can return to the website.'
        : 'Your form could not be processed. Please return to the website and try again.';

    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Rafin Company</title></head><body style="font-family:Arial,sans-serif;padding:24px;line-height:1.5;"><p>'
        . mfEscapeHtml($message)
        . '</p><p><a href="'
        . mfEscapeHtml($backUrl)
        . '">Return to the website</a></p></body></html>';
}

function mfExitWithCode($code, $logMessage = '', $publicReason = '')
{
    $bufferedOutput = '';
    while (ob_get_level() > 0) {
        $chunk = ob_get_clean();
        if ($chunk !== false) {
            $bufferedOutput .= $chunk;
        }
    }

    $trimmedOutput = trim($bufferedOutput);
    if ($trimmedOutput !== '') {
        error_log('[rafin-mailform] Suppressed output before response code ' . $code . ': ' . substr($trimmedOutput, 0, 500));
    }

    if ($logMessage !== '') {
        error_log('[rafin-mailform] ' . $logMessage);
    }

    $isSuccess = $code === 'MF000';
    $publicMessage = mfGetPublicMessageForCode($code);
    $responsePayload = array(
        'ok' => $isSuccess,
        'code' => $code,
        'message' => $publicMessage
    );

    if (!headers_sent()) {
        http_response_code(mfResponseHttpStatus($code));
        header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
        header('X-Rafin-Mail-Code: ' . $code);
        header('X-Rafin-Mail-Request-Id: ' . mfSanitizeHeaderValue(isset($GLOBALS['mfRequestId']) ? $GLOBALS['mfRequestId'] : ''));
    }

    mfDebugLog('request_finished', array(
        'responseCode' => $code,
        'httpStatus' => mfResponseHttpStatus($code),
        'reason' => $publicReason,
        'detail' => $logMessage
    ));

    if (mfIsAjaxRequest()) {
        if (!headers_sent()) {
            header('Content-Type: application/json; charset=UTF-8');
        }
        die(json_encode($responsePayload));
    }

    $redirectStatus = $isSuccess ? 'success' : 'error';
    $returnUrl = mfBuildSafeReturnUrl($redirectStatus);

    if (!headers_sent() && $returnUrl !== '') {
        header('Location: ' . $returnUrl, true, 303);
        die();
    }

    if (!headers_sent()) {
        header('Content-Type: text/html; charset=UTF-8');
    }

    die(mfRenderSafeHtmlResponse($redirectStatus));
}

function mfEnvString($key, $defaultValue)
{
    $value = getenv($key);
    if ($value === false && isset($_SERVER[$key])) {
        $value = $_SERVER[$key];
    }
    if ($value === false && isset($_ENV[$key])) {
        $value = $_ENV[$key];
    }
    if ($value === false) {
        return $defaultValue;
    }
    return trim($value);
}

function mfEnvBool($key, $defaultValue)
{
    $value = getenv($key);
    if ($value === false && isset($_SERVER[$key])) {
        $value = $_SERVER[$key];
    }
    if ($value === false && isset($_ENV[$key])) {
        $value = $_ENV[$key];
    }
    if ($value === false) {
        return $defaultValue;
    }

    $normalized = strtolower(trim($value));
    if ($normalized === '1' || $normalized === 'true' || $normalized === 'yes' || $normalized === 'on') {
        return true;
    }
    if ($normalized === '0' || $normalized === 'false' || $normalized === 'no' || $normalized === 'off') {
        return false;
    }

    return $defaultValue;
}

function mfLoadMailConfig()
{
    $config = array();
    $configPaths = array();
    $allowLocalConfig = PHP_SAPI === 'cli' || mfIsLocalDevelopmentRequest(mfGetRemoteIpAddress());

    if ($allowLocalConfig) {
        $configPaths[] = __DIR__ . '/rd-mailform.local.php';
    }

    // Later merges override earlier ones, so private config stays ahead of local fallback.
    $configPaths[] = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'rafin-mail-config.php';

    foreach ($configPaths as $configPath) {
        if (!is_file($configPath) || !is_readable($configPath)) {
            continue;
        }

        $loaded = require $configPath;
        if (!is_array($loaded)) {
            continue;
        }

        $config = array_merge($config, $loaded);
    }

    return $config;
}

function mfConfigString($config, $envKey, $configKey, $defaultValue)
{
    $value = mfEnvString($envKey, '__MF_UNSET__');
    if ($value !== '__MF_UNSET__') {
        return $value;
    }

    $configKeys = is_array($configKey) ? $configKey : array($configKey);
    foreach ($configKeys as $key) {
        if (isset($config[$key]) && is_scalar($config[$key])) {
            return trim((string)$config[$key]);
        }
    }

    return $defaultValue;
}

function mfConfigBool($config, $envKey, $configKey, $defaultValue)
{
    $value = getenv($envKey);
    if ($value === false && isset($_SERVER[$envKey])) {
        $value = $_SERVER[$envKey];
    }
    if ($value === false && isset($_ENV[$envKey])) {
        $value = $_ENV[$envKey];
    }

    if ($value !== false) {
        return mfEnvBool($envKey, $defaultValue);
    }

    $configKeys = is_array($configKey) ? $configKey : array($configKey);
    foreach ($configKeys as $key) {
        if (!array_key_exists($key, $config)) {
            continue;
        }

        if (is_bool($config[$key])) {
            return $config[$key];
        }

        $normalized = strtolower(trim((string)$config[$key]));
        if ($normalized === '1' || $normalized === 'true' || $normalized === 'yes' || $normalized === 'on') {
            return true;
        }
        if ($normalized === '0' || $normalized === 'false' || $normalized === 'no' || $normalized === 'off') {
            return false;
        }
    }

    return $defaultValue;
}

function mfConfigInt($config, $envKey, $configKey, $defaultValue, $minValue = null)
{
    $value = mfEnvString($envKey, '__MF_UNSET__');
    if ($value !== '__MF_UNSET__') {
        if (preg_match('/^-?\d+$/', $value) !== 1) {
            return $defaultValue;
        }

        $parsed = (int)$value;
        if ($minValue !== null && $parsed < $minValue) {
            return $defaultValue;
        }

        return $parsed;
    }

    $configKeys = is_array($configKey) ? $configKey : array($configKey);
    foreach ($configKeys as $key) {
        if (!array_key_exists($key, $config)) {
            continue;
        }

        $raw = $config[$key];
        if (is_string($raw)) {
            $raw = trim($raw);
        }

        if (is_int($raw) || is_float($raw)) {
            $parsed = (int)$raw;
        } elseif (is_string($raw) && preg_match('/^-?\d+$/', $raw) === 1) {
            $parsed = (int)$raw;
        } else {
            continue;
        }

        if ($minValue !== null && $parsed < $minValue) {
            return $defaultValue;
        }

        return $parsed;
    }

    return $defaultValue;
}

function mfLimitLength($value, $maxLength)
{
    if (strlen($value) <= $maxLength) {
        return $value;
    }

    return substr($value, 0, $maxLength);
}

function mfSanitizeSingleLine($value, $maxLength)
{
    $value = trim((string)$value);
    $value = preg_replace('/[\x00-\x1F\x7F]/', '', $value);
    $value = preg_replace('/\s+/', ' ', $value);
    $value = mfLimitLength($value, $maxLength);
    return trim($value);
}

function mfSanitizeMultiLine($value, $maxLength)
{
    $value = (string)$value;
    $value = str_replace(array("\r\n", "\r"), "\n", $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value);
    $value = trim($value);
    $value = mfLimitLength($value, $maxLength);
    return trim($value);
}

function mfEscapeHtml($value)
{
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

function mfValidateEmail($value)
{
    $email = mfSanitizeSingleLine($value, 254);
    if ($email === '') {
        return '';
    }
    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        return '';
    }

    return $email;
}

function mfValidatePhone($value)
{
    $phone = mfSanitizeSingleLine($value, 32);
    if ($phone === '') {
        return '';
    }

    if (preg_match('/[^0-9+\s().-]/', $phone)) {
        return '';
    }

    $plusCount = substr_count($phone, '+');
    if ($plusCount > 1) {
        return '';
    }

    if ($plusCount === 1) {
        $plusPosition = strpos($phone, '+');
        $startsWithParenthesizedPlus = ($plusPosition === 1 && strpos($phone, '(+') === 0);
        if ($plusPosition !== 0 && !$startsWithParenthesizedPlus) {
            return '';
        }
    }

    $digits = preg_replace('/\D+/', '', $phone);
    $digitLength = strlen($digits);
    if ($digitLength < 7 || $digitLength > 15) {
        return '';
    }

    return $phone;
}

function mfValidateUnixTimestamp($value)
{
    $timestamp = mfSanitizeSingleLine($value, 20);
    if ($timestamp === '' || preg_match('/^\d{10}$/', $timestamp) !== 1) {
        return 0;
    }

    return (int)$timestamp;
}

function mfHasOnlyAllowedFields($payload, $allowedFields)
{
    foreach ($payload as $fieldName => $fieldValue) {
        if (!in_array($fieldName, $allowedFields, true)) {
            return false;
        }
    }

    return true;
}

function mfGetRemoteIpAddress()
{
    $candidates = array();

    if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $forwarded = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        foreach ($forwarded as $candidate) {
            $candidates[] = trim($candidate);
        }
    }

    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $candidates[] = trim($_SERVER['HTTP_CLIENT_IP']);
    }

    if (isset($_SERVER['REMOTE_ADDR'])) {
        $candidates[] = trim($_SERVER['REMOTE_ADDR']);
    }

    foreach ($candidates as $candidate) {
        if ($candidate !== '' && filter_var($candidate, FILTER_VALIDATE_IP)) {
            return $candidate;
        }
    }

    return 'unknown';
}

function mfIsLoopbackAddress($ipAddress)
{
    return in_array($ipAddress, array('127.0.0.1', '::1'), true);
}

function mfGetRequestHost()
{
    $host = '';
    if (isset($_SERVER['HTTP_HOST'])) {
        $host = (string)$_SERVER['HTTP_HOST'];
    } elseif (isset($_SERVER['SERVER_NAME'])) {
        $host = (string)$_SERVER['SERVER_NAME'];
    }

    $host = trim($host);
    if ($host === '') {
        return '';
    }

    if (strpos($host, ':') !== false) {
        $hostParts = explode(':', $host, 2);
        $host = $hostParts[0];
    }

    return strtolower(trim($host, "[] \t\n\r\0\x0B"));
}

function mfIsLocalDevelopmentRequest($ipAddress)
{
    $host = mfGetRequestHost();
    $localHosts = array('localhost', '127.0.0.1', '::1');

    return mfIsLoopbackAddress($ipAddress) || in_array($host, $localHosts, true);
}

function mfNormalizeHostName($value)
{
    $value = strtolower(trim((string)$value));
    return trim($value, "[] \t\n\r\0\x0B");
}

function mfIsLocalSmtpHost($host)
{
    $normalized = mfNormalizeHostName($host);
    return in_array($normalized, array('localhost', '127.0.0.1', '::1', 'mailpit', 'mailhog', 'host.docker.internal'), true);
}

function mfAllowLiveDeliveryOnLocalhost()
{
    return mfEnvBool('MAIL_ALLOW_LOCALHOST_LIVE_DELIVERY', false);
}

function mfRateLimitAllowsSubmission($ipAddress, $maxPerWindow, $windowSeconds, $minSecondsBetween)
{
    $storagePath = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'rafin_mailform_rate_limit.json';
    $now = time();

    $handle = @fopen($storagePath, 'c+');
    if ($handle === false) {
        // Fail open if storage is unavailable; honeypot validation still applies.
        return true;
    }

    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        return true;
    }

    $raw = stream_get_contents($handle);
    $data = array();
    if (is_string($raw) && trim($raw) !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }

    if (!isset($data[$ipAddress]) || !is_array($data[$ipAddress])) {
        $data[$ipAddress] = array();
    }

    $recent = array();
    $minimumTimestamp = $now - $windowSeconds;
    foreach ($data[$ipAddress] as $timestamp) {
        if (is_numeric($timestamp) && (int)$timestamp >= $minimumTimestamp) {
            $recent[] = (int)$timestamp;
        }
    }

    sort($recent);

    $allowed = true;
    $recentCount = count($recent);
    if ($recentCount >= $maxPerWindow) {
        $allowed = false;
    }

    if ($allowed && $recentCount > 0) {
        $lastAttempt = $recent[$recentCount - 1];
        if (($now - $lastAttempt) < $minSecondsBetween) {
            $allowed = false;
        }
    }

    if ($allowed) {
        $recent[] = $now;
    }

    $data[$ipAddress] = $recent;

    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, json_encode($data));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    return $allowed;
}

if (!isset($_SERVER['REQUEST_METHOD']) || strtoupper($_SERVER['REQUEST_METHOD']) !== 'POST') {
    mfExitWithCode('MF255');
}

if (!isset($_POST['form-type'])) {
    mfExitWithCode('MF004');
}

$formType = strtolower(mfSanitizeSingleLine($_POST['form-type'], 20));
$allowedFormTypes = array('contact', 'subscribe', 'job-application');
if (!in_array($formType, $allowedFormTypes, true)) {
    mfExitWithCode('MF004');
}

$mailConfig = mfLoadMailConfig();

$disableAntiSpam = mfConfigBool($mailConfig, 'MAIL_DISABLE_ANTI_SPAM', array('disableAntiSpam', 'MAIL_DISABLE_ANTI_SPAM'), false);
$minFormAgeSeconds = mfConfigInt($mailConfig, 'MAIL_MIN_FORM_AGE_SECONDS', array('minFormAgeSeconds', 'MAIL_MIN_FORM_AGE_SECONDS'), 2, 0);
$maxFormAgeSeconds = mfConfigInt($mailConfig, 'MAIL_MAX_FORM_AGE_SECONDS', array('maxFormAgeSeconds', 'MAIL_MAX_FORM_AGE_SECONDS'), 86400, 1);
$rateLimitMaxPerWindow = mfConfigInt($mailConfig, 'MAIL_RATE_LIMIT_MAX_PER_WINDOW', array('rateLimitMaxPerWindow', 'MAIL_RATE_LIMIT_MAX_PER_WINDOW'), 8, 1);
$rateLimitWindowSeconds = mfConfigInt($mailConfig, 'MAIL_RATE_LIMIT_WINDOW_SECONDS', array('rateLimitWindowSeconds', 'MAIL_RATE_LIMIT_WINDOW_SECONDS'), 3600, 1);
$rateLimitMinSecondsBetween = mfConfigInt($mailConfig, 'MAIL_RATE_LIMIT_MIN_SECONDS_BETWEEN', array('rateLimitMinSecondsBetween', 'MAIL_RATE_LIMIT_MIN_SECONDS_BETWEEN'), 10, 0);

if ($maxFormAgeSeconds < $minFormAgeSeconds) {
    $maxFormAgeSeconds = $minFormAgeSeconds;
}

if (!$disableAntiSpam) {
    if (!array_key_exists('company_website', $_POST)) {
        mfExitWithCode('MF007', 'Missing honeypot field.', 'anti_spam_rejected');
    }

    $honeypotValue = mfSanitizeSingleLine($_POST['company_website'], 255);
    if ($honeypotValue !== '') {
        mfExitWithCode('MF007', 'Honeypot field contained a value.', 'anti_spam_rejected');
    }

    if (!array_key_exists('form_started_at', $_POST)) {
        mfExitWithCode('MF007', 'Missing form_started_at field.', 'anti_spam_rejected');
    }

    $formStartedAt = mfValidateUnixTimestamp($_POST['form_started_at']);
    if ($formStartedAt <= 0) {
        mfExitWithCode('MF007', 'Invalid form_started_at timestamp.', 'anti_spam_rejected');
    }

    $now = time();
    $formAgeSeconds = $now - $formStartedAt;
    if ($formAgeSeconds < $minFormAgeSeconds || $formAgeSeconds > $maxFormAgeSeconds) {
        mfExitWithCode('MF007', 'Form age failed anti-spam validation.', 'anti_spam_rejected');
    }
}

$commonAllowedFields = array('form-type', 'counter', 'email', 'company_website', 'form_started_at', 'g-recaptcha-response');
$allowedFieldsByType = array(
    'contact' => array_merge($commonAllowedFields, array('name', 'phone', 'message')),
    'job-application' => array_merge($commonAllowedFields, array('name', 'phone', 'message', 'job_position')),
    'subscribe' => $commonAllowedFields
);

if (!isset($allowedFieldsByType[$formType]) || !mfHasOnlyAllowedFields($_POST, $allowedFieldsByType[$formType])) {
    mfExitWithCode('MF255');
}

if (!empty($_FILES)) {
    if ($formType !== 'job-application' && $formType !== 'contact') {
        mfExitWithCode('MF255');
    }

    $allowedFileFields = array('cv');
    foreach ($_FILES as $fieldName => $fileInfo) {
        if (!in_array($fieldName, $allowedFileFields, true)) {
            mfExitWithCode('MF255');
        }
    }
}

$remoteIp = mfGetRemoteIpAddress();
$isLocalDevelopmentRequest = mfIsLocalDevelopmentRequest($remoteIp);

if (!$disableAntiSpam && !$isLocalDevelopmentRequest && !mfRateLimitAllowsSubmission($remoteIp, $rateLimitMaxPerWindow, $rateLimitWindowSeconds, $rateLimitMinSecondsBetween)) {
    mfExitWithCode('MF007', 'Rate limit rejected the submission.', 'anti_spam_rejected');
}

$allowLocalhostLiveDelivery = mfAllowLiveDeliveryOnLocalhost();

mfAppendDebugContext(array(
    'remoteIp' => $remoteIp,
    'requestHost' => mfGetRequestHost(),
    'formType' => $formType,
    'isLocalDevelopmentRequest' => $isLocalDevelopmentRequest,
    'allowLocalhostLiveDelivery' => $allowLocalhostLiveDelivery,
    'antiSpamEnabled' => !$disableAntiSpam,
    'minFormAgeSeconds' => $minFormAgeSeconds,
    'maxFormAgeSeconds' => $maxFormAgeSeconds,
    'rateLimitMaxPerWindow' => $rateLimitMaxPerWindow,
    'rateLimitWindowSeconds' => $rateLimitWindowSeconds,
    'rateLimitMinSecondsBetween' => $rateLimitMinSecondsBetween
));

$recipientRaw = mfConfigString($mailConfig, 'MAIL_RECIPIENT', 'recipientEmail', '');
$fromEmail = mfValidateEmail(mfConfigString($mailConfig, 'MAIL_FROM_EMAIL', 'fromEmail', ''));
$useSmtp = mfConfigBool($mailConfig, 'MAIL_USE_SMTP', 'useSmtp', false);
$allowPhpMailFallback = mfConfigBool($mailConfig, 'MAIL_ALLOW_PHP_MAIL_FALLBACK', array('allowPhpMailFallback', 'MAIL_ALLOW_PHP_MAIL_FALLBACK'), false);
$smtpHost = mfConfigString($mailConfig, 'MAIL_SMTP_HOST', 'smtpHost', '');
$smtpPort = (int)mfConfigString($mailConfig, 'MAIL_SMTP_PORT', 'smtpPort', '587');
$smtpUser = mfConfigString($mailConfig, 'MAIL_SMTP_USERNAME', 'smtpUsername', '');
$smtpPassword = mfConfigString($mailConfig, 'MAIL_SMTP_PASSWORD', 'smtpPassword', '');
$smtpSecureRaw = strtolower(mfConfigString($mailConfig, 'MAIL_SMTP_SECURE', 'smtpSecure', 'tls'));
if ($smtpSecureRaw === 'none') {
    $smtpSecure = '';
} elseif (in_array($smtpSecureRaw, array('', 'tls', 'ssl'), true)) {
    $smtpSecure = $smtpSecureRaw;
} else {
    mfExitWithCode('MF006', 'MAIL_SMTP_SECURE must be one of tls, ssl, or none.', 'mail_config_invalid');
}

$recipientCandidates = preg_split('/[;,]+/', $recipientRaw);
$recipients = array();
if (is_array($recipientCandidates)) {
    foreach ($recipientCandidates as $candidate) {
        $email = mfValidateEmail($candidate);
        if ($email !== '') {
            $recipients[] = $email;
        }
    }
}

$hasSmtpUsername = $smtpUser !== '';
$hasSmtpPassword = $smtpPassword !== '';
$smtpUsesAuth = $hasSmtpUsername && $hasSmtpPassword;
$smtpCredentialsComplete = !($hasSmtpUsername xor $hasSmtpPassword);
$smtpHostComplete = $smtpHost !== '';
$smtpPortComplete = $smtpPort > 0;
$smtpConfigComplete = $smtpHostComplete && $smtpPortComplete && $smtpCredentialsComplete;
$shouldUseSmtp = $useSmtp && $smtpConfigComplete;
$usingLocalSmtpHost = $shouldUseSmtp && mfIsLocalSmtpHost($smtpHost);
$smtpFallbackReason = '';

mfAppendDebugContext(array(
    'recipientCount' => count($recipients),
    'requestedTransport' => $useSmtp ? 'smtp' : 'php-mail',
    'effectiveTransport' => $shouldUseSmtp ? 'smtp' : 'php-mail',
    'allowPhpMailFallback' => $allowPhpMailFallback,
    'smtpConfigComplete' => $smtpConfigComplete,
    'smtpHost' => $smtpHost !== '' ? mfNormalizeHostName($smtpHost) : '',
    'smtpPort' => $smtpPort,
    'smtpSecure' => $smtpSecure === '' ? 'none' : $smtpSecure,
    'smtpUsesAuth' => $smtpUsesAuth,
    'usingLocalSmtpHost' => $usingLocalSmtpHost
));

if (mfDebugEnabled()) {
    $resolvedIpv4 = array();
    if ($smtpHost !== '' && function_exists('gethostbynamel')) {
        $resolved = @gethostbynamel($smtpHost);
        if (is_array($resolved)) {
            $resolvedIpv4 = $resolved;
        }
    }

    mfDebugLog('runtime_capabilities', array(
        'phpVersion' => PHP_VERSION,
        'opensslLoaded' => extension_loaded('openssl'),
        'streamSocketClientAvailable' => function_exists('stream_socket_client'),
        'resolvedIpv4' => $resolvedIpv4
    ));
}

if (count($recipients) === 0) {
    mfExitWithCode('MF001', 'MAIL_RECIPIENT is missing or invalid.', 'recipient_missing');
}

if ($fromEmail === '') {
    mfExitWithCode('MF006', 'MAIL_FROM_EMAIL is missing or invalid.', 'mail_config_invalid');
}

if ($useSmtp) {
    $smtpConfigIssues = array();
    if (!$smtpHostComplete) {
        $smtpConfigIssues[] = 'MAIL_SMTP_HOST is missing';
    }
    if (!$smtpPortComplete) {
        $smtpConfigIssues[] = 'MAIL_SMTP_PORT is missing or invalid';
    }
    if (!$smtpCredentialsComplete) {
        $smtpConfigIssues[] = 'MAIL_SMTP_USERNAME and MAIL_SMTP_PASSWORD must both be set or both be empty';
    }

    if (!empty($smtpConfigIssues)) {
        $smtpFallbackReason = implode('; ', $smtpConfigIssues);
        if (!$allowPhpMailFallback) {
            mfExitWithCode('MF006', 'SMTP is enabled but incomplete: ' . $smtpFallbackReason, 'mail_config_invalid');
        }
    }

    if ($shouldUseSmtp && $smtpSecure !== '' && !extension_loaded('openssl')) {
        mfExitWithCode(
            'MF006',
            'SMTP TLS/SSL was requested but the PHP OpenSSL extension is not loaded.',
            'php_openssl_missing'
        );
    }
}

if ($smtpFallbackReason !== '') {
    mfDebugLog('smtp_fallback_to_php_mail', array(
        'fallbackReason' => $smtpFallbackReason
    ));
}

$email = isset($_POST['email']) ? mfValidateEmail($_POST['email']) : '';
if ($email === '') {
    mfExitWithCode('MF005', 'Submitted email is missing or invalid.', 'validation_failed');
}

$name = '';
$phone = '';
$message = '';
$subject = '';
$jobPosition = '';
$attachmentPath = '';
$attachmentName = '';
$attachmentDisplayName = '';

if ($formType === 'contact') {
    $name = isset($_POST['name']) ? mfSanitizeSingleLine($_POST['name'], 100) : '';
    $phone = isset($_POST['phone']) ? mfValidatePhone($_POST['phone']) : '';
    $message = isset($_POST['message']) ? mfSanitizeMultiLine($_POST['message'], 2000) : '';

    if ($name === '' || $phone === '' || $message === '') {
        mfExitWithCode('MF005', 'One or more contact fields are missing or invalid.', 'validation_failed');
    }

    if (strlen($name) < 2) {
        mfExitWithCode('MF005', 'Contact name is too short.', 'validation_failed');
    }

    if (strlen(preg_replace('/\s+/', '', $message)) < 5) {
        mfExitWithCode('MF005', 'Contact message is too short.', 'validation_failed');
    }

    if (isset($_FILES['cv']) && is_array($_FILES['cv'])) {
        $cvFile = $_FILES['cv'];
        $uploadError = isset($cvFile['error']) ? (int)$cvFile['error'] : UPLOAD_ERR_NO_FILE;

        if ($uploadError !== UPLOAD_ERR_NO_FILE) {
            if ($uploadError !== UPLOAD_ERR_OK) {
                mfExitWithCode('MF005', 'Contact attachment upload failed with PHP upload error code ' . $uploadError . '.', 'validation_failed');
            }

            $tmpName = isset($cvFile['tmp_name']) ? (string)$cvFile['tmp_name'] : '';
            $originalName = isset($cvFile['name']) ? mfSanitizeSingleLine($cvFile['name'], 180) : '';
            $fileSize = isset($cvFile['size']) ? (int)$cvFile['size'] : 0;
            $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
            $allowedExtensions = array('pdf', 'doc', 'docx');
            $allowedMimeTypes = array(
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            );

            if ($tmpName === '' || !is_uploaded_file($tmpName)) {
                mfExitWithCode('MF005', 'Uploaded contact attachment is not a valid HTTP upload.', 'validation_failed');
            }

            if ($fileSize <= 0 || $fileSize > 5 * 1024 * 1024) {
                mfExitWithCode('MF005', 'Uploaded contact attachment exceeds size limits.', 'validation_failed');
            }

            if (!in_array($extension, $allowedExtensions, true)) {
                mfExitWithCode('MF005', 'Uploaded contact attachment type is not allowed.', 'validation_failed');
            }

            $detectedMimeType = '';
            if (function_exists('finfo_open')) {
                $finfo = @finfo_open(FILEINFO_MIME_TYPE);
                if ($finfo !== false) {
                    $mime = @finfo_file($finfo, $tmpName);
                    if (is_string($mime)) {
                        $detectedMimeType = $mime;
                    }
                    finfo_close($finfo);
                }
            }

            if ($detectedMimeType !== '' && !in_array($detectedMimeType, $allowedMimeTypes, true)) {
                mfExitWithCode('MF005', 'Uploaded contact attachment MIME type is not allowed.', 'validation_failed');
            }

            $attachmentPath = $tmpName;
            $attachmentName = $originalName !== '' ? $originalName : ('attachment.' . $extension);
            $attachmentDisplayName = $attachmentName;
        }
    }

    $subject = 'Website contact request';
} elseif ($formType === 'job-application') {
    $name = isset($_POST['name']) ? mfSanitizeSingleLine($_POST['name'], 100) : '';
    $phone = isset($_POST['phone']) ? mfValidatePhone($_POST['phone']) : '';
    $message = isset($_POST['message']) ? mfSanitizeMultiLine($_POST['message'], 2000) : '';
    $jobPosition = isset($_POST['job_position']) ? mfSanitizeSingleLine($_POST['job_position'], 140) : '';

    if ($name === '' || $phone === '' || $message === '' || $jobPosition === '') {
        mfExitWithCode('MF005', 'One or more job application fields are missing or invalid.', 'validation_failed');
    }

    if (strlen($name) < 2) {
        mfExitWithCode('MF005', 'Applicant name is too short.', 'validation_failed');
    }

    if (strlen(preg_replace('/\s+/', '', $message)) < 5) {
        mfExitWithCode('MF005', 'Application message is too short.', 'validation_failed');
    }

    if (isset($_FILES['cv']) && is_array($_FILES['cv'])) {
        $cvFile = $_FILES['cv'];
        $uploadError = isset($cvFile['error']) ? (int)$cvFile['error'] : UPLOAD_ERR_NO_FILE;

        if ($uploadError !== UPLOAD_ERR_NO_FILE) {
            if ($uploadError !== UPLOAD_ERR_OK) {
                mfExitWithCode('MF005', 'CV upload failed with PHP upload error code ' . $uploadError . '.', 'validation_failed');
            }

            $tmpName = isset($cvFile['tmp_name']) ? (string)$cvFile['tmp_name'] : '';
            $originalName = isset($cvFile['name']) ? mfSanitizeSingleLine($cvFile['name'], 180) : '';
            $fileSize = isset($cvFile['size']) ? (int)$cvFile['size'] : 0;
            $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
            $allowedExtensions = array('pdf', 'doc', 'docx');
            $allowedMimeTypes = array(
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            );

            if ($tmpName === '' || !is_uploaded_file($tmpName)) {
                mfExitWithCode('MF005', 'Uploaded CV file is not a valid HTTP upload.', 'validation_failed');
            }

            if ($fileSize <= 0 || $fileSize > 5 * 1024 * 1024) {
                mfExitWithCode('MF005', 'Uploaded CV file exceeds size limits.', 'validation_failed');
            }

            if (!in_array($extension, $allowedExtensions, true)) {
                mfExitWithCode('MF005', 'Uploaded CV file type is not allowed.', 'validation_failed');
            }

            $detectedMimeType = '';
            if (function_exists('finfo_open')) {
                $finfo = @finfo_open(FILEINFO_MIME_TYPE);
                if ($finfo !== false) {
                    $mime = @finfo_file($finfo, $tmpName);
                    if (is_string($mime)) {
                        $detectedMimeType = $mime;
                    }
                    finfo_close($finfo);
                }
            }

            if ($detectedMimeType !== '' && !in_array($detectedMimeType, $allowedMimeTypes, true)) {
                mfExitWithCode('MF005', 'Uploaded CV MIME type is not allowed.', 'validation_failed');
            }

            $attachmentPath = $tmpName;
            $attachmentName = $originalName !== '' ? $originalName : ('cv.' . $extension);
            $attachmentDisplayName = $attachmentName;
        }
    }

    $subject = 'Website job application';
} else {
    $subject = 'Website email contact request';
    $message = 'Submitted through the footer email contact form.';
}

if ($isLocalDevelopmentRequest && !$allowLocalhostLiveDelivery && !$usingLocalSmtpHost) {
    mfExitWithCode(
        'MF006',
        'Blocked localhost live delivery because MAIL_ALLOW_LOCALHOST_LIVE_DELIVERY is false and the transport is not a local SMTP catcher.',
        'localhost_live_delivery_blocked'
    );
}

$templatePath = __DIR__ . '/rd-mailform.tpl';
$template = file_get_contents($templatePath);
if ($template === false) {
    mfExitWithCode('MF255');
}

$safeEmail = mfEscapeHtml($email);
$safeMessage = nl2br(mfEscapeHtml($message), false);
$safeSubject = mfEscapeHtml($subject);
$safeSiteName = isset($_SERVER['SERVER_NAME']) ? mfEscapeHtml($_SERVER['SERVER_NAME']) : 'Website';

$template = str_replace(
    array('<!-- #{FromState} -->', '<!-- #{FromEmail} -->'),
    array('Email:', $safeEmail),
    $template
);

$template = str_replace(
    array('<!-- #{MessageState} -->', '<!-- #{MessageDescription} -->'),
    array('Message:', $safeMessage),
    $template
);

if (preg_match('/(<!-- #\{BeginInfo\} -->)(.|\s)*?(<!-- #\{EndInfo\} -->)/', $template, $infoBlockMatch)) {
    $infoBlock = $infoBlockMatch[0];
    $infoRows = '';

    if ($name !== '') {
        $nameRow = str_replace(
            array('<!-- #{BeginInfo} -->', '<!-- #{InfoState} -->', '<!-- #{InfoDescription} -->', '<!-- #{EndInfo} -->'),
            array('', 'Name:', mfEscapeHtml($name), ''),
            $infoBlock
        );
        $infoRows .= $nameRow;
    }

    if ($phone !== '') {
        $phoneRow = str_replace(
            array('<!-- #{BeginInfo} -->', '<!-- #{InfoState} -->', '<!-- #{InfoDescription} -->', '<!-- #{EndInfo} -->'),
            array('', 'Phone:', mfEscapeHtml($phone), ''),
            $infoBlock
        );
        $infoRows .= $phoneRow;
    }

    if ($jobPosition !== '') {
        $jobPositionRow = str_replace(
            array('<!-- #{BeginInfo} -->', '<!-- #{InfoState} -->', '<!-- #{InfoDescription} -->', '<!-- #{EndInfo} -->'),
            array('', 'Job Position:', mfEscapeHtml($jobPosition), ''),
            $infoBlock
        );
        $infoRows .= $jobPositionRow;
    }

    if ($attachmentDisplayName !== '') {
        $attachmentRow = str_replace(
            array('<!-- #{BeginInfo} -->', '<!-- #{InfoState} -->', '<!-- #{InfoDescription} -->', '<!-- #{EndInfo} -->'),
            array('', 'CV Attachment:', mfEscapeHtml($attachmentDisplayName), ''),
            $infoBlock
        );
        $infoRows .= $attachmentRow;
    }

    $template = str_replace($infoBlock, $infoRows, $template);
}

$template = str_replace(
    array('<!-- #{Subject} -->', '<!-- #{SiteName} -->'),
    array($safeSubject, $safeSiteName),
    $template
);

try {
    require_once __DIR__ . '/phpmailer/class.phpmailer.php';
    require_once __DIR__ . '/phpmailer/class.smtp.php';

    $mail = new PHPMailer();

    if ($shouldUseSmtp) {
        $mail->isSMTP();
        $mail->SMTPDebug = mfDebugEnabled() ? 3 : 0;
        if (mfDebugEnabled()) {
            $mail->Debugoutput = function ($message, $level) {
                mfDebugLog('smtp_debug', array(
                    'smtpDebugLevel' => $level,
                    'smtpMessage' => trim((string)$message)
                ));
            };
        } else {
            $mail->Debugoutput = 'html';
        }
        $mail->Host = $smtpHost;
        $mail->Port = $smtpPort;
        $mail->Timeout = 30;
        $mail->SMTPAuth = $smtpUsesAuth;
        if ($smtpUsesAuth) {
            $mail->Username = $smtpUser;
            $mail->Password = $smtpPassword;
        }
        if ($smtpSecure !== '') {
            $mail->SMTPSecure = $smtpSecure;
        } else {
            $mail->SMTPAutoTLS = false;
        }
    }

    $mail->From = $fromEmail;
    $mail->FromName = 'Rafin Website';
    $mail->addReplyTo($email, $name !== '' ? $name : 'Website Visitor');

    foreach ($recipients as $recipient) {
        $mail->addAddress($recipient);
    }

    $mail->CharSet = 'utf-8';
    $mail->Subject = $subject;
    $mail->MsgHTML($template);
    $mail->AltBody = "Subject: " . $subject . "\n"
        . "Name: " . $name . "\n"
        . "Phone: " . $phone . "\n"
        . ($jobPosition !== '' ? "Job Position: " . $jobPosition . "\n" : '')
        . "Email: " . $email . "\n\n"
        . $message
        . ($attachmentDisplayName !== '' ? "\n\nCV Attachment: " . $attachmentDisplayName : '');

    if ($attachmentPath !== '' && $attachmentName !== '') {
        $mail->addAttachment($attachmentPath, $attachmentName);
    }

    mfDebugLog('send_attempt');

    if (!$mail->send()) {
        mfExitWithCode(
            'MF254',
            'PHPMailer send() returned false. ErrorInfo: ' . $mail->ErrorInfo,
            mfClassifyMailErrorReason($mail->ErrorInfo)
        );
    }

    mfDebugLog('send_success');
    mfExitWithCode('MF000', '', 'smtp_submission_accepted');
} catch (phpmailerException $e) {
    mfExitWithCode('MF254', 'PHPMailer exception thrown. ' . $e->getMessage(), mfClassifyMailErrorReason($e->getMessage()));
} catch (Exception $e) {
    mfExitWithCode('MF255', 'Unhandled server exception. ' . $e->getMessage(), 'server_exception');
}
