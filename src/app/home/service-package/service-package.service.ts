import { Injectable } from '@angular/core';
import storage from '../../shared/storage'
import {Http} from '@angular/http'
@Injectable()
export class ServicePackageService {

  constructor(private http:Http) { }


  packageList(data) {
    return this.http.post('api/servicePack/listByPage', storage.serialize(data) ).map((res)=>{
      return res.json()
    })
  }

  changeStatus(data) {
    return this.http.post('api/servicePack/upAndDown', storage.serialize(data)).map((res)=>{
      return res.json()
    })
  }

}
