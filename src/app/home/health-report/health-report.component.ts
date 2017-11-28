import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import tools from '../../shared/tools';
import SysData from '../../shared/sysData';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthReportService } from './health-report.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-health-report',
  templateUrl: './health-report.component.html',
  styleUrls: ['./health-report.component.scss'],
  providers: [HealthReportService],
  encapsulation: ViewEncapsulation.None
})
export class HealthReportComponent implements OnInit {

  userInfo: any = {};
  list: Array<any> = [];
  customerId = '';
  taskId: any;
  startTime: any = '';
  endTime: any = '';
  modalRef: any;
  closeResult: string;
  bothTime = '';
  errorStartTime = '';
  errorEndTime = '';
  delId: number;

  constructor(private healthReportService: HealthReportService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
    this.taskId = this.route.snapshot.params['taskId'];

    this.getUserInfo();
    this.getList();
  }


  chooseTimeLine(content) {
    this.startTime = '';
    this.endTime = '';
    this.errorStartTime = '';
    this.errorEndTime = '';
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

  getUserInfo() {
    this.healthReportService.getUserInfo(this.customerId).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
      }
    });
  }

  getList() {
    this.healthReportService.reportList(this.customerId).subscribe((res) => {
      if (res.success) {
        this.list = eval(res.data);
      }
    });
  }

  save() {
    this.bothTime = '';
    this.errorStartTime = '';
    this.errorEndTime = '';
    if (this.startTime.length === 0) {
      this.bothTime = 'xxx';
      this.errorStartTime = '请填写起始时间';
    }

    if (this.endTime.length === 0) {
      this.bothTime = 'xxx';
      this.errorEndTime = '请填写结束时间';
    }
    const testStart = this.startTime + '-01' + ' 00:00:00';
    const testEnd = moment(moment(this.endTime, 'YYYY-MM').endOf('month')['_d']).format('YYYY-MM-DD') + ' 23:59:59';
    const t1 = new Date(testStart).getTime();
    const t2 = new Date(testEnd).getTime();
    if (t1 > t2) {
      this.bothTime = 'xx';
      this.errorEndTime = '结束时间不能小于开始时间';
    }
    const data = {
      'startTime': testStart,
      'endTime': testEnd
    };

    if (this.bothTime.length > 0) {
      return;
    }

    tools.loading(true);

    if (this.taskId !== 'noTask') {
      this.healthReportService.createList(this.taskId, this.customerId, data).subscribe((res) => {
        if (res.success) {
          tools.tips('新增成功');
          this.modalRef.close();
          this.getList();
          tools.loading(false);
        } else {
          tools.loading(false);
          tools.tips(res.errMsg, '', 'error');

        }
      });
    } else {
      this.healthReportService.createListNoTask(this.customerId, data).subscribe((res) => {
        if (res.success) {
          tools.tips('新增成功');
          this.modalRef.close();
          this.getList();
          tools.loading(false);
        } else {
          tools.loading(false);
          tools.tips(res.errMsg, '', 'error');

        }
      });
    }


  }

  listDetail(index) {
    window.open(SysData.healthReportDomain + this.list[index].reportUrl, '_blank');
  }

  delConfirm(id) {
    this.delId = id;
    tools.tipsConfirm('确认删除该报告？', '', 'warning', this.delReport.bind(this));
  }

  delReport() {
    this.healthReportService.deleteReport(this.delId).subscribe((res) => {
      if (res.success) {
        tools.tips('删除成功');
        this.getList();
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

}
