import { Routes } from '@angular/router';
import { Login } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },
];
