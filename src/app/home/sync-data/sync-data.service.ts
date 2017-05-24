import { Injectable } from '@angular/core'
import {Http} from '@angular/http'
import storage from '../../shared/storage'

@Injectable()
export class SyncDataService {

  constructor(private http:Http) { }

  clientProblemList(data) {
    return this.http.post('api/customer/listByPage', storage.serialize(data) ).map((res)=>{
      return res.json()
    })
  }

  healthProblemList(data) {
    return this.http.post('api/account/listByPage', storage.serialize(data)).map((res)=>{
      return res.json()
    })
  }

  synTask() {
    return this.http.post('api/customer/synchronizationHele','').map((res)=>{
      return res.json()
    })
  }

}
