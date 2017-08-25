import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class FeedbackService extends BaseService {

  constructor(http: Http) { super(http); }

  customerFeedBackList(data) {
    return this.postInfo('api/webOpinion/customer/listByPage', storage.serialize(data));
  }

  userFeedBackList(data) {
    return this.postInfo('api/webOpinion/user/listByPage', storage.serialize(data));
  }

  customerHandler(data) {
    return this.postInfo('api/webOpinion/customer/dealOpinion', storage.serialize(data));
  }

  userHandler(data) {
    return this.postInfo('api/webOpinion/user/dealOpinion', storage.serialize(data));
  }

}
