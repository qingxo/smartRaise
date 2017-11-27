import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import storage from '../../shared/storage';
import { ErrorTipsService } from './error-tips.service';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import * as Flatpickr from 'flatpickr';
import * as zh_lang from 'flatpickr/dist/l10n/zh.js';
import { ClientService } from '../client/client.service';
import { NgbModal, ModalDismissReasons, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import tools from '../../shared/tools';
import * as moment from 'moment';
import * as $ from 'jquery';
@Component({
  selector: 'app-error-tips',
  templateUrl: './error-tips.component.html',
  styleUrls: ['./error-tips.component.scss'],
  providers: [ErrorTipsService, ClientService],
  encapsulation: ViewEncapsulation.None
})
export class ErrorTipsComponent implements OnInit {

  list: Array<any> = [];
  pages: Array<any> = [];
  pageSize = 10;
  pageNumber = 1;
  queryInfo = '';
  queryInfoUrl = '';
  taskProgress = 0; // 0 客户数据，1 健康专员数据
  totalPage: number;
  errorBtn: any;
  modalRef: any;
  closeResult: string;
  targetItem: any = {};
  dealInfo = '';
  chooseGroupId: string = '';
  chooseMonitorId: string = '';
  chooseGroupList: Array<any> = [];
  groupPlanList: Array<any> = [];
  groupPlanName: string = '';
  dayStart: string = '';
  dayEnd: string = '';
  monitorList: Array<any> = [
    { 'name': '请选择', 'id': '' },
    { 'name': '血压', 'id': '01' },
    { 'name': '心率', 'id': '03' },
    { 'name': '餐前血糖', 'id': '04' },
    { 'name': '餐后血糖', 'id': '05' },
    { 'name': 'bmi', 'id': '06' },
    { 'name': '血氧', 'id': '07' },
    { 'name': '体温', 'id': '08' }
  ];
  exampleOptions: FlatpickrOptions = {
    static: true,
    mode: 'range',
    maxDate: "today",
    dateFormat: 'Y-m-d',
    locale: zh_lang['zh'],
    onClose: this.closeTime.bind(this)
  };
  constructor(private errorTipsService: ErrorTipsService, private clientService: ClientService, private modalService: NgbModal) { }

  ngOnInit() {
    this.showList();
    this.initBtnShow();
    this.initGroupPlanList();
  }

  onChangeMonit(num) {
    this.showList()
  }

  doExcel() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'userId': storage.get('state')['userId'],
      'query': this.queryInfo,
      'socialWelfareId': this.chooseGroupId,
      'type': this.chooseMonitorId,
      'start': this.dayStart,
      'end': this.dayEnd
    };
    this.errorTipsService.outPutExc(data).subscribe(res => {
      if (res) {

      }
    })

    // this.errorTipsService.testCall().subscribe(res => {
    //   var IFrameRequest = document.createElement("iframe");
    //   IFrameRequest.id = "IFrameRequest";
    //   IFrameRequest.src = "http://localhost:5000/dd/testbook.doc";
    //   IFrameRequest.style.display = "none";
    //   document.body.appendChild(IFrameRequest);
    // })
  }

  closeTime(selectedDates, dateStr, instance) {
    console.log(selectedDates)
    if (selectedDates.length > 1) {
      let dayst = moment(selectedDates[0]).format('YYYY-MM-DD');
      let dayed = moment(selectedDates[1]).format('YYYY-MM-DD');
      if (this.dayStart == dayst && this.dayEnd === dayed) {
        instance.input.blur();
        return
      }
      this.dayStart = moment(selectedDates[0]).format('YYYY-MM-DD');
      this.dayEnd = moment(selectedDates[1]).format('YYYY-MM-DD');
      this.showList();
    } else if (selectedDates.length == 1) {
      this.dayStart = '';
      this.dayEnd = '';
      this.showList();
    }
    instance.input.blur();
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
        this.chooseGroupList = Array.from(res.data.list);
      }
      this.chooseGroupList.unshift({ 'socialWelfareId': '', 'socialWelfareName': '请选择' });
      this.chooseGroupList.push({ 'socialWelfareId': '无机构', 'socialWelfareName': '无机构' });
      this.groupPlanName = this.groupPlanList[0].socialWelfareId;
    });
  }


  initBtnShow() {
    this.errorBtn = tools.initBtnShow(1, 1, 'errorBtn');
  }

  handleErrorDealing(item, content) {
    this.targetItem = item;
    this.open(content);
  }

  doneFeedBack() {
    const data: any = {
      'abnormalHealthNo': this.targetItem['abnormalHealthNo'],
      'remark': this.dealInfo
    };
    this.errorTipsService.errorDeal(data).subscribe((res) => {
      if (res.success) {
        tools.tips('处理成功');
        this.modalRef.close();
        this.dealInfo = '';
        this.pageNumber = 1;
        this.showList();
      } else {
        tools.tips(res.errMsg, '', 'error');
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

  showList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'userId': storage.get('state')['userId'],
      'query': this.queryInfo,
      'socialWelfareId': this.chooseGroupId,
      'type': this.chooseMonitorId,
      'start': this.dayStart,
      'end': this.dayEnd
    };
    if (this.taskProgress === 0) {
      this.errorTipsService.errorList(data).subscribe((res) => {
        if (res.success) {
          this.list = []
          if (res.data.list !== null) {
            this.list = res.data.list;
            this.pages = res.data.navigatepageNums;
            this.pageNumber = res.data.pageNum;
            this.totalPage = res.data.total;
          }

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
