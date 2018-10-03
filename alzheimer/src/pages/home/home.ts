import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PalavrasPage } from '../palavras/palavras';
import { CartasPage } from '../cartas/cartas';
import { CartasHistoricoPage } from '../cartas-historico/cartas-historico';
import { LabirintoHistoricoPage } from '../labirinto-historico/labirinto-historico';
import { HabitosHistoricoPage } from '../habitos-historico/habitos-historico';
import { PalavrasHistoricoPage } from '../palavras-historico/palavras-historico';
import { HabitosPage } from '../habitos/habitos';
import { LabirintoPage } from '../labirinto/labirinto';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushPagePalavras: any;
  pushPageCartas: any;
  pushPageHabitos: any;
  pushPageLabirinto: any;
  pushPageAbout: any;

  public pages = [CartasPage, LabirintoPage, HabitosPage, PalavrasPage];

  constructor(public navCtrl: NavController) {
  	this.pushPagePalavras  = PalavrasHistoricoPage;
  	this.pushPageCartas    = CartasHistoricoPage;
    this.pushPageLabirinto = LabirintoHistoricoPage;
    this.pushPageHabitos   = HabitosHistoricoPage;
  	this.pushPageAbout     = AboutPage;
  }

  public gameStart() {
    let game = Math.floor((Math.random() * 4));
    this.navCtrl.push(this.pages[game]);
  }

}
