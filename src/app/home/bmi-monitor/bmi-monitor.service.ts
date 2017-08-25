import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/base.service';
import {Http} from '@angular/http';
import storage from '../../shared/storage';


@Injectable()
export class BmiMonitorService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  userInfo(customerId) {
    return this.postInfo('api/customer/detail/' + customerId, '');
  }

  orderInfo(data) {
    return this.postInfo('api/serviceOrder/listByPage', storage.serialize(data));
  }

  addBmiInfo(data) {
    return this.postInfo('api/webHealthExamData/add', storage.serialize(data));
  }

  bmiList(data) {
    return this.postInfo('api/webHealthExamData/list', storage.serialize(data));
  }

  finishedTask(commissionerTaskId) {
    return this.postInfo(`api/commissionerTask/deal/${commissionerTaskId}`, '');
  }

  getFinishTaskList(commissionerTaskId) {
    return this.postInfo(`api/commissionerTask/detail/${commissionerTaskId}`, '');
  }

}
