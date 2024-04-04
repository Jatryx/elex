import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpedientesService } from '../../services/servicioExpedientes/expedientes.service';
import { ActuacionesService } from '../../services/servicioActuaciones/actuaciones.service';
import { DocumentosService } from '../../services/servicioDocumentos/documentos.service';
import { Expedientes } from '../../models/modeloExpedientes/expedientes.model';
import { Actuaciones } from '../../models/modeloActuaciones/actuaciones.model';
import { Documentos } from '../../models/modeloDocumentos/documentos.model';


@Component({
  selector: 'app-vista-relacion-expediente',
  templateUrl: './vista-relacion-expediente.component.html',
  styleUrl: './vista-relacion-expediente.component.css'
})
export class VistaRelacionExpedienteComponent {

  constructor(private route: ActivatedRoute,
              private expedientesService: ExpedientesService,
              private actuacionesService: ActuacionesService,
              private documentosService: DocumentosService,) 
  {}

  dataExpediente: Expedientes | undefined;
  dataActuaciones: Actuaciones[] = [];
  dataDocumentos: Documentos[] = [];
  displayeConlumnsExpediente: string[] = ['nig','tipo', 'fecha'];
  displayedColumnsActuaciones: string[] = ['observaciones', 'usuario', 'responsable1', 'responsable2'];
  displayedColumnsDocumentos: string[] = [ 'nombreDocumento', 'precio']
  ngOnInit() {
    const nig = this.route.snapshot.paramMap.get('nig');
    console.log(nig);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    if(nig != null)
    {
      this.expedientesService.consultarPorNig(nig).subscribe((expediente) => this.dataExpediente = expediente);
      setTimeout(() => {
        console.log(this.dataExpediente);
      }, 2000);
      
      if (id != null) {
        this.actuacionesService.obtenerActuacionesPorExpediente(id).subscribe((actuaciones) => this.dataActuaciones = actuaciones);
        setTimeout(() => {
          console.log(this.dataActuaciones);
        }, 2000);
        this.documentosService.obtenerDocumentosPorExpediente(id).subscribe((documentos) => this.dataDocumentos = documentos);
        setTimeout(() => {
          console.log(this.dataDocumentos);
        }, 2000);
      }
    }
  }
}
