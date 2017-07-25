import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import { ClientComponent } from './client/client.component';
import { ROUTER_CONFIG } from './home.routes';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {PopoverModule} from 'ngx-popover'
import { PlanmanComponent } from './planman/planman.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ClientDetailComponent } from './client-detail/client-detail.component'
import { Ng2FlatpickrComponent } from 'ng2-flatpickr/ng2-flatpickr';
import { SmartBedComponent } from './smart-bed';
import { OrderPackageComponent } from './order-package';
import { OrderDetailComponent } from './order-detail';
import { ServicePackageComponent } from './service-package/service-package.component';
import { OrderComponent } from './order/order.component';
import { AccountsComponent } from './accounts/accounts.component';
import { WaiterComponent } from './waiter/waiter.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { ErrorTipsComponent } from './error-tips/error-tips.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SyncDataComponent } from './sync-data/sync-data.component';
import { BmiMonitorComponent } from './bmi-monitor/bmi-monitor.component';
import { EchartsNg2Module } from 'echarts-ng2';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule,
    EchartsNg2Module,
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
    OrderComponent,
    AccountsComponent,
    WaiterComponent,
    MyTaskComponent,
    ErrorTipsComponent,
    FeedbackComponent,
    SyncDataComponent,
    BmiMonitorComponent
  ],
  providers: []
})
export class HomeModule { }
