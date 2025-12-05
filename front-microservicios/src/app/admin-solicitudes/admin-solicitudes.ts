import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-solicitudes.html',
  styleUrls: ['./admin-solicitudes.css']
})
export class AdminSolicitudesPage implements OnInit {

  solicitudes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://34.66.67.127:8001/solicitudes/')
      .subscribe({
        next: (res: any) => this.solicitudes = res,
        error: () => this.solicitudes = []
      });
  }
}
