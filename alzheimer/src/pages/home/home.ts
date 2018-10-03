import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PalavrasPage } from '../palavras/palavras';
import { CartasPage } from '../cartas/cartas';
import { CartasHistoricoPage } from '../cartas-historico/cartas-historico';
import { LabirintoHistoricoPage } from '../labirinto-historico/labirinto-historico';
import { HabitosPage } from '../habitos/habitos';
import { LabirintoPage } from '../labirinto/labirinto';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushPage: any;
  pushPageCartas: any;
  pushPageHabitos: any;
  pushPageLabirinto: any;
  pushPageAbout: any;

  public pages = [CartasPage, LabirintoPage, HabitosPage, PalavrasPage];

  constructor(public navCtrl: NavController) {
  	this.pushPage          = PalavrasPage;
  	this.pushPageCartas    = CartasHistoricoPage;
    this.pushPageHabitos   = HabitosPage;
    this.pushPageLabirinto = LabirintoHistoricoPage;
  	this.pushPageAbout     = AboutPage;
  }

  public gameStart() {
    let game = Math.floor((Math.random() * 4));
    this.navCtrl.push(this.pages[game]);
  }

}
