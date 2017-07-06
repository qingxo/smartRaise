import { Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class HomeService {
  constructor(public http: Http) {
  }

  logout(): Observable<any> {
    return this.http.post('api/web/loginOut', '').map((res) => { return res.json() })
  }

  getMenuList(roleId: any): Observable<any> {
    return this.http.post(`api/com/yykj/sysMenu/getPageMenuByRoleId.json?id=${roleId}`, '').map((res) => { return res.json() })
  }
}
