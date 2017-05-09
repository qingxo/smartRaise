import { Injectable } from '@angular/core';
import {Http} from '@angular/Http';

@Injectable()
export class PlanmanService {

  constructor(private http:Http) { }

  healthList(data:any) {
    return this.http.post('api/account/listByPage' + data,'').map((res)=>{
      return res.json()
    })
  }

  save(data:any) {
    return this.http.post('api/customer/fixSpecialist/' + data.customerId + '/' + data.commissionerUserId,'').map((res)=>{
      return res.json()
    })
  }

}
