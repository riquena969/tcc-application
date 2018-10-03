<?php
header("Access-Control-Allow-Origin: *");

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->select('SELECT * FROM pontuacoes_labirinto ORDER BY `data` DESC;');

if ($retorno === false) {
    die(json_encode(array(
        'sucesso' => false
    )));
}

die(json_encode(array(
    'sucesso' => true,
    'dados'   => $retorno
)));