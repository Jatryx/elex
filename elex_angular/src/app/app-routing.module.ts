import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { VistaExpedientesComponent } from './components/vista-expedientes/vista-expedientes.component';
import { VistaDocumentosComponent } from './components/vista-documentos/vista-documentos.component';
import { VistaTiposExpedientesComponent } from './components/vista-tipos-expedientes/vista-tipos-expedientes.component';
import { VistaActuacionesComponent } from './components/vista-actuaciones/vista-actuaciones.component';
import { VistaRelacionExpedienteComponent } from './components/vista-relacion-expediente/vista-relacion-expediente.component';

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
    path: 'vista-relacion-expediente/:nig/:id',
    component: VistaRelacionExpedienteComponent,
    data:
    { bTitle: 'Vista de Relación de Expedientes'}
    // Ejemplo del endpoint: http://localhost:4200/vista-relacion-expediente
  },

  {
    path: 'vista-actuaciones',
    component: VistaActuacionesComponent,
    data:
    { bTitle: 'Vista de Actuaciones'}
    // Ejemplo del endpoint: http://localhost:4200/vista-actuaciones
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
