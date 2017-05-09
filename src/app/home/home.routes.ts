import { Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {ClientComponent} from './client';
import {PlanmanComponent} from './planman';
export const ROUTER_CONFIG: Routes = [
  {
    path:'',component:HomeComponent,
    children:[
      { path: '' , redirectTo:'/home/client', pathMatch:'full'},
      { path: 'client' ,component:ClientComponent},
      { path: 'client/planman',component:PlanmanComponent}
    ]
  }
  ];
