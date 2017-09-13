import { Component, OnInit, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { ClientService } from './client.service';
import { ServicePackageService } from '../service-package/service-package.service';
import { GroupManageService } from '../group-manage';
import storage from '../../shared/storage';
import tools from '../../shared/tools';
import SysData from '../../shared/sysData';
import * as $ from 'jquery';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import * as Flatpickr from 'flatpickr';
import * as zh_lang from 'flatpickr/dist/l10n/zh.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import baseAnimation from '../../shared/myAnimation';
import { AccountDialogsComponent } from '../account-dialogs';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [ClientService, ServicePackageService, GroupManageService],
  animations: baseAnimation
})
export class ClientComponent implements OnInit {

  private clientHead: string[] = [];
  private operate = '操作';
  private listData: Array<any> = [];
  private listName: Array<any> = [];
  private pages: Array<any> = [];
  private pageSize = 10;
  private pageNumber = 1;
  private queryInfo = '';
  private totalPage: number;
  private clientBtn: any;
  private closeResult: string;
  private modalRef: any;
  private itemTarget = 0; // 用户点击的列的值
  private smartBed: string;
  private sources = 'A'; // 智能床默认值
  private healthpersonlist: Array<any> = []; // 健康专员列表
  private healthCarePerson: string; // 用户默认的健康专员
  private role: number;
  private bedType: Array<any> = [
    {
      'name': '智能床A',
      'value': 'A'
    }, {
      'name': '智能床B',
      'value': 'B'
    }
  ];
  private realname = '';
  private mobile = null;
  private sex = '';
  private userName = '';
  private weight = '';
  private height = '';
  private email = '';
  private address = '';
  private remark = '';
  private birdthday = '';
  private relationShip = '';
  private cardId = '';
  private checkList = [];
  private myGroup = [];
  private myGroupName = [];
  private isEdit = false;
  private commissionerUserId: string;
  private group: Array<any>; // 监护人列表
  private helpList: Array<any>;
  private queryHelpInfo: string;

  private errorRealname = '';
  private errorCardId = '';
  private errorMobile = '';
  private errorHeight = '';
  private errorWeight = '';
  private bothhw = '';
  private bothNumber = '';
  private provinces: Array<any> = [];
  private cities: Array<any> = [];
  private streets: Array<any> = [];
  private global_tips = '请选择=-1';
  private choosedProvince: string = this.global_tips;
  private choosedCities: string = this.global_tips;
  private choosedStreets: string = this.global_tips;
  private exampleOptions: FlatpickrOptions = {
    enableTime: false,
    static: true,
    time_24hr: true,
    dateFormat: 'Y-m-d',
    locale: zh_lang['zh'],
    onChange: this.changeBirthday.bind(this),
    onClose: this.closeTime.bind(this)
  };
  private birthTime: any;
  private chameleon = 'inactive';
  private fly = 0;
  private groupPlanList: Array<any> = [];
  private chooseGroupList: Array<any> = [];
  private groupPlanName: string;
  private chooseGroupId = '';
  private choosedPkg = '请选择';
  private pkgList: Array<any> = [];
  constructor(private clientService: ClientService, private groupManageService: GroupManageService, private servicePackageService: ServicePackageService, private modalService: NgbModal) { }
  changeMe() {
    this.chameleon === 'inactive' ? this.chameleon = 'active' : this.chameleon = 'inactive';
  }

  onChange(val) {
    this.pageNumber = 1;
    this.initAsyc();
  }

  onChanges(str, index) {
    const val = str.split('=')[1];
    this.getAddressInfo(val, index);
  }

  getAddressInfo(id, index, street = this.global_tips, city = this.global_tips) {
    this.groupManageService.getCities(id).subscribe((res) => {
      if (index === 1) {
        this.cities = [];
        this.streets = [];
        this.choosedCities = city;
        this.choosedStreets = street;
        this.cities = eval(res);

      } else if (index === 2) {
        this.streets = [];
        this.choosedStreets = street;
        this.streets = eval(res);
      }
    });
  }

  handleGroupName(event, num) {
    $(event.target).parent().remove();
    const name = this.myGroupName.splice(num, 1);
    const id = this.myGroup.splice(num, 1);
    this.refreshGroup(id[0], name[0], false);
  }

  chooseSocialWel(val) {
    const tmp = val.split(',');
    if (tmp[1] === '请选择') {
      return;
    }
    this.myGroup.push(tmp[0]);
    this.myGroupName.push(tmp[1]);
    this.refreshGroup(tmp[0]);
  }

  refreshGroup(id, name = '', flag = true) {
    if (flag) {
      for (let i = 0; i < this.group.length; i++) {
        if (this.group[i]['socialWelfareId'] === id) {
          this.group.splice(i, 1);
        }
      }
    } else {
      this.group.push({ 'socialWelfareName': name, 'socialWelfareId': id });
    }

  }


  ngOnInit() {
    this.role = storage.get('state')['role'];
    this.initBtnShow();
    this.initAsyc();
    this.initGroupPlanList();
    this.initPkgs();
    this.initProvinces();
  }

  initProvinces() {
    this.groupManageService.getProvince().subscribe((res) => {
      this.cities = [];
      this.streets = [];
      this.choosedCities = '请选择=-1';
      this.choosedStreets = '请选择=-1';
      this.provinces = eval(res);
      this.provinces.unshift({ 'regionName': '请选择', 'regionId': '-1' });
    });
  }
  initPkgs() {
    const data = {
      'pageSize': 100,
      'pageNum': 1,
      'query': this.queryInfo
    };
    this.servicePackageService.packageList(data).subscribe((res) => {
      if (res.success) {
        this.pkgList = res.data.list;
        this.pkgList.unshift({ 'servicePackId': '请选择', 'servicePackName': '请选择' });
      }
    });
  }



  clientGroupActive(content) {
    this.initHealthCarePerson();
    this.initGroupPlanList();
    this.open(content);
  }

  // 获取机构列表
  initGroupPlanList() {
    const data = {
      'pageSize': 100,
      'pageNum': 1
    };
    this.clientService.groupList(data).subscribe((res) => {
      if (res.success) {
        this.groupPlanList = res.data.list;
        this.chooseGroupList = Array.from(res.data.list);
      }
      this.chooseGroupList.unshift({ 'socialWelfareId': '', 'socialWelfareName': '请选择' });
      this.groupPlanName = this.groupPlanList[0].socialWelfareId;
    });
  }


  changeBirthday(val) {
    this.birdthday = moment(new Date(val)).format('YYYY-MM-DD');
  }

  closeTime(selectedDates, dateStr, instance) {
    instance.input.blur();
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' });

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openHealth(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' });

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openClientDetail(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-l-modal' });

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveGroupPlan() {
    tools.loading(true);
    this.clientService.groupPlanFor(this.groupPlanName, this.healthCarePerson).subscribe((res) => {
      tools.loading(false);
      if (res.success) {
        tools.tips('绑定成功');
        this.modalRef.close();
        this.initAsyc();
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

  sexChoosed(val) {
    this.sex = val;
  }

  clientActive(index, clientDetail) {
    this.itemTarget = index;
    this.clearInfo();
    this.choosedProvince = this.global_tips;
    this.choosedCities = this.global_tips;
    this.choosedStreets = this.global_tips;
    if (index === -1) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
    this.initHelpList();
    this.initGroupList();
    this.openClientDetail(clientDetail);
  }

  initGroupList() {
    const data = {
      'pageSize': 100,
      'pageNum': 1
    };
    this.clientService.groupList(data).subscribe((res) => {
      if (res.success) {
        this.group = [];
        this.group = res.data.list;
        this.group.unshift({ 'socialWelfareId': '', 'socialWelfareName': '请选择' });
        if (this.isEdit) {
          this.initEditData();
        }
      }

    });

  }

  initEditData() {
    const customerId = this.listData[this.itemTarget].customerId;
    this.clientService.personInfo(customerId).subscribe((res) => {
      if (res.success) {
        const info = res.data;
        this.realname = info.name;
        this.mobile = parseInt(info.mobile, 10);
        this.sex = info.sex;
        this.userName = info.userName;
        this.weight = info.weight;
        this.height = info.height;
        this.email = info.mail;
        this.address = info.address;
        this.remark = info.remark;
        this.birdthday = info.birdthday;
        this.relationShip = info.relationToCustomer;


        const code = info.addressCode;
        this.cities = [];
        this.streets = [];
        this.choosedCities = this.global_tips;
        this.choosedStreets = this.global_tips;
        if (code !== 'null' && code !== null) {
          const tmp = code.split(',');
          this.choosedProvince = info['province'] + '=' + tmp[0];

          const street = info['district'] === '' ? this.global_tips : info['district'] + '=' + tmp[2];
          const city = info['city'] === '' ? this.global_tips : info['city'] + '=' + tmp[1];
          if (tmp[0] !== '-1') {
            this.getAddressInfo(tmp[0], 1, street, city);
          }
          if (tmp[1] !== '-1') {
            this.getAddressInfo(tmp[1], 2, street);
          }
        }


        if (info.socialWelfareId) {
          const tt = info.socialWelfareId.split(',');
          const tmp = info.socialWelfareName.split(',');
          for (let i = 0; i < tmp.length; i++) {
            this.myGroupName.push(tmp[i]);
            this.myGroup.push(tt[i]);
          }
        } else {
          this.myGroup = [];
          this.myGroupName = [];
        }

        if (this.myGroup.length > 0) {
          for (let i = 0; i < this.myGroup.length; i++) {
            for (let j = 0; j < this.group.length; j++) {
              if (this.group[j]['socialWelfareId'] === this.myGroup[i]) {
                this.group.splice(j, 1);
              }
            }
          }
        }

        if (info.cardId) {
          this.cardId = info.cardId;
        }

        if (info.commissionerUserId) {
          this.commissionerUserId = info.commissionerUserId;
        }

        this.initGuardians(info.guardians);
      }
    });
  }

  initGuardians(array) {
    this.checkList = [];
    for (let i = 0; i < array.length; i++) {
      this.checkList.push({ 'name': array[i].name, 'mobile': array[i].mobile, 'id': array[i].customerId });
    }
  }

  initHelpList() {
    const data = {
      'pageSize': 100,
      'pageNum': 1,
      'query': this.queryHelpInfo
    };
    data['userId'] = storage.get('state')['userId'];
    this.clientService.clientList(data).subscribe((res) => {
      if (res.success) {
        this.helpList = res.data.list;
        this.expceptSelf();
      }
    });
  }

  expceptSelf() {
    for (let i = 0; i < this.helpList.length; i++) {
      if (this.itemTarget !== -1) {
        if (this.helpList[i].customerId === this.listData[this.itemTarget].customerId) {
          this.helpList.splice(i, 1);
        }
      }

    }
    this.initCheckBox();
  }

  initCheckBox() {
    for (let i = 0; i < this.helpList.length; i++) {
      this.helpList[i].isChecked = false;
    }
    for (let i = 0; i < this.checkList.length; i++) {
      const tmp = this.checkList[i].id;
      for (let j = 0; j < this.helpList.length; j++) {
        if (tmp === this.helpList[j].customerId) {
          this.helpList[j].isChecked = true;
        }
      }
    }
  }

  changeState(flag, num) {
    if (flag) {
      this.checkList.push({ 'name': this.helpList[num].name, 'mobile': this.helpList[num].mobile, 'id': this.helpList[num].customerId });
    } else {
      for (let i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i].id === this.helpList[num].customerId) {
          this.checkList.splice(i, 1);
        }
      }
    }
  }

  killCheckListNum(id) {
    for (let i = 0; i < this.checkList.length; i++) {
      if (this.checkList[i].id === id) {
        this.checkList.splice(i, 1);
        for (let j = 0; j < this.helpList.length; j++) {
          if (this.helpList[j].customerId === id) {
            this.helpList[j].isChecked = false;
            return;
          }
        }
      }
    }
  }




  clearInfo() {
    this.realname = '';
    this.mobile = null;
    this.sex = 'F';
    this.userName = '';
    this.weight = '';
    this.height = '';
    this.email = '';
    this.address = '';
    this.remark = '';
    this.birdthday = '';
    this.relationShip = '';
    this.cardId = '';
    this.checkList = [];
    this.myGroup = [];
    this.myGroupName = [];
    this.errorRealname = '';
    this.errorCardId = '';
    this.errorMobile = '';
    this.errorHeight = '';
    this.errorWeight = '';
    this.bothhw = '';
    this.bothNumber = '';
  }

  healthCareOpen(index, content) {
    this.itemTarget = index;
    this.openHealth(content);
    this.initHealthCarePerson();
  }

  initHealthCarePerson() {
    this.clientService.healthList('?pageSize=20&pageNum=1&role=2').subscribe((res) => {
      if (res.success) {
        this.healthpersonlist = res.data.list;
        if (!this.listData[this.itemTarget].commissionerUserId) {
          this.healthCarePerson = res.data.list[0].userId;
        } else {
          this.healthCarePerson = this.listData[this.itemTarget].commissionerUserId;
        }

      }
    });
  }

  saveHealthCare() {
    const data = {
      'customerId': this.listData[this.itemTarget].customerId,
      'commissionerUserId': this.healthCarePerson
    };
    this.clientService.saveHealthPerson(data).subscribe((res) => {
      if (res.success) {
        tools.tips('分配专员成功');
        this.modalRef.close();
        this.listData[this.itemTarget].commissionerUserId = this.healthCarePerson;
        for (let i = 0; i < this.healthpersonlist.length; i++) {
          if (this.healthpersonlist[i].userId === this.healthCarePerson) {
            this.listData[this.itemTarget].commissionerUserName = this.healthpersonlist[i].name;
          }
        }
      } else {
        tools.tips('错误', '', 'error');
      }
    });
  }

  makeSpecH(val) {
    const tmp = tools.numberFixed(val);
    this.height = tmp;
  }

  makeSpecW(val) {
    this.weight = tools.numberFixed(val);
  }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  initBtnShow() {
    this.clientBtn = tools.initBtnShow(0, 0, 'clientBtn');
  }

  initAsyc() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'userId': storage.get('state')['userId'],
      'servicePackName': this.choosedPkg === '请选择' ? '' : this.choosedPkg,
      'socialWelfareId': this.chooseGroupId
    };
    this.clientService.clientList(data).subscribe(
      (res) => {
        this.listData = res.data.list;
        this.pages = res.data.navigatepageNums;
        this.totalPage = res.data.total;
      }
    );
  }

  getAge(age) {
    return tools.getAge(age);
  }

  initData() {
    this.clientHead = ['编号', '客户姓名', '手机号码', '意见'];
    this.listName = ['mobile', 'commissionerUserName', 'name', 'openId'];
  }

  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo;
    this.pageNumber = 1;
    this.initAsyc();
  }

  pageTurning(number) {
    this.pageNumber = number;
    this.initAsyc();
  }

  showHelpPanel() {
    $('.find').toggle();
    this.initCheckBox();
  }

  delconfirm(index) {
    this.itemTarget = index;
    tools.tipsConfirm('确认需要删除账号？', '', 'warning', this.delClient.bind(this));
  }

  delClient() {
    const customerId = this.listData[this.itemTarget].customerId;
    this.clientService.del(customerId).subscribe((res) => {
      if (res.success) {
        tools.tips('删除成功');
        this.initAsyc();
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

  saveClientAddOrEdit() {
    this.errorRealname = '';
    this.errorCardId = '';
    this.errorMobile = '';
    this.errorHeight = '';
    this.errorWeight = '';
    this.bothhw = '';
    this.bothNumber = '';
    let tmpIds = '';
    for (let i = 0; i < this.checkList.length; i++) {
      tmpIds += (this.checkList[i].id + ',');
    }
    tmpIds = tmpIds.substr(0, tmpIds.length - 1);

    const tmp = this.myGroup;
    let str = '';
    for (let i = 0; i < tmp.length; i++) {
      str += (tmp[i] + ',');
    }


    const data = {
      'commissionerUserId': storage.get('state')['userId'],
      'name': this.realname,
      'mobile': this.mobile,
      'sex': this.sex,
      'birdthday': this.birdthday,
      'height': this.height,
      'weight': this.weight,
      'address': this.address,
      'role': this.role,
      'cardId': this.cardId,
      'socialWelfareId': str.substr(0, str.length - 1),
      'guardianIds': tmpIds,
      'province': this.choosedProvince.split('=')[0],
      'city': this.choosedCities.split('=')[0],
      'district': this.choosedStreets.split('=')[0],
      'addressCode': this.choosedProvince.split('=')[1] + ',' + this.choosedCities.split('=')[1] + ',' + this.choosedStreets.split('=')[1]
    };

    if (this.realname.trim().length < 1) {
      this.errorRealname = '请输入姓名';
    } else if (this.realname.trim().length > 30) {
      this.errorRealname = '名字的长度不能超过30个字符';
    }

    if (this.mobile !== null) {
      if (isNaN(this.mobile)) {
        this.errorMobile = '';
        this.bothNumber = '';
      } else if (!tools.checkMobile(this.mobile)) {
        this.errorMobile = '手机号码格式错误';
        this.bothNumber = 'xxxx';
      }
    } else {
      this.errorMobile = '';
      this.bothNumber = '';

    }

    if (this.cardId.length !== 0) {
      const flag = tools.isCardID(this.cardId);
      if (typeof flag !== 'boolean') {
        this.errorCardId = flag;
        this.bothNumber = 'xxxxx';
      }
    }

    if (typeof this.height !== 'undefined') {
      if (parseInt(this.height, 10) < 50 || parseInt(this.height, 10) > 250) {
        this.errorHeight = '身高的取值范围在50~250之间';
        this.bothhw = 'xxx';
      }
    }

    if (typeof this.weight !== 'undefined') {
      if (parseInt(this.weight, 10) < 1 || parseInt(this.weight, 10) > 300) {
        this.errorWeight = '体重的取值范围在1~300之间';
        this.bothhw = 'xxx';
      }
    }

    if (this.bothhw !== '' || this.errorCardId !== '' || this.errorRealname !== '' || this.errorMobile !== '') {
      return;
    }

    if (this.isEdit) {
      if (isNaN(data.mobile)) {
        delete data.mobile;
      }
      data['customerId'] = this.listData[this.itemTarget].customerId;
      this.clientService.editClient(data).subscribe((res) => {
        if (res.success) {
          tools.tips('编辑成功');
          this.modalRef.close();
          this.initAsyc();
        } else {
          tools.tips(res.errMsg, '', 'error');
        }
      });
    } else {
      this.clientService.addClient(data).subscribe((res) => {
        if (res.success) {
          tools.tips('新增成功');
          this.modalRef.close();
          this.initAsyc();
        } else {
          tools.tips(res.errMsg, '', 'error');
        }
      });
    }
  }

}
