import { Injectable } from '@angular/core';
import { Http} from '@angular/http'
import storage from '../../shared/storage'
@Injectable()
export class SmartBedService {

  constructor(private http:Http) { }

  save(data:any) {
    return this.http.post('api/customer/bunding', storage.serialize(data)).map((res)=>{
      return res.json()
    })
  }

  reBunding(data:any) {
    return this.http.post('api/customer/rebunding', storage.serialize(data)).map((res)=>{
      return res.json()
    })
  }

}
