import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PalavrasPage } from '../palavras/palavras';
import { CartasPage } from '../cartas/cartas';
import { HabitosPage } from '../habitos/habitos';
import { LabirintoPage } from '../labirinto/labirinto';

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  public pages = [CartasPage, LabirintoPage, HabitosPage, PalavrasPage];
  // public game  = Math.floor(Math.random() * this.pages.length);
  public game = 2;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public gameStart() {
      this.navCtrl.push(this.pages[this.game]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

}
