import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import storage from '../shared/storage'
import { BaseService } from '../shared/base.service'
@Injectable()
export class HomeService extends BaseService {
  constructor(http: Http) {
    super(http)
  }

  logout() {
    return this.postInfo('api/web/loginOut', '')
  }

  save(data) {
    return this.postInfo('api/account/modifyPsd', storage.serialize(data))
  }

  getMenuList(roleId: any) {
    return this.postInfo(`api/com/yykj/sysMenu/getPageMenuByRoleId.json?id=${roleId}`, '')
  }
}
