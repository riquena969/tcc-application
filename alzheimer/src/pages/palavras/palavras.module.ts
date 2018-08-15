import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PalavrasPage } from './palavras';

@NgModule({
  declarations: [
    PalavrasPage,
  ],
  imports: [
    IonicPageModule.forChild(PalavrasPage),
  ],
})
export class PalavrasPageModule {}
