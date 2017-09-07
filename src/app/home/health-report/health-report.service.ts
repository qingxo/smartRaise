import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
@Injectable()
export class HealthReportService extends BaseService {

  constructor(http: Http) { super(http); }

  getUserInfo(userId) {
    return this.postInfo('api/customer/detail/' + userId, '');
  }

  reportList(customerId) {
    return this.postInfo(`api/customer/getReport/${customerId}`, '');
  }

  createList(commissionerTaskId, customerId, data) {
    return this.postInfo(`api/commissionerTask/dealReprot/${commissionerTaskId}/${customerId}`, storage.serialize(data));
  }

  createListNoTask(customerId, data) {
    return this.postInfo(`api/customer/generateReprot/${customerId}`, storage.serialize(data))
  }

  deleteReport(reportId) {
    return this.postInfo(`api/commissionerTask/deleteReprot/${reportId}`, '');
  }



}
