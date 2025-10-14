<?php
// public/api/config.php
header('Content-Type: application/json; charset=utf-8');

// Глобальный JSON-shutdown обработчик фатальных ошибок, чтобы не отдавать пустое тело
register_shutdown_function(function () {
  $e = error_get_last();
  if ($e && in_array($e['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
    if (!headers_sent()) {
      http_response_code(500);
      header('Content-Type: application/json; charset=utf-8');
    }
    echo json_encode(['error' => 'Server fatal error'], JSON_UNESCAPED_UNICODE);
  }
});

// Универсальный геттер ENV с fallback на $_SERVER/$_ENV
$env = function (string $key, $default = null) {
  $val = getenv($key);
  if ($val === false || $val === '') {
    if (isset($_SERVER[$key]) && $_SERVER[$key] !== '') return $_SERVER[$key];
    if (isset($_ENV[$key]) && $_ENV[$key] !== '') return $_ENV[$key];
    return $default;
  }
  return $val;
};


define('DB_HOST', $env('DB_HOST', 'localhost'));
define('DB_PORT', (int) $env('DB_PORT', 3306));
define('DB_USER', $env('DB_USER', ''));
define('DB_PASS', $env('DB_PASS', ''));
define('DB_NAME', $env('DB_NAME', ''));

// От кого отправляем письма (должен быть разрешён на хостинге)
define('MAIL_FROM', $env('MAIL_FROM', ''));
define('MAIL_TO', $env('MAIL_TO', ''));

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
