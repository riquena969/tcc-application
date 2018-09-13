import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartasPage } from './cartas';

@NgModule({
  declarations: [
    CartasPage,
  ],
  imports: [
    IonicPageModule.forChild(CartasPage),
  ],
})
export class CartasPageModule {}
