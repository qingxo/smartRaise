import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import storage from '../../shared/storage'

@Injectable()
export class AccountsService {

  constructor(private http:Http) { }

  delPerson(data) {
    return this.http.post('api/account/delete/' + data,'').map((res)=>{
      return res.json()
    })
  }

  accountsList(data) {
    return this.http.post('api/account/listByPage', storage.serialize(data) ).map((res)=>{
      return res.json()
    })
  }

}
