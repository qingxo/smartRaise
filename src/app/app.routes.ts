import { Routes } from '@angular/router';
import {LoginGuard} from './guard/LoginGuard';
import {LoginComponent} from './login/login.component';

export const ROUTER_CONFIG: Routes = [
  { path:'login', component:LoginComponent},
  { path: '' , redirectTo:'home/client', pathMatch:'full',canActivate:[LoginGuard]},
  {path:'home',loadChildren:'app/home/home.module#HomeModule',canActivate:[LoginGuard]}
  // { path: 'blog', loadChildren: 'app/blog-app/blog-app.module#BlogAppModule' },
  // { path: 'manage', loadChildren: 'app/manage-app/manage-app.module#ManageAppModule' },
];
