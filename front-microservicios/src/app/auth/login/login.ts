import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  usuario = '';
  password = '';

  constructor(
    private auth: AuthService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  iniciar() {

    // ADMIN
    if (this.usuario === 'Admin' && this.password === 'Admin123') {
      this.auth.iniciarSesion('admin', {});
      this.router.navigate(['/']);
      return;
    }

    // CLIENTE NORMAL
    this.clienteService.listarClientes().subscribe(clientes => {
      const cliente = clientes.find(
        c => c.nombre.toLowerCase() === this.usuario.toLowerCase()
        && c.nro_documento === this.password
      );

      if (!cliente) {
        alert("Credenciales incorrectas");
        return;
      }

      this.auth.iniciarSesion('cliente', cliente);
      this.router.navigate(['/']);
    });
  }
}
