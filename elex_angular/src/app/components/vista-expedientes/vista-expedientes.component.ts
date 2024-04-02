import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../services/servicioExpedientes/expedientes.service';
import { Expedientes } from '../../models/modeloExpedientes/expedientes.model';
import { FormulariosExpedientesComponent } from '../formularios-expedientes/formularios-expedientes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vista-expedientes',
  templateUrl: './vista-expedientes.component.html',
  styleUrl: './vista-expedientes.component.css'
})

export class VistaExpedientesComponent implements OnInit{

  dataSource: Expedientes[]  = [];
  displayedColumns: string[] = ['nig', 'fecha', 'estado', 'opciones', 'descripcion', 'tipo', 'acciones'];
  constructor(
    private expedientesService: ExpedientesService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.expedientesService.consultarExistentes().subscribe((expediente)=> this.dataSource = expediente)
    console.log(this.dataSource);
  }

  modalInsertarExpediente(): void {
    const dialogoInsertar = this.dialog.open(FormulariosExpedientesComponent, {
        width: '15%',
        height: '67%',
        data: {
            estado: '',
            fecha: new Date(),
            descripcion: '',
            opciones: '',
            tipo: false,
        },
    })
    
    dialogoInsertar.afterClosed().subscribe((result) => {
        if (result) {
            this.expedientesService
                .insertarExpediente(
                    result.fecha,
                    result.estado,
                    result.opciones,
                    result.descripcion,
                    result.tipo,
                )
                .subscribe((expediente) => {
                    this.dataSource.push(expediente)
                    this.dataSource = [...this.dataSource]
                })
        }
    })
}
 
modalActualizarExpediente(nig: string): void {
  this.expedientesService.consultarPorNig(nig).subscribe(expediente => {
    const dialogoActualizar = this.dialog.open(FormulariosExpedientesComponent, {
      width: '15%',
      height: '67%',
      data: {
        id: expediente.id,
        estado: expediente.estado,
        fecha: expediente.fecha,
        descripcion: expediente.descripcion,
        opciones: expediente.opciones,
        tipo: expediente.tipo.id,
      },
    });
    dialogoActualizar.afterClosed().subscribe((result) => {
      if (result) {
          this.expedientesService
              .updateExpediente(
                  result.id,
                  result.fecha,
                  result.estado,
                  result.opciones,
                  result.descripcion,
                  result.tipo,
              )
              .subscribe((expediente) => {
                  this.dataSource.push(expediente)
                  this.dataSource = [...this.dataSource]
                  window.location.reload();
              })
      }
  })
  });
  
}

borrarExpediente(id: number){
  this.expedientesService.borrarExpediente(id).subscribe(() => {
    this.dataSource = this.dataSource.filter((expediente) => expediente.id !== id);
  });
}
  



}
