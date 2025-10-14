<?php
// public/api/pricing.php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['error' => 'Method Not Allowed'], 405);
}

$data = read_json();
$email = isset($data['email']) ? trim($data['email']) : '';
$name = isset($data['name']) ? trim($data['name']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(['error' => 'Некорректный email'], 400);
}

// Простая отправка письма через mail() на shared-хостинге
$subject = 'Запрос на связь по тарифам DOCIM';
$body = "Email: {$email}\nИмя: " . ($name ?: '-') . "\nТелефон: " . ($phone ?: '-') . "\nДата: " . date('Y-m-d H:i:s');

$headers = [];
if (defined('MAIL_FROM') && MAIL_FROM) {
  $headers[] = 'From: ' . MAIL_FROM;
  $headers[] = 'Reply-To: ' . $email;
}
$headers[] = 'Content-Type: text/plain; charset=utf-8';

$ok = false;
if (defined('MAIL_TO') && MAIL_TO) {
  $ok = @mail(MAIL_TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
}

if (!$ok) {
  json_response(['error' => 'Не удалось отправить письмо'], 500);
}

json_response(['success' => true, 'message' => 'Заявка отправлена']);


