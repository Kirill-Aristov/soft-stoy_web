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
    $message = trim($data['message'] ?? '');
    $type = trim($data['type'] ?? ''); // feedback | technical_support

    if (!is_valid_email($email)) {
        json_response(['error' => 'Некорректный email'], 400);
        exit;
    }
    if ($message === '') {
        json_response(['error' => 'Пустое сообщение'], 400);
        exit;
    }

    $title = $type === 'technical_support' ? 'Техническая поддержка' : 'Обратная связь';
    $subject = SUBJECT_PREFIX . ' · ' . $title;
    $lines = [
        $title . ':',
        'Email: ' . $email,
        'Сообщение:',
        $message,
    ];
    $body = implode("\n", $lines);

    $ok = send_plain_mail(MAIL_TO, $subject, $body, $email);
    if (!$ok) {
        log_message('support.php: mail() failed');
        json_response(['error' => 'Не удалось отправить письмо'], 500);
        exit;
    }

    json_response(['ok' => true]);
} catch (InvalidArgumentException $e) {
    json_response(['error' => 'Некорректные данные'], 400);
} catch (Throwable $e) {
    log_message('support.php: ' . $e->getMessage());
    json_response(['error' => 'Внутренняя ошибка сервера'], 500);
}


