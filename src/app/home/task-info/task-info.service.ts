import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
@Injectable()
export class TaskInfoService extends BaseService {

  constructor(http: Http) { super(http); }
  getUserInfo(customerId) {
    return this.postInfo('api/customer/detail/' + customerId, '');
  }

  getFinishTaskList(commissionerTaskId) {
    return this.postInfo(`api/commissionerTask/detail/${commissionerTaskId}`, '');
  }
}
