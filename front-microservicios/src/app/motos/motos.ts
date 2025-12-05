import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MotoService } from '../services/moto.service';
import { AuthService } from '../services/auth.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-motos',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './motos.html',
  styleUrls: ['./motos.css']
})
export class Motos implements OnInit {

  usuario: any = null;
  motos: any[] = [];

  form = {
    placa: '',
    marca: '',
    modelo: '',
    anio: null as any,
    numero_serie: '',
    kilometraje: null as any,
    color: '',
    id_cliente: 0
  };

  constructor(
    private auth: AuthService,
    private motoService: MotoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // forzamos detección
    Promise.resolve().then(() => this.iniciar());
  }

  iniciar() {
    this.usuario = this.auth.usuarioActual();

    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.form.id_cliente = this.usuario.id_cliente;

    this.cargarMotos();
  }

  cargarMotos() {
    this.motoService.obtenerMotosPorCliente(this.usuario.id_cliente).subscribe({
      next: (data) => {
        console.log("API RESP:", data);
        this.motos = data;
      },
      error: (err) => {
        console.error("ERROR:", err);
        this.motos = [];
      }
    });
  }

  registrar() {
    this.motoService.registrarMoto(this.form).subscribe({
      next: () => {
        alert("Motocicleta registrada correctamente");
        this.limpiar();
        this.cargarMotos();
      },
      error: () => alert("Error al registrar la motocicleta")
    });
  }

  limpiar() {
    this.form = {
      placa: '',
      marca: '',
      modelo: '',
      anio: null,
      numero_serie: '',
      kilometraje: null,
      color: '',
      id_cliente: this.usuario.id_cliente
    };
  }
}
