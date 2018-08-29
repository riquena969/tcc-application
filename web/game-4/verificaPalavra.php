<?php
header("Access-Control-Allow-Origin: *");

$palavraDigitada = isset($_GET['palavra']) ? $_GET['palavra'] : '';

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->select('SELECT palavra FROM palavras WHERE palavra = "' . addslashes($palavraDigitada) . '";');

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
