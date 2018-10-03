import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { ServiceComponent } from '../../services/service.component';

/**
 * Generated class for the CartasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cartas',
  templateUrl: 'cartas.html',
})
export class CartasPage {

  private naipesAntigoEscolhido;
  private naipesEscolhido;
  private naipes  = [
    {nome: "copas", cor: "vermelha"},
    {nome: "ouros", cor: "vermelha"},
    {nome: "espadas", cor: "preta"},
    {nome: "paus", cor: "preta"}];
  private valoresAntigoEscolhido;
  private valoresEscolhido;
  private valores      = ["a","2","3","4","5","6","7","8","9","10","j","q","k"];
  public  jogoIniciado = false;
  private pontuacao = {acertos:0, erros:0};

  public perguntaEscolhida = 0;
  public perguntas = [
    "A carta atual é da &nbsp;<b><u>mesma cor</u></b>&nbsp; que a carta anterior.",
    "A carta atual é de &nbsp;<b><u>cor diferente</u></b>&nbsp; que a carta anterior.",
    "O &nbsp;<b><u>naipe</u></b>&nbsp; da carta atual é o &nbsp;<b><u>mesmo</u></b>&nbsp; que o da carta anterior.",
    "O &nbsp;<b><u>naipe</u></b>&nbsp; da carta atual é &nbsp;<b><u>diferente</u></b>&nbsp; que o da carta anterior.",
    "O &nbsp;<b><u>número</u></b>&nbsp; da carta atual é &nbsp;<b><u>igual</u></b>&nbsp; ao da carta anterior.",
    "O &nbsp;<b><u>número</u></b>&nbsp; da carta atual é &nbsp;<b><u>maior</u></b>&nbsp; que o da carta anterior.",
    "O &nbsp;<b><u>número</u></b>&nbsp; da carta atual é &nbsp;<b><u>menor</u></b>&nbsp; que o da carta anterior."
  ];

  public cartaAtual    = "";
  public tempoRestante = 0;
  private tempoRestanteInterval;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient, public services: ServiceComponent) {
    this.alteraCartaAtual(true);
  }

  public alteraCartaAtual(primeiraRodada = false) {
    if (primeiraRodada) {
      this.contaTempoMemorizarCarta();
    } else {
      this.perguntaEscolhida = Math.floor((Math.random() * this.perguntas.length) + 0);
    }

    this.naipesAntigoEscolhido  = this.naipesEscolhido;
  this.valoresAntigoEscolhido = this.valoresEscolhido;

  this.naipesEscolhido  = Math.floor((Math.random() * 4) + 0);
  this.valoresEscolhido = Math.floor((Math.random() * 13) + 0);

    this.cartaAtual   = "assets/imgs/cards/" + this.naipes[this.naipesEscolhido].nome + "-" + this.valores[this.valoresEscolhido] + ".png";
  }

  public contaTempoMemorizarCarta() {
    this.tempoRestante = 5;
    this.tempoRestanteInterval = setInterval(() => {
      this.tempoRestante--;

      if (this.tempoRestante == 0) {

        if (this.jogoIniciado) {
          clearInterval(this.tempoRestanteInterval);

          this.gameOver();
        } else {
          this.alteraCartaAtual();
          this.jogoIniciado = true;

          this.tempoRestante = 60;
        }
        return;
      }
    }, 1000);
  }

  public respondePergunta(resposta) {
    switch (this.perguntaEscolhida) {
      case 0: // A carta atual é da mesma cor que a carta anterior.
        this.novaTentativa((this.naipes[this.naipesEscolhido].cor == this.naipes[this.naipesAntigoEscolhido].cor) == resposta);
        break;
      case 1: // A carta atual é de cor diferente que a carta anterior.
        this.novaTentativa((this.naipes[this.naipesEscolhido].cor != this.naipes[this.naipesAntigoEscolhido].cor) == resposta);
        break;
      case 2: // O naipe da carta atual é o mesmo que o da carta anterior.
        this.novaTentativa((this.naipes[this.naipesEscolhido].nome == this.naipes[this.naipesAntigoEscolhido].nome) == resposta);
        break;
      case 3: // O naipe da carta atual é diferente que o da carta anterior.
        this.novaTentativa((this.naipes[this.naipesEscolhido].nome != this.naipes[this.naipesAntigoEscolhido].nome) == resposta);
        break;
      case 4: // O número da carta atual é igual ao da carta anterior.
        this.novaTentativa((this.valoresEscolhido == this.valoresAntigoEscolhido) == resposta);
        break;
      case 5: // O número da carta atual é maior que o da carta anterior.
        this.novaTentativa((this.valoresEscolhido > this.valoresAntigoEscolhido) == resposta);
        break;
      case 6: // O número da carta atual é menor que o da carta anterior
        this.novaTentativa((this.valoresEscolhido < this.valoresAntigoEscolhido) == resposta);
        break;

      default:
        // code...
        break;
    }

    this.alteraCartaAtual();
  }

  private novaTentativa(respostaCorreta) {
    if (respostaCorreta) {
      this.pontuacao.acertos++;
    } else {
      this.pontuacao.erros++;
    }
  }

  private gameOver() {
    let pontuacaoFinal = (this.pontuacao.acertos * 100) - (this.pontuacao.erros * 60);
    let eficiencia     = Math.round(this.pontuacao.acertos/(this.pontuacao.acertos+this.pontuacao.erros) * 1000)/10;

    let url = this.services.getConfigs().url + 'game-1/setScore.php?pontuacao=' + pontuacaoFinal +
                                                                        '&acertos=' + this.pontuacao.acertos +
                                                                        '&erros=' + this.pontuacao.erros +
                                                                        '&eficiencia=' + eficiencia;
    new Promise(resolve => {
        this.http.get(url).subscribe((retorno: RetornoSetScore) => {
        }, err => {
            console.log(err);
        });
    });

    const alert = this.alertCtrl.create({
      title: 'Tempo esgotado!',
      subTitle: `Você conseguiu ${pontuacaoFinal} pontos!\n\n
                 Quantidade de Acertos: ${this.pontuacao.acertos}\n
                 Quantidade de Erros: ${this.pontuacao.erros}\n
                 Percentual de Eficiência: ${eficiencia}`,
      buttons: ['OK']
    });

    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartasPage');
  }

}

interface RetornoSetScore {
    sucesso: boolean
}