import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class MeasureDetailService extends BaseService {
  constructor(http: Http) {
    super(http);
  }

  getList(data: any): Observable<any> {
    return this.postInfo('api/statisticalStatement/alreadyMeasureStatistics', storage.serialize(data));
  }
}
