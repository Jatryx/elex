import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Actuaciones } from '../../models/modeloActuaciones/actuaciones.model';


@Injectable({
  providedIn: 'root'
})
export class ActuacionesService {

  private apiRoot = 'http://localhost:8101/api/actuaciones';
  constructor( private http: HttpClient) { }

  consultarExistentes(): Observable<Actuaciones[]> {
    return this.http.get<Actuaciones[]>(`${this.apiRoot}/consultarExistentes`);
  }

  consultarBorradas(): Observable<Actuaciones[]> {
    return this.http.get<Actuaciones[]>(`${this.apiRoot}/consultarBorradas`);
  }

  insertarActuacion(observaciones: string, finalizado: boolean, fecha: Date, usuario: string, responsable1: string, responsable2: string, consejeria: string, idExpediente: number): Observable<Actuaciones> {
    return this.http.post<Actuaciones>(`${this.apiRoot}/insertar/${observaciones}/${finalizado}/${fecha}/${usuario}/${responsable1}/${responsable2}/${consejeria}/${idExpediente}`, {});
  }

  actualizarActuacion(id: number, observaciones: string, finalizado: boolean, fecha: Date, usuario: string, responsable1: string, responsable2: string, consejeria: string, idExpediente: number): Observable<Actuaciones> {
    return this.http.put<Actuaciones>(`${this.apiRoot}/actualizar/${id}/${observaciones}/${finalizado}/${fecha}/${usuario}/${responsable1}/${responsable2}/${consejeria}/${idExpediente}`, {});
  }

  eliminarActuacion(id: number): Observable<Actuaciones> {
    return this.http.delete<Actuaciones>(`${this.apiRoot}/eliminar/${id}`);
  }

  obtenerActuacionesPorExpediente(idExpediente: number): Observable<Actuaciones[]> {
    return this.http.get<Actuaciones[]>(`${this.apiRoot}/consultarPorExpediente/${idExpediente}`);
  }

  obtenerActuacionesPorResponsableAndFecha(usuario: string, fecha: string): Observable<Actuaciones[]> {
    return this.http.get<Actuaciones[]>(`${this.apiRoot}/consultarPorUsuarioAndFecha/${usuario}/${fecha}`);
  }

  obtenerActuacionesPorId(id: number): Observable<Actuaciones> {
    return this.http.get<Actuaciones>(`${this.apiRoot}/consultarPorId/${id}`);
  }
  
}
