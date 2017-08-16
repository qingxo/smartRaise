import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class SynDataService extends BaseService {

  constructor(http: Http) { super(http) }
  clientProblemList(data) {
    return this.postInfo('api/customer/listByPage', storage.serialize(data))
  }

  healthProblemList(data) {
    return this.postInfo('api/account/listByPage', storage.serialize(data))
  }

  synTask() {
    return this.postInfo('api/customer/synchronizationHele', '')
  }
}
