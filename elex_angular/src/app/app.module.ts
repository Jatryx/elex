import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormulariosExpedientesComponent } from './components/formularios-expedientes/formularios-expedientes.component';
import { FormulariosDocumentosComponent } from './components/formularios-documentos/formularios-documentos.component';
import { FormulariosActuacionesComponent } from './components/formularios-actuaciones/formularios-actuaciones.component';
import { VistaTiposExpedientesComponent } from './components/vista-tipos-expedientes/vista-tipos-expedientes.component';
import { VistaExpedientesComponent } from './components/vista-expedientes/vista-expedientes.component';
import { VistaActuacionesComponent } from './components/vista-actuaciones/vista-actuaciones.component';
import { VistaDocumentosComponent } from './components/vista-documentos/vista-documentos.component';
import { LoginComponent } from './components/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatDialogClose } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormulariosTipoExpedienteComponent } from './formularios-tipo-expediente/formularios-tipo-expediente.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    FormulariosExpedientesComponent,
    FormulariosDocumentosComponent,
    FormulariosActuacionesComponent,
    VistaTiposExpedientesComponent,
    VistaExpedientesComponent,
    VistaActuacionesComponent,
    VistaDocumentosComponent,
    LoginComponent,
    FormulariosTipoExpedienteComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatDialogClose,
    MatButtonModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
