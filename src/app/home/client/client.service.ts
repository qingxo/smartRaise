import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import storage from '../../shared/storage';
import {BaseService} from '../../shared/base.service';
import {Observable} from 'rxjs/Rx';
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

}
