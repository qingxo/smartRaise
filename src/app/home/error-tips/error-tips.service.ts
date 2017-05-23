import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import storage from '../../shared/storage'
@Injectable()
export class ErrorTipsService {

  constructor(private http:Http) { }

  errorList(data) {
    return this.http.post('api/webAbnormalHealth/listByPage', storage.serialize(data) ).map((res)=>{
      return res.json()
    })
  }

}
