import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { Http } from '@angular/http';
import storage from '../../shared/storage';
@Injectable()
export class JurisdictionService extends BaseService {

  constructor(http: Http) { super(http); }



  missionList() {
    return this.postInfo('api/servicePack/listMission', '');
  }

  getTree(id) {
    return this.postInfo(`api/com/yykj/sysMenu/getAllMenuByRoleId.json?id=${id}`, '');
  }

  getRoleList() {
    return this.postInfo('api/com/yykj/sysRole/queryAllList', '');
  }

  setRolePrivilege(tree, role) {
    return this.postInfo(`api/com/yykj/sysRoleRel/updatePrivilegeByRoleId.json?roleId=${role}&privilegeIds=${tree}`, '');
  }
}
