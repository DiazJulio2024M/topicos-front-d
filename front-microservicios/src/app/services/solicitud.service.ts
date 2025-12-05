import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private baseUrl = 'http://34.66.67.127:8001/solicitudes';

  constructor(private http: HttpClient) {}

  crearSolicitud(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  
  obtenerPorCliente(id_cliente: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/cliente/${id_cliente}`);
  }
  obtenerTodas(): Observable<any> {
  return this.http.get(this.baseUrl);  
  }
  
}

