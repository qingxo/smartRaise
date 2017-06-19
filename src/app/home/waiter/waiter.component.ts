import { Component, OnInit } from '@angular/core';
import {WaiterService} from './waiter.service'
import { SweetAlertService} from 'ng2-sweetalert2';
@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss'],
  providers: [WaiterService, SweetAlertService]
})
export class WaiterComponent implements OnInit {
  private pageSize: number = 10
  private pageNumber: number = 1
  private pages: Array<any> = []
  private totalPage: number
  private list: Array<any> = []
  private queryInfo: string = ''
  private defalutPerson: object = {}

  constructor(private waiterService: WaiterService, private sweetAlertService: SweetAlertService) { }

  ngOnInit() {
    this.waiterList()
    this.geDefaultPerson()
  }

  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo
    this.pageNumber = 1
    this.waiterList()
  }

  pageTurning(number) {
    this.pageNumber = number
    this.waiterList()
  }

  delConfirm(userId) {
    this.sweetAlertService.swal({
      title: `确认需要删除该专员吗?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      this.delDefaultCommissioner(userId)
    }, (dismiss) => {
    })
  }

  delDefaultCommissioner(userId) {
    this.waiterService.delPerson(userId).subscribe((res) => {
      if (res.success) {
        this.sweetAlertService.swal('删除成功', '', 'success')
        this.delList(userId)
      } else {
        this.sweetAlertService.swal(res.errMsg, '', 'error')
      }
    })
  }

  // 删除list中的数据
  delList(id) {
    for (let item in this.list) {
      if (this.list[item].userId === id) {
        this.list.splice(Number(item), 1)
      }
    }
  }

  defaultTips(userId) {
    this.sweetAlertService.swal({
      title: `确认需要设置成默认专员吗?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      this.setDefaultCommissioner(userId)
    }, (dismiss) => {
    })
  }

  setDefaultCommissioner(userId) {
    this.waiterService.defaultPerson(userId).subscribe((res) => {
      if (res.success) {
        this.sweetAlertService.swal('设置成功', '', 'success')
        this.refreshList(userId)
      } else {
        this.sweetAlertService.swal(res.errMsg, '', 'error')
      }
    })
  }

  // 刷新list数据
  refreshList(id) {
    for (var item in this.list) {
      if (this.list[item].userId === id) {
        this.list[item].isDefaultCommissioner = '1'
        this.defalutPerson = this.list[item]
      } else {
        this.list[item].isDefaultCommissioner = '0'
      }
    }
  }


  waiterList() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'role': 2
    }
    this.waiterService.waiterList(data).subscribe((res) => {
      if (res.success) {
        this.list = res.data.result
        this.pages = res.data.linkPageNumbers
        this.pageNumber = res.data.pageNumber
        this.totalPage = res.data.totalCount
      }

    })
  }

  geDefaultPerson() {
    this.waiterService.getDefaultCommissioner().subscribe((res) => {
      if (res.success) {
        this.defalutPerson = res.data
      } else {
        this.sweetAlertService.swal(res.errMsg, '', 'error')
      }
    })
  }

}
