import { Component, OnInit } from '@angular/core';
import { GroupManageService } from '../group-manage/group-manage.service';
import tools from '../../shared/tools';
import storage from '../../shared/storage';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-org-manage',
  templateUrl: './org-manage.component.html',
  styleUrls: ['./org-manage.component.scss'],
  providers: [GroupManageService]
})
export class OrgManageComponent implements OnInit {

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
  constructor(private groupManageService: GroupManageService, private modalService: NgbModal) { }


  ngOnInit() {
    this.groupManageList()
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

  pageTurning(val) {
    this.pageNumber = val;
    this.groupManageList();
  }
}
