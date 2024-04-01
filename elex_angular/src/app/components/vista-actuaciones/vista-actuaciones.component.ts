import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { Actuaciones } from '../../models/modeloActuaciones/actuaciones.model';
import { ActuacionesService } from '../../services/servicioActuaciones/actuaciones.service';
import { FormulariosActuacionesComponent } from '../formularios-actuaciones/formularios-actuaciones.component';

@Component({
  selector: 'app-vista-actuaciones',
  templateUrl: './vista-actuaciones.component.html',
  styleUrl: './vista-actuaciones.component.css'
})
export class VistaActuacionesComponent {
  dataSource: Actuaciones[]  = [];
  displayedColumns: string[] = ['id', 'observaciones', 'finalizada', 'fecha', 'usuario', 'responsable1', 'responsable2', 'consejeria', 'expediente', 'acciones'];

  constructor(
    private actuacionesService: ActuacionesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.actuacionesService.consultarExistentes().subscribe((actuacion)=> this.dataSource = actuacion)
    console.log(this.dataSource);
  }

  modalInsertarActuacion(): void {
    const dialogoInsertar = this.dialog.open(FormulariosActuacionesComponent, {
        width: '23%',
        data: {
            observaciones: '',
            finalizada: false,
            fecha: new Date(),
            usuario: '',
            responsable1: '',
            responsable2: '',
            consejeria: '',
            expediente: '',
        },
    })

    dialogoInsertar.afterClosed().subscribe((result) => {
        if (result) {
            this.actuacionesService
                .insertarActuacion(
                    result.observaciones,
                    result.finalizada,
                    result.fecha,
                    result.usuario,
                    result.responsable1,
                    result.responsable2,
                    result.consejeria,
                    result.expediente
                )
                .subscribe((actuacion) => {
                    this.dataSource.push(actuacion)
                    this.dataSource = [...this.dataSource]
                })
        }
    })
  }

  modalActualizarActuacion(id: number){
    this.actuacionesService.obtenerActuacionesPorId(id).subscribe(actuacion => {
      console.log(actuacion.finalizada);
      const dialogoActualizar = this.dialog.open(FormulariosActuacionesComponent, {
        width: '23%',
        data: {
          observaciones: actuacion.observaciones,
          finalizada: actuacion.finalizada,
          fecha: actuacion.fecha,
          usuario: actuacion.usuario,
          responsable1: actuacion.responsable1,
          responsable2: actuacion.responsable2,
          consejeria: actuacion.consejeria,
          expediente: actuacion.expediente.nig,
        },
      })
      dialogoActualizar.afterClosed().subscribe((result) => {
        if (result) {
          this.actuacionesService
            .actualizarActuacion(
              id,
              result.observaciones,
              result.finalizada,
              result.fecha,
              result.usuario,
              result.responsable1,
              result.responsable2,
              result.consejeria,
              result.expediente
            )
            .subscribe((actuacion) => {
              this.dataSource.push(actuacion)
              this.dataSource = [...this.dataSource]
            })
        }
      })
  })
/*

  actualizarActuacion(id: number, observaciones: string, finalizado: boolean, fecha: Date, usuario: string, responsable1: string, responsable2: string, consejeria: string, idExpediente: number): Observable<Actuaciones> {
    return this.http.put<Actuaciones>(`${this.apiRoot}/actualizar/${id}/${observaciones}/${finalizado}/${fecha}/${usuario}/${responsable1}/${responsable2}/${consejeria}/${idExpediente}`, {});
  }
  */
}

  borrarActuacion(id: number){
    this.actuacionesService.eliminarActuacion(id).subscribe((resultado) => {
      if (resultado) {
        this.dataSource = this.dataSource.filter(actuacion => actuacion.id !== id)
      }
    })
  }
}
