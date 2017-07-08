import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from './client.service';
import storage from '../../shared/storage'
import tools from '../../shared/tools'
import SysData from '../../shared/sysData'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [ClientService]
})
export class ClientComponent implements OnInit {

  private clientHead: string[] = []
  private operate: string = '操作'
  private listData: Array<any> = []
  private listName: Array<any> = []
  private pages: Array<any> = []
  private pageSize: number = 10
  private pageNumber: number = 1
  private queryInfo: string = ''
  private totalPage: number
  private clientBtn = []
  private closeResult: string
  private modalRef: any
  private itemTarget: number = 0 //用户点击的列的值
  private smartBed: string
  private sources: string = 'A' //智能床默认值
  private healthpersonlist: Array<any> = [] //健康专员列表
  private healthCarePerson: string //用户默认的健康专员
  private bedType: Array<any> = [
    {
      'name': '智能床A',
      'value': 'A'
    }, {
      'name': '智能床B',
      'value': 'B'
    }
  ]
  constructor(private clientService: ClientService, private modalService: NgbModal) { }

  ngOnInit() {
    this.initBtnShow()
    this.initAsyc()
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' })

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openHealth(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' })

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  healthCareOpen(index, content) {
    this.itemTarget = index
    this.openHealth(content)
    this.initHealthCarePerson()
  }

  initHealthCarePerson() {
    this.clientService.healthList('?pageSize=20&pageNum=1&role=2').subscribe((res) => {
      if (res.success) {
        this.healthpersonlist = res.data.list
        if (!this.listData[this.itemTarget].commissionerUserId) {
          this.healthCarePerson = res.data.result[0].userId
        } else {
          this.healthCarePerson = this.listData[this.itemTarget].commissionerUserId
        }

      }
    })
  }

  saveHealthCare() {
    let data = {
      'customerId': this.listData[this.itemTarget].customerId,
      'commissionerUserId': this.healthCarePerson
    }
    this.clientService.saveHealthPerson(data).subscribe((res) => {
      if (res.success) {
        tools.tips('分配专员成功')
        this.modalRef.close()
        this.listData[this.itemTarget].commissionerUserId = this.healthCarePerson
        for (var i = 0; i < this.healthpersonlist.length; i++) {
          if (this.healthpersonlist[i].userId == this.healthCarePerson) {
            this.listData[this.itemTarget].commissionerUserName = this.healthpersonlist[i].name
          }
        }
      } else {
        tools.tips('错误', '', 'error')
      }
    })
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

  bindSmartBedConfirm(index, content) {
    this.itemTarget = index
    this.smartBed = ''
    this.sources = 'A'
    this.open(content)
  }

  cancelSmartBed(index) {
    console.log(index)
    this.itemTarget = index
    tools.tipsConfirm('确认解除绑定?', '', 'info', this.unBinding.bind(this))
  }


  unBinding() {
    let customerId = this.listData[this.itemTarget].customerId,
      equipId = this.listData[this.itemTarget].equipmentNo,
      bedSources = this.listData[this.itemTarget].sources
    let data = '?customerId=' + customerId + '&equipmentNo=' + equipId + '&sources=' + bedSources

    this.clientService.unbind(data).subscribe((res) => {
      if (res.success) {
        tools.tips("解绑成功", '', 'success')
        this.listData[this.itemTarget].equipmentNo = ''
      } else {
        tools.tips(res.data.errormsg, '', 'error')
      }
    })
  }

  reBunding() {
    if (!this.smartBed) {
      return
    }

    let data = {
      'customerId': this.listData[this.itemTarget].customerId,
      'mobile': this.listData[this.itemTarget].mobile,
      'name': this.listData[this.itemTarget].name,
      'equipmentNo': this.smartBed,
      'sources': this.sources
    }

    this.clientService.reBunding(data).subscribe((res) => {
      if (!res)
        return
      if (res.code === 200) {
        tools.tips('强制绑定成功')
        this.modalRef.close()

        this.initAsyc()
      } else {
        tools.tips(res.errormsg)
      }
    })
  }


  saveSmartBed() {
    if (!this.smartBed) {
      return
    }

    var data = {
      'customerId': this.listData[this.itemTarget].customerId,
      'mobile': this.listData[this.itemTarget].mobile,
      'name': this.listData[this.itemTarget].name,
      'sources': this.sources,
      'equipmentNo': this.smartBed
    }
    this.clientService.save(data).subscribe((res) => {

      if (res.code === 200) {
        tools.tips('成功', '', 'success')
        this.listData[this.itemTarget].equipmentNo = this.smartBed
        this.listData[this.itemTarget].sources = this.sources
        this.modalRef.close()
      } else if (res.code === 404) {
        tools.tips(res.errormsg, '', 'error')
      } else {
        tools.tipsConfirm(res.errormsg, '', 'warning', this.reBunding.bind(this))

      }
    })
  }


  initBtnShow() {
    this.clientBtn = tools.initBtnShow(0, 0, 'clientBtn')
  }

  initAsyc() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'userId': storage.get('state')['userId']
    }
    this.clientService.clientList(data).subscribe(
      (res) => {
        this.listData = res.data.list
        this.pages = res.data.navigatepageNums
        this.totalPage = res.data.total
      }
    )
  }

  getAge(age) {
    return tools.getAge(age)
  }

  initData() {
    this.clientHead = ['编号', '客户姓名', '手机号码', '意见']
    this.listName = ['mobile', 'commissionerUserName', 'name', 'openId']
  }

  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo
    this.pageNumber = 1
    this.initAsyc()
  }

  pageTurning(number) {
    this.pageNumber = number
    this.initAsyc()
  }

}
