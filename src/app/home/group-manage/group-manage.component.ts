import { Component, OnInit } from '@angular/core';
import { GroupManageService } from './group-manage.service';
import tools from '../../shared/tools';
import storage from '../../shared/storage';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styleUrls: ['./group-manage.component.scss'],
  providers: [GroupManageService]
})
export class GroupManageComponent implements OnInit {
  pageSize = 10;
  pageNumber = 1;
  queryInfo = '';
  list: Array<any> = [];
  pages = 1;
  totalPage: number;
  delItemId: number;
  itemTarget: number;
  modalRef: any;
  closeResult: string;

  groupCode: string;
  groupName: string;
  connectPeople: string;
  mobile: string;
  address: string;
  manager: string;
  managerMobile: number;

  errorGroupCode = '';
  errorAddress = '';
  errorConnectPeople = '';
  errorGroupName = '';
  errorManagerMobile = '';
  bothGroup = '';
  bothInfo = '';
  errorMobile = '';
  isEdit = false;
  contacts: Array<any> = [];
  errorName = '';
  provinces: Array<any> = [];
  cities: Array<any> = [];
  streets: Array<any> = [];
  global_tips = '请选择=-1';
  choosedProvince: string = this.global_tips;
  choosedCities: string = this.global_tips;
  choosedStreets: string = this.global_tips;
  basicInfo: string = '';
  cooperInfo: string = '';
  constructor(private groupManageService: GroupManageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.groupManageList();
    this.initProvinces();
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

  initProvinces() {
    this.groupManageService.getProvince().subscribe((res) => {
      this.cities = [];
      this.streets = [];
      this.provinces = eval(res);
      this.provinces.unshift({ 'regionName': '请选择', 'regionId': '-1' });
    });
  }

  delContacts(val) {
    this.contacts.splice(val, 1);
  }

  addContacts(event) {
    this.contacts.push({ 'socialWelfareId': '', 'contact': '', 'tel': '', 'post': '', 'commissioner': false, 'error': 'e' });
  }

  pageTurning(val) {
    this.pageNumber = val;
    this.groupManageList();
  }

  showTpl(index, groupDetail) {
    this.itemTarget = index;
    index === -1 ? this.isEdit = true : this.isEdit = false;
    this.choosedProvince = this.global_tips;
    this.choosedCities = this.global_tips;
    this.choosedStreets = this.global_tips;
    this.initEditInfo(index);
    this.openGroup(groupDetail);

  }

  initEditInfo(index) {
    if (index === -1) {
      this.groupCode = '';
      this.groupName = '';
      this.connectPeople = '';
      this.address = '';
      this.mobile = '';
    } else {
      this.groupCode = this.list[index]['socialWelfareCode'];
      this.groupName = this.list[index]['socialWelfareName'];
      this.connectPeople = this.list[index]['contact'];
      this.address = this.list[index]['address'];
      this.mobile = this.list[index]['tel'];
      this.manager = this.list[index]['managerName'];
      this.managerMobile = this.list[index]['managerTel'];
      this.cooperInfo = this.list[index]['cooperationActuality'];
      this.basicInfo = this.list[index]['basicInformation'];
      const code = this.list[index].addressCode;
      this.cities = [];
      this.streets = [];
      this.choosedCities = this.global_tips;
      this.choosedStreets = this.global_tips;
      if (code !== 'null' && code !== null) {
        const tmp = code.split(',');
        this.choosedProvince = this.list[index]['province'] + '=' + tmp[0];

        const street = this.list[index]['district'] === '' ? this.global_tips : this.list[index]['district'] + '=' + tmp[2];
        const city = this.list[index]['city'] === '' ? this.global_tips : this.list[index]['city'] + '=' + tmp[1];
        if (tmp[0] !== '-1') {
          this.getAddressInfo(tmp[0], 1, street, city);
        }
        if (tmp[1] !== '-1') {
          this.getAddressInfo(tmp[1], 2, street);
        }
      }

      if (this.list[index]['socialWelfareContact'] !== null) {
        this.initContacts(this.list[index]['socialWelfareContact']);
      }
    }

  }

  initContacts(val) {
    this.contacts = eval(val);
    for (let i = 0; i < this.contacts.length; i++) {
      this.contacts[i]['commissioner'] === '1' ? this.contacts[i]['commissioner'] = true : this.contacts[i]['commissioner'] = false;
      this.contacts[i]['error'] = 'e';
    }
  }


  openGroup(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-l-modal group-info' });

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  handleDel(id) {
    this.delItemId = id;
    tools.tipsConfirm('确认删除该机构？', '', 'warning', this.delGroup.bind(this));
  }

  delGroup() {
    this.groupManageService.groupDelete(this.delItemId).subscribe((res) => {
      if (res.success) {
        tools.tips('删除成功');
        this.groupManageList();
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

  groupManageList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo
    };
    this.groupManageService.groupList(data).subscribe((res) => {
      if (res.success) {
        this.list = [];
        this.list = res.data.list;
        this.pages = res.data.navigatepageNums;
        this.pageNumber = res.data.pageNum;
        this.totalPage = res.data.total;
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }



  saveGroupAddOrEdit() {
    this.errorGroupCode = '';
    this.errorGroupName = '';
    this.errorConnectPeople = '';
    this.errorMobile = '';
    this.errorManagerMobile = '';
    this.errorAddress = '';
    this.bothGroup = '';
    this.bothInfo = '';

    this.errorName = '';
    if (!this.groupName) {
      this.errorGroupName = '机构名必填';
      this.bothGroup = 'xxx';
    }
    if (this.mobile) {
      if (this.mobile.toString().length > 18) {
        if (!tools.checkMobile(this.mobile)) {
          this.errorMobile = '电话号码太长';
          this.bothInfo = 'xxx';
        }
      }

    }

    if (this.managerMobile) {
      if (this.managerMobile.toString().length > 18) {
        if (!tools.checkMobile(this.managerMobile)) {
          this.errorManagerMobile = '电话号码太长';
        }
      }

    }



    if (!this.groupCode) {
      this.errorGroupCode = '机构代码必填';
      this.bothGroup = 'xxx';
    }

    if (this.bothGroup !== '' || this.bothInfo !== '' || this.errorManagerMobile !== '') {
      return;
    }

    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i]['contact'] === undefined || this.contacts[i]['contact'] === '') {
        this.errorName = '姓名不能为空';
        this.contacts[i]['error'] = 'error';
      } else {
        this.contacts[i]['error'] = 'e';
      }
    }

    if (this.errorName !== '') {
      return;
    }
    for (let i = 0; i < this.contacts.length; i++) {
      this.contacts[i]['commissioner'] ? this.contacts[i]['commissioner'] = '1' : this.contacts[i]['commissioner'] = '0';
    }
    const tmp = Array.from(this.contacts);
    const data = {
      'contact': this.connectPeople,
      'socialWelfareCode': this.groupCode,
      'socialWelfareName': this.groupName,
      'tel': this.mobile,
      'address': this.address,
      'province': this.choosedProvince.split('=')[0] === '请选择' ? '' : this.choosedProvince.split('=')[0],
      'city': this.choosedCities.split('=')[0] === '请选择' ? '' : this.choosedCities.split('=')[0],
      'district': this.choosedStreets.split('=')[0] === '请选择' ? '' : this.choosedStreets.split('=')[0],
      'addressCode': this.choosedProvince.split('=')[1] + ',' + this.choosedCities.split('=')[1] + ',' + this.choosedStreets.split('=')[1],
      'socialWelfareContact': JSON.stringify(tmp),
      'managerName': this.manager,
      'managerTel': this.managerMobile,
      'basicInformation': this.basicInfo,
      'cooperationActuality': this.cooperInfo
    };

    if (this.isEdit) {
      this.groupManageService.groupAdd(data).subscribe((res) => {
        if (res.success) {
          tools.tips('新增成功');
          this.modalRef.close();
          this.groupManageList();
        } else {
          tools.tips(res.data.errMsg, '', 'error');
        }
      });
    } else {
      data['socialWelfareId'] = this.list[this.itemTarget]['socialWelfareId'];
      this.groupManageService.groupEdit(data).subscribe((res) => {
        if (res.success) {
          this.modalRef.close();
          tools.tips('编辑成功');
          this.groupManageList();
        } else {
          tools.tips(res.data.errMsg, '', 'error');
        }
      });
    }

  }

}
