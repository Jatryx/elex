import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Actuaciones } from '../../models/modeloActuaciones/actuaciones.model';
import { ActuacionesService } from '../../services/servicioActuaciones/actuaciones.service';
import { Expedientes } from '../../models/modeloExpedientes/expedientes.model';
import { ExpedientesService } from '../../services/servicioExpedientes/expedientes.service';

@Component({
  selector: 'app-formularios-actuaciones',
  templateUrl: './formularios-actuaciones.component.html',
  styleUrl: './formularios-actuaciones.component.css'
})
export class FormulariosActuacionesComponent {

  expediente: Expedientes[] = [];
  actuaciones: Actuaciones = {
    id: 0,
    observaciones: '',
    finalizada: false,
    fecha: new Date(),
    usuario: '',
    responsable1: '',
    responsable2: '',
    consejeria: '',
    borrado: false,
    expediente: {} as Expedientes
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actuacionesService: ActuacionesService,
    private expedientesService: ExpedientesService
  ) {}

  ngOnInit(): void {
    this.expedientesService.consultarExistentes().subscribe(expedientes => {
      this.expediente = expedientes;
    });
  }

  insertarNuevoActuacion() {
    let nuevaActuacion: Actuaciones = {
      observaciones: this.actuaciones.observaciones,
      finalizada: this.actuaciones.finalizada,
      fecha: this.actuaciones.fecha,
      usuario: this.actuaciones.usuario,
      responsable1: this.actuaciones.responsable1,
      responsable2: this.actuaciones.responsable2,
      consejeria: this.actuaciones.consejeria,
      id: 0,
      borrado: false,
      expediente: this.actuaciones.expediente
    }

    this.actuacionesService.insertarActuacion(
      nuevaActuacion.observaciones,
      nuevaActuacion.finalizada,
      nuevaActuacion.fecha,
      nuevaActuacion.usuario,
      nuevaActuacion.responsable1,
      nuevaActuacion.responsable2,
      nuevaActuacion.consejeria,
      Number(nuevaActuacion.expediente)
    ).subscribe((resultado) => {
      if (resultado) {
        this.mensaje = 'Actuación insertada correctamente';
      }
    });
    
  }

  mensaje = '';
}
