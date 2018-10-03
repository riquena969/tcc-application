import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { ServiceComponent } from '../../services/service.component';

/**
 * Generated class for the HabitosHistoricoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-habitos-historico',
  templateUrl: 'habitos-historico.html',
})
export class HabitosHistoricoPage {

  public historico = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public services: ServiceComponent) {
    new Promise(resolve => {
        this.http.get(this.services.getConfigs().url + 'game-3/getScore.php').subscribe((retorno: any) => {
          this.historico = retorno.dados;
        }, err => {
            console.log(err);
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabitosHistoricoPage');
  }

}
