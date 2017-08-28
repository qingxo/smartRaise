import { Component, OnInit } from '@angular/core';
import { GroupManageService } from './group-manage.service';
import tools from '../../shared/tools';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styleUrls: ['./group-manage.component.scss'],
  providers: [GroupManageService]
})
export class GroupManageComponent implements OnInit {
  private pageSize = 10;
  private pageNumber = 1;
  private queryInfo = '';
  private list: Array<any> = [];
  private pages = 1;
  private totalPage: number;
  private delItemId: number;
  private itemTarget: number;
  private modalRef: any;
  private closeResult: string;

  private groupCode: string;
  private groupName: string;
  private connectPeople: string;
  private mobile: string;
  private address: string;

  private errorGroupCode = '';
  private errorAddress = '';
  private errorConnectPeople = '';
  private errorGroupName = '';
  private bothGroup = '';
  private bothInfo = '';
  private errorMobile = '';
  private isEdit = false;

  constructor(private groupManageService: GroupManageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.groupManageList();
  }

  pageTurning(val) {
    this.pageNumber = val
    this.groupManageList()
  }

  showTpl(index, groupDetail) {
    this.itemTarget = index;
    index === -1 ? this.isEdit = true : this.isEdit = false;
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
    }

  }


  openGroup(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-l-modal' });

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
    this.errorAddress = '';
    this.bothGroup = '';
    this.bothInfo = '';

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

    if (!this.groupCode) {
      this.errorGroupCode = '机构代码必填';
      this.bothGroup = 'xxx';
    }

    if (this.bothGroup !== '' || this.bothInfo !== '') {
      return;
    }
    const data = {
      'contact': this.connectPeople,
      'socialWelfareCode': this.groupCode,
      'socialWelfareName': this.groupName,
      'tel': this.mobile,
      'address': this.address
    };

    if (this.isEdit) {
      this.groupManageService.groupAdd(data).subscribe((res) => {
        console.log('res:' + res);
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
        console.log('res:', res);

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
