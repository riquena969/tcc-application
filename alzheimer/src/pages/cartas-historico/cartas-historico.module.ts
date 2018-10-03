import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartasHistoricoPage } from './cartas-historico';

@NgModule({
  declarations: [
    CartasHistoricoPage,
  ],
  imports: [
    IonicPageModule.forChild(CartasHistoricoPage),
  ],
})
export class CartasHistoricoPageModule {}
