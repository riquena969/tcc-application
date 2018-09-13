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

import { ServiceComponent } from '../services/service.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PalavrasPage,
    CartasPage
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
    CartasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServiceComponent,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
