import { Injectable } from '@angular/core';
import storage from '../../shared/storage'
import {Http} from '@angular/http'
import {BaseService} from '../../shared/base.service'
@Injectable()
export class ServicePackageService extends BaseService {

  constructor(public http: Http) { super(http) }


  packageList(data) {
    return this.postInfo('api/servicePack/listByPage', storage.serialize(data))
  }

  changeStatus(data) {
    return this.http.post('api/servicePack/upAndDown', storage.serialize(data)).map((res) => {
      return res.json()
    })
  }

}
