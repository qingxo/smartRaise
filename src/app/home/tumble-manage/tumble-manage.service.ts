import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class TumbleManageService extends BaseService {

  constructor(http: Http) { super(http); }
  clientList(data: any) {
    return this.postInfo('api/customer/listByPage', storage.serialize(data));
  }

  groupList(data) {
    return this.postInfo('api/socialWelfare/listByPage', storage.serialize(data));
  }

  countStatistics(data) {
    return this.postInfo('api/customer/countOfBinding', storage.serialize(data));
  }
}
