<?php
header("Access-Control-Allow-Origin: *");

$tempo            = isset($_GET['tempo']) ? $_GET['tempo'] : '';
$velocidade_media = isset($_GET['velocidade_media']) ? $_GET['velocidade_media'] : '';
$eficiencia       = isset($_GET['eficiencia']) ? $_GET['eficiencia'] : '';
$cliques          = isset($_GET['cliques']) ? $_GET['cliques'] : '';
$tamanho_caminho  = isset($_GET['tamanho_caminho']) ? $_GET['tamanho_caminho'] : '';

if ((!is_numeric($tempo)) ||
    (!is_numeric($velocidade_media)) ||
    (!is_numeric($eficiencia)) ||
    (!is_numeric($cliques)) ||
    (!is_numeric($tamanho_caminho))) {
    die(json_encode(array(
        'sucesso' => false
    )));
}

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->insert("
    INSERT INTO pontuacoes_labirinto
    (tempo, velocidade_media, eficiencia, cliques, tamanho_caminho, `data`)
    VALUES({$tempo}, {$velocidade_media}, {$eficiencia}, {$cliques}, {$tamanho_caminho}, CURRENT_TIMESTAMP);");

if ($retorno === false) {
    die(json_encode(array(
        'sucesso' => false
    )));
} else {
    die(json_encode(array(
        'sucesso' => true
    )));
}
