<?php
// public/api/support.php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['error' => 'Method Not Allowed'], 405);
}

$data = read_json();
$email = isset($data['email']) ? trim($data['email']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';
$type = isset($data['type']) ? trim($data['type']) : '';

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$message || !$type) {
  json_response(['error' => 'Все поля обязательны для заполнения'], 400);
}

$subject = ($type === 'feedback') ? 'Обратная связь с сайта DOCIM' : 'Запрос в техническую поддержку DOCIM';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=utf-8';
$headers[] = 'From: ' . MAIL_FROM;
$headers[] = 'Reply-To: ' . $email;
$headers_str = implode("\r\n", $headers);

$html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #2563eb;">' . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . '</h2>
  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Email отправителя:</strong> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>
    <p><strong>Тип обращения:</strong> ' . ($type === 'feedback' ? 'Обратная связь' : 'Техническая поддержка') . '</p>
    <p><strong>Дата:</strong> ' . date('d.m.Y H:i:s') . '</p>
  </div>
  <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
    <h3 style="color: #1e293b; margin-top: 0;">Сообщение:</h3>
    <p style="line-height: 1.6; color: #475569;">' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>
  </div>
</div>';

$ok = mail(MAIL_TO, $subject, $html, $headers_str);
if (!$ok) {
  json_response(['error' => 'Ошибка при отправке сообщения'], 500);
}

json_response(['success' => true, 'message' => 'Сообщение успешно отправлено']);
