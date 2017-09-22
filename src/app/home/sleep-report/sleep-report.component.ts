import { Component, OnInit } from '@angular/core';
import { HealthMonitorService } from '../health-monitor/health-monitor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sleep-report',
  templateUrl: './sleep-report.component.html',
  styleUrls: ['./sleep-report.component.scss'],
  providers: [HealthMonitorService]
})
export class SleepReportComponent implements OnInit {

  private userInfo: any = {};
  private customerId: string = '';
  private equipNo: string = '';
  constructor(private healthMonitorService: HealthMonitorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
    this.equipNo = this.route.snapshot.params['equipNo'];

    this.getUserInfo()
  }

  changeDays(val) {
    console.log(val)
  }

  getUserInfo() {
    this.healthMonitorService.getUserInfo(this.customerId).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
      }
    });
  }

}
