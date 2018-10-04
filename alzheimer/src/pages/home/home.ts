import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartasHistoricoPage } from '../cartas-historico/cartas-historico';
import { LabirintoHistoricoPage } from '../labirinto-historico/labirinto-historico';
import { HabitosHistoricoPage } from '../habitos-historico/habitos-historico';
import { PalavrasHistoricoPage } from '../palavras-historico/palavras-historico';
import { AboutPage } from '../about/about';
import { TutorialPage } from '../tutorial/tutorial';

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
  pushPageTutorial: any;

  constructor(public navCtrl: NavController) {
  	this.pushPagePalavras  = PalavrasHistoricoPage;
  	this.pushPageCartas    = CartasHistoricoPage;
    this.pushPageLabirinto = LabirintoHistoricoPage;
    this.pushPageHabitos   = HabitosHistoricoPage;
    this.pushPageAbout     = AboutPage;
    
    this.pushPageTutorial = TutorialPage;
  }

}
