import { Component, OnInit } from '@angular/core';
import { TumbleManageService } from './tumble-manage.service'
import storage from '../../shared/storage'
@Component({
  selector: 'app-tumble-manage',
  templateUrl: './tumble-manage.component.html',
  styleUrls: ['./tumble-manage.component.scss'],
  providers: [TumbleManageService]
})
export class TumbleManageComponent implements OnInit {

  private listData: Array<any> = [];
  private listName: Array<any> = [];
  private pages: Array<any> = [];
  private pageSize = 10;
  private pageNumber = 1;
  private queryInfo = '';
  private totalPage: number;
  private groupPlanList: Array<any> = [];
  private groupPlanName: string;
  private choosedSocialWelfare = '';
  private choosedCard = '-1';
  private totalCount: any = {};
  constructor(private tumbleManageService: TumbleManageService) { }


  ngOnInit() {
    this.initAsyc();
    this.initGroupPlanList();
  }

  onChange(val) {
    if (val.indexOf(',') !== -1) {
      this.choosedSocialWelfare = val.split(',')[0];
      this.groupPlanName = val.split(',')[1];
    }
    this.pageNumber = 1;
    this.initAsyc();
  }

  groupNameShow(val) {
    if (val === '' || val === '请选择') {
      return '全部机构';
    }
    return val;
  }

  // 获取机构列表
  initGroupPlanList() {
    const data = {
      'pageSize': 100,
      'pageNum': 1
    };
    this.tumbleManageService.groupList(data).subscribe((res) => {
      if (res.success) {
        this.groupPlanList = res.data.list;
      }
      this.groupPlanList.unshift({ 'socialWelfareId': '', 'socialWelfareName': '请选择' });
      this.groupPlanName = this.groupPlanList[0].socialWelfareId;
    });
  }

  initAsyc() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'userId': storage.get('state')['userId'],
      'socialWelfareId': this.choosedSocialWelfare
    };
    switch (this.choosedCard) {
      case '0': data['cardUnBinding'] = 1; break;
      case '1': data['cardBinding'] = 1; break;
    }

    this.tumbleManageService.clientList(data).subscribe(
      (res) => {
        this.listData = Array.of([]);
        this.listData = res.data.list;
        this.pages = res.data.navigatepageNums;
        this.totalPage = res.data.total;
      }
    );

    const tmpData = {
      'socialWelfareId': this.choosedSocialWelfare,
      'type': '2'
    };

    this.tumbleManageService.countStatistics(tmpData).subscribe((res) => {
      this.totalCount = res.counts;
    });


  }

  pageTurning(num) {
    this.pageNumber = num;
    this.initAsyc();
  }

  searchTable(val) {
    this.queryInfo = val;
    this.initAsyc();
  }

}
