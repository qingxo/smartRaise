import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';
import { Observable } from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService extends BaseService {
  constructor(http: Http) {
    super(http)
  }

  clientList(data: any): Observable<any> {
    return this.postInfo('api/customer/listByPage', storage.serialize(data))
  }

  del(customerId) {
    return this.postInfo(`api/customer/delete/${customerId}`, '')
  }

  addClient(data) {
    return this.postInfo('api/customer/add', storage.serialize(data))
  }

  editClient(data) {
    return this.postInfo('api/customer/modify', storage.serialize(data))
  }

  //smartbed api start
  save(data: any) {
    return this.postInfo('api/customer/bunding', storage.serialize(data))
  }

  unbind(data) {
    return this.postInfo('api/customer/unbunding' + data, '')
  }

  reBunding(data: any) {
    return this.postInfo('api/customer/rebunding', storage.serialize(data))
  }

  //smartbed api endd

  //----------health person api start-------------
  healthList(data) {
    return this.postInfo('api/account/listByPage' + data, '')
  }

  delPerson(data) {
    return this.postInfo('api/account/delete/' + data, '')
  }

  saveHealthPerson(data) {
    return this.postInfo('api/customer/fixSpecialist/' + data.customerId + '/' + data.commissionerUserId, '')
  }

  defaultPerson(id) {
    return this.postInfo('api/account/setDefaultCommissioner/' + id, '')
  }

  //--------------health person api end -------------------


  //编辑和新增客户的 api start------------------
  personInfo(userId) {
    return this.postInfo('api/customer/detail/' + userId, '')
  }

  groupList(data) {
    return this.postInfo('api/socialWelfare/listByPage', storage.serialize(data))
  }

  //批量分配健康专员的接口
  groupPlanFor(socialWelfareId, commissionerUserId) {
    return this.postInfo(`api/customer/fixSpecialists/${socialWelfareId}/${commissionerUserId}`, '')

  }



  //编辑和新增客户api end -------------------

}
