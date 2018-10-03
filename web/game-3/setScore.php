<?php
header("Access-Control-Allow-Origin: *");

$tempo            = isset($_GET['tempo']) ? $_GET['tempo'] : '';
$velocidade_media = isset($_GET['velocidade_media']) ? $_GET['velocidade_media'] : '';

if (!is_numeric($tempo)) {
	die(json_encode(array(
		'sucesso' => false
	)));
}
if (!is_numeric($velocidade_media)) {
	die(json_encode(array(
		'sucesso' => false
	)));
}

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->insert("
	INSERT INTO pontuacoes_habitos
	(tempo, velocidade_media, `data`)
	VALUES({$tempo}, {$velocidade_media}, CURRENT_TIMESTAMP);");

if ($retorno === false) {
	die(json_encode(array(
		'sucesso' => false
	)));
} else {
	die(json_encode(array(
		'sucesso' => true
	)));
}
