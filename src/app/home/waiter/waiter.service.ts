import { Injectable } from '@angular/core';
import storage from '../../shared/storage';
import {Http} from '@angular/http';
import {BaseService} from '../../shared/base.service';
@Injectable()
export class WaiterService extends BaseService {

  constructor(public http: Http) { super(http); }

  waiterList(data) {
    return this.postInfo('api/account/listByPage', storage.serialize(data));
  }

  delPerson(data) {
    return this.postInfo('api/account/delete/' + data, '');
  }

  defaultPerson(id) {
    return this.postInfo('api/account/setDefaultCommissioner/' + id, '');

  }

  getDefaultCommissioner() {
    return this.http.post('api/account/getDefaultCommissioner', '').map((res) => {
      return res.json();
    });
  }

}
