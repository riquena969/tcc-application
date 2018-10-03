<?php
header("Access-Control-Allow-Origin: *");

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->select('
    SELECT pontuacao,
           eficiencia,
           DATE_FORMAT(`data`, "%d/%m/%Y %H:%i:%s") AS "data"
    FROM   pontuacoes_cartas
    ORDER  BY `data` DESC;');

if ($retorno === false) {
    die(json_encode(array(
        'sucesso' => false
    )));
}

die(json_encode(array(
    'sucesso' => true,
    'dados'   => $retorno
)));