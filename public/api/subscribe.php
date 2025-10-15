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
        log_message('subscribe.php: Успешная подписка: ' . $email);
        json_response(['ok' => true]);
    } catch (Throwable $e) {
        if (is_pdo_duplicate_exception($e)) {
            log_message('subscribe.php: Дублирование email: ' . $email);
            json_response(['error' => 'Вы уже подписаны на рассылку', 'code' => 'DUPLICATE_EMAIL'], 409);
            exit;
        }
        throw $e;
    }

} catch (InvalidArgumentException $e) {
    log_message('subscribe.php: Некорректные данные: ' . $e->getMessage());
    json_response(['error' => 'Некорректные данные'], 400);
} catch (Throwable $e) {
    log_message('subscribe.php: Ошибка сервера: ' . $e->getMessage());
    json_response(['error' => 'Внутренняя ошибка сервера'], 500);
}


