import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { Http } from '@angular/http'
import storage from '../../shared/storage'
@Injectable()
export class InputGroupService extends BaseService {

  constructor(http: Http) { super(http) }
  addBloodSugar(data) {
    return this.postInfo('api/webBloodSugar/add', storage.serialize(data))
  }

  addBloodPressure(data) {
    return this.postInfo('api/webBloodPressure/add', storage.serialize(data))
  }

  addBmiInfo(data) {
    return this.postInfo('api/webHealthExamData/add', storage.serialize(data))
  }

  addOxygenInfo(data) {
    return this.postInfo('api/webHealthExamData/add', storage.serialize(data))
  }

  addHeatInfo(data) {
    return this.postInfo('api/webHealthExamData/add', storage.serialize(data))
  }


  finishedTask(commissionerTaskId) {
    return this.postInfo(`api/commissionerTask/deal/${commissionerTaskId}`, '')
  }

}
