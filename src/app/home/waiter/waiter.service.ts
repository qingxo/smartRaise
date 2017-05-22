import { Injectable } from '@angular/core';
import storage from '../../shared/storage'
import {Http} from '@angular/http'

@Injectable()
export class WaiterService {

  constructor(private http:Http) { }

  waiterList(data) {
    return this.http.post('api/account/listByPage', storage.serialize(data)).map((res)=>{
      return res.json()
    })
  }

  delPerson(data) {
    return this.http.post('api/account/delete/' + data,'').map((res)=>{
      return res.json()
    })
  }

  defaultPerson(id) {
    return this.http.post('api/account/setDefaultCommissioner/' + id,'').map((res)=>{
      return res.json()
    })
  }

  getDefaultCommissioner() {
    return this.http.post('api/account/getDefaultCommissioner','').map((res)=>{
      return res.json()
    })
  }

}
