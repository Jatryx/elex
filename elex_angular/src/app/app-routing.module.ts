import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormulariosExpedientesComponent } from './components/formularios-expedientes/formularios-expedientes.component';
import { LoginComponent } from './components/login/login.component';
import { FormulariosDocumentosComponent } from './components/formularios-documentos/formularios-documentos.component';
import { FormulariosActuacionesComponent } from './components/formularios-actuaciones/formularios-actuaciones.component';
import { VistaExpedientesComponent } from './components/vista-expedientes/vista-expedientes.component';
import { VistaDocumentosComponent } from './components/vista-documentos/vista-documentos.component';
import { FormulariosTipoExpedienteComponent } from './formularios-tipo-expediente/formularios-tipo-expediente.component';
import { VistaTiposExpedientesComponent } from './components/vista-tipos-expedientes/vista-tipos-expedientes.component';

const routes: Routes = [
  {
    path: 'vista-expedientes',
    component: VistaExpedientesComponent,
    data:
    { bTitle: 'Vista de Expedientes'}
    // Ejemplo del endpoint: http://localhost:4200/vista-expedientes
  },

  {
    path: 'vista-documentos',
    component: VistaDocumentosComponent,
    data:
    { bTitle: 'Vista de Documentos'}
    // Ejemplo del endpoint: http://localhost:4200/vista-documentos
  },

  {
    path: 'vista-tipos-expedientes',
    component: VistaTiposExpedientesComponent,
    data:
    { bTitle: 'Vista de Tipos de Expedientes'}
    // Ejemplo del endpoint: http://localhost:4200/vista-tipos-expedientes
  },

  {
    path: '',
    component: LoginComponent,
    data: 
    { bTitle: 'Login' }
  },

  {
    path: 'login',
    component: LoginComponent,
    data: 
    { bTitle: 'Login' }
    // Ejemplo del endpoint: http://localhost:4200/login
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
