import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import storage from '../../shared/storage';
import {BaseService} from '../../shared/base.service';
@Injectable()
export class AccountsService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  delPerson(data) {
    return this.postInfo('api/account/delete/' + data, '');
  }

  accountsList(data) {
    return this.postInfo('api/account/listByPage', storage.serialize(data));
  }

}
