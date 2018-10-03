import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PalavrasHistoricoPage } from './palavras-historico';

@NgModule({
  declarations: [
    PalavrasHistoricoPage,
  ],
  imports: [
    IonicPageModule.forChild(PalavrasHistoricoPage),
  ],
})
export class PalavrasHistoricoPageModule {}
