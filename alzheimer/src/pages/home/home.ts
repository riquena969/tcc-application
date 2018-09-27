import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PalavrasPage } from '../palavras/palavras';
import { CartasPage } from '../cartas/cartas';
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
  constructor(public navCtrl: NavController) {
  	this.pushPage = PalavrasPage;
  	this.pushPageCartas = CartasPage;
    this.pushPageHabitos = HabitosPage;
    this.pushPageLabirinto = LabirintoPage;
  	this.pushPageAbout = AboutPage;
  }

}
