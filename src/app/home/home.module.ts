import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ClientComponent } from './client/client.component';
import { ROUTER_CONFIG } from './home.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { Ng2FlatpickrComponent } from 'ng2-flatpickr/ng2-flatpickr';
import { OrderPackageComponent } from './order-package';
import { OrderDetailComponent } from './order-detail';
import { ServicePackageComponent } from './service-package/service-package.component';
import { OrderComponent } from './order/order.component';
import { AccountsComponent } from './accounts/accounts.component';
import { WaiterComponent } from './waiter/waiter.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { ErrorTipsComponent } from './error-tips/error-tips.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { BmiMonitorComponent } from './bmi-monitor/bmi-monitor.component';
import { EchartsNg2Module } from 'echarts-ng2';
import { GroupManageComponent } from './group-manage/group-manage.component';
import { SleepManageComponent } from './sleep-manage/sleep-manage.component';
import { JurisdictionComponent } from './jurisdiction/jurisdiction.component';
import { SynDataComponent } from './syn-data/syn-data.component';
import { BloodPressureComponent } from './blood-pressure/blood-pressure.component';
import { BloodSugarComponent } from './blood-sugar/blood-sugar.component';
import { BmiLineComponent } from './bmi-line/bmi-line.component';
import { BloodOxygenComponent } from './blood-oxygen/blood-oxygen.component';
import { HeatLineComponent } from './heat-line/heat-line.component';
import { HealthReportComponent } from './health-report/health-report.component';
import { HealthMonitorComponent } from './health-monitor/health-monitor.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { SleepTestComponent } from './sleep-test/sleep-test.component';
import { BestSleepLineComponent } from './best-sleep-line/best-sleep-line.component';
import { SleepMonitorComponent } from './sleep-monitor/sleep-monitor.component';
import { RealLineComponent } from './real-line/real-line.component';
import { HistoryLineComponent } from './history-line/history-line.component';
import { BedAnalysisComponent } from './bed-analysis/bed-analysis.component';
import { SleepQualityComponent } from './sleep-quality/sleep-quality.component';
import { MonitorListComponent } from './monitor-list/monitor-list.component';
import { AccountDialogsComponent } from './account-dialogs/account-dialogs.component';
import { PackageDialogComponent } from './package-dialog/package-dialog.component';
import { PkginfoDialogComponent } from './pkginfo-dialog/pkginfo-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignManageComponent } from './sign-manage/sign-manage.component';
import { SignDataComponent } from './sign-data/sign-data.component';
import { CriticalValueComponent } from './critical-value/critical-value.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BarLinesComponent } from './bar-lines/bar-lines.component';
import { CircleLineComponent } from './circle-line/circle-line.component';
import { ShoesMapComponent } from './shoes-map';
import { BaiduMapModule } from 'angular2-baidu-map'; // import BaiduMapModule

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EchartsNg2Module,
    NgbModule,
    BaiduMapModule,
    RouterModule.forChild(ROUTER_CONFIG)

  ],
  entryComponents: [AccountDialogsComponent, PackageDialogComponent, PkginfoDialogComponent],
  declarations: [
    HomeComponent,
    ClientComponent,
    CreateAccountComponent,
    Ng2FlatpickrComponent,
    ClientDetailComponent,
    OrderPackageComponent,
    OrderDetailComponent,
    ServicePackageComponent,
    OrderComponent,
    AccountsComponent,
    WaiterComponent,
    MyTaskComponent,
    ErrorTipsComponent,
    FeedbackComponent,
    BmiMonitorComponent,
    GroupManageComponent,
    SleepManageComponent,
    JurisdictionComponent,
    SynDataComponent,
    BloodPressureComponent,
    BloodSugarComponent,
    BmiLineComponent,
    BloodOxygenComponent,
    HeatLineComponent,
    HealthReportComponent,
    HealthMonitorComponent,
    InputGroupComponent,
    TaskInfoComponent,
    SleepTestComponent,
    BestSleepLineComponent,
    SleepMonitorComponent,
    RealLineComponent,
    HistoryLineComponent,
    BedAnalysisComponent,
    SleepQualityComponent,
    MonitorListComponent,
    AccountDialogsComponent,
    PackageDialogComponent,
    PkginfoDialogComponent,
    SignManageComponent,
    SignDataComponent,
    CriticalValueComponent,
    StatisticsComponent,
    BarLinesComponent,
    CircleLineComponent,
    ShoesMapComponent
  ],
  providers: []
})
export class HomeModule { }
