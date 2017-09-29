import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecordDetailService } from './record-detail.service';
@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss'],
  providers: [RecordDetailService]
})
export class RecordDetailComponent implements OnInit {

  public customerBaseInfo: any = {};
  public customerId: string = '';
  public seeDoctor: any = {};
  public opInfo: Array<any> = [];
  public outpaInfo: Array<any> = [];
  public hosInfo: any = [];
  public surveyInfo: any = [];
  public inspectInfo: any = [];
  public docOrderInfo: any = [];
  public dateChoose: Array<string> = [];
  public docDate: any = '全部';
  public sendDate: string = '';
  constructor(public recordDetailService: RecordDetailService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
    // this.customerId = '1705101137488803263'
    this.initData();
  }

  onChange(val) {
    if (this.docDate == '全部') {
      this.sendDate = '';
    } else {
      this.sendDate = this.docDate;
    }
    this.initDoctorOrderInfo()
  }

  initData() {
    this.recordDetailService.baseInfo(this.customerId).subscribe((res) => {
      this.customerBaseInfo = res;

    })
    this.initSeeDoctorInfo();
    this.initOperatorInfo();
    this.initOutPatientInfo();
    this.initHispitalInfo();
    this.initSurveyReportInfo();
    this.initInspectInfo();
    this.initDoctorOrderInfo();
  }


  // 医嘱信息
  initDoctorOrderInfo() {
    this.recordDetailService.doctorAdviceInfo(this.customerId, this.sendDate).subscribe((res) => {
      this.docOrderInfo = res.doctorOrdersList;
      if (this.dateChoose.length === 0) {
        if (res.timeList instanceof Array) {
          this.dateChoose = res.timeList;
          this.dateChoose.unshift('全部');
        }
      }
    })
  }

  // 检查报告
  initInspectInfo() {
    this.recordDetailService.inspectionReportInfo(this.customerId).subscribe((res) => {
      this.inspectInfo = res;
    })
  }


  // 检验报告
  initSurveyReportInfo() {
    this.recordDetailService.surveyReportInfo(this.customerId).subscribe((res) => {
      this.surveyInfo = res;
    })
  }

  // 住院信息
  initHispitalInfo() {
    this.recordDetailService.hospitalInfo(this.customerId).subscribe((res) => {
      this.hosInfo = res;
    })
  }

  // 就诊信息
  initSeeDoctorInfo() {
    this.recordDetailService.seeDoctorInfo(this.customerId).subscribe((res) => {
      this.seeDoctor = res;
    })
  }

  /**
    住院手术
   */
  initOperatorInfo() {
    this.recordDetailService.operatorInfo(this.customerId).subscribe((res) => {
      this.opInfo = res;
    })
  }

  /**
    门诊信息
   */
  initOutPatientInfo() {
    this.recordDetailService.outPatientInfo(this.customerId).subscribe((res) => {
      this.outpaInfo = res;
    })
  }

}
