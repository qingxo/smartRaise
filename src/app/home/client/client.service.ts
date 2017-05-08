import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import storage from '../../shared/storage';
import {Observable} from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class ClientService {

  constructor(private http:Http) { }

  clientList(data:any):Observable<any> {
    console.log(data)
    console.log(storage.serialize(data))
    return this.http.post('api/customer/listByPage',storage.serialize(data)).map((res)=>{return res.json() })
  }

}
