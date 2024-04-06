import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { VistaExpedientesComponent } from './components/vista-expedientes/vista-expedientes.component';
import { VistaDocumentosComponent } from './components/vista-documentos/vista-documentos.component';
import { VistaTiposExpedientesComponent } from './components/vista-tipos-expedientes/vista-tipos-expedientes.component';
import { VistaActuacionesComponent } from './components/vista-actuaciones/vista-actuaciones.component';
import { VistaRelacionExpedienteComponent } from './components/vista-relacion-expediente/vista-relacion-expediente.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: 'vista-expedientes',
    component: VistaExpedientesComponent,
    canActivate: [AuthGuard],
    data: { bTitle: 'Vista de Expedientes' }
  },
  {
    path: 'vista-documentos',
    component: VistaDocumentosComponent,
    canActivate: [AuthGuard],
    data: { bTitle: 'Vista de Documentos' }
  },
  {
    path: 'vista-tipos-expedientes',
    component: VistaTiposExpedientesComponent,
    canActivate: [AuthGuard],
    data: { bTitle: 'Vista de Tipos de Expedientes' }
  },
  {
    path: 'vista-relacion-expediente/:nig/:id',
    component: VistaRelacionExpedienteComponent,
    canActivate: [AuthGuard],
    data: { bTitle: 'Vista de Relación de Expedientes' }
  },
  {
    path: 'vista-actuaciones',
    component: VistaActuacionesComponent,
    canActivate: [AuthGuard],
    data: { bTitle: 'Vista de Actuaciones' }
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard],
    data: { bTitle: 'Inicio' }
  },
  {
    path: '',
    component: LoginComponent,
    data: { bTitle: 'Login' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { bTitle: 'Login' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
