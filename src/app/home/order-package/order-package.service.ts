import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import storage from '../../shared/storage'
import {BaseService} from '../../shared/base.service'
@Injectable()
export class OrderPackageService extends BaseService {

  constructor(public http: Http) {
    super(http)
  }
  personInfo(userId) {
    return this.postInfo('api/customer/detail/' + userId, '')
  }

  personBuyPkg(data) {
    return this.postInfo('api/customer/packBuyDetail', storage.serialize(data))
  }

  pkgStart(data) {
    return this.postInfo('api/serviceOrder/start', storage.serialize(data))
  }

  pkgEnd(data) {
    return this.postInfo('api/serviceOrder/stop', storage.serialize(data))
  }

  pkgBuy(data) {
    return this.postInfo('api/servicePack/buy', storage.serialize(data))
  }

  unSubscriptionPkg(data) {
    return this.postInfo('api/servicePack/unsubscribe', storage.serialize(data))

  }

}
