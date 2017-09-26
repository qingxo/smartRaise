import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseService } from '../../shared/base.service';

@Injectable()
export class SleepReportService extends BaseService {

  constructor(http: Http) { super(http) }

  reportDetail(equipmentNo: string, date: string) {
    return this.getInfo(`api/webHealthManage/getSleepReport/${equipmentNo}/${date}`);
  }

  reportSleepHeart(equipmentNo, date) {
    return this.getInfo(`/webHealthManage/getSleepHeart/${equipmentNo}/${date}`);
  }

  reportSleepOnBed(equipmentNo, date) {
    return this.getInfo(`/webHealthManage/getSleepOnBed/${equipmentNo}/${date}`);
  }
}
