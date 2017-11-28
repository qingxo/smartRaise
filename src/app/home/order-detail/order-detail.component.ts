import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from './order-detail.service';
import { OrderPackageService } from '../order-package/order-package.service';
import { ActivatedRoute, Router } from '@angular/router';
import tools from '../../shared/tools';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailService, OrderPackageService]
})
export class OrderDetailComponent implements OnInit {
  pageSize = 10;
  pageNumber = 1;
  pkgId = '';
  item: any = {};
  list: Array<any> = [];
  missionType: Array<string> = ['一次性任务', '周期性任务'];
  orderId: any = -1;
  unsubscribeUserId: any = 0;
  unsubscribePkgId: any = 0;
  constructor(private orderDetailService: OrderDetailService, private orderPackageService: OrderPackageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.pkgId = this.route.snapshot.params['pkgId'];
    this.orderDetail();
  }

  orderDetail() {
    this.orderDetailService.orderDetail(this.pkgId).subscribe((res) => {
      if (res.success) {
        this.item = res.data;
        this.list = res.data.commissionerTasks;
      }

    });
  }

  endOrderConfirm(orderId) {
    this.orderId = orderId;
    tools.tipsConfirm('确认停止服务', '', 'warning', this.endOrder.bind(this));
  }

  endOrder() {
    const data = {
      'serviceOrderId': this.orderId
    };
    tools.loading(true);
    this.orderPackageService.pkgEnd(data).subscribe((res) => {
      tools.loading(false);
      if (res.success) {
        tools.tips('结束订单成功', '', 'success');
        this.item.statue = '2';
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }


  startOrderConfirm(orderId) {
    this.orderId = orderId;

    tools.tipsConfirm('确认启动服务?', '', 'warning', this.startOrder.bind(this));
  }

  startOrder() {
    const data = {
      'serviceOrderId': this.orderId
    };
    tools.loading(true);
    this.orderPackageService.pkgStart(data).subscribe((res) => {
      tools.loading(false);
      if (res.success) {
        tools.tips('启动成功', '', 'success');
        this.item.statue = '1';
      } else {
        tools.tips(res.errMsg);
      }

    }, (res) => {
      tools.loading(false);
      tools.tips('网络错误', '', 'error');
    });
  }



  unsubscribeConfirm(pkgId, userId) {
    this.unsubscribePkgId = pkgId;
    this.unsubscribeUserId = userId;
    tools.tipsConfirm('确认退订服务?', '', 'warning', this.unSubscriptionPkg.bind(this));
  }

  unSubscriptionPkg() {
    const data = {
      'customerId': this.unsubscribeUserId,
      'servicePackId': this.unsubscribePkgId
    };
    this.orderPackageService.unSubscriptionPkg(data).subscribe((res) => {
      if (res.success) {
        tools.tips('退订成功', '', 'success');
        this.router.navigate(['/home/order']);
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

}
