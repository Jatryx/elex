import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../../services/servicioDocumentos/documentos.service';
import { Documentos } from '../../models/modeloDocumentos/documentos.model';
import { FormulariosExpedientesComponent } from '../formularios-expedientes/formularios-expedientes.component';
import { MatDialog } from '@angular/material/dialog';
import { FormulariosDocumentosComponent } from '../formularios-documentos/formularios-documentos.component';

@Component({
  selector: 'app-vista-documentos',
  templateUrl: './vista-documentos.component.html',
  styleUrl: './vista-documentos.component.css'
})
export class VistaDocumentosComponent {

  dataSource: Documentos[]  = [];
  displayedColumns: string[] = ['id','nombreDocumento' , 'precio', 'descripcion', 'expedientes', 'acciones'];

  constructor(
    private documentosService: DocumentosService,
    private dialog: MatDialog
  ) {} 
  ngOnInit(): void {
    console.log("hola");
    this.documentosService.consultarExistentes().subscribe((documentos)=> this.dataSource = documentos)
    console.log(this.dataSource);
  }

  modalInsertarDocumentos(): void {
    const dialogoInsertar = this.dialog.open(FormulariosDocumentosComponent, {
        width: '23%',
        data: {
            precio: 0,
            nombreDocumento: '',
            descripcion: '',
            expedientes: 0,
        },
    })

    dialogoInsertar.afterClosed().subscribe((result) => {
        if (result) {
            this.documentosService
                .insertarDocumento(
                    result.precio,
                    result.nombreDocumento,
                    result.descripcion,
                    result.expedientes
                )
                .subscribe((documentos) => {
                    this.dataSource.push(documentos)
                    this.dataSource = [...this.dataSource]
                })
        }
    })

  }


  modalActualizarDocumentos(id: number): void {
    console.log(Number(id));
    this.documentosService.obtenerDocumentoPorId(id).subscribe(documentos => {
      if (documentos && documentos.idExpediente) {
        const dialogoActualizar = this.dialog.open(FormulariosDocumentosComponent, {
          width: '23%',
          data: {
            id: documentos.id,
            precio: documentos.precio,
            nombreDocumento: documentos.nombreDocumento,
            descripcion: documentos.descripcion,
            expedientes: documentos.idExpediente.id,
          },
        });
  
        dialogoActualizar.afterClosed().subscribe((result) => {
          if (result) {
            this.documentosService
              .actualizarDocumento(
                result.id,
                result.precio,
                result.nombreDocumento,
                result.descripcion,
                result.expedientes,
              )
              .subscribe((expediente) => {
                const index = this.dataSource.findIndex(d => d.id === expediente.id);
                if (index > -1) {
                  this.dataSource[index] = expediente;
                } else {
                  this.dataSource.push(expediente);
                }
                this.dataSource = [...this.dataSource];
              })
          }
        })
      } else {
        console.log('documentos o documentos.idExpediente es undefined');
      }
    });
  }

  borrarDocumentos(id: number): void {
    this.documentosService.eliminarDocumento(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(d => d.id !== id);
    });
  }
  
}
