import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import storage from '../../shared/storage'
import { BaseService } from '../../shared/base.service'
@Injectable()
export class OrderService extends BaseService {

  constructor(public http: Http) {
    super(http)
  }

  orderList(data) {
    return this.postInfo('api/serviceOrder/listByPage', storage.serialize(data))
  }


  pkgStart(data) {
    return this.postInfo('api/serviceOrder/start', storage.serialize(data))
  }

  pkgEnd(data) {
    return this.postInfo('api/serviceOrder/stop', storage.serialize(data))
  }

  unSubscriptionPkg(data) {
    return this.postInfo('api/servicePack/unsubscribe', storage.serialize(data))

  }


}
