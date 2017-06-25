import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import storage from '../../shared/storage'
import {BaseService} from '../../shared/base.service'
@Injectable()
export class OrderService extends BaseService {

  constructor(public http: Http) {
    super(http)
  }

  orderList(data) {
    return this.postInfo('api/serviceOrder/listByPage', storage.serialize(data))
  }

}
