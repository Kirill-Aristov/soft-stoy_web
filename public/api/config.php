<?php
// public/api/config.php
header('Content-Type: application/json; charset=utf-8');

define('DB_HOST', 'vh452.timeweb.ru');
define('DB_PORT', 3306);
define('DB_USER', 'cr00383_web');
define('DB_PASS', '431iJtNu');
define('DB_NAME', 'cr00383_web');

// От кого отправляем письма (должен быть разрешён на хостинге)
define('MAIL_FROM', 'info_docim@soft-stroypro.ru');
define('MAIL_TO', 'info_docim@soft-stroypro.ru');

// Общее: простая JSON-обёртка
function json_response($data, $code = 200) {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

// Чтение JSON body
function read_json() {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  if (!is_array($data)) {
    json_response(['error' => 'Invalid JSON'], 400);
  }
  return $data;
}
