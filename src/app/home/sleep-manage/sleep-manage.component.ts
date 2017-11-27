import { Component, OnInit } from '@angular/core';
import { SleepManageService } from './sleep-manage.service';
import { SignManageService } from '../sign-manage';
import { ClientService } from '../client/client.service';
import storage from '../../shared/storage';
import tools from '../../shared/tools';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sleep-manage',
  templateUrl: './sleep-manage.component.html',
  styleUrls: ['./sleep-manage.component.scss'],
  providers: [SleepManageService, ClientService, SignManageService]
})
export class SleepManageComponent implements OnInit {

  private pageSize = 10;
  private pageNumber = 1;
  private totalCount: number;
  private pages: Array<any> = [];
  private queryInfo = '';
  private list: Array<any> = [];
  private itemTarget: number;
  private smartBed: string;
  private sleepBtn: any;
  private bedType: Array<any> = [
    {
      'name': '智能床A',
      'value': 'A'
    }, {
      'name': '智能床B',
      'value': 'B'
    }
  ];
  private closeResult: string;
  private modalRef: any;
  private sources = 'A';
  private groupPlanList: Array<any> = [];
  private groupPlanName = '';
  private showGroupName = '';
  private choosedBed = '-1';
  // private totalSum: any = {};
  constructor(private sleepManageService: SleepManageService, private signManageService: SignManageService, private clientService: ClientService, private modalService: NgbModal) { }

  ngOnInit() {
    this.clientList();
    this.initBtnShow();
    this.initGroupPlanList();
  }

  onChange(val) {
    if (val.indexOf(',') !== -1) {
      this.groupPlanName = val.split(',')[0];
      this.showGroupName = val.split(',')[1];
    }
    this.pageNumber = 1;
    this.clientList();
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
    this.clientService.groupList(data).subscribe((res) => {
      if (res.success) {
        this.groupPlanList = res.data.list;
      }
      this.groupPlanList.unshift({ 'socialWelfareId': '', 'socialWelfareName': '请选择' });
      this.groupPlanList.push({ 'socialWelfareId': '无机构', 'socialWelfareName': '无机构' });
      this.groupPlanName = this.groupPlanList[0].socialWelfareId;
    });
  }


  initBtnShow() {
    this.sleepBtn = tools.initBtnShow(1, 3, 'sleepBtn');
    // console.log(this.sleepBtn)
  }

  searchTable(str) {
    this.queryInfo = str;
    this.pageNumber = 1;
    this.clientList();
  }

  pageTurning(number) {
    this.pageNumber = number;
    this.clientList();
  }


  unBinding() {
    const customerId = this.list[this.itemTarget].customerId,
      equipId = this.list[this.itemTarget].equipmentNo,
      bedSources = this.list[this.itemTarget].sources;
    const data = '?customerId=' + customerId + '&equipmentNo=' + equipId + '&sources=' + bedSources;

    this.clientService.unbind(data).subscribe((res) => {
      if (res.success) {
        tools.tips('解绑成功', '', 'success');
        this.list[this.itemTarget].equipmentNo = '';
      } else {
        tools.tips(res.data.errormsg, '', 'error');
      }
    });
  }

  reBunding() {
    if (!this.smartBed) {
      return;
    }

    const data = {
      'customerId': this.list[this.itemTarget].customerId,
      'mobile': this.list[this.itemTarget].mobile,
      'name': this.list[this.itemTarget].name,
      'equipmentNo': this.smartBed,
      'sources': this.sources
    };

    this.clientService.reBunding(data).subscribe((res) => {
      if (res.code === 200) {
        tools.tips('强制绑定成功');
        this.modalRef.close();
        this.clientList();
      } else {
        tools.tips(res.errormsg);
      }
    });
  }


  saveSmartBed() {
    if (!this.smartBed) {
      return;
    }

    const data = {
      'customerId': this.list[this.itemTarget].customerId,
      'mobile': this.list[this.itemTarget].mobile,
      'name': this.list[this.itemTarget].name,
      'sources': this.sources,
      'equipmentNo': this.smartBed
    };
    this.clientService.save(data).subscribe((res) => {

      if (res.code === 200) {
        tools.tips('成功', '', 'success');
        this.list[this.itemTarget].equipmentNo = this.smartBed;
        this.list[this.itemTarget].sources = this.sources;
        this.modalRef.close();
      } else if (res.code === 404) {
        tools.tips(res.errormsg, '', 'error');
      } else {
        tools.tipsConfirm(res.errormsg, '', 'warning', this.reBunding.bind(this));

      }
    });
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' });

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  bindSmartBedConfirm(index, content) {
    this.itemTarget = index;
    this.smartBed = '';
    this.sources = 'A';
    this.open(content);
  }

  cancelSmartBed(index) {
    this.itemTarget = index;
    tools.tipsConfirm('确认解除绑定?', '', 'info', this.unBinding.bind(this));
  }

  clientList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'userId': storage.get('state')['userId'],
      // 'socialWelfareId': this.groupPlanName,
      'socialWelfareId': this.groupPlanName === '无机构' ? '' : this.groupPlanName,
      'flag': this.groupPlanName === '无机构' ? '0' : '',
      'type': '3'
    };

    switch (this.choosedBed) {
      case '1': data['equipmentBinding'] = 1; break;
      case '2': data['equipmentUnBinding'] = 1; break;
    }

    this.clientService.clientList(data).subscribe((res) => {
      if (res.success) {
        this.list = res.data.list;
        this.pages = res.data.navigatepageNums;
        this.pageNumber = res.data.pageNum;
        this.totalCount = res.data.total;
      }

    });

    const tmpData = {
      'socialWelfareId': this.groupPlanName,
      'type': '3'
    };

    // this.signManageService.countStatistics(tmpData).subscribe((res) => {
    //   this.totalSum = res.counts;
    // });

  }

}
