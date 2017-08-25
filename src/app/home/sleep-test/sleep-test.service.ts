import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class SleepTestService extends BaseService {

  constructor(http: Http) { super(http); }
  getEchartsInfo(customerId) {
    return this.getInfo(`api/healthSleep/queryHealthSleepEvaluateById/${customerId}`);
  }

  getUserInfo(userId) {
    return this.postInfo('api/customer/detail/' + userId, '');
  }

}
