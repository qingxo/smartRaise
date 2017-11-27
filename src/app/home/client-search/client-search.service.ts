import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class ClientSearchService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  getList(data: any): Observable<any> {
    return this.postInfo('api/socialWelfare/queryCustomerDeatilBySocialWelfareId ', storage.serialize(data));
  }

  getCount(data: any): Observable<any> {
    return this.postInfo('api//socialWelfare/queryCustomerCount', storage.serialize(data));
  }



}
