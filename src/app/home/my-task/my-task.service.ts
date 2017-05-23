import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import storage from '../../shared/storage'
@Injectable()
export class MyTaskService {

  constructor(private http:Http) { }

  missionList() {
    return this.http.post('api/servicePack/listMission','').map((res)=>{
      return res.json()
    })

  }

  taskList(data) {
    return this.http.post('api/commissionerTask/listByPage', storage.serialize(data) ).map((res)=>{
      return res.json()
    })
  }

  handlerPkgDoen(data) {
    return this.http.post('api/commissionerTask/deal/' +data,'').map((res)=>{
      return res.json()
    })
  }

}
