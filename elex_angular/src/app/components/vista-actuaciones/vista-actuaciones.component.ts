import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { Actuaciones } from '../../models/modeloActuaciones/actuaciones.model';
import { ActuacionesService } from '../../services/servicioActuaciones/actuaciones.service';
import { FormulariosActuacionesComponent } from '../formularios-actuaciones/formularios-actuaciones.component';
import Swal from 'sweetalert2';
import { Expedientes } from '../../models/modeloExpedientes/expedientes.model';
import { ExpedientesService } from '../../services/servicioExpedientes/expedientes.service';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-vista-actuaciones',
  templateUrl: './vista-actuaciones.component.html',
  styleUrl: './vista-actuaciones.component.css'
})
export class VistaActuacionesComponent {
  expedientes: Expedientes[] = [];
  dataSource: Actuaciones[]  = [];
  displayedColumns: string[] = ['observaciones', 'finalizado', 'fecha', 'usuario', 'responsable1', 'responsable2', 'consejeria', 'expediente', 'acciones'];

  constructor(
    private actuacionesService: ActuacionesService,
    private expedientesService: ExpedientesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.actuacionesService.consultarExistentes().subscribe((actuacion)=> this.dataSource = actuacion)
    this.expedientesService.consultarExistentes().subscribe((expediente) => this.expedientes = expediente)
  }

  modalInsertarActuacion(): void {
    const dialogoInsertar = this.dialog.open(FormulariosActuacionesComponent, {
        width: '15%',
        height: '67%',
        data: {
            observaciones: '',
            finalizado: false,
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
                    result.finalizado,
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

  isLoading = false;
  modalActualizarActuacion(id: number){
    this.actuacionesService.obtenerActuacionesPorId(id).subscribe(actuacion => {
      console.log(actuacion.finalizado);
      const dialogoActualizar = this.dialog.open(FormulariosActuacionesComponent, {
        width: '15%',
        height: '67%',
        data: {
          observaciones: actuacion.observaciones,
          finalizado: actuacion.finalizado,
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
              result.finalizado,
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
              Swal.fire({
                title: 'Actuaciones actualizada',
                icon: 'success'
              }).then(() => {
                this.isLoading = true;
                setTimeout(() => {
                  this.isLoading = false;
                }, 1000);
                window.location.reload();
              });
            }, error => {
              setTimeout(() => {
                this.isLoading = false;
              }, 1000);
            })
        }
      })
  })
}

  borrarActuacion(id: number){
    this.actuacionesService.eliminarActuacion(id).subscribe((resultado) => {
      if (resultado) {
        this.dataSource = this.dataSource.filter(actuacion => actuacion.id !== id)
      }
    })
  }

  mostrarEliminados: boolean = false;
  verEliminados(){
    this.mostrarEliminados = true;
    this.actuacionesService.consultarBorradas().subscribe((actuacion) => {
      this.dataSource = actuacion;
      Swal.fire({
        title: 'Actuaciones eliminadas',
        text: 'Las actuaciones eliminadas se han mostrado correctamente.',
        icon: 'success'
      });
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'No se han podido mostrar las actuaciones eliminadas.',
        icon: 'error'
      });
    });
  }

  verExistentes(){
    this.mostrarEliminados = false;
    this.actuacionesService.consultarExistentes().subscribe((actuacion) => {
      this.dataSource = actuacion;
      Swal.fire({
        title: 'Actuaciones existentes',
        text: 'Las actuaciones existentes se han mostrado correctamente.',
        icon: 'success'
      });
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'No se han podido mostrar las actuaciones existentes.',
        icon: 'error'
      });
    });
  }

  restaurarActuacion(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, restaurar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.actuacionesService.restaurarActuacion(id).subscribe(() => {
        this.dataSource = this.dataSource.filter((actuacion) => actuacion.id !== id)
        Swal.fire('Restaurado!', 'La actuación ha sido restaurada.', 'success');
      })
    } else {
      Swal.fire({
        title: 'No se ha restaurado',
        text: 'La actuación no ha sido restaurada.',
        icon: 'error'
      });
    }
  })
  } 

  filtro = new FormControl();
  filtrarPorExpedientes() {
    this.actuacionesService.obtenerActuacionesPorExpediente(this.filtro.value).subscribe((actuacion) => {
      this.dataSource = actuacion;
    })
    
  }

  borrarFiltro() {
    this.actuacionesService.consultarExistentes().subscribe((actuacion) => {
      this.dataSource = actuacion;
    })
      this.filtro.reset(); 
  }

  borrarFiltroBorrado(){
    this.actuacionesService.consultarBorradas().subscribe((actuacion) => {
      this.dataSource = actuacion;
    })
      this.filtro.reset();
  }

  
}
