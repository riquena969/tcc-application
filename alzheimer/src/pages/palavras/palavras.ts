import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { ServiceComponent } from '../../services/service.component';
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

    public  palavraMatriz;
    private palavrasDigitadas;
    public  palavraDigitada;
    public  tempoRestante;
    private timer;
    private pesoLetra;
    private pesoAdicional;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient, private toastCtrl: ToastController, public services: ServiceComponent) {
        this.palavrasDigitadas = [];

        new Promise(resolve => {
            this.http.get(this.services.getConfigs().url + 'game-4/getPalavra.php').subscribe((retornoPalavra: RetornoPalavra) => {
                if (retornoPalavra.sucesso) {
                    this.palavraMatriz = retornoPalavra.palavra.toUpperCase();

                    this.pesoLetra     = Math.round(100 / this.palavraMatriz.length);
                    this.pesoAdicional = Math.round(100 / this.palavraMatriz.length / 100);

                    this.tempoRestante = 60;

                    this.timer = setInterval(
                        () => {
                            this.tempoRestante--;
                            if (this.tempoRestante == 0) {
                                clearInterval(this.timer);
                                this.gameOver();
                            }
                        }, 1000);
                } else {
                    this.alertCtrl.create({
                        title: 'Erro',
                        subTitle: 'Falha ao estabelecer comunicação com o servidor',
                        buttons: ['OK']
                    }).present();
                    navCtrl.popToRoot();
                }

            }, err => {
                this.alertCtrl.create({
                    title: 'Erro',
                    subTitle: 'Falha ao estabelecer comunicação com o servidor',
                    buttons: ['OK']
                }).present();
                navCtrl.popToRoot();
                console.log(err);
            });
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PalavrasPage');
    }

    public adicionarPalavra() {
        new Promise(resolve => {
            this.http.get(this.services.getConfigs().url + 'game-4/verificaPalavra.php?palavra=' + encodeURIComponent(this.palavraDigitada.toLowerCase())).subscribe((retorno: VerificaPalavra) => {
                if (retorno.sucesso) {
                    if (retorno.valida) {
                        if (this.palavraDigitada.toLowerCase().indexOf(this.palavraMatriz.charAt(0).toLowerCase()) == 0) {
                            this.palavrasDigitadas.push({
                                palavra:   this.palavraDigitada,
                                pontuacao: this.calculaPontos(this.palavraDigitada)
                            });
                            this.palavraDigitada = '';
                        }
                    } else {
                        this.presentToast('Palavra inválida');
                    }
                } else {
                    this.presentToast('Falha ao estabelecer comunicação com o servidor');
                }

            }, err => {
                this.presentToast('Falha ao estabelecer comunicação com o servidor');
                console.log(err);
            });
        });
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

        return Math.round(pontuacao + ((this.pesoLetra / 100) * pontuacao * (palavra.length - pontoParada - 1)));
    }

    private gameOver() {
        let pontuacao       = {pontuacao:0};

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

    presentToast(mensagem) {
        let toast = this.toastCtrl.create({
            message: mensagem,
            duration: 1000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

 }

interface RetornoPalavra {
    sucesso: boolean,
    palavra: string
}
interface VerificaPalavra {
    sucesso: boolean,
    valida: boolean
}