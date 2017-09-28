import { Injectable } from '@angular/core';
import storage from '../../shared/storage';
import { Http } from '@angular/http';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class RecordDetailService extends BaseService {

  constructor(public http: Http) { super(http); }

  baseInfo(customerId) {
    return this.postInfo(`api/customer/hospitalRecord/basicInformation/${customerId}`, '');
  }

  seeDoctorInfo(customerId) {
    return this.postInfo(`api/customer/hospitalRecord/medicalInformation/${customerId}`, '');
  }

  operatorInfo(customerId) {
    return this.postInfo(`api/customer/hospitalRecord/receivingOperations/${customerId}`, '');
  }

  hospitalInfo(customerId) {
    return this.postInfo(`api/customer/hospitalRecord/inpatientsInformation/${customerId}`, '');
  }

  surveyReportInfo(customerId) {
    return this.postInfo(`api/customer/hospitalRecord/surveyReport/${customerId}`, '');
  }

  doctorAdviceInfo(customerId, date) {
    return this.postInfo(`api/customer/hospitalRecord/doctorOrders/${customerId}/${date}`, '');
  }

  outPatientInfo(customerId) {
    return this.postInfo(`api/customer/hospitalRecord/outpatientPrescription/${customerId}`, '');
  }

  inspectionReportInfo(customerId) {
    return this.postInfo(`api/customer/hospitalRecord/inspectionReport/${customerId}`, '');
  }
}
