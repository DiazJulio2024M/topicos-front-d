import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoService {

  private baseUrl = 'http://127.0.0.1:8000/motos';

  constructor(private http: HttpClient) {}

  registrarMoto(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  obtenerMotosPorCliente(id_cliente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cliente/${id_cliente}`);
  }
}
