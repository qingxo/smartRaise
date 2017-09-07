import { Component, OnInit } from '@angular/core';
import storage from '../../shared/storage';
import { ErrorTipsService } from './error-tips.service';
import { NgbModal, ModalDismissReasons, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
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
  private errorBtn: any;
  private modalRef: any;
  private closeResult: string;
  private targetItem: any = {};
  private dealInfo: string = '';
  constructor(private errorTipsService: ErrorTipsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.showList();
    this.initBtnShow();
  }

  initBtnShow() {
    this.errorBtn = tools.initBtnShow(1, 1, 'errorBtn');
  }

  handleErrorDealing(item, content) {
    this.targetItem = item;
    this.open(content);
  }

  doneFeedBack() {
    let data: any = {
      'remindId': this.targetItem['abnormalHealthId'],
      'remark': this.dealInfo
    }
    this.errorTipsService.errorDeal(data).subscribe((res) => {
      if (res.success) {
        tools.tips("处理成功");
        this.modalRef.close();
        this.showList();
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    })

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
    return tools.getAge(ageNum)
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
