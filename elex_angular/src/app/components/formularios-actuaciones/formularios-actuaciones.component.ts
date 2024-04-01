import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpedientesService } from '../../services/servicioExpedientes/expedientes.service';
import { Expedientes } from '../../models/modeloExpedientes/expedientes.model';

@Component({
  selector: 'app-formularios-actuaciones',
  templateUrl: './formularios-actuaciones.component.html',
  styleUrl: './formularios-actuaciones.component.css'
})
export class FormulariosActuacionesComponent {

  constructor(
    private expedientesService: ExpedientesService,
    public dialogRef: MatDialogRef<FormulariosActuacionesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public inserccion: { observaciones: string; finalizada: boolean; fecha: Date; usuario: string; responsable1: string; responsable2: string; consejeria: string; expediente: string},
  ){}

  onNoClick(): void {
    this.dialogRef.close()
  }

  expedientes: Expedientes[] = [];
  ngOnInit(): void {
    console.log("hola");
    this.expedientesService.consultarExistentes().subscribe((expediente)=> this.expedientes = expediente)
    console.log(this.expedientes);
  }
}
