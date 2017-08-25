import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class SleepQualityService extends BaseService {

  constructor(http: Http) { super(http); }
  sleepQuality(equipNo, days) {
    return this.getInfo(`api/webHealthManage/getSleepQualityAnaly/${equipNo}/${days}`);
  }
}
