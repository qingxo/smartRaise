import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import storage from '../../shared/storage';
import { Http } from '@angular/http';
@Injectable()
export class CriticalValueService extends BaseService {

  constructor(http: Http) { super(http) }

}
