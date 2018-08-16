import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the PalavrasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
    selector: 'page-palavras',
    templateUrl: 'palavras.html',
 })
 export class PalavrasPage {

    private palavras;
    public  palavraMatriz;
    private palavrasDigitadas;
    public  palavraDigitada;
    public  tempoRestante;
    private timer;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
        this.palavras          = ['casa', 'mesa', 'gelo', 'blusa', 'jogo', 'bola'];
        this.palavrasDigitadas = [];

        this.palavraMatriz = this.palavras[Math.floor((Math.random() * this.palavras.length))].toUpperCase();
        this.tempoRestante = 60;

        this.timer = setInterval(
            () => {
                this.tempoRestante--;
                if (this.tempoRestante == 0) {
                    clearInterval(this.timer);
                    this.gameOver();
                }
            }, 1000);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PalavrasPage');
    }

    public adicionarPalavra() {
        if (this.palavraDigitada.toLowerCase().indexOf(this.palavraMatriz.charAt(0).toLowerCase()) == 0) {
            this.palavrasDigitadas.push({
                palavra:   this.palavraDigitada,
                pontuacao: this.calculaPontos(this.palavraDigitada)
            });
            this.palavraDigitada = '';
        }
    }

    private calculaPontos(palavra) {
        let pontuacao                     = 0;
        let valorPorLetraPalavraPrincipal = 100 / this.palavraMatriz.length;
        let pontoParada                   = palavra.length;

        for (let i = 0 ; i < this.palavraMatriz.length ; i++) {
            if (palavra.charAt(i).toLowerCase() == this.palavraMatriz.charAt(i).toLowerCase()) {
                pontuacao += valorPorLetraPalavraPrincipal;
            } else {
                break;
            }
            pontoParada = i;
        }

        return pontuacao + (10 * (palavra.length - pontoParada - 1));
    }

    private gameOver() {
        let pontuacao;

        pontuacao = this.palavrasDigitadas.reduce(
            (a, b) => {return {pontuacao: a.pontuacao + b.pontuacao}}
        );

        const alert = this.alertCtrl.create({
          title: 'Tempo esgotado!',
          subTitle: `Você conseguiu ${pontuacao.pontuacao} pontos!`,
          buttons: ['OK']
        });

        alert.present();
    }

 }
