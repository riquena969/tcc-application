import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PalavrasPage } from '../pages/palavras/palavras';
import { CartasPage } from '../pages/cartas/cartas';
import { HabitosPage } from '../pages/habitos/habitos';
import { LabirintoPage } from '../pages/labirinto/labirinto';
import { AboutPage } from '../pages/about/about';
import { CartasHistoricoPage } from '../pages/cartas-historico/cartas-historico';
import { LabirintoHistoricoPage } from '../pages/labirinto-historico/labirinto-historico';
import { HabitosHistoricoPage } from '../pages/habitos-historico/habitos-historico';
import { PalavrasHistoricoPage } from '../pages/palavras-historico/palavras-historico';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { ServiceComponent } from '../services/service.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PalavrasPage,
    CartasPage,
    HabitosPage,
    LabirintoPage,
    AboutPage,
    CartasHistoricoPage,
    LabirintoHistoricoPage,
    HabitosHistoricoPage,
    PalavrasHistoricoPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PalavrasPage,
    CartasPage,
    HabitosPage,
    LabirintoPage,
    AboutPage,
    CartasHistoricoPage,
    LabirintoHistoricoPage,
    HabitosHistoricoPage,
    PalavrasHistoricoPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServiceComponent,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
