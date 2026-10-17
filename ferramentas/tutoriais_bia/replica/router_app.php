<?php
// Router do servidor PHP embutido (réplica local): /api/* -> MadRestServer.php; ficheiros existentes servidos tal como estão.
$u = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (strpos($u, '/api/') === 0) { $_SERVER['REQUEST_URI'] = $u; require __DIR__ . '/MadRestServer.php'; return true; }
$f = __DIR__ . $u;
if ($u !== '/' && file_exists($f) && !is_dir($f)) return false;
if (is_dir($f) && file_exists(rtrim($f, '/') . '/index.html')) { header('Content-Type: text/html; charset=utf-8'); readfile(rtrim($f, '/') . '/index.html'); return true; }
return false;
