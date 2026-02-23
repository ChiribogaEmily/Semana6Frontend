import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth-guard';
import { FacturasForm } from './components/facturas/facturas-form/facturas-form';
import { FacturasList } from './components/facturas/facturas-list/facturas-list';
import { EventosForm } from './components/eventos/eventos-form/eventos-form';
import { EventosList } from './components/eventos/eventos-list/eventos-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'eventos', component: EventosList, canActivate: [authGuard] },
  { path: 'eventos/nuevo', component: EventosForm, canActivate: [authGuard] },
  { path: 'eventos/editar/:id', component: EventosForm, canActivate: [authGuard] },
  { path: 'facturas', component: FacturasList, canActivate: [authGuard] },
  { path: 'facturas/nueva', component: FacturasForm, canActivate: [authGuard] },
  { path: 'facturas/editar/:id', component: FacturasForm, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];
