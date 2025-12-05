import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checklist.html',
  styleUrl: './checklist.css'
})
export class ChecklistPage {

  form = {
    nivel_combustible: '',
    luces: false,
    neumaticos: false,
    rayones_previos: false,
    observaciones: '',
    id_solicitud: 0
  };

  constructor(private http: HttpClient) {}

  enviar() {
    this.http.post('http://34.66.67.127:8001/checklist/', this.form)
      .subscribe({
        next: () => alert('Checklist creado'),
        error: () => alert('Error creando checklist')
      });
  }
}
