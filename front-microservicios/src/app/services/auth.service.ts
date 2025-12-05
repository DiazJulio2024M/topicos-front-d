import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'usuario_sesion';

  constructor() {}

  iniciarSesion(tipo: 'admin' | 'cliente', data: any) {

    // ADMIN SIMULADO (NO VIENE DE BD)
    if (tipo === 'admin') {
      const payload = {
        tipo: 'admin',
        nombre: 'Admin'
      };

      localStorage.setItem(this.storageKey, JSON.stringify(payload));
      return;
    }

    // CLIENTE NORMAL
    const payload = {
      tipo: 'cliente',
      id_cliente: data.id_cliente,
      nombre: data.nombre,
      telefono: data.telefono,
      correo: data.correo,
      direccion: data.direccion,
      nro_documento: data.nro_documento,
      tipo_documento: data.tipo_documento
    };

    localStorage.setItem(this.storageKey, JSON.stringify(payload));
  }

  usuarioActual() {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : null;
  }

  cerrarSesion() {
    localStorage.removeItem(this.storageKey);
  }
}
