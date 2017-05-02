import { Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {ClientComponent} from './client';
export const ROUTER_CONFIG: Routes = [
  {
    path:'',component:HomeComponent,
    children:[
      { path: '' , redirectTo:'/home/client', pathMatch:'full'},
      { path: 'client' ,component:ClientComponent}
    ]
  }
  ];
