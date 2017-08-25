import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from '../../shared/base.service';
import storage from '../../shared/storage';
@Injectable()
export class HistoryLineService extends BaseService {

  constructor(http: Http) { super(http); }
  smartBedHistoryData(sources, equipNo, day) {
    return this.postInfo(`api/webHealthManage/heartRate/${sources}/${equipNo}/${day}`, '');
  }
}
