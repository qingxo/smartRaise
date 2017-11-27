import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from '../../shared/base.service';
import storage from '../../shared/storage';
@Injectable()
export class LoginInfoService extends BaseService {

  constructor(public http: Http) {
    super(http)
  }

  loginList(data) {
    return this.postInfo('/api/socialWelfare/loginLogList', storage.serialize(data))
  }

}
