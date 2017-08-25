import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { fromPromise } from 'rxjs/observable/fromPromise';
import storage from './storage';
import * as swal from 'sweetalert';

@Injectable()
export class BaseService {
  public LOG_OUT = '10000000'; // 登录错误
  public SYS_ERROR = '10000001'; // 系统操作错误
  constructor(public http: Http) { }

  getInfo(url: any): Observable<any> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  postInfo(url, data): Observable<any> {
    return this.http.post(url, data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: any) {
    const body = res.json();
    if (!body.success) {
      if (body.errCode === '10000000') {
        setTimeout(() => {
          storage.remove('state');
          window.location.href = '/login';
        }, 2000);
      } else if (body.errCode === '10000001') {
        swal('错误', body.errMsg);
      }

    }
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      const err = 'error';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
