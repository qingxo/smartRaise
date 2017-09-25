import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ClientComponent } from './client';
import { ClientDetailComponent } from './client-detail';
import { CreateAccountComponent } from './create-account';
import { OrderPackageComponent } from './order-package';
import { OrderDetailComponent } from './order-detail';
import { ServicePackageComponent } from './service-package';
import { OrderComponent } from './order';
import { AccountsComponent } from './accounts';
import { WaiterComponent } from './waiter';
import { MyTaskComponent } from './my-task';
import { ErrorTipsComponent } from './error-tips';
import { FeedbackComponent } from './feedback';
import { GroupManageComponent } from './group-manage';
import { SleepManageComponent } from './sleep-manage';
import { JurisdictionComponent } from './jurisdiction';
import { SynDataComponent } from './syn-data';
import { HealthReportComponent } from './health-report';
import { HealthMonitorComponent } from './health-monitor';
import { TaskInfoComponent } from './task-info';
import { SleepTestComponent } from './sleep-test';
import { SleepMonitorComponent } from './sleep-monitor';
import { MonitorListComponent } from './monitor-list';
import { SignManageComponent } from './sign-manage';
import { SignDataComponent } from './sign-data';
import { CriticalValueComponent } from './critical-value';
import { StatisticsComponent } from './statistics';
import { ShoesMapComponent } from './shoes-map';
import { TumbleManageComponent } from './tumble-manage';
import { SleepReportComponent } from './sleep-report';
import { RecordDetailComponent } from './record-detail';
export const ROUTER_CONFIG: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: '/home/client', pathMatch: 'full' },
      { path: 'client', component: ClientComponent },
      { path: 'create', component: CreateAccountComponent },

      { path: 'clientDetail/:userId', component: ClientDetailComponent },
      { path: 'newaccount', component: CreateAccountComponent },
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
      { path: 'sleepmonitor/:customerId/:equipNo', component: SleepMonitorComponent },
      { path: 'monitorlist/:userId', component: MonitorListComponent },
      { path: 'body', component: SignManageComponent },
      { path: 'signdata/:userId', component: SignDataComponent },
      { path: 'crisis', component: CriticalValueComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'shoesmap', component: ShoesMapComponent },
      { path: 'tumble', component: TumbleManageComponent },
      { path: 'sleepreport/:customerId/:equipNo', component: SleepReportComponent },
      { path: 'recordDetail/:customerId', component: RecordDetailComponent }

    ]
  }
];
