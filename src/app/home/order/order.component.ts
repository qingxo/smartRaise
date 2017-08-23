import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from './order.service'
import storage from '../../shared/storage'
import tools from '../../shared/tools'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {
  private pageSize: number = 10
  private pageNumber: number = 1
  private pages: Array<any> = []
  private totalPage: number
  private queryInfo: string = ''
  private list: Array<any> = []
  private orderBtn: any
  private orderId: string = ''
  private pkgId: string = ''
  private customerId: string = ''
  constructor(private orderService: OrderService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.activedRoute.queryParams['value']) {
      this.queryInfo = this.activedRoute.queryParams['value']['query']
    }
    this.orderList()
    this.initBtnShow()
  }

  initBtnShow() {
    this.orderBtn = tools.initBtnShow(0, 2, 'orderBtn')
  }

  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo
    this.orderList()
  }

  pageTurning(number) {
    this.pageNumber = number
    this.orderList()
  }


  orderList() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'userId': storage.get('state')['userId'],
      'query': this.queryInfo
    }
    this.orderService.orderList(data).subscribe((res) => {
      if (res.success) {
        this.list = res.data.list
        this.pages = res.data.navigatepageNums
        this.pageNumber = res.data.pageNum
        this.totalPage = res.data.total
      } else {
        tools.tips(res.errMsg, '', 'error')
      }

    })
  }

  unPkg(pkgId, customerId) {
    this.pkgId = pkgId
    this.customerId = customerId

    tools.tipsConfirm('确认退订该服务？', '', 'warning', this.unSubscriptionPkg.bind(this))
  }

  unSubscriptionPkg() {
    let data = {
      'servicePackId': this.pkgId,
      'customerId': this.customerId
    }
    tools.loading(true)
    this.orderService.unSubscriptionPkg(data).subscribe((res) => {
      tools.loading(false)
      if (res.success) {
        tools.tips("退订成功")
        this.orderList()
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

  handleStop(orderId) {
    this.orderId = orderId
    tools.tipsConfirm('确认退订该服务？', '', 'warning', this.pkgEnd.bind(this))
  }

  pkgEnd() {
    let data = {
      'serviceOrderId': this.orderId
    }
    tools.loading(true)

    this.orderService.pkgEnd(data).subscribe((res) => {
      tools.loading(false)
      if (res.success) {
        tools.tips("停止成功")
        this.orderList()
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

  handleStart(orderId) {
    this.orderId = orderId
    tools.tipsConfirm('确认启动该服务？', '', 'warning', this.pkgStart.bind(this))
  }

  pkgStart() {
    let data = {
      'serviceOrderId': this.orderId
    }
    tools.loading(true)
    this.orderService.pkgStart(data).subscribe((res) => {
      tools.loading(false)
      if (res.success) {
        tools.tips("启动成功")
        this.orderList()
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

}
