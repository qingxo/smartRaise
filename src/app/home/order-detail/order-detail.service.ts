import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import storage from '../../shared/storage'
import { BaseService } from '../../shared/base.service'

@Injectable()
export class OrderDetailService extends BaseService {

  constructor(http: Http) { super(http) }

  orderDetail(data) {
    return this.postInfo('api/serviceOrder/detail/' + data, '')
  }


}
