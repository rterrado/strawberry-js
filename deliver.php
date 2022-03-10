<?php

/**
 * Used for PHP built-in server
 * NOTE: For testing only!
 *
 * php -S 127.0.0.1:8000 deliver.php if using VPN
 */

chdir(__dir__);
header('Content-Type: application/javascript');
require 'test/strawberry.js.test.php';
