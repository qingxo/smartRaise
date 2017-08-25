import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from '../../shared/base.service';
import storage from '../../shared/storage';
@Injectable()
export class BloodSugarService extends BaseService {

  constructor(http: Http) { super(http); }
  getBloodSugarList(data) {
    return this.postInfo('api/webBloodSugar/list', storage.serialize(data));
  }
}
