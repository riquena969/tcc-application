<?php
header("Access-Control-Allow-Origin: *");

$pontuacao = isset($_GET['pontuacao']) ? $_GET['pontuacao'] : '';

if (!is_numeric($pontuacao)) {
	die(json_encode(array(
		'sucesso' => false
	)));
}

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->insert("
	INSERT INTO pontuacoes_palavras (pontuacao, `data`)
	VALUES({$pontuacao}, CURRENT_TIMESTAMP);");

if ($retorno === false) {
	die(json_encode(array(
		'sucesso' => false
	)));
} else {
	die(json_encode(array(
		'sucesso' => true
	)));
}
