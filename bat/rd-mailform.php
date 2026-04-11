<?php

date_default_timezone_set('Etc/UTC');

function mfExitWithCode($code)
{
    die($code);
}

function mfEnvString($key, $defaultValue)
{
    $value = getenv($key);
    if ($value === false) {
        return $defaultValue;
    }
    return trim($value);
}

function mfEnvBool($key, $defaultValue)
{
    $value = getenv($key);
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

if (!empty($_FILES)) {
    mfExitWithCode('MF255');
}

if (!isset($_POST['form-type'])) {
    mfExitWithCode('MF004');
}

if (!array_key_exists('company_website', $_POST)) {
    mfExitWithCode('MF255');
}

$honeypotValue = mfSanitizeSingleLine($_POST['company_website'], 255);
if ($honeypotValue !== '') {
    mfExitWithCode('MF255');
}

$formType = strtolower(mfSanitizeSingleLine($_POST['form-type'], 20));
$allowedFormTypes = array('contact', 'subscribe');
if (!in_array($formType, $allowedFormTypes, true)) {
    mfExitWithCode('MF004');
}

if (!array_key_exists('form_started_at', $_POST)) {
    mfExitWithCode('MF255');
}

$formStartedAt = mfValidateUnixTimestamp($_POST['form_started_at']);
if ($formStartedAt <= 0) {
    mfExitWithCode('MF255');
}

$now = time();
$formAgeSeconds = $now - $formStartedAt;
if ($formAgeSeconds < 2 || $formAgeSeconds > 86400) {
    mfExitWithCode('MF255');
}

$commonAllowedFields = array('form-type', 'counter', 'email', 'company_website', 'form_started_at', 'g-recaptcha-response');
$allowedFieldsByType = array(
    'contact' => array_merge($commonAllowedFields, array('name', 'phone', 'message')),
    'subscribe' => $commonAllowedFields
);

if (!isset($allowedFieldsByType[$formType]) || !mfHasOnlyAllowedFields($_POST, $allowedFieldsByType[$formType])) {
    mfExitWithCode('MF255');
}

$remoteIp = mfGetRemoteIpAddress();
if (!mfRateLimitAllowsSubmission($remoteIp, 8, 3600, 10)) {
    mfExitWithCode('MF255');
}

$configPath = __DIR__ . '/rd-mailform.config.json';
$config = array();
if (is_readable($configPath)) {
    $configFile = file_get_contents($configPath);
    if ($configFile !== false) {
        $decodedConfig = json_decode($configFile, true);
        if (is_array($decodedConfig)) {
            $config = $decodedConfig;
        }
    }
}

$defaultRecipient = isset($config['recipientEmail']) ? $config['recipientEmail'] : '';
$defaultFromEmail = isset($config['fromEmail']) ? $config['fromEmail'] : '';
$defaultUseSmtp = isset($config['useSmtp']) ? (bool)$config['useSmtp'] : false;

$recipientRaw = mfEnvString('MAIL_RECIPIENT', $defaultRecipient);
$fromEmail = mfValidateEmail(mfEnvString('MAIL_FROM_EMAIL', $defaultFromEmail));
$useSmtp = mfEnvBool('MAIL_USE_SMTP', $defaultUseSmtp);
$smtpHost = mfEnvString('MAIL_SMTP_HOST', '');
$smtpPort = (int)mfEnvString('MAIL_SMTP_PORT', '587');
$smtpUser = mfEnvString('MAIL_SMTP_USERNAME', '');
$smtpPassword = mfEnvString('MAIL_SMTP_PASSWORD', '');
$smtpSecure = strtolower(mfEnvString('MAIL_SMTP_SECURE', 'tls'));
if (!in_array($smtpSecure, array('', 'tls', 'ssl'), true)) {
    $smtpSecure = 'tls';
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

if (count($recipients) === 0) {
    mfExitWithCode('MF001');
}

if ($fromEmail === '') {
    $fromEmail = $recipients[0];
}

$email = isset($_POST['email']) ? mfValidateEmail($_POST['email']) : '';
if ($email === '') {
    mfExitWithCode('MF255');
}

$name = '';
$phone = '';
$message = '';
$subject = '';

if ($formType === 'contact') {
    $name = isset($_POST['name']) ? mfSanitizeSingleLine($_POST['name'], 100) : '';
    $phone = isset($_POST['phone']) ? mfValidatePhone($_POST['phone']) : '';
    $message = isset($_POST['message']) ? mfSanitizeMultiLine($_POST['message'], 2000) : '';

    if ($name === '' || $phone === '' || $message === '') {
        mfExitWithCode('MF255');
    }

    if (strlen($name) < 2) {
        mfExitWithCode('MF255');
    }

    if (strlen(preg_replace('/\s+/', '', $message)) < 5) {
        mfExitWithCode('MF255');
    }

    $subject = 'Website contact request';
} else {
    $subject = 'Website email contact request';
    $message = 'Submitted through the footer email contact form.';
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

    if ($useSmtp) {
        if ($smtpHost === '' || $smtpPort <= 0) {
            mfExitWithCode('MF255');
        }

        $mail->isSMTP();
        $mail->SMTPDebug = 0;
        $mail->Debugoutput = 'html';
        $mail->Host = $smtpHost;
        $mail->Port = $smtpPort;
        $mail->SMTPAuth = ($smtpUser !== '');
        if ($mail->SMTPAuth) {
            if ($smtpPassword === '') {
                mfExitWithCode('MF255');
            }
            $mail->Username = $smtpUser;
            $mail->Password = $smtpPassword;
        }
        if ($smtpSecure !== '') {
            $mail->SMTPSecure = $smtpSecure;
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

    if (!$mail->send()) {
        mfExitWithCode('MF254');
    }

    mfExitWithCode('MF000');
} catch (phpmailerException $e) {
    mfExitWithCode('MF254');
} catch (Exception $e) {
    mfExitWithCode('MF255');
}
