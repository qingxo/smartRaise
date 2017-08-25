import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from '../../shared/base.service';
import storage from '../../shared/storage';
@Injectable()
export class PackageDialogService extends BaseService {

  constructor(http: Http) { super(http); }
  taskName() {
    return this.postInfo('api/servicePack/listMission', '');
  }

  savePackage(data) {
    return this.postInfo('api/servicePack/add', storage.serialize(data));
  }

  editPackage(data) {
    return this.postInfo('api/servicePack/modify', storage.serialize(data));
  }


  packageInfo(servicePackId) {
    return this.postInfo('api/servicePack/detail/' + servicePackId, '');
  }
}
