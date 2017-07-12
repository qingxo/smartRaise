import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/base.service';
import storage from '../../shared/storage';
import {Http} from '@angular/http';

@Injectable()
export class ClientDetailService extends BaseService {

  constructor(http: Http) {
    super(http)
  }



  getUserInfo(userId) {
    return this.postInfo('api/customer/detail/' + userId, '')
  }

  userOrderList(data) {
    return this.postInfo('api/serviceOrder/listByPage', storage.serialize(data))
  }

  unbind(data) {
    return this.postInfo('api/customer/unbunding' + storage.serialize(data), '')
  }

  smartBedLivingData(sources, equipNo, day) {
    return this.postInfo(`api/webHealthManage/heartRate/${sources}/${equipNo}/${day}`, '')
  }

  getBloodSugarList(data) {
    return this.postInfo('api/webBloodSugar/list', storage.serialize(data))
  }

  getBloodPressList(data) {
    return this.postInfo('api/webBloodPressure/list', storage.serialize(data))
  }

  getReportList(data) {
    return this.postInfo('api/customer/report', storage.serialize(data))
  }

  getSelfReportList(customerId) {
    return this.postInfo(`api/customer/getReport/${customerId}`, '')
  }
}
