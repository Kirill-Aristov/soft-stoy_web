<?php
// public/api/subscribe.php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['error' => 'Method Not Allowed'], 405);
}

$data = read_json();
$email = isset($data['email']) ? trim($data['email']) : '';

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(['error' => 'Некорректный email'], 400);
}

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
if ($mysqli->connect_errno) {
  json_response(['error' => 'DB connect error'], 500);
}

$mysqli->set_charset('utf8mb4');

// Создаём таблицу, если её нет
$createSql = "CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
if ($mysqli->query($createSql) === false) {
  json_response(['error' => 'DB schema error'], 500);
}

// Вставляем email
$stmt = $mysqli->prepare("INSERT INTO users (email) VALUES (?)");
if ($stmt === false) {
  json_response(['error' => 'DB prepare error'], 500);
}
if ($stmt->bind_param('s', $email) === false) {
  json_response(['error' => 'DB bind error'], 500);
}
if ($stmt->execute() === false) {
  if ($mysqli->errno === 1062) {
    json_response(['error' => 'Вы уже подписаны на рассылку', 'code' => 'DUPLICATE_EMAIL'], 409);
  }
  json_response(['error' => 'DB insert error'], 500);
}

json_response(['success' => true, 'message' => 'Email успешно добавлен в подписку']);
