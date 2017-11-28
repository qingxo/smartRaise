import { Component, OnInit } from '@angular/core';
import { HealthMonitorService } from './health-monitor.service';
import { Router, ActivatedRoute } from '@angular/router';
import tools from '../../shared/tools';
@Component({
  selector: 'app-health-monitor',
  templateUrl: './health-monitor.component.html',
  styleUrls: ['./health-monitor.component.scss'],
  providers: [HealthMonitorService]
})
export class HealthMonitorComponent implements OnInit {

  userInfo: any = {};
  userId: string;
  customerId: string;
  type: number; // 1表示血糖
  taskId: string;
  periodDay = 1;
  constructor(private healthMonitorService: HealthMonitorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.customerId = this.route.snapshot.params['customerId'];
    this.type = this.route.snapshot.params['type'];
    this.taskId = this.route.snapshot.params['taskId'];

    this.getUserInfo();
  }

  getUserInfo() {
    this.healthMonitorService.getUserInfo(this.customerId).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
      }
    });
  }

  handlePeriod(num) {
    switch (num) {
      case 0: this.periodDay = 1; break;
      case 1: this.periodDay = 7; break;
      case 2: this.periodDay = 30; break;
      default:
    }
  }

}
