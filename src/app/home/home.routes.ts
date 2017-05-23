import { Routes } from '@angular/router'
import {HomeComponent} from './home.component'
import {ClientComponent} from './client'
import {ClientDetailComponent} from './client-detail'
import {PlanmanComponent} from './planman'
import {CreateAccountComponent} from './create-account'
import {SmartBedComponent} from './smart-bed'
import {OrderPackageComponent} from './order-package'
import {OrderDetailComponent} from './order-detail'
import {ServicePackageComponent} from './service-package'
import {OrderComponent} from './order'
import {AccountsComponent} from './accounts'
import {WaiterComponent} from './waiter'
import {MyTaskComponent} from './my-task'
import {ErrorTipsComponent} from './error-tips'
export const ROUTER_CONFIG: Routes = [
  {
    path:'',component:HomeComponent,
    children:[
      { path: '' , redirectTo:'/home/client', pathMatch:'full'},
      { path: 'client' ,component:ClientComponent},
      { path: 'client/detail' ,component:ClientDetailComponent},
      { path: 'client/planman',component:PlanmanComponent},
      { path: 'newaccount',component:CreateAccountComponent},
      { path: 'smartbed',component:SmartBedComponent},
      { path: 'orderpackage',component:OrderPackageComponent},
      { path: 'orderdetail',component:OrderDetailComponent},
      { path: 'servicepackage',component:ServicePackageComponent},
      { path: 'order',component:OrderComponent},
      { path: 'accounts',component:AccountsComponent},
      { path: 'waiter',component:WaiterComponent},
      { path: 'mytask',component:MyTaskComponent},
      { path: 'errortips',component:ErrorTipsComponent}






    ]
  }
  ];
