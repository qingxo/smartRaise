import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import storage from '../../shared/storage'
@Injectable()
export class OrderPackageService {

  constructor(private http:Http) { }


    personInfo(userId:any) {
      return this.http.post('api/customer/detail/' + userId,'').map((res)=>{
        return res.json()
      })
    }

    personBuyPkg(data:any) {
      return this.http.post('api/customer/packBuyDetail' ,storage.serialize(data)).map((res)=>{
        return res.json()
      })
    }

    pkgStart(data:any) {
      return this.http.post('api/serviceOrder/start', storage.serialize(data) ).map((res)=>{
        return res.json()
      })
    }

    pkgEnd(data:any) {
      return this.http.post('api/serviceOrder/stop', storage.serialize(data) ).map((res)=>{
        return res.json()
      })
    }

    pkgBuy(data:any) {
      return this.http.post('api/servicePack/buy', storage.serialize(data)).map((res)=>{
        return res.json()
      })
    }

    unSubscriptionPkg(data:any) {
      return this.http.post('api/servicePack/unsubscribe', storage.serialize(data)).map((res)=>{
        return res.json()
      })

    }

}
