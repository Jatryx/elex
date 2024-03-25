import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulariosTipoExpedienteComponent } from './formularios-tipo-expediente/formularios-tipo-expediente.component';


@NgModule({
  declarations: [
    AppComponent,
    FormulariosTipoExpedienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
