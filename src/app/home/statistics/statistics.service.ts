import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class StatisticsService extends BaseService {

  constructor(http: Http) { super(http); }
  getCustomerList(orgId) {
    if (orgId === '') {
      return this.postInfo('api/statisticalStatement/allCustomerClassification', '');
    } else {
      return this.postInfo(`/api/statisticalStatement/organizationCustomerClassification/${orgId}`, '');

    }
  }

  getEquipList() {
    return this.postInfo('api/statisticalStatement/equipmentUsageStatistics', '');
  }

  getOrderList() {
    return this.postInfo('api/statisticalStatement/orderStatistics', '');
  }
}
