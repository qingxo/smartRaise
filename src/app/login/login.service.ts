import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import storage from '../shared/storage';
// import * as md5 from 'md5';

@Injectable()
export class LoginService {
  constructor(private http:Http){}
  login(data:any):Observable<any> {

    // var datas = {
    //   "password":md5('123456'),
    //   "userName":"sys"
    // }
    return this.http.post('api/web/login?','').map((res)=>{res.json()})
  }

  // isLogin() {
  //   const state = storage.get('state')
  //   return !!state
  // }
  //
  // logout() {
  //   storage.remove('state')
  //   this.$state.go('login')
  // }
}
