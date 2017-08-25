import { Component, OnInit } from '@angular/core';
import storage from '../../shared/storage';
import { ErrorTipsService } from './error-tips.service';

import tools from '../../shared/tools';
@Component({
  selector: 'app-error-tips',
  templateUrl: './error-tips.component.html',
  styleUrls: ['./error-tips.component.scss'],
  providers: [ErrorTipsService]
})
export class ErrorTipsComponent implements OnInit {

  private list: Array<any> = [];
  private pages: Array<any> = [];
  private pageSize = 10;
  private pageNumber = 1;
  private queryInfo = '';
  private taskProgress = 0; // 0 客户数据，1 健康专员数据
  private totalPage: number;
  private modalRef: any;
  private closeResult: string;
  private errorBtn: any;
  constructor(private errorTipsService: ErrorTipsService) { }

  ngOnInit() {
    this.showList();
    this.initBtnShow();
  }

  initBtnShow() {
    this.errorBtn = tools.initBtnShow(1, 1, 'errorBtn');
  }

  handleErrorDealing(item) {
    this.errorTipsService.errorHandler(item.commissionerUserId, item.commissionerMobile, item.cardId).subscribe((res) => {
      if (res.success) {
        console.log(res);
        window.open(res.data.accessUrl);
      } else {
        tools.tips(res.errMsg, '', 'error');

      }
    });
  }

  showList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'userId': storage.get('state')['userId'],
      'query': this.queryInfo
    };
    if (this.taskProgress === 0) {
      this.errorTipsService.errorList(data).subscribe((res) => {
        if (res.success) {
          this.list = res.data.list;
          this.pages = res.data.navigatepageNums;
          this.pageNumber = res.data.pageNum;
          this.totalPage = res.data.total;
        } else {
          tools.tips(res.errMsg, '', 'error');
        }

      });
    } else {
      // this.SynDataService.healthProblemList().then((res) => {
      //   if (!res.data) return
      //   if (res.data.success) {
      //     this.missionList = res.data.data
      //     this.taskList(data)
      //   }
      //
      // })
    }
  }

  getContent(content) {
    return content;
  }

  getAge(ageNum) {
    if (typeof ageNum === 'undefined' || ageNum === '') {
      return '未知';
    } else {
      const newYear = Number(new Date().getFullYear());
      const num = newYear - parseInt(ageNum.split('-')[0]);
      return num;
    }

  }

  cultOpinion(msg) {
    if (typeof msg === 'undefined' || msg === null || msg === 'null') {
      return '';
    }
    if (msg.length > 22) {
      return msg.substr(0, 22) + '...';
    } else {
      return msg;
    }
  }

  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo;
    this.pageNumber = 1;
    this.showList();
  }

  pageTurning(number) {
    this.pageNumber = number;
    this.showList();
  }
}
