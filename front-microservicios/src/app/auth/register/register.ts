import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],   // <--- ESTO ES LO QUE FALTABA
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  form = {
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    tipo_documento: '',
    nro_documento: ''
  };

  constructor(private clienteService: ClienteService, private router: Router) {}

  registrar() {
    this.clienteService.registrarCliente(this.form).subscribe({
      next: () => {
        alert("Registrado exitosamente");
        this.router.navigate(['/login']);
      },
      error: () => alert("Error al registrar")
    });
  }
}
