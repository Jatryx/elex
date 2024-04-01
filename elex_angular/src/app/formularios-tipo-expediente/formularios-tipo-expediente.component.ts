import { Component,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formularios-tipo-expediente',
  templateUrl: './formularios-tipo-expediente.component.html',
  styleUrl: './formularios-tipo-expediente.component.css'
})
export class FormulariosTipoExpedienteComponent {

  constructor(
  public dialogRef: MatDialogRef<FormulariosTipoExpedienteComponent>,
  @Inject(MAT_DIALOG_DATA)
  public inserccion: { materia: string; },
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
  
}
