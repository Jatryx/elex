import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TipoExpediente } from '../../models/modeloTipoExpediente/tipo-expediente.model';

@Injectable({
  providedIn: 'root'
})
export class TipoExpedienteService {

  private apiRoot = 'http://localhost:8101/api/tipos_expediente';
  constructor(private http: HttpClient) { }


  // Agregar un nuevo tipo de expediente
  addTipoExpediente(materia: string): Observable<TipoExpediente> {
    const ruta = `${this.apiRoot}/insertar/${materia}`;
    return this.http.post<TipoExpediente>(ruta, {});
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

  // Obtener todos los tipos de expediente existentes
  getTiposExpediente(): Observable<TipoExpediente[]> {
    const url = `${this.apiRoot}/consultarExistentes`;
    return this.http.get<TipoExpediente[]>(url);
  }

  // Actualizar un tipo de expediente
  updateTipoExpediente(id: number, materia: string): Observable<TipoExpediente> {
    const url = `${this.apiRoot}/actualizar/${id}/${materia}`;
    return this.http.put<TipoExpediente>(url, {});
  }

  // Borrado lógico de un tipo de expediente
  borrarTipo(id: number): Observable<void> {
    const url = `${this.apiRoot}/borrar/${id}`;
    return this.http.delete<void>(url);
  }

  obtenerTipoPorId(id: number): Observable<TipoExpediente> {
    return this.http.get<TipoExpediente>(`${this.apiRoot}/obtenerPorId/${id}`);
  }
}
