import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
    return this.http.post<any>(this.apiUrl, {username, password}).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        } else {
          console.error('La respuesta del servidor no contiene un token:', response);
        }
      })
    );
  }
  
}
