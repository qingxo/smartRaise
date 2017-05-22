import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import { ClientComponent } from './client/client.component';
import { ROUTER_CONFIG } from './home.routes';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import { PlanmanComponent } from './planman/planman.component'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ClientDetailComponent } from './client-detail/client-detail.component'
import { Ng2FlatpickrComponent } from 'ng2-flatpickr/ng2-flatpickr';
import { AngularEchartsModule } from 'angular2-echarts';
import { SmartBedComponent } from './smart-bed';
import { OrderPackageComponent } from './order-package';
import { OrderDetailComponent } from './order-detail';
import { ServicePackageComponent } from './service-package/service-package.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AngularEchartsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [
    HomeComponent,
    ClientComponent,
    PlanmanComponent,
    CreateAccountComponent,
    Ng2FlatpickrComponent,
    ClientDetailComponent,
    SmartBedComponent,
    OrderPackageComponent,
    OrderDetailComponent,
    ServicePackageComponent,
    OrderComponent
  ],
  providers:[]
})
export class HomeModule { }
