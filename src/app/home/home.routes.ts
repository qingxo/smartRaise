import { Routes } from '@angular/router'
import {HomeComponent} from './home.component'
import {ClientComponent} from './client'
import {ClientDetailComponent} from './client-detail'
import {PlanmanComponent} from './planman'
import {CreateAccountComponent} from './create-account'
import {SmartBedComponent} from './smart-bed'
export const ROUTER_CONFIG: Routes = [
  {
    path:'',component:HomeComponent,
    children:[
      { path: '' , redirectTo:'/home/client', pathMatch:'full'},
      { path: 'client' ,component:ClientComponent},
      { path: 'client/detail' ,component:ClientDetailComponent},
      { path: 'client/planman',component:PlanmanComponent},
      { path: 'newaccount',component:CreateAccountComponent},
      { path: 'smartbed',component:SmartBedComponent}
    ]
  }
  ];
