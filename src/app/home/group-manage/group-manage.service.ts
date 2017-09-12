import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
@Injectable()
export class GroupManageService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  groupList(data) {
    return this.postInfo('api/socialWelfare/listByPage', storage.serialize(data));
  }

  groupAdd(data) {
    return this.postInfo('api/socialWelfare/add', storage.serialize(data));
  }

  groupEdit(data) {
    return this.postInfo('api/socialWelfare/modify', storage.serialize(data));
  }

  groupDelete(id) {
    return this.postInfo(`api/socialWelfare/delete/${id}`, '');
  }

  getProvince() {
    return this.postInfo('api/region/getAllProvince', '');
  }

  getCities(proviceId) {
    return this.postInfo(`api/region/getAllCityByParentId/${proviceId}`, '')
  }


}
