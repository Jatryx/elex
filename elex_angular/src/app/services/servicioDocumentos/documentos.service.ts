import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Documentos } from '../../models/modeloDocumentos/documentos.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  private apiRoot = 'http://localhost:8101/api/documentos';

  constructor(private http: HttpClient) { }

  consultarExistentes(): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(`${this.apiRoot}/consultarExistentes`);
  }

  consultarBorrados(): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(`${this.apiRoot}/consultarBorrados`);
  }

  insertarDocumento(precio: number, nombreDocumento: string, descripcion: string, idExpediente: number): Observable<Documentos> {
    console.log(`${this.apiRoot}/insertar/${precio}/${nombreDocumento}/${descripcion}/${idExpediente}`)
    return this.http.post<Documentos>(`${this.apiRoot}/insertar/${precio}/${nombreDocumento}/${descripcion}/${idExpediente}`, {});
  }

  actualizarDocumento(id: number, precio: number, nombreDocumento: string, descripcion: string, idExpediente: number, idActuaciones: number): Observable<Documentos> {
    return this.http.put<Documentos>(`${this.apiRoot}/actualizar/${id}/${precio}/${nombreDocumento}/${descripcion}/${idExpediente}/${idActuaciones}`, {});
  }

  eliminarDocumento(id: number): Observable<Documentos> {
    return this.http.delete<Documentos>(`${this.apiRoot}/eliminar/${id}`);
  }

  generatePdfAndSave(id: number, idExpediente: number, idActuacion: number): Observable<void> {
    return this.http.post<void>(`${this.apiRoot}/generatePdfPorBlop/${id}/${idExpediente}/${idActuacion}`, {});
  }

  readPdf(id: number): Observable<Blob> {
    console.log(`${this.apiRoot}/readPdf/${id}`);
    return this.http.get<Blob>(`${this.apiRoot}/readPdf/${id}`, { responseType: 'blob' as 'json' });
  }

  readPdfPorRuta(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiRoot}/readPdfPorRuta/${id}`, { responseType: 'blob' as 'json' });
  }

  generatePdfAndSaveToFile(id: number, idExpediente: number, idActuacion: number): Observable<void> {
    return this.http.post<void>(`${this.apiRoot}/generatePdfPorRuta/${id}/${idExpediente}/${idActuacion}`, {});
  }

  obtenerDocumentosPorExpediente(idExpediente: number): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(`${this.apiRoot}/documentosExpediente/${idExpediente}`);
  }

  obtenerNombreDocumento(nombreDocumento: string): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(`${this.apiRoot}/documentosNombre/${nombreDocumento}`);
  }

  obtenerDocumentoPorId(id: number): Observable<Documentos> {
    console.log(`${this.apiRoot}/obtenerPorId/${id}`);
    return this.http.get<Documentos>(`${this.apiRoot}/obtenerPorId/${id}`);
  }

  descargarPdf(idDocumento: number): Observable<Blob> {
    const url = `${this.apiRoot}/descargar/${idDocumento}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
