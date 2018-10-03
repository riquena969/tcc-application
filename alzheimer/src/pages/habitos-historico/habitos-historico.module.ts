import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabitosHistoricoPage } from './habitos-historico';

@NgModule({
  declarations: [
    HabitosHistoricoPage,
  ],
  imports: [
    IonicPageModule.forChild(HabitosHistoricoPage),
  ],
})
export class HabitosHistoricoPageModule {}
