import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MotoService } from '../services/moto.service';
import { SolicitudService } from '../services/solicitud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitudes.html',
  styleUrls: ['./solicitudes.css']
})
export class Solicitudes implements OnInit {

  usuario: any = null;
  motos: any[] = [];

  form = {
    descripcion_problema: '',
    prioridad: 'media',
    estado: 'pendiente',
    id_moto: 0,
    id_cliente: 0
  };

  constructor(
    private auth: AuthService,
    private motoService: MotoService,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.auth.usuarioActual();
    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.form.id_cliente = this.usuario.id_cliente;

    this.motoService
      .obtenerMotosPorCliente(this.usuario.id_cliente)
      .subscribe(data => this.motos = data);
  }

  enviar() {
    this.solicitudService.crearSolicitud(this.form).subscribe({
      next: () => {
        alert("Solicitud enviada exitosamente");
        this.router.navigate(['/']);
      },
      error: () => alert("Error al enviar la solicitud")
    });
  }
}
