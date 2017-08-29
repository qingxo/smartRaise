import { Component, OnInit, OnChanges, SimpleChange, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import storage from '../../shared/storage';
import tools from '../../shared/tools';
import SysData from '../../shared/sysData';
import * as $ from 'jquery';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import * as Flatpickr from 'flatpickr';
import * as zh_lang from 'flatpickr/dist/l10n/zh.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import baseAnimation from '../../shared/myAnimation';
import { AccountDialogsComponent } from '../account-dialogs';
import { SignManageService } from './sign-manage.service'
@Component({
  selector: 'app-sign-manage',
  templateUrl: './sign-manage.component.html',
  styleUrls: ['./sign-manage.component.scss'],
  providers: [SignManageService]
})
export class SignManageComponent implements OnInit {
  private listData: Array<any> = [];
  private listName: Array<any> = [];
  private pages: Array<any> = [];
  private pageSize = 10;
  private pageNumber = 1;
  private queryInfo = '';
  private totalPage: number;
  private groupPlanList: Array<any> = []
  private groupPlanName: string
  constructor(private signManageService: SignManageService) { }

  ngOnInit() {
    this.initAsyc()
    this.initGroupPlanList()
  }

  onChange(val) {
    console.log(val)
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
      this.groupPlanList.unshift({ 'socialWelfareId': '-1', 'socialWelfareName': '请选择' })
      this.groupPlanName = this.groupPlanList[0].socialWelfareId;
    });
  }

  initAsyc() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'userId': storage.get('state')['userId']
    };
    this.signManageService.clientList(data).subscribe(
      (res) => {
        this.listData = res.data.list;
        this.pages = res.data.navigatepageNums;
        this.totalPage = res.data.total;
      }
    );
  }

  pageTurning(num) {
    this.pageNumber = num
    this.initAsyc()
  }

  searchTable(val) {
    this.queryInfo = val
    this.initAsyc()
  }

  getAge(num) {
    return tools.getAge(num)
  }

}
