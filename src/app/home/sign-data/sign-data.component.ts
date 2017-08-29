import { Component, OnInit } from '@angular/core';
import { ClientDetailService } from '../client-detail/client-detail.service';
import { SignDataService } from './sign-data.service';
import { ErrorTipsService } from '../error-tips/error-tips.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import tools from '../../shared/tools';
import storage from '../../shared/storage';
@Component({
  selector: 'app-sign-data',
  templateUrl: './sign-data.component.html',
  styleUrls: ['./sign-data.component.scss'],
  providers: [ClientDetailService, SignDataService, ErrorTipsService]
})
export class SignDataComponent implements OnInit {
  private userId: string;
  private sources: any = '-1';
  private equipNo: string;
  private pageSize = 10;
  private pageNumber = 1;
  private list: Array<any> = [];
  private pagination: any;
  private totalCount: any;
  private periodDay: any = 1;
  private userInfo: any = {}
  private totalPage: number
  private pages: Array<any> = [];
  private queryInfo = '';

  constructor(private errorTipsService: ErrorTipsService, private clientDetailService: ClientDetailService, private signDataService: SignDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.equipNo = this.route.snapshot.params['equipNo'];
    this.getUserInfo();
  }

  showList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'userId': storage.get('state')['userId'],
      'query': this.queryInfo
    };
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

  }

  getUserInfo() {
    this.clientDetailService.getUserInfo(this.userId).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
        this.queryInfo = this.userInfo.name
        this.showList()
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    });
  }

  changePeriodDay(num) {
    switch (num) {
      case 0: this.periodDay = 1;
        break;
      case 1: this.periodDay = 7;
        break;
      case 2: this.periodDay = 30;
        break;
      default:
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

  pageTurning(num) {
    this.pageNumber = num
    this.showList()
  }

  getAge(num) {
    return tools.getAge(num)
  }

}
