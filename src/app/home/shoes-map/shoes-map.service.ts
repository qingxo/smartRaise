import { Injectable } from '@angular/core';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';

@Injectable()
export class ShoesMapService extends BaseService {

  constructor(public http: Http) { super(http); }

  shoesList(data) {
    return this.postInfo('api/customer/listShoesByPage ', '');
  }

  getLocalPos(data) {
    return this.postInfo('api/customer/getLoacal ', storage.serialize(data));
  }

  getAccidentInfo(data) {
    return this.postInfo('api/customer/getAccident ', storage.serialize(data));

  }

}
