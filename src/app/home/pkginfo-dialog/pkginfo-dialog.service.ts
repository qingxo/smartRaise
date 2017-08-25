import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from '../../shared/base.service';
import storage from '../../shared/storage';
@Injectable()
export class PkginfoDialogService extends BaseService {

  constructor(http: Http) { super(http); }
  packageInfo(servicePackId) {
    return this.postInfo('api/servicePack/detail/' + servicePackId, '');
  }
}
