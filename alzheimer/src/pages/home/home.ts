import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PalavrasPage } from '../palavras/palavras';
import { CartasPage } from '../cartas/cartas';
import { HabitosPage } from '../habitos/habitos';
import { LabirintoPage } from '../labirinto/labirinto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushPage: any;
  pushPageCartas: any;
  pushPageHabitos: any;
  pushPageLabirinto: any;
  constructor(public navCtrl: NavController) {
  	this.pushPage = PalavrasPage;
  	this.pushPageCartas = CartasPage;
    this.pushPageHabitos = HabitosPage;
  	this.pushPageLabirinto = LabirintoPage;
  }

}
