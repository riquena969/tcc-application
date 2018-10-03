<?php
header("Access-Control-Allow-Origin: *");

$pontuacao  = isset($_GET['pontuacao']) ? $_GET['pontuacao'] : '';
$acertos    = isset($_GET['acertos']) ? $_GET['acertos'] : '';
$erros      = isset($_GET['erros']) ? $_GET['erros'] : '';
$eficiencia = isset($_GET['eficiencia']) ? $_GET['eficiencia'] : '';

if ((!is_numeric($pontuacao)) ||
    (!is_numeric($acertos)) ||
    (!is_numeric($erros)) ||
    (!is_numeric($eficiencia))) {
    die(json_encode(array(
        'sucesso' => false
    )));
}

require '../config.php';
require '../database.php';

$database = new Database();

$retorno = $database->insert("
    INSERT INTO pontuacoes_cartas
    (pontuacao, acertos, erros, eficiencia, `data`)
    VALUES({$pontuacao}, {$acertos}, {$erros}, {$eficiencia}, CURRENT_TIMESTAMP);");

if ($retorno === false) {
    die(json_encode(array(
        'sucesso' => false
    )));
} else {
    die(json_encode(array(
        'sucesso' => true
    )));
}
