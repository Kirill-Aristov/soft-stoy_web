<?php
// Конфиг для PHP API эндпоинтов на виртуальном хостинге

// Адрес, куда отправлять письма
const MAIL_TO = "info_docim@soft-stroypro.ru"; // ЗАМЕНИТЕ на ваш email

// От кого отправлять письма
const MAIL_FROM = "info_docim@soft-stroypro.ru"; // ЗАМЕНИТЕ на ваш адрес отправителя
const MAIL_FROM_NAME = "Docim Website";   // Имя отправителя

// Тема писем по умолчанию
const SUBJECT_PREFIX = "Docim";

// Включить запись логов в файл (public/api/logs/app.log)
const ENABLE_LOG = true;

// Путь к логу
const LOG_FILE = __DIR__ . '/logs/app.log';

function log_message(string $message): void {
    if (!ENABLE_LOG) return;
    $dir = dirname(LOG_FILE);
    if (!is_dir($dir)) {
        @mkdir($dir, 0775, true);
    }
    $ts = date('Y-m-d H:i:s');
    @file_put_contents(LOG_FILE, "[$ts] $message\n", FILE_APPEND);
}

function json_response(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function read_json_body(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false) {
        throw new RuntimeException('Cannot read request body');
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        throw new InvalidArgumentException('Invalid JSON');
    }
    return $data;
}

function is_valid_email(string $email): bool {
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

function send_plain_mail(string $to, string $subject, string $body, ?string $replyTo = null): bool {
    $from = MAIL_FROM;
    $fromName = MAIL_FROM_NAME;

    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/plain; charset=utf-8';
    $headers[] = 'From: ' . encode_header($fromName) . " <{$from}>";
    if ($replyTo) {
        $headers[] = "Reply-To: {$replyTo}";
    }
    $headers[] = 'X-Mailer: PHP/' . phpversion();

    // Для корректной UTF-8 кодировки темы
    $encodedSubject = encode_header($subject);

    return mail($to, $encodedSubject, $body, implode("\r\n", $headers));
}

function encode_header(string $text): string {
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

// ---------- БД (MySQL) ----------
// ЗАПОЛНИТЕ доступы к БД вашего виртуального хостинга Timeweb
const DB_HOST = "localhost";   // например, localhost или vh452.timeweb.ru
const DB_PORT = 3306;           // порт MySQL
const DB_NAME = "cr00383_web";     // имя базы
const DB_USER = "cr00383_web";     // пользователь
const DB_PASS = "431iJtNu"; // пароль

/** @return PDO */
function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;
    $dsn = 'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    return $pdo;
}

// Имя таблицы подписчиков (по требованию — users)
const SUBSCRIBERS_TABLE = 'users';

function ensure_subscribers_table(PDO $pdo): void {
    // создаём с колонкой created_at (только три поля: id, email, created_at)
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS ' . SUBSCRIBERS_TABLE . ' (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );
}

function insert_subscriber(PDO $pdo, string $email): void {
    $stmt = $pdo->prepare('INSERT INTO ' . SUBSCRIBERS_TABLE . ' (email) VALUES (?)');
    $stmt->execute([$email]);
}

function is_pdo_duplicate_exception(Throwable $e): bool {
    // SQLSTATE 23000 — Integrity constraint violation; MySQL error 1062 — Duplicate entry
    if ($e instanceof PDOException) {
        $sqlState = $e->getCode(); // SQLSTATE
        $info = method_exists($e, 'errorInfo') && is_array($e->errorInfo) ? $e->errorInfo : null;
        if ($sqlState === '23000') return true;
        if ($info && isset($info[1]) && (int)$info[1] === 1062) return true;
    }
    $msg = strtolower($e->getMessage());
    return str_contains($msg, 'duplicate') || str_contains($msg, 'uniq');
}

?>


