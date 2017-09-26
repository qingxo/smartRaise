import { Component, OnInit } from '@angular/core';
import { HealthMonitorService } from '../health-monitor/health-monitor.service';
import { SleepReportService } from './sleep-report.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-sleep-report',
  templateUrl: './sleep-report.component.html',
  styleUrls: ['./sleep-report.component.scss'],
  providers: [HealthMonitorService, SleepReportService]
})
export class SleepReportComponent implements OnInit {

  private userInfo: any = {};
  private customerId: string = '';
  private equipNo: string = '';
  private maxDay: string = moment(new Date()).format('YYYY-MM-DD');
  private reportDay: string = moment(new Date()).format('YYYY-MM-DD');
  private list: any = {};
  constructor(private healthMonitorService: HealthMonitorService, private sleepReportService: SleepReportService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
    this.equipNo = this.route.snapshot.params['equipNo'];
    this.getUserInfo();
    this.callService();
  }

  changeDays(val) {
    if (val !== this.reportDay) {
      this.reportDay = val;
      this.callService()
    }

  }

  callService() {
    this.sleepReportService.reportDetail(this.equipNo, this.reportDay).subscribe((res) => {
      // if (res.code === 200) {
      this.list = res;
      // }

    })
  }

  getUserInfo() {
    this.healthMonitorService.getUserInfo(this.customerId).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
      }
    });
  }

}
