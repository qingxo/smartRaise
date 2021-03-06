import { Component, OnInit, OnChanges, SimpleChange, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import storage from '../../shared/storage';
import tools from '../../shared/tools';
import SysData from '../../shared/sysData';
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import baseAnimation from '../../shared/myAnimation';
import { AccountDialogsComponent } from '../account-dialogs';
import { SignManageService } from './sign-manage.service';
@Component({
  selector: 'app-sign-manage',
  templateUrl: './sign-manage.component.html',
  styleUrls: ['./sign-manage.component.scss'],
  providers: [SignManageService]
})
export class SignManageComponent implements OnInit {
  listData: Array<any> = [];
  listName: Array<any> = [];
  pages: Array<any> = [];
  pageSize = 10;
  pageNumber = 1;
  queryInfo = '';
  totalPage: number;
  groupPlanList: Array<any> = [];
  groupPlanName: string;
  choosedSocialWelfare = '';
  choosedCard = '-1';
  constructor(private signManageService: SignManageService) { }

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
    this.signManageService.groupList(data).subscribe((res) => {
      if (res.success) {
        this.groupPlanList = res.data.list;
      }
      this.groupPlanList.unshift({ 'socialWelfareId': '', 'socialWelfareName': '请选择' });
      this.groupPlanList.push({ 'socialWelfareId': '无机构', 'socialWelfareName': '无机构' });
      this.groupPlanName = this.groupPlanList[0].socialWelfareId;
    });
  }

  initAsyc() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'userId': storage.get('state')['userId'],
      'socialWelfareId': this.choosedSocialWelfare === '无机构' ? '' : this.choosedSocialWelfare,
      'flag': this.choosedSocialWelfare === '无机构' ? '0' : '',
      'type': '2'
    };
    switch (this.choosedCard) {
      case '0': data['cardUnBinding'] = 1; break;
      case '1': data['cardBinding'] = 1; break;
    }

    this.signManageService.clientList(data).subscribe(
      (res) => {
        this.listData = Array.of([]);
        this.listData = res.data.list;
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i]['cardNo'] !== null && this.listData[i]['cardNo'] !== 'null' && this.listData[i]['cardNo'] !== undefined) {
            if (this.listData[i]['cardNo'].indexOf(',') !== -1) {
              this.listData[i]['cardNo'] = this.listData[i]['cardNo'].split(',');
            } else {
              this.listData[i]['cardNo'] = Array.of(this.listData[i]['cardNo']);
            }

          }
        }

        this.pages = res.data.navigatepageNums;
        this.totalPage = res.data.total;
      }
    );

    const tmpData = {
      'socialWelfareId': this.choosedSocialWelfare,
      'type': '2'
    };

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
