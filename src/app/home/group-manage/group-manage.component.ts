import { Component, OnInit } from '@angular/core';
import {GroupManageService} from './group-manage.service';
import tools from '../../shared/tools'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styleUrls: ['./group-manage.component.scss'],
  providers: [GroupManageService]
})
export class GroupManageComponent implements OnInit {
  private pageSize: number = 10;
  private pageNumber: number = 1;
  private queryInfo: string = '';
  private list: Array<any> = [];
  private pages: number = 1
  private totalPage: number
  private delItemId: number
  private itemTarget: number
  private modalRef: any
  private closeResult: string

  private groupCode: string
  private groupName: string
  private tel: string
  private groupContact: string
  private address: string


  constructor(private groupManageService: GroupManageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.groupManageList()
  }

  showTpl(index, groupDetail) {
    this.itemTarget = index

    this.openGroup(groupDetail)

  }

  openGroup(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-l-modal' })

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
    this.delItemId = id
    tools.tipsConfirm('确认删除该机构？', '', 'warning', this.delGroup.bind(this))
  }

  delGroup() {
    this.groupManageService.groupDelete(this.delItemId).subscribe((res) => {
      if (res.success) {
        tools.tips("删除成功")
        this.groupManageList()
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

  groupManageList() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo
    }
    this.groupManageService.groupList(data).subscribe((res) => {
      if (res.success) {
        this.list = []
        this.list = res.data.list
        this.pages = res.data.navigatepageNums
        this.pageNumber = res.data.pageNum
        this.totalPage = res.data.total
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

}
