import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../../services/servicioDocumentos/documentos.service';
import { Documentos } from '../../models/modeloDocumentos/documentos.model';
import { FormulariosExpedientesComponent } from '../formularios-expedientes/formularios-expedientes.component';
import { MatDialog } from '@angular/material/dialog';
import { FormulariosDocumentosComponent } from '../formularios-documentos/formularios-documentos.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-documentos',
  templateUrl: './vista-documentos.component.html',
  styleUrl: './vista-documentos.component.css'
})
export class VistaDocumentosComponent {

  dataSource: Documentos[]  = [];
  dataSourceEliminados: Documentos[] = [];
  displayedColumns: string[] = ['nombreDocumento' , 'precio', 'descripcion', 'expedientes', 'acciones', 'pdf'];

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
      width: '17%',
      height: '60%',
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
          .subscribe((documentoInsertado) => {
            this.dataSource.push(documentoInsertado)
            this.dataSource = [...this.dataSource]
    
            if(result.actuaciones == null){
              result.actuaciones = 0;
            }
            this.documentosService.generatePdfAndSave(documentoInsertado.id, result.expedientes, result.actuaciones).subscribe(() => {
              this.documentosService.generatePdfAndSaveToFile(documentoInsertado.id, result.expedientes, result.actuaciones).subscribe(() => {
              });
            });
            
          });
      }
    });

  }


  isLoading = false;

  modalActualizarDocumentos(id: number): void {
    this.documentosService.obtenerDocumentoPorId(id).subscribe(documentos => {
      console.log(documentos.expediente);
      const dialogoActualizar = this.dialog.open(FormulariosDocumentosComponent, {
        width: '17%',
        height: '60%',
        data: {
          id: documentos.id,
          precio: documentos.precio,
          nombreDocumento: documentos.nombreDocumento,
          descripcion: documentos.descripcion,
          expedientes: documentos.expediente.id,
        },
      });
  
      dialogoActualizar.afterClosed().subscribe((result) => {
        if (result) {
          console.log(result);
          console.log(result.actuaciones)
          this.isLoading = true;
          this.documentosService
            .actualizarDocumento(
              result.id,
              result.precio,
              result.nombreDocumento,
              result.descripcion,
              result.expedientes,
              result.actuaciones
            )
            .subscribe((expediente) => {
              const index = this.dataSource.findIndex(d => d.id === expediente.id);
              if (index > -1) {
                this.dataSource[index] = expediente;
              } else {
                this.dataSource.push(expediente);
              }
              this.dataSource = [...this.dataSource];
              if(result.actuaciones == null){
                result.actuaciones = 0;
              }
              this.documentosService.generatePdfAndSave(result.id, result.expedientes, result.actuaciones).subscribe(() => {
                this.documentosService.generatePdfAndSaveToFile(result.id, result.expedientes, result.actuaciones).subscribe(() => {
                });
              });

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

  borrarDocumentos(id: number): void {
    this.documentosService.eliminarDocumento(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(d => d.id !== id);
    });
  }
  
  mostrarEliminados: boolean = false;
  verEliminados(): void {
    this.mostrarEliminados = true;
    this.documentosService.consultarBorrados().subscribe((documentos) => { 
      this.dataSourceEliminados = documentos;
    Swal.fire({
      title: 'Documentos eliminados',
      text: 'Se han mostrado los documentos eliminados',
      icon: 'info',
    });
  }, error => {
    Swal.fire({
      title: 'Error',
      text: 'No se han podido mostrar los documentos eliminados',
      icon: 'error',
    });
  });
}

  verExistentes(): void {
    this.mostrarEliminados = false;
    this.documentosService.consultarExistentes().subscribe((documentos) => {
      this.dataSource = documentos;
      Swal.fire({
        title: 'Documentos existentes',
        text: 'Se han mostrado los documentos existentes',
        icon: 'info',
      });
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'No se han podido mostrar los documentos existentes',
        icon: 'error',
      });
    });
  }

  verPdfRuta(id: number): void {
    this.documentosService.readPdfPorRuta(id).subscribe((pdf) => {
      const url = window.URL.createObjectURL(pdf);
      window.open(url, '_blank');
    });

 
  }
  
  verPdfBlob(id: number): void {
    this.documentosService.readPdf(id).subscribe((pdf) => {
      const url = window.URL.createObjectURL(pdf);
      window.open(url, '_blank');
    });
  }

  descargarPdf(id: number): void {
    this.documentosService.descargarPdf(id).subscribe((pdf) => {
      const url = window.URL.createObjectURL(pdf);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'documento' + id + '.pdf'; // Puedes cambiar esto por el nombre que prefieras
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  restaurarDocumento(id: number): void {
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
        this.documentosService.restaurarDocumento(id).subscribe(() => {
          this.dataSourceEliminados = this.dataSourceEliminados.filter((documento) => documento.id !== id);
          Swal.fire('Restaurado', 'El documento ha sido restaurado', 'success');
        });
      } else {
        Swal.fire({
          title: 'No se ha restaurado',
          text: 'El documento no ha sido restaurado.',
          icon: 'error'
        });
      }
    });
  }

  dataSourceDocumentosFiltrada: Documentos[] = [];
  filtro: string = '';
  filtrarPorNombreDocumento(): void {
    this.documentosService.consultarExistentes().subscribe((documentos) => {
      this.dataSourceDocumentosFiltrada = documentos;
    if (this.filtro) {
      this.dataSource = this.dataSourceDocumentosFiltrada.filter((documento) => documento.nombreDocumento.toLowerCase().includes(this.filtro.toLowerCase()));
    } else {
      this.documentosService.consultarExistentes().subscribe((documentos) => this.dataSource = documentos);
    }
    });
  }

  dataSourceEliminadosFiltrada: Documentos[] = [];
  filtroBorrado: string = '';
  filtrarPorNombreDocumentoBorrado(): void {
    this.documentosService.consultarBorrados().subscribe((documentos) => {
      this.dataSourceEliminadosFiltrada = documentos;
    if (this.filtroBorrado) {
      this.dataSourceEliminados = this.dataSourceEliminadosFiltrada.filter((documento) => 
      documento.nombreDocumento.toLowerCase().includes(this.filtroBorrado.toLowerCase()));
    } else {
      this.documentosService.consultarBorrados().subscribe((documentos) => this.dataSourceEliminados = documentos);
    }
  });
  }
}
