import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { ServiceComponent } from '../../services/service.component';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient, public services: ServiceComponent) {
  	        new Promise(resolve => {
            this.http.get(this.services.getConfigs().url + 'game-3/getHabitos.php').subscribe((retorno: DadosHabito) => {
                if (retorno.sucesso) {
                  	this.itensHabito = retorno.acoes;

					this.tempo = 0;

					this.tempoController = setInterval(() => {
						this.tempo++;
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

  	let tempoMedio = Math.round(this.tempo/this.itensHabito.length);

	let url = this.services.getConfigs().url + 'game-3/setScore.php?tempo=' + this.tempo +
																	'&velocidade_media=' + tempoMedio;
	new Promise(resolve => {
		this.http.get(url).subscribe((retorno: RetornoSetScore) => {
		}, err => {
			console.log(err);
		});
	});
	const alert = this.alertCtrl.create({
		title: 'Tempo esgotado!',
		subTitle: `Tempo gasto: ${this.tempo} segundos!\n
		Velocidade média: ${tempoMedio} seg/item.`,
		buttons: ['OK']
	});

	alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabitosPage');
  }

}

interface DadosHabito {
    sucesso: boolean,
    habito: string,
    acoes: {}
}

interface RetornoSetScore {
    sucesso: boolean
}