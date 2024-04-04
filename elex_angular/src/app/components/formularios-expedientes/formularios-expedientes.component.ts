import { Component, Inject } from '@angular/core';
import { TipoExpediente } from "../../models/modeloTipoExpediente/tipo-expediente.model";
import { TipoExpedienteService } from '../../services/servicioTiposExpediente/tipo-expediente.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-formularios-expedientes',
  templateUrl: './formularios-expedientes.component.html',
  styleUrls: ['./formularios-expedientes.component.css']
})
export class FormulariosExpedientesComponent {

  constructor(
    private tipoExpedienteService: TipoExpedienteService,
    public dialogRef: MatDialogRef<FormulariosExpedientesComponent>,
        @Inject(MAT_DIALOG_DATA)
        public inserccion: { fecha: Date; estado: string;  descripcion: string; opciones: string, tipo: number},
  ) {}

    onNoClick(): void {
      this.dialogRef.close()
  }

  tiposExpediente: TipoExpediente[] = [];
  ngOnInit(): void {
    this.tipoExpedienteService.getTiposExpediente().subscribe((expediente)=> this.tiposExpediente = expediente)
    console.log(this.tiposExpediente);
  }
  
}
