import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/servicioAuthService/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private authService: AuthServiceService, private router: Router) {}

  logout() {
    // Llamar al método de logout del servicio de autenticación
    this.authService.logout();

    // Redirigir al componente de inicio de sesión
    this.router.navigate(['/login']);
  }
}
