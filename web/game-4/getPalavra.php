<?php

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->select('SELECT palavra FROM palavras ORDER BY RAND() LIMIT 1;');

if ($retorno === false) {
	die(json_encode(array(
		'sucesso' => false
	)));
}

die(json_encode(array(
	'sucesso' => true,
	'palavra' => $retorno[0]['palavra']
)));