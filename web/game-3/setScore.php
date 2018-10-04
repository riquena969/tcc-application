<?php
header("Access-Control-Allow-Origin: *");

$tempo                = isset($_GET['tempo']) ? $_GET['tempo'] : '';
$velocidade_media     = isset($_GET['velocidade_media']) ? $_GET['velocidade_media'] : '';
$quantidadeMovimentos = isset($_GET['quantidadeMovimentos']) ? $_GET['quantidadeMovimentos'] : '';
$quantidadeAcertos    = isset($_GET['quantidadeAcertos']) ? $_GET['quantidadeAcertos'] : '';
$quantidadeFalhas     = isset($_GET['quantidadeFalhas']) ? $_GET['quantidadeFalhas'] : '';
$eficiencia           = isset($_GET['eficiencia']) ? $_GET['eficiencia'] : '';

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
if (!is_numeric($quantidadeMovimentos)) {
	die(json_encode(array(
		'sucesso' => false
	)));
}
if (!is_numeric($quantidadeAcertos)) {
	die(json_encode(array(
		'sucesso' => false
	)));
}
if (!is_numeric($quantidadeFalhas)) {
	die(json_encode(array(
		'sucesso' => false
	)));
}
if (!is_numeric($eficiencia)) {
	die(json_encode(array(
		'sucesso' => false
	)));
}

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->insert("
	INSERT INTO pontuacoes_habitos
	(tempo, velocidade_media, movimentos, acertos, falhas, eficiencia, `data`)
	VALUES({$tempo}, {$velocidade_media}, {$quantidadeMovimentos}, {$quantidadeAcertos}, {$quantidadeFalhas}, {$eficiencia}, CURRENT_TIMESTAMP);");

if ($retorno === false) {
	die(json_encode(array(
		'sucesso' => false
	)));
} else {
	die(json_encode(array(
		'sucesso' => true
	)));
}
