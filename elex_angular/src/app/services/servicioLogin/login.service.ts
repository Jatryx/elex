import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8101';

  constructor(private http: HttpClient) { }


  login(username: string, password: string, role: string) {
    username = 'soltel';
    password = 'admin';
    role = 'ADMIN';
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password, role });
  }
  
}
