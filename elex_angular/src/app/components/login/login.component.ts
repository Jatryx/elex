import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/servicioAuthService/authService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rol: String = 'ADMIN';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      success => {
        console.log('Inicio de sesión exitoso');
        // Aquí puedes redirigir al usuario o hacer algo más
      },
      error => {
        console.log('Error en el inicio de sesión', error);
        // Aquí puedes manejar el error, como mostrar un mensaje al usuario
      }
    );
  }
}
