import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SolicitudService } from '../../services/solicitud.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  usuario: any = null;
  solicitudes: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {
    this.usuario = this.auth.usuarioActual();

    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarSolicitudes();
  }

  cargarSolicitudes() {

    if (this.usuario.tipo === 'admin') {

      this.solicitudService.obtenerTodas()
        .subscribe({
          next: (res: any) => this.solicitudes = res,
          error: () => this.solicitudes = []
        });

    } else {

      this.solicitudService.obtenerPorCliente(this.usuario.id_cliente)
        .subscribe({
          next: (res: any) => this.solicitudes = res,
          error: () => this.solicitudes = []
        });
    }
  }
}
