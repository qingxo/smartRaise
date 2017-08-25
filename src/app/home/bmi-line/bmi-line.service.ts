import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from '../../shared/base.service';
import storage from '../../shared/storage';
@Injectable()
export class BmiLineService extends BaseService {

  constructor(http: Http) { super(http); }
  bmiList(data) {
    return this.postInfo('api/webHealthExamData/list', storage.serialize(data));
  }
}
