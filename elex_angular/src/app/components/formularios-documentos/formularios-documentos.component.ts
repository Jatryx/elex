import { Component, Inject } from '@angular/core';
import { Expedientes } from '../../models/modeloExpedientes/expedientes.model';
import { ExpedientesService } from '../../services/servicioExpedientes/expedientes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formularios-documentos',
  templateUrl: './formularios-documentos.component.html',
  styleUrl: './formularios-documentos.component.css'
})
export class FormulariosDocumentosComponent {


  constructor(
    private expedienteService: ExpedientesService,
    public dialogRef: MatDialogRef<FormulariosDocumentosComponent>,
      @Inject(MAT_DIALOG_DATA)
      public inserccion: { precio: number; nombreDocumento: string; descripcion: string; expedientes: number },
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  expedientes: Expedientes[] = [];
  ngOnInit(): void {
    console.log("hola");
    this.expedienteService.consultarExistentes().subscribe((expediente)=> this.expedientes = expediente)
    console.log(this.expedientes);
  }

 
}
