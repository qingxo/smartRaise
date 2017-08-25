import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
@Injectable()
export class MonitorListService extends BaseService {

  constructor(http: Http) { super(http); }

  getBloodSugarList(data) {
    return this.postInfo('api/webBloodSugar/listByPage', storage.serialize(data));
  }

  getBloodPressList(data) {
    return this.postInfo('api/webBloodPressure/listByPage', storage.serialize(data));
  }

  bmiListByPage(data) {
    return this.postInfo('api/webHealthExamData/listByPage', storage.serialize(data));
  }

  oxygenListByPage(data) {
    return this.postInfo('api/webHealthExamData/listByPage', storage.serialize(data));
  }

  heatListByPage(data) {
    return this.postInfo('api/webHealthExamData/listByPage', storage.serialize(data));

  }
}
