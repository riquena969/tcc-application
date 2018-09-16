<?php
header("Access-Control-Allow-Origin: *");

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->select('SELECT id, titulo FROM habitos ORDER BY RAND() LIMIT 1');

if ($retorno === false) {
	die(json_encode(array(
		'sucesso' => false
	)));
}

$habitoId   = $retorno[0]['id'];
$habitoNome = $retorno[0]['titulo'];

$retorno = $database->select('
	SELECT acao  AS nome,
	       ordem AS indiceCorreto
	FROM   acoes
	WHERE  habitos_id = ' . $habitoId . '
	ORDER BY RAND();');

if ($retorno === false) {
	die(json_encode(array(
		'sucesso' => false
	)));
}

die(json_encode(array(
	'sucesso' => true,
	'habito'  => $habitoNome,
	'acoes'   => $retorno
)));