import { Routes } from '@angular/router'
import { HomeComponent } from './home.component'
import { ClientComponent } from './client'
import { ClientDetailComponent } from './client-detail'
import { PlanmanComponent } from './planman'
import { CreateAccountComponent } from './create-account'
import { SmartBedComponent } from './smart-bed'
import { OrderPackageComponent } from './order-package'
import { OrderDetailComponent } from './order-detail'
import { ServicePackageComponent } from './service-package'
import { OrderComponent } from './order'
import { AccountsComponent } from './accounts'
import { WaiterComponent } from './waiter'
import { MyTaskComponent } from './my-task'
import { ErrorTipsComponent } from './error-tips'
import { FeedbackComponent } from './feedback'
import { GroupManageComponent } from './group-manage'
import { SleepManageComponent } from './sleep-manage'
import { JurisdictionComponent } from './jurisdiction'
import { SynDataComponent } from './syn-data'
import { HealthReportComponent } from './health-report'
import { HealthMonitorComponent } from './health-monitor'
import { TaskInfoComponent } from './task-info'
import { SleepTestComponent } from './sleep-test'
import { SleepMonitorComponent } from './sleep-monitor'
export const ROUTER_CONFIG: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: '/home/client', pathMatch: 'full' },
      { path: 'client', component: ClientComponent },
      { path: 'create', component: CreateAccountComponent },

      { path: 'clientDetail/:userId', component: ClientDetailComponent },
      { path: 'client/planman', component: PlanmanComponent },
      { path: 'newaccount', component: CreateAccountComponent },
      { path: 'smartbed', component: SmartBedComponent },
      { path: 'orderpackage/:userId', component: OrderPackageComponent },
      { path: 'orderdetail/:pkgId', component: OrderDetailComponent },
      { path: 'servicepackage', component: ServicePackageComponent },
      { path: 'order', component: OrderComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'health', component: WaiterComponent },
      { path: 'mytask', component: MyTaskComponent },
      { path: 'errortips', component: ErrorTipsComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'groupmanage', component: GroupManageComponent },
      { path: 'sleepdata', component: SleepManageComponent },
      { path: 'jurisdiction', component: JurisdictionComponent },
      { path: 'syndata', component: SynDataComponent },
      { path: 'healthreport/:customerId/:taskId', component: HealthReportComponent },
      { path: 'healthmonitor/:userId/:customerId/:taskId/:type', component: HealthMonitorComponent },
      { path: 'taskinfo/:userId/:customerId/:taskId/:type', component: TaskInfoComponent },
      { path: 'sleeptest/:userId', component: SleepTestComponent },
      { path: 'sleepmonitor/:customerId/:equipNo', component: SleepMonitorComponent }
    ]
  }
];
