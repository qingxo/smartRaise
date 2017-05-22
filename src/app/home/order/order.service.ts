import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import storage from '../../shared/storage'
@Injectable()
export class OrderService {

  constructor(private http:Http) { }

  orderList(data) {
    return this.http.post('api/serviceOrder/listByPage', storage.serialize(data) ).map((res)=>{
      return res.json()
    })
  }

}
