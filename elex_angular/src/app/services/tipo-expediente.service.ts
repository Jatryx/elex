import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TipoExpediente } from '../models/tipo-expediente.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TipoExpedienteService {

  private apiRoot = environment.apiRoot + '/api/tipos_expediente';
  constructor( private http: HttpClient) { }

  // Agregar un nuevo tipo de expediente
  addTipoExpediente(tipoExpediente: TipoExpediente): Observable<TipoExpediente> {
    let nuevoTipoExpediente: TipoExpediente = {
      id: 0,
      materia: tipoExpediente.materia,
      borrado: false,
      expedientes: []
    };
  
    const url = `${this.apiRoot}/insertar/${nuevoTipoExpediente.materia}`;
    return this.http.post<TipoExpediente>(url, nuevoTipoExpediente);
  }

  // Obtener todos los tipos de expediente existentes
  getTiposExpedienteExistentes(): Observable<TipoExpediente[]> {
    const url = `${this.apiRoot}/consultarExistentes`;
    return this.http.get<TipoExpediente[]>(url);
  }

  // Obtener todos los tipos de expediente borrados
  getTiposExpedienteBorrados(): Observable<TipoExpediente[]> {
    const url = `${this.apiRoot}/consultarBorrados`;
    return this.http.get<TipoExpediente[]>(url);
  }

  // Actualizar un tipo de expediente
  updateTipoExpediente(tipoExpediente: TipoExpediente): Observable<TipoExpediente> {
    let tipoExpedienteActualizado: TipoExpediente = {
      id: tipoExpediente.id,
      materia: tipoExpediente.materia,
      borrado: tipoExpediente.borrado,
      expedientes: []
    };
    const url = `${this.apiRoot}/actualizar/${tipoExpediente.id}/${tipoExpediente.materia}`;
    return this.http.put<TipoExpediente>(url, tipoExpediente);
  }

  // Borrado lógico de un tipo de expediente
  borrarTipo(id: number): Observable<void> {
    const url = `${this.apiRoot}/borrar/${id}`;
    return this.http.delete<void>(url);
  }

}
