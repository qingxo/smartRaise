import { Component, OnInit } from '@angular/core';
import { TaskInfoService } from './task-info.service';
import { Router, ActivatedRoute } from '@angular/router';
import tools from '../../shared/tools';
@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss'],
  providers: [TaskInfoService]
})
export class TaskInfoComponent implements OnInit {

  private userId: string;
  private customerId: string;
  private type: number;
  private taskId: string;
  private userInfo: any = {};
  private tableInfo: Array<any> = [];

  constructor(private taskInfoService: TaskInfoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.customerId = this.route.snapshot.params['customerId'];
    this.type = this.route.snapshot.params['type'];
    this.taskId = this.route.snapshot.params['taskId'];

    this.getUserInfo();
    this.getTaskList();
  }

  getUserInfo() {
    this.taskInfoService.getUserInfo(this.customerId).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
      }
    });
  }
  getTaskList() {
    this.taskInfoService.getFinishTaskList(this.taskId).subscribe((res) => {
      if (res.success) {
        this.tableInfo = res.data;
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }


  getAge(num) {
    return tools.getAge(num);
  }

}
