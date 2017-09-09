import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';

@Injectable()
export class ErrorTipsService extends BaseService {

  constructor(http: Http) { super(http); }

  errorList(data) {
    return this.postInfo('api/webAbnormalHealth/listByPage', storage.serialize(data));
  }

  errorHandler(commissionerUserId, commissionerMobile, cardId) {
    return this.postInfo(`api/commissionerTask/dealHele/${commissionerUserId}/${commissionerMobile}/${cardId}`, '');
  }

  errorDeal(data) {
    return this.postInfo('api/webAbnormalHealth/updateRemind', storage.serialize(data));
  }


}
