import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from './order-detail.service'
import { OrderPackageService } from '../order-package/order-package.service'
import { ActivatedRoute, Router } from '@angular/router'
import tools from '../../shared/tools'
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailService, OrderPackageService]
})
export class OrderDetailComponent implements OnInit {
  private pageSize: number = 10
  private pageNumber: number = 1
  private pkgId: string = ''
  private item: any = {}
  private list: Array<any> = []
  private missionType: Array<string> = ['一次性任务', '周期性任务']
  private orderId: any = -1
  private unsubscribeUserId: any = 0
  private unsubscribePkgId: any = 0
  constructor(private orderDetailService: OrderDetailService, private orderPackageService: OrderPackageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.pkgId = this.route.snapshot.params['pkgId']
    this.orderDetail()
  }

  orderDetail() {
    this.orderDetailService.orderDetail(this.pkgId).subscribe((res) => {
      if (res.success) {
        this.item = res.data
        this.list = res.data.commissionerTasks
      }

    })
  }

  endOrderConfirm(orderId) {
    this.orderId = orderId
    tools.tipsConfirm('确认停止服务', '', 'warning', this.endOrder.bind(this))
  }

  endOrder() {
    let data = {
      'serviceOrderId': this.orderId
    }
    tools.loading(true)
    this.orderPackageService.pkgEnd(data).subscribe((res) => {
      tools.loading(false)
      if (res.success) {
        tools.tips("结束订单成功", '', 'success')
        this.item.statue = '2'
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }


  startOrderConfirm(orderId) {
    this.orderId = orderId

    tools.tipsConfirm('确认启动服务?', '', 'warning', this.startOrder.bind(this))
  }

  startOrder() {
    let data = {
      'serviceOrderId': this.orderId
    }
    tools.loading(true)
    this.orderPackageService.pkgStart(data).subscribe((res) => {
      tools.loading(false)
      if (res.success) {
        tools.tips("启动成功", '', 'success')
        this.item.statue = '1'
      } else {
        tools.tips(res.errMsg)
      }

    }, (res) => {
      tools.loading(false)
      tools.tips("网络错误", '', 'error')
    })
  }



  unsubscribeConfirm(pkgId, userId) {
    this.unsubscribePkgId = pkgId
    this.unsubscribeUserId = userId
    tools.tipsConfirm('确认退订服务?', '', 'warning', this.unSubscriptionPkg.bind(this))
  }

  unSubscriptionPkg() {
    let data = {
      'customerId': this.unsubscribeUserId,
      'servicePackId': this.unsubscribePkgId
    }
    this.orderPackageService.unSubscriptionPkg(data).subscribe((res) => {
      if (res.success) {
        tools.tips("退订成功", '', 'success')
        this.router.navigate(['/home/order'])
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

}
