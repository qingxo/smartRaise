import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import storage from '../../shared/storage'

@Injectable()
export class OrderDetailService {

  constructor(private http:Http) { }

  orderDetail(data) {
    return this.http.post('api/serviceOrder/detail/' + data ,'').map((res)=>{
      return res.json()
    })
  }


}
