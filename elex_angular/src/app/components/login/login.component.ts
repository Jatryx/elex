import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/servicioAuthService/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService, private router:Router) {}

  login() {
    const credentials = { usuario: this.username, password: this.password };
    this.authService.login(credentials).subscribe(
      () => {
  
        // Obtener el token y mostrarlo
        const token = this.authService.getToken();
        console.log('Token:', token);
  
        // Verificar si el token se ha guardado correctamente en el almacenamiento local
        if (this.authService.isLoggedIn()) {
          console.log('Token presente en el almacenamiento local.');
        } else {
          console.error('No se encontró el token en el almacenamiento local.');
        }
  
        this.router.navigate(['inicio']);
      },  
      error => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
}
