import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:8101/api/loginUsuario';
  private tokenKey = 'authToken'; // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient) {}

  login(credentials: { usuario: string, password: string }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, JSON.stringify(credentials), httpOptions).pipe(
      tap(response => {
        // Si la respuesta contiene un token, lo guardamos en localStorage
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud:', error);
        throw error;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Devuelve el token guardado en localStorage
  }

  isLoggedIn(): boolean {
    // Verificar si el token está presente en el almacenamiento local
    const token = localStorage.getItem(this.tokenKey);
    
    // Imprimir el token en la consola para verificar su valor
    console.log('Token recuperado del almacenamiento local:', token);
    
    // Devolver true si el token existe, de lo contrario, devolver false
    return !!token;
  }

  logout(): void {
    // Eliminar cualquier información de sesión almacenada, como el token de acceso
    localStorage.removeItem(this.tokenKey);
    // Otros pasos que puedas necesitar realizar al cerrar sesión
  }
}
