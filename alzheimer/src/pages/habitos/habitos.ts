import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the HabitosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-habitos',
  templateUrl: 'habitos.html',
})
export class HabitosPage {

	private itensHabito;
	public  tempo;
	private tempoController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  	this.itensHabito = [
		{nome: 'item 1', selected: false, indice: null, indiceCorreto: 1},
		{nome: 'item 2', selected: false, indice: null, indiceCorreto: 2},
		{nome: 'item 3', selected: false, indice: null, indiceCorreto: 3},
		{nome: 'item 4', selected: false, indice: null, indiceCorreto: 4},
		{nome: 'item 5', selected: false, indice: null, indiceCorreto: 5}
	];

	this.tempo = 0;

	this.tempoController = setInterval(() => {
		this.tempo++;
	}, 1000);
  }

  public itemSelecionado(item) {
  	if (item.selected) {
  		let indiceAtual = item.indice;

  		for (let i = this.itensHabito.length - 1; i >= 0; i--) {
  			if (indiceAtual < this.itensHabito[i].indice
  				&& this.itensHabito[i].indice != null) {
  				this.itensHabito[i].indice--;
  			}
  		}

  		item.selected = false;
  		item.indice   = null;
  	} else {
  		let indiceAtual = 0;

  		for (let i = this.itensHabito.length - 1; i >= 0; i--) {
  			if (indiceAtual < this.itensHabito[i].indice
  				&& this.itensHabito[i].indice != null) {
  				indiceAtual = this.itensHabito[i].indice;
  			}
  		}

  		item.indice   = indiceAtual + 1;
  		item.selected = true;

  		if (this.gameFinalizado()) {
  			this.gameOver();
  		}
  	}
  }

  private gameFinalizado() {
	for (let i = this.itensHabito.length - 1; i >= 0; i--) {
		if (this.itensHabito[i].indiceCorreto != this.itensHabito[i].indice) {
			return false;
		}
	}

  	return true;
  }

  private gameOver() {
  	clearInterval(this.tempoController);

  	let tempoMedio = Math.round(this.itensHabito.length/this.tempo);

	const alert = this.alertCtrl.create({
		title: 'Tempo esgotado!',
		subTitle: `Tempo gasto: ${this.tempo} segundos!\n
		Velocidade média: ${tempoMedio} ${tempoMedio != 1 ? 'itens' : 'item'}/seg.`,
		buttons: ['OK']
	});

	alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabitosPage');
  }

}
