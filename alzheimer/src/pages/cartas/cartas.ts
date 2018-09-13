import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
	public  pontuacao    = 0;

	public perguntaEscolhida = 0;
	public perguntas = [
		"A carta atual é da mesma cor que a carta anterior.",
		"A carta atual é de cor diferente que a carta anterior.",
		"O naipe da carta atual é o mesmo que o da carta anterior.",
		"O naipe da carta atual é diferente que o da carta anterior.",
		"O número da carta atual é igual ao da carta anterior.",
		"O número da carta atual é maior que o da carta anterior.",
		"O número da carta atual é menor que o da carta anterior."
	];

	public cartaAtual    = "";
	public tempoRestante = 0;
	private tempoRestanteInterval;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  	this.tempoRestante = 2;
  	this.tempoRestanteInterval = setInterval(() => {
  		this.tempoRestante--;

  		if (this.tempoRestante == 0) {
  			clearInterval(this.tempoRestanteInterval);

  			this.alteraCartaAtual();
  			this.jogoIniciado = true;
  			return;
  		}
  	}, 1000);
  }

  public respondePergunta(resposta) {
  	switch (this.perguntaEscolhida) {
  		case 0: // A carta atual é da mesma cor que a carta anterior.
  			this.pontuacao +=
  				((this.naipes[this.naipesEscolhido].cor == this.naipes[this.naipesAntigoEscolhido].cor) == resposta)
  					? 1
  					: 0;
  			break;
  		case 1: // A carta atual é de cor diferente que a carta anterior.
  			this.pontuacao +=
  				((this.naipes[this.naipesEscolhido].cor != this.naipes[this.naipesAntigoEscolhido].cor) == resposta)
  					? 1
  					: 0;
  			break;
  		case 2: // O naipe da carta atual é o mesmo que o da carta anterior.
  			this.pontuacao +=
  				((this.naipes[this.naipesEscolhido].nome == this.naipes[this.naipesAntigoEscolhido].nome) == resposta)
  					? 1
  					: 0;
  			break;
  		case 3: // O naipe da carta atual é diferente que o da carta anterior.
  			this.pontuacao +=
  				((this.naipes[this.naipesEscolhido].nome != this.naipes[this.naipesAntigoEscolhido].nome) == resposta)
  					? 1
  					: 0;
  			break;
  		case 4: // O número da carta atual é igual ao da carta anterior.
  			this.pontuacao +=
  				((this.valoresEscolhido == this.valoresAntigoEscolhido) == resposta)
  					? 1
  					: 0;
  			break;
  		case 5: // O número da carta atual é maior que o da carta anterior.
  			this.pontuacao +=
  				((this.valoresEscolhido > this.valoresAntigoEscolhido) == resposta)
  					? 1
  					: 0;
  			break;
  		case 6: // O número da carta atual é menor que o da carta anterior
  			this.pontuacao +=
  				((this.valoresEscolhido < this.valoresAntigoEscolhido) == resposta)
  					? 1
  					: 0;
  			break;

  		default:
  			// code...
  			break;
  	}

  	this.alteraCartaAtual();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartasPage');
  }

}
