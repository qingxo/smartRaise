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
  private heartList: any;
  private bedList: any;
  private sleepListTime: Array<any> = [];
  private sleepListStatus: Array<any> = [];
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

  callReportSleepHeart() {
    this.sleepReportService.reportSleepHeart(this.equipNo, this.reportDay).subscribe((res) => {
      this.heartList = res;
    })
  }

  callReportSleepOnBed() {
    this.sleepReportService.reportSleepOnBed(this.equipNo, this.reportDay).subscribe((res) => {
      this.bedList = res;
    })
  }

  callService() {
    this.sleepReportService.reportDetail(this.equipNo, this.reportDay).subscribe((res) => {
      this.list = res.data;
      this.bedAnalysisInit(res.sleep)
    })
  }

  bedAnalysisInit(obj) {
    this.sleepListTime = []
    this.sleepListStatus = []
    for (let item in obj) {
      this.sleepListTime.push(item)
      this.sleepListStatus.push(parseInt(obj[item], 10))
    }
    this.sleepListTime = Array.from(this.sleepListTime)
    this.sleepListStatus = Array.from(this.sleepListStatus)
  }

  getUserInfo() {
    this.healthMonitorService.getUserInfo(this.customerId).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
      }
    });
  }

}
