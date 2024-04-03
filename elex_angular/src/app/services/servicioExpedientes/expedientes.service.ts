import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Expedientes } from '../../models/modeloExpedientes/expedientes.model';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {

  private apiRoot = 'http://localhost:8101/api/expedientes';
  constructor(private http: HttpClient) { }

  consultarExistentes(): Observable<Expedientes[]> {
    return this.http.get<Expedientes[]>(`${this.apiRoot}/consultarExistentes`);
  }

  consultarBorrados(): Observable<Expedientes[]> {
    return this.http.get<Expedientes[]>(`${this.apiRoot}/consultarBorrados`);
  }

  insertarExpediente(fecha: Date, estado: string, opciones: string, descripcion: string, idTiposExpediente: number): Observable<Expedientes> {
    const ruta = `${this.apiRoot}/insertar/${fecha}/${estado}/${opciones}/${descripcion}/${idTiposExpediente}`;
    return this.http.post<Expedientes>(`${this.apiRoot}/insertar/${fecha}/${estado}/${opciones}/${descripcion}/${idTiposExpediente}`, {});
  }

  updateExpediente(id: number, fecha: string, estado: string, opciones: string, descripcion: string, idTiposExpediente: number): Observable<Expedientes> {
    return this.http.put<Expedientes>(`${this.apiRoot}/actualizar/${id}/${fecha}/${estado}/${opciones}/${descripcion}/${idTiposExpediente}`, {});
  }

  borrarExpediente(id: number): Observable<Expedientes> {
    return this.http.delete<Expedientes>(`${this.apiRoot}/borrar/${id}`);
  }

  consultarPorTipo(idTipo: number): Observable<Expedientes[]> {
    return this.http.get<Expedientes[]>(`${this.apiRoot}/consultarPorTipo/${idTipo}`);
  }

  consultarPorEstadoYFecha(estado: string, fecha: string): Observable<Expedientes[]> {
    return this.http.get<Expedientes[]>(`${this.apiRoot}/consultarPorEstadoYFecha/${estado}/${fecha}`);
  }

  consultarPorNig(nig: string): Observable<Expedientes> {
    return this.http.get<Expedientes>(`${this.apiRoot}/consultarPorNig/${nig}`);
  }

  restaurarExpediente(id: number): Observable<any> {
    return this.http.put(`${this.apiRoot}/restaurar/${id}`, null);
  }
}
