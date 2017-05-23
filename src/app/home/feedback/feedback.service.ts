import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import storage from '../../shared/storage'
@Injectable()
export class FeedbackService {

  constructor(private http:Http) { }

  customerFeedBackList(data) {
    return this.http.post('api/webOpinion/customer/listByPage', storage.serialize(data) ).map((res=>{
      return res.json()
    }))
  }

  userFeedBackList(data) {
    return this.http.post('api/webOpinion/user/listByPage', storage.serialize(data) ).map((res)=>{
      return res.json()
    })
  }

  customerHandler(data) {
    return this.http.post('api/webOpinion/customer/dealOpinion', storage.serialize(data) ).map((res)=>{
      return res.json()
    })
  }

  userHandler(data) {
    return this.http.post('api/webOpinion/user/dealOpinion', storage.serialize(data) ).map((res)=>{
      return res.json()
    })

  }

}
