import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from '../../shared/base.service';
import storage from '../../shared/storage';

@Injectable()
export class BloodPressureService extends BaseService {

  constructor(http: Http) { super(http); }
  getBloodPressList(data) {
    return this.postInfo('api/webBloodPressure/list', storage.serialize(data));
  }
}
