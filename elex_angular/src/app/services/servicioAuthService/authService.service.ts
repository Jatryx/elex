import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:8101/login';

  constructor(private http: HttpClient) { }

/*
  login(username: string, password: string): Observable<any> {
    const body = { username: username, password: password };
    return this.http.post(this.apiUrl + '/login', body);
  }
  */
  login(username: string, password: string): Observable<any> {
     console.log(this.apiUrl, {username, password});
    return this.http.post<any>(this.apiUrl, {username, password}).pipe(
     
      tap(response => {
        // Guardar el token de autenticación en el almacenamiento local
        localStorage.setItem('authToken', response.token);
      })
    );
  }
  
}
