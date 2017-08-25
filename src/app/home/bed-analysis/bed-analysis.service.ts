import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from '../../shared/base.service';
import storage from '../../shared/storage';
@Injectable()
export class BedAnalysisService extends BaseService {

  constructor(http: Http) { super(http); }
  bedAnalysis(equipNo, days) {
    return this.getInfo(`api/webHealthManage/getBeleavedBedAnaly/${equipNo}/${days}`);
  }
}
