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

    if (!is_valid_email($email)) {
        json_response(['error' => 'Некорректный email'], 400);
        exit;
    }

    // БД: создаём таблицу и пытаемся вставить подписчика
    $pdo = db();
    ensure_subscribers_table($pdo);
    try {
        insert_subscriber($pdo, $email);
    } catch (Throwable $e) {
        if (is_pdo_duplicate_exception($e)) {
            json_response(['error' => 'Вы уже подписаны на рассылку', 'code' => 'DUPLICATE_EMAIL'], 409);
            exit;
        }
        throw $e;
    }

    // Письмо-уведомление (не обязательно, но полезно)
    $subject = SUBJECT_PREFIX . ' · Новая подписка';
    $body = "Email подписчика: {$email}";
    $ok = send_plain_mail(MAIL_TO, $subject, $body, $email);
    if (!$ok) {
        log_message('subscribe.php: mail() failed');
        // подписка сохранена, письмо не отправилось — не считаем ошибкой для пользователя
        json_response(['ok' => true, 'warning' => 'Подписка сохранена, но письмо не отправлено']);
        exit;
    }

    json_response(['ok' => true]);
} catch (InvalidArgumentException $e) {
    json_response(['error' => 'Некорректные данные'], 400);
} catch (Throwable $e) {
    log_message('subscribe.php: ' . $e->getMessage());
    json_response(['error' => 'Внутренняя ошибка сервера'], 500);
}


