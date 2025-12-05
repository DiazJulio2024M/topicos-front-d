import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://127.0.0.1:8000/clientes/'; // Cambia esto

  constructor(private http: HttpClient) {}

  listarClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  registrarCliente(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }
}
