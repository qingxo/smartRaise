import { Routes } from '@angular/router';
import {LoginGuard} from './guard/LoginGuard';
import {LoginComponent} from './login/login.component';
import {DialogsComponent} from './dialogs'

export const ROUTER_CONFIG: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [LoginGuard] },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule', canActivate: [LoginGuard] },
  { path: 'popout', component: DialogsComponent, outlet: 'boom' }
];
