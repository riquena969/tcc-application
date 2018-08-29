<?php
header("Access-Control-Allow-Origin: *");

$palavraDigitada = isset($_GET['palavra']) ? $_GET['palavra'] : '';

require '../config.php';
require '../database.php';

$database = new Database();

$palavraDigitada = str_replace(' ', '-', $palavraDigitada);
$palavraDigitada = str_replace('%', '', $palavraDigitada);

$retorno = $database->select('SELECT palavra FROM dicionario WHERE palavra = "' . addslashes($palavraDigitada) . '";');

if ($retorno === false) {
	die(json_encode(array(
		'sucesso' => false
	)));
} else {
	die(json_encode(array(
		'sucesso' => true,
		'valida'  => isset($retorno[0]['palavra'])
	)));
}
