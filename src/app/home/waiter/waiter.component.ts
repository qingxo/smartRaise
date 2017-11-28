import { Component, OnInit, OnChanges, SimpleChange, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { WaiterService } from './waiter.service';
import tools from '../../shared/tools';
import { AccountDialogsComponent } from '../account-dialogs';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss'],
  providers: [WaiterService]
})
export class WaiterComponent implements OnInit {
  pageSize = 10;
  pageNumber = 1;
  pages: Array<any> = [];
  totalPage: number;
  list: Array<any> = [];
  queryInfo = '';
  defalutPerson: object = {
    name: null
  };
  userId: any;
  waiterBtn: object;

  constructor(private waiterService: WaiterService, private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.waiterList();
    this.geDefaultPerson();
    this.initBtnShow();
  }

  openModal(userId) {
    const componentFatory = this.componentFactoryResolver.resolveComponentFactory(AccountDialogsComponent);
    const containerRef = this.viewContainerRef;
    containerRef.clear();
    const dd = <AccountDialogsComponent>containerRef.createComponent(componentFatory).instance;
    dd.userId = userId;
    dd.freezeRole = true;
    dd.showList = this.waiterList.bind(this);
  }

  initBtnShow() {
    this.waiterBtn = tools.initBtnShow(0, 3, 'waiterBtn');
  }

  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo;
    this.pageNumber = 1;
    this.waiterList();
  }

  pageTurning(number) {
    this.pageNumber = number;
    this.waiterList();
  }

  delConfirm(userId) {
    this.userId = userId;
    tools.tipsConfirm(`确认需要删除该专员吗?`, '', 'warning', this.delDefaultCommissioner.bind(this));
  }

  delDefaultCommissioner() {

    this.waiterService.delPerson(this.userId).subscribe((res) => {
      if (res.success) {
        tools.tips('删除成功', '', 'success');
        this.delList(this.userId);
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

  // 删除list中的数据
  delList(id) {
    for (const item in this.list) {
      if (this.list[item].userId === id) {
        this.list.splice(Number(item), 1);
      }
    }
  }

  defaultTips(userId) {
    this.userId = userId;

    tools.tipsConfirm(`确认需要设置成默认专员吗?`, '', 'warning', this.setDefaultCommissioner.bind(this));
  }

  setDefaultCommissioner() {
    this.waiterService.defaultPerson(this.userId).subscribe((res) => {
      if (res.success) {
        tools.tips('设置成功', '', 'success');
        this.refreshList(this.userId);
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

  // 刷新list数据
  refreshList(id) {
    for (const item in this.list) {
      if (this.list[item].userId === id) {
        this.list[item].isDefaultCommissioner = '1';
        this.defalutPerson = this.list[item];
      } else {
        this.list[item].isDefaultCommissioner = '0';
      }
    }
  }


  waiterList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'role': 2
    };
    this.waiterService.waiterList(data).subscribe((res) => {
      if (res.success) {
        this.list = res.data.list;
        this.pages = res.data.navigatepageNums;
        this.pageNumber = res.data.pageNum;
        this.totalPage = res.data.total;
      }

    });
  }

  geDefaultPerson() {
    this.waiterService.getDefaultCommissioner().subscribe((res) => {
      if (res.success) {
        this.defalutPerson = res.data;
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

}
