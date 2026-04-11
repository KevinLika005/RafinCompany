<?php
// Initiate the autoloader.
require_once 'ReCaptcha/autoload.php';

// Register your keys at https://www.google.com/recaptcha/admin
$secret = getenv('RECAPTCHA_SECRET');
if ($secret === false) {
  $secret = '';
}
$secret = trim($secret);

// reCAPTCHA supported 40+ languages listed here: https://developers.google.com/recaptcha/docs/language
$lang = 'en';

// If No key
if ($secret === ''):
  die('CPT001');
elseif (isset($_POST['g-recaptcha-response'])):
  $token = trim((string)$_POST['g-recaptcha-response']);
  if ($token === ''):
    die('CPT002');
  endif;

  // If the form submission includes the "g-captcha-response" field
  // Create an instance of the service using your secret
  $recaptcha = new \ReCaptcha\ReCaptcha($secret);

  // Make the call to verify the response and also pass the user's IP address
  $remoteAddress = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null;
  $resp = $recaptcha->verify($token, $remoteAddress);

  if ($resp->isSuccess()):
    // If the response is a success, that's it!
    die('CPT000');
  else:
    // Something wrong
    die('CPT002');
  endif;

else:
  die('CPT002');
endif;
?>
