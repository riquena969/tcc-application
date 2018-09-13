<?php
header("Access-Control-Allow-Origin: *");

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->select('SELECT palavra FROM dicionario WHERE LENGTH(palavra) BETWEEN 4 AND 6 ORDER BY RAND() LIMIT 1;');

if ($retorno === false) {
	die(json_encode(array(
		'sucesso' => false
	)));
}

die(json_encode(array(
	'sucesso' => true,
	'palavra' => $retorno[0]['palavra']
)));