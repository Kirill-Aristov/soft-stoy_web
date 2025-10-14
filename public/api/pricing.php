<?php
require_once __DIR__ . '/config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_response(['error' => 'Method Not Allowed'], 405);
        exit;
    }

    $data = read_json_body();
    $email = trim($data['email'] ?? '');
    $name  = trim($data['name']  ?? '');
    $phone = trim($data['phone'] ?? '');

    if (!is_valid_email($email)) {
        json_response(['error' => 'Некорректный email'], 400);
        exit;
    }

    $subject = SUBJECT_PREFIX . ' · Запрос тарифа';
    $lines = [
        'Новая заявка на тариф:',
        'Имя: ' . $name,
        'Телефон: ' . $phone,
        'Email: ' . $email,
    ];
    $body = implode("\n", $lines);

    $ok = send_plain_mail(MAIL_TO, $subject, $body, $email);
    if (!$ok) {
        log_message('pricing.php: mail() failed');
        json_response(['error' => 'Не удалось отправить письмо'], 500);
        exit;
    }

    json_response(['ok' => true]);
} catch (InvalidArgumentException $e) {
    json_response(['error' => 'Некорректные данные'], 400);
} catch (Throwable $e) {
    log_message('pricing.php: ' . $e->getMessage());
    json_response(['error' => 'Внутренняя ошибка сервера'], 500);
}


