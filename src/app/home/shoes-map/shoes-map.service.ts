import { Injectable } from '@angular/core';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';
import { Http } from '@angular/http';

@Injectable()
export class ShoesMapService extends BaseService {

  constructor(public http: Http) { super(http); }

  getLocalPos(data) {
    return this.postInfo('api/customer/getLoacal ', storage.serialize(data));
  }

  getAccidentInfo(data) {
    return this.postInfo('api/customer/getAccident ', storage.serialize(data));

  }

}
