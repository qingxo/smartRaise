import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FeedbackService } from './feedback.service';
import tools from '../../shared/tools';
import { NgbModal, ModalDismissReasons, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  providers: [FeedbackService, NgbPopoverConfig]
})
export class FeedbackComponent implements OnInit {
  list: Array<any> = [];
  pages: Array<any> = [];
  pageSize = 10;
  pageNumber = 1;
  feedback = 0;
  dealInfo = '';
  clickItemId = '';
  item: any;
  modalRef: any;
  closeResult: string;


  constructor(private feedbackService: FeedbackService, private modalService: NgbModal, private config: NgbPopoverConfig) { }
  ngOnInit() {
    this.config.placement = 'top';
    this.config.triggers = 'hover';
    this.feedbackList();
  }

  cultLen(val) {
    return val.length > 23 ? val.substr(0, 20) + '...' : val;
  }

  feedbackList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber
    };
    if (this.feedback === 0) {
      this.feedbackService.customerFeedBackList(data).subscribe((res) => {
        if (res.success) {
          this.list = [];
          this.list = res.data.list;
          this.pages = res.data.navigatepageNums;
          this.pageNumber = res.data.pageNum;
        }

      });
    } else {
      this.feedbackService.userFeedBackList(data).subscribe((res) => {
        if (res.success) {
          this.list = [];
          this.list = res.data.list;
          this.pages = res.data.navigatepageNums;
          this.pageNumber = res.data.pageNum;
        }

      });
    }

  }
  handleFeedBack(id, item, content) {
    this.clickItemId = id;
    this.item = item;
    this.open(content);
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' });

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  doneFeedBack() {
    const data = {
      'dealRemark': this.dealInfo,
    };
    if (this.feedback === 0) {
      data['opinionId'] = this.clickItemId;
      this.feedbackService.customerHandler(data).subscribe((res) => {
        if (res.success) {
          tools.tips('处理成功', '', 'success');
          this.item.dealRemark = data.dealRemark;
          this.modalRef.close();
        } else {
          tools.tips(res.errMsg, '', 'error');
        }
      });
    } else {
      data['opinionUserId'] = this.clickItemId;
      this.feedbackService.userHandler(data).subscribe((res) => {
        if (res.success) {
          tools.tips('处理成功', '', 'success');
          this.modalRef.close();

          this.item.dealRemark = data.dealRemark;
        } else {
          tools.tips(res.errMsg, '', 'error');
        }
      });
    }
  }

  toogleChoosed(e) {
    this.feedback = e;
    this.pageNumber = 1;
    this.feedbackList();
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

  pageTurning(number) {
    this.pageNumber = number;
    this.feedbackList();
  }

}
