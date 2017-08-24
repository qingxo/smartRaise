import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import storage from '../../shared/storage';
import { Http } from '@angular/http';
@Injectable()
export class AccountDialogsService extends BaseService {

  constructor(http: Http) { super(http) }

  getUserDetail(userId) {
    return this.postInfo('api/account/detail/' + userId, '')
  }

  saveHealth(data) {
    return this.postInfo('api/account/add', storage.serialize(data))
  }

  editHealth(data) {
    return this.postInfo('api/account/modify', storage.serialize(data))
  }
}
