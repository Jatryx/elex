import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../services/servicioExpedientes/expedientes.service';
import { Expedientes } from '../../models/modeloExpedientes/expedientes.model';
import { FormulariosExpedientesComponent } from '../formularios-expedientes/formularios-expedientes.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-expedientes',
  templateUrl: './vista-expedientes.component.html',
  styleUrl: './vista-expedientes.component.css'
})

export class VistaExpedientesComponent implements OnInit{

  dataSource: Expedientes[]  = [];
  dataSourceEliminados: Expedientes[] = [];
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
  
                  Swal.fire({
                      title: 'Expediente insertado',
                      text: 'El expediente ha sido insertado con éxito',
                      icon: 'success'
                  });
              }, (error) => {
                  Swal.fire({
                      title: 'Error',
                      text: 'Ha ocurrido un error al insertar el expediente',
                      icon: 'error'
                  });
              })
      }
  })
}
isLoading = false;

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
        this.isLoading = true;
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
                  this.dataSource.push(expediente);
                  this.dataSource = [...this.dataSource];
                  Swal.fire({
                    title: 'Expediente actualizado',
                    icon: 'success'
                  }).then(() => {
                    this.isLoading = true;
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 1000);
                });
                }, error => {
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 1000);
                })
              }
  })
  });
  
}

borrarExpediente(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, bórralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.expedientesService.borrarExpediente(id).subscribe(() => {
        this.dataSource = this.dataSource.filter((expediente) => expediente.id !== id);

        Swal.fire('Borrado!', 'El expediente ha sido borrado.', 'success');
      })
    } else {
      Swal.fire({
        title: 'No se ha borrado',
        text: 'El expediente no ha sido borrado.',
        icon: 'error'
      });
    }
  })
}

mostrarEliminados: boolean = false;
verEliminados(): void{
  this.mostrarEliminados = true;
  this.expedientesService.consultarBorrados().subscribe((expediente) => {
    this.dataSourceEliminados = expediente;
    Swal.fire({
      title: 'Expedientes eliminados',
      text: 'Se han eliminado los expedientes',
      icon: 'success'
    });
  }, error => {
    Swal.fire({
      title: 'No se han eliminado',
      text: 'No se han eliminado los expedientes',
      icon: 'error'
    });
  });

}

verExistentes(): void{
  this.mostrarEliminados = false;
  Swal.fire({
    title: 'Expedientes existentes',
    text: 'Se han cargado los expedientes existentes',
    icon: 'info'
  });
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
  
  restaurarExpediente(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, restaurar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.expedientesService.restaurarExpediente(id).subscribe(() => {
          this.dataSourceEliminados = this.dataSourceEliminados.filter((expediente) => expediente.id !== id);
          Swal.fire({
            title: 'Expediente restaurado',
            text: 'El expediente ha sido restaurado',
            icon: 'success'
          });
        })
      } else {
        Swal.fire({
          title: 'No se ha restaurado',
          text: 'El expediente no ha sido restaurado',
          icon: 'error'
        });
      }
    });
  }

  dataSourceFiltarda: Expedientes[] = [];
  filtro: string = '';
  filtrarExpedientesExistente(): void {
    this.expedientesService.consultarExistentes().subscribe((expediente) => {
    this.dataSourceFiltarda = expediente;
    if(this.filtro) {
      this.dataSource = this.dataSourceFiltarda.filter((expediente) => 
        expediente.nig.toLowerCase().includes(this.filtro.toLowerCase())
      );
    } else {
      this.expedientesService.consultarExistentes().subscribe((expepediente) => this.dataSource = expepediente)
    }
    });
  }
  
  dataSourceFiltradaEliminada: Expedientes[] = [];
  filtroBorrado: string = '';
  filtrarExpedientesBorrados(): void{
    this.expedientesService.consultarBorrados().subscribe((expediente) => {
      this.dataSourceFiltradaEliminada = expediente
    if(this.filtroBorrado) {
      this.dataSourceEliminados = this.dataSourceFiltradaEliminada.filter((expediente) => 
      expediente.nig.toLowerCase().includes(this.filtroBorrado.toLowerCase())
      );
    } else {
      this.expedientesService.consultarBorrados().subscribe((expedientesBorrados) => this.dataSourceEliminados = expedientesBorrados)
    }
    });
  }


}
