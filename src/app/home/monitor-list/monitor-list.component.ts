import { Component, OnInit } from '@angular/core';
import { TaskInfoService } from '../task-info/task-info.service';
import { MonitorListService } from './monitor-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import tools from '../../shared/tools';
@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.scss'],
  providers: [TaskInfoService, MonitorListService]
})
export class MonitorListComponent implements OnInit {

  private userId = '';
  private userInfo: any = {};
  private list: Array<any> = [];
  private pagination: Array<any> = [];
  private pageNumber = 1;
  private totalCount: number;
  private pageSize = 10;
  private taskProgress = 0;
  constructor(private route: ActivatedRoute, private taskInfoService: TaskInfoService, private monitorListService: MonitorListService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.getUserInfo();
    this.getList();

  }

  handleClick(num) {
    this.taskProgress = num;
    this.pageNumber = 1;
    this.getList();
  }

  getUserInfo() {
    this.taskInfoService.getUserInfo(this.userId).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
      }
    });
  }

  pageTurning(num) {
    this.pageNumber = num;
    this.getList();
  }


  getList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.userId
    };
    if (this.taskProgress == 0) {
      this.monitorListService.getBloodPressList(data).subscribe((res) => {
        if (res.success) {
          this.list = res.data.list;
          this.pagination = res.data.navigatepageNums;
          this.pageNumber = res.data.pageNum;
          this.totalCount = res.data.total;
        }
      });
    } else if (this.taskProgress == 1) {
      this.monitorListService.getBloodSugarList(data).subscribe((res) => {
        if (res.success) {
          this.list = res.data.list;
          this.pagination = res.data.navigatepageNums;
          this.pageNumber = res.data.pageNum;
          this.totalCount = res.data.total;

        }
      });
    } else if (this.taskProgress == 2) {
      data['signType'] = 'bf';
      data['customerId'] = this.userId;
      this.monitorListService.bmiListByPage(data).subscribe((res) => {
        if (res.success) {
          this.list = res.data.list;
          this.pagination = res.data.navigatepageNums;
          this.pageNumber = res.data.pageNum;
          this.totalCount = res.data.total;

        }
      });
    } else if (this.taskProgress == 3) {
      data['signType'] = 'spo2';
      data['customerId'] = this.userId;
      this.monitorListService.oxygenListByPage(data).subscribe((res) => {
        if (res.success) {
          this.list = res.data.list;
          this.pagination = res.data.navigatepageNums;
          this.pageNumber = res.data.pageNum;
          this.totalCount = res.data.total;
        }
      });
    } else if (this.taskProgress == 4) {
      data['signType'] = 'temp';
      data['customerId'] = this.userId;
      this.monitorListService.heatListByPage(data).subscribe((res) => {
        if (res.success) {
          this.list = res.data.list;
          this.pagination = res.data.navigatepageNums;
          this.pageNumber = res.data.pageNum;
          this.totalCount = res.data.total;

        }
      });
    }
  }

  getAge(num) {
    return tools.getAge(num);
  }
}
