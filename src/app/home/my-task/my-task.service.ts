import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import storage from '../../shared/storage'
import { BaseService } from '../../shared/base.service';

@Injectable()
export class MyTaskService extends BaseService {

  constructor(http: Http) { super(http) }

  missionList() {
    return this.postInfo('api/servicePack/listMission', '')
  }

  taskList(data) {
    return this.postInfo('api/commissionerTask/listByPage', storage.serialize(data))
  }

  handlerPkgDoen(data) {
    return this.postInfo('api/commissionerTask/deal/' + data, '')

  }

}
