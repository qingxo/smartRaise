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
  private heartList: Array<any> = [];
  private moveList: Array<any> = [];
  private bedList: Array<any> = [];
  private timeList: Array<any> = [];
  private sleepListTime: Array<any> = [];
  private sleepListStatus: Array<any> = [];
  private sleepDeep: string = '0';
  private sleepLower: string = '0';
  private sleepNo: string = '0';
  private circleRadios: Array<any> = []
  constructor(private healthMonitorService: HealthMonitorService, private sleepReportService: SleepReportService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
    this.equipNo = this.route.snapshot.params['equipNo'];
    this.getUserInfo();
    // this.callService();
    this.callReportSleepHeart()
  }

  changeDays(val) {
    if (val !== this.reportDay) {
      this.reportDay = val;
      this.callService()
      this.callReportSleepHeart()

    }

  }

  callReportSleepHeart() {
    this.sleepReportService.reportSleepHeart(this.equipNo, this.reportDay).subscribe((res) => {
      this.heartList = [];
      this.moveList = [];
      this.timeList = [];
      for (let i = 0; i < res.length; i++) {
        this.heartList.push(res[i]['avghr'])
        this.moveList.push(res[i]['avgmv'])
        this.timeList.push(res[i]['hour'])
      }
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
      this.initSleepRadio()
      this.bedAnalysisInit(res.sleep)
    })
    // this.callReportSleepHeart()
    // this.callReportSleepOnBed()
  }

  initSleepRadio() {
    let [deep, lower, nos] = [this.list.deepminutes, this.list.lightminutes, this.list.wakeminutes]
    let sum = parseInt(deep, 10) + parseInt(lower, 10) + parseInt(nos, 10)
    this.sleepDeep = "" + Math.round((deep / sum) * 100);
    this.sleepLower = "" + Math.round((lower / sum) * 100);
    this.sleepNo = "" + Math.round((nos / sum) * 100);
    if (this.sleepDeep !== 'NaN' || this.sleepLower !== 'NaN' || this.sleepNo !== 'NaN') {
      this.circleRadios = [this.sleepDeep, this.sleepLower, this.sleepNo]
    } else {
      this.circleRadios = []
    }
  }

  bedAnalysisInit(obj) {
    this.sleepListTime = []
    this.sleepListStatus = []
    let { status, time } = obj
    for (let item of status) {
      this.sleepListStatus.push(parseInt(item, 10))
    }
    this.sleepListTime = Array.from(time)
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
