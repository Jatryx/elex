import { Component, OnInit} from '@angular/core';
import { TipoExpedienteService } from '../../services/servicioTiposExpediente/tipo-expediente.service';
import { TipoExpediente } from '../../models/modeloTipoExpediente/tipo-expediente.model';
import { FormulariosExpedientesComponent } from '../formularios-expedientes/formularios-expedientes.component';
import { MatDialog } from '@angular/material/dialog';
import { FormulariosTipoExpedienteComponent } from '../../formularios-tipo-expediente/formularios-tipo-expediente.component';


@Component({
  selector: 'app-vista-tipos-expedientes',
  templateUrl: './vista-tipos-expedientes.component.html',
  styleUrl: './vista-tipos-expedientes.component.css'
})
export class VistaTiposExpedientesComponent {

  dataSource: TipoExpediente[] = [];
  displayedColumns: string[] = ['id','materia','acciones'];
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
        width: '23%',
        data: {
            materia: '',
        },
    })

    dialogoInsertar.afterClosed().subscribe((result) => {
      let materia = result.materia
        if (result) {
            this.tiposExpedienteService
                .addTipoExpediente(
                  materia,
                   
                )
                .subscribe((tiposExpediente) => {
                    this.dataSource.push(tiposExpediente)
                    this.dataSource = [...this.dataSource]
                })
        }
    })
  }

  modalActualizarExpediente(id: number): void {
    this.tiposExpedienteService.obtenerTipoPorId(id).subscribe(tipoExpediente => {
      const dialogoActualizar = this.dialog.open(FormulariosTipoExpedienteComponent, {
        width: '23%',
        data: {
          materia: tipoExpediente.materia,
        },
      })

      dialogoActualizar.afterClosed().subscribe((result) => {
        if (result) {
          this.tiposExpedienteService
            .updateTipoExpediente(
              id,
              result.materia,
            )
            .subscribe((tipoExpediente) => {
              this.dataSource.push(tipoExpediente)
              this.dataSource = [...this.dataSource]
            })
    }
  })
    })
  }


  borrarExpediente(id: number): void {
    this.tiposExpedienteService.borrarTipo(id).subscribe(() => {
        this.dataSource = this.dataSource.filter((tipoExpediente) => tipoExpediente.id !== id)
    })
  }
}
