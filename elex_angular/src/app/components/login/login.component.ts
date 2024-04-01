import { Component } from '@angular/core';
import { LoginService } from '../../services/servicioLogin/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
 

  constructor(private loginService: LoginService, private router: Router) {}
  /*
  onSubmit() {
    this.loginService.login(this.username, this.password)
      .subscribe((data: any) => { // Explicitly type data as any
        // Almacenar el token JWT en el almacenamiento local
        localStorage.setItem('token', data.token);
        // Redireccionar a la página principal o a la página deseada
        this.router.navigate(['/formularios-expediente']);
      }, error => {
        // Manejar errores de autenticación
      });
  }
*/
}
