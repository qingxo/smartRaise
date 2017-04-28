import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  constructor(private http:Http){}
  login(data:any):Observable<any> {
    return this.http.post('api/web/login',data).publishLast()
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
