import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Motos } from './motos/motos';
import { Solicitudes } from './solicitudes/solicitudes';
import { ChecklistPage } from './checklist/checklist';
import { AdminSolicitudesPage } from './admin-solicitudes/admin-solicitudes';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'registro', component: Register },
  { path: 'solicitudes', component: Solicitudes },
  { path: 'motos', component: Motos },
  { path: 'checklist', component: ChecklistPage },
  { path: 'admin-solicitudes', component: AdminSolicitudesPage },
  { path: '**', redirectTo: 'login' }
];
