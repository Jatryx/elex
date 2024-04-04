import { Component, OnInit} from '@angular/core';
import { TipoExpedienteService } from '../../services/servicioTiposExpediente/tipo-expediente.service';
import { TipoExpediente } from '../../models/modeloTipoExpediente/tipo-expediente.model';
import { MatDialog } from '@angular/material/dialog';
import { FormulariosTipoExpedienteComponent } from '../../formularios-tipo-expediente/formularios-tipo-expediente.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-tipos-expedientes',
  templateUrl: './vista-tipos-expedientes.component.html',
  styleUrl: './vista-tipos-expedientes.component.css'
})
export class VistaTiposExpedientesComponent {

  dataSource: TipoExpediente[] = [];
  dataSourceEliminados: TipoExpediente[] = [];
  displayedColumns: string[] = ['materia','acciones'];
  constructor(
    private tiposExpedienteService: TipoExpedienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void{
    this.tiposExpedienteService.getTiposExpedienteExistentes().subscribe((tiposExpediente)=> this.dataSource = tiposExpediente)
    console.log(this.dataSource);
  }

  modalInsertarTipoExpediente(): void {
    const dialogoInsertar = this.dialog.open(FormulariosTipoExpedienteComponent, {
      width: '14%',
      height: '20%',
      data: {
        materia: '',
      },
    })
  
    dialogoInsertar.afterClosed().subscribe((result) => {
      let materia = result.materia
      if (result) {
        this.tiposExpedienteService
          .addTipoExpediente(materia)
          .subscribe((tiposExpediente) => {
            this.dataSource.push(tiposExpediente)
            this.dataSource = [...this.dataSource]
  
            Swal.fire({
              title: 'Tipo de expediente insertado',
              icon: 'success'
            });
          })
      }
    })
  }

  isLoading = false;

  modalActualizarTipoExpediente(id: number): void {
  this.tiposExpedienteService.obtenerTipoPorId(id).subscribe(tipoExpediente => {
    const dialogoActualizar = this.dialog.open(FormulariosTipoExpedienteComponent, {
      width: '14%',
      height: '20%',
      data: {
        materia: tipoExpediente.materia,
      },
    })

    dialogoActualizar.afterClosed().subscribe((result) => {
      if (result) {
        this.tiposExpedienteService
          .updateTipoExpediente(id, result.materia)
          .subscribe((tipoExpedienteActualizado) => {
            const index = this.dataSource.findIndex(tipoExpediente => tipoExpediente.id === tipoExpedienteActualizado.id);
            if (index !== -1) {
              this.dataSource[index] = tipoExpedienteActualizado;
            } else {
              this.dataSource.push(tipoExpedienteActualizado);
            }
            this.dataSource = [...this.dataSource];

            Swal.fire({
              title: 'Tipo de expediente actualizado',
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
  })
}
  
borrarTipoExpediente(id: number): void {
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
      this.tiposExpedienteService.borrarTipo(id).subscribe(() => {
        this.dataSource = this.dataSource.filter((tipoExpediente) => tipoExpediente.id !== id)

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
verEliminados(): void {
  this.mostrarEliminados = true;
  this.tiposExpedienteService.getTiposExpedienteBorrados().subscribe((tiposExpedienteBorrados) => {
    this.dataSourceEliminados = tiposExpedienteBorrados;
    Swal.fire({
      title: 'Expedientes eliminados',
      text: 'Se han cargado los expedientes eliminados.',
      icon: 'info'
    });
  }, error => {
    Swal.fire({
      title: 'Error',
      text: 'Hubo un error al cargar los expedientes eliminados.',
      icon: 'error'
    });
  });
}

verExistentes(): void {
  this.mostrarEliminados = false;
  Swal.fire({
    title: 'Expedientes existentes',
    text: 'Se han cargado los expedientes existentes.',
    icon: 'info'
  });
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

restaurarTipoExpediente(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, restauralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.tiposExpedienteService.restaurarTipo(id).subscribe(() => {
        this.dataSourceEliminados = this.dataSourceEliminados.filter((tipoExpediente) => tipoExpediente.id !== id)

        Swal.fire('Restaurado!', 'El expediente ha sido restaurado.', 'success');
      })
    } else {
      Swal.fire({
        title: 'No se ha restaurado',
        text: 'El expediente no ha sido restaurado.',
        icon: 'error'
      });
    }
  })
  }

  dataSourceFiltrada: TipoExpediente[] = [];
  filtro: string = '';
  filtrarTipoExpedientesExistentes(): void {
    this.tiposExpedienteService.getTiposExpedienteExistentes().subscribe((tiposExpediente) => {
      this.dataSourceFiltrada = tiposExpediente;
      if (this.filtro) {
        this.dataSource = this.dataSourceFiltrada.filter((tipoExpediente) => 
          tipoExpediente.materia.toLowerCase().includes(this.filtro.toLowerCase())
        );
      } else {
        this.tiposExpedienteService.getTiposExpedienteExistentes().subscribe((tiposExpediente) => 
        this.dataSource = tiposExpediente)
      }
    });
  }
  
  dataSourceEliminadosFiltrada: TipoExpediente[] = [];
  filtroBorrado: string = '';
  
  filtrarTipoExpedientesBorrados(): void {
    this.tiposExpedienteService.getTiposExpedienteBorrados().subscribe((tiposExpedienteBorrados) => {
      this.dataSourceEliminadosFiltrada = tiposExpedienteBorrados;
      if (this.filtroBorrado) {
        this.dataSourceEliminados = this.dataSourceEliminadosFiltrada.filter((tipoExpediente) => 
          tipoExpediente.materia.toLowerCase().includes(this.filtroBorrado.toLowerCase())
        );
      } else {
        this.tiposExpedienteService.getTiposExpedienteBorrados().subscribe((tiposExpedienteBorrados) => 
        this.dataSourceEliminados = tiposExpedienteBorrados)
      }
    });
  }

}
