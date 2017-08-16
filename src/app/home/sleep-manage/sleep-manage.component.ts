import { Component, OnInit } from '@angular/core';
import { SleepManageService } from './sleep-manage.service';
import { ClientService } from '../client/client.service'
import storage from '../../shared/storage'
import tools from '../../shared/tools'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-sleep-manage',
  templateUrl: './sleep-manage.component.html',
  styleUrls: ['./sleep-manage.component.scss'],
  providers: [SleepManageService, ClientService]
})
export class SleepManageComponent implements OnInit {

  private pageSize: number = 10
  private pageNumber: number = 1
  private totalCount: number
  private pages: Array<any> = []
  private queryInfo: string = ''
  private list: Array<any> = []
  private itemTarget: number
  private smartBed: string

  private bedType: Array<any> = [
    {
      'name': '智能床A',
      'value': 'A'
    }, {
      'name': '智能床B',
      'value': 'B'
    }
  ]
  private closeResult: string
  private modalRef: any
  private sources: string = 'A'
  constructor(private sleepManageService: SleepManageService, private clientService: ClientService, private modalService: NgbModal) { }

  ngOnInit() {
    this.clientList()
  }

  searchTable(str) {
    this.queryInfo = str
    this.pageNumber = 1
    this.clientList()
  }

  pageTurning(number) {
    this.pageNumber = number
    this.clientList()
  }


  unBinding() {
    let customerId = this.list[this.itemTarget].customerId,
      equipId = this.list[this.itemTarget].equipmentNo,
      bedSources = this.list[this.itemTarget].sources
    let data = '?customerId=' + customerId + '&equipmentNo=' + equipId + '&sources=' + bedSources

    this.clientService.unbind(data).subscribe((res) => {
      if (res.success) {
        tools.tips("解绑成功", '', 'success')
        this.list[this.itemTarget].equipmentNo = ''
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
      'customerId': this.list[this.itemTarget].customerId,
      'mobile': this.list[this.itemTarget].mobile,
      'name': this.list[this.itemTarget].name,
      'equipmentNo': this.smartBed,
      'sources': this.sources
    }

    this.clientService.reBunding(data).subscribe((res) => {
      if (res.code === 200) {
        tools.tips('强制绑定成功')
        this.modalRef.close()
        this.clientList()
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
      'customerId': this.list[this.itemTarget].customerId,
      'mobile': this.list[this.itemTarget].mobile,
      'name': this.list[this.itemTarget].name,
      'sources': this.sources,
      'equipmentNo': this.smartBed
    }
    this.clientService.save(data).subscribe((res) => {

      if (res.code === 200) {
        tools.tips('成功', '', 'success')
        this.list[this.itemTarget].equipmentNo = this.smartBed
        this.list[this.itemTarget].sources = this.sources
        this.modalRef.close()
      } else if (res.code === 404) {
        tools.tips(res.errormsg, '', 'error')
      } else {
        tools.tipsConfirm(res.errormsg, '', 'warning', this.reBunding.bind(this))

      }
    })
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' })

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

  bindSmartBedConfirm(index, content) {
    this.itemTarget = index
    this.smartBed = ''
    this.sources = 'A'
    this.open(content)
  }

  cancelSmartBed(index) {
    this.itemTarget = index
    tools.tipsConfirm('确认解除绑定?', '', 'info', this.unBinding.bind(this))
  }

  clientList() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'userId': storage.get('state')['userId']
    }
    this.clientService.clientList(data).subscribe((res) => {
      if (res.success) {
        this.list = res.data.list
        this.pages = res.data.navigatepageNums
        this.pageNumber = res.data.pageNum
        this.totalCount = res.data.total
      }

    })
  }

}
