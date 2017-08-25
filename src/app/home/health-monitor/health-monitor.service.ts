import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
@Injectable()
export class HealthMonitorService extends BaseService {

  constructor(http: Http) { super(http); }
  getUserInfo(customerId) {
    return this.postInfo('api/customer/detail/' + customerId, '');
  }

  orderInfo(data) {
    return this.postInfo('api/serviceOrder/listByPag', storage.serialize(data));
  }

  getBloodPressureList(data) {
    return this.postInfo('api/webBloodPressure/list', storage.serialize(data));
  }

  addBloodPressure(data) {
    return this.postInfo('api/webBloodPressure/add', storage.serialize(data));
  }

  getBloodSugarList(data) {
    return this.postInfo('api/webBloodSugar/list', storage.serialize(data));
  }

  addBloodSugar(data) {
    return this.postInfo('api/webBloodSugar/add', storage.serialize(data));
  }

  finishedTask(commissionerTaskId) {
    return this.postInfo(`api/commissionerTask/deal/${commissionerTaskId}`, '');
  }

  getFinishTaskList(commissionerTaskId) {
    return this.postInfo(`api/commissionerTask/detail/${commissionerTaskId}`, '');
  }
}
