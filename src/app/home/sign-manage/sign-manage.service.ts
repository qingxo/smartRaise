import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class SignManageService extends BaseService {

  constructor(http: Http) { super(http) }
  clientList(data: any) {
    return this.postInfo('api/customer/listByPage', storage.serialize(data));
  }
}
