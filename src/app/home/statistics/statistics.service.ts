import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
import { BaseService } from '../../shared/base.service';
@Injectable()
export class StatisticsService extends BaseService {

  constructor(http: Http) { super(http); }
  getCustomerList(data) {
    if (data.socialWelfareId === '' && data.flag === '' ) {
      return this.postInfo('api/statisticalStatement/allCustomerClassification', '');
    } else {
      return this.postInfo('api/statisticalStatement/organizationCustomerClassification', storage.serialize(data));


    }

  }

  // getEquipList() {
  //   return this.postInfo('api/statisticalStatement/equipmentUsageStatistics', '');
  // }

  // getOrderList() {
  //   return this.postInfo('api/statisticalStatement/orderStatistics', '');
  // }

  getEquipList() {
    return this.postInfo('api/statisticalStatement/equipmentUsageStatistics', '');
  }
  getStatisticsDetails(data) {
    return this.postInfo('api/statisticalStatement/statisticsDetails', storage.serialize(data));
  }
  getOrderList(data) {
    return this.postInfo('api/statisticalStatement/physicalStatistics', storage.serialize(data));
  }
}
