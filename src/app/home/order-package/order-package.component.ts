import { Component, OnInit } from '@angular/core';
import { OrderPackageService } from './order-package.service';
import { ActivatedRoute } from '@angular/router';
import * as swal from 'sweetalert';
import tools from '../../shared/tools';
@Component({
  selector: 'app-order-package',
  templateUrl: './order-package.component.html',
  styleUrls: ['./order-package.component.scss'],
  providers: [OrderPackageService]
})
export class OrderPackageComponent implements OnInit {

  private userId = '';
  private pageSize = 100;
  private pageNumber = 1;
  private personBuyPkg: Array<any> = [];
  private personInfo: any = {};
  private pages: Array<any> = [];
  private targetItem: object = {};
  private targetIndex: number = -1;

  constructor(private orderPackageService: OrderPackageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'customerId': this.userId
    };

    this.personDetail(this.userId);
    this.personBuyPkgInfo(data);
  }

  pageTurning(evn) {
    this.pageNumber = evn;
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'customerId': this.userId
    };
    this.personBuyPkgInfo(data);
  }

  personDetail(userId) {
    this.orderPackageService.personInfo(userId).subscribe((res) => {
      if (res.success) {
        this.personInfo = res.data;
      }
    });
  }

  unSubscriptionPkgConfirm(item, index) {
    this.targetItem = item;
    this.targetIndex = index;
    tools.tipsConfirm('确认退订服务?', '', 'warning', this.unSubscriptionPkg.bind(this));

  }

  unSubscriptionPkg() {
    const data = {
      'customerId': this.personInfo.customerId,
      'servicePackId': this.targetItem['servicePackId']
    };
    this.orderPackageService.unSubscriptionPkg(data).subscribe((res) => {
      if (res.success) {
        tools.tips('退订成功', '', 'success');
        this.personBuyPkg[this.targetIndex].myBuyCounts = 0;
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

  endOrderConfirm(item, index) {
    this.targetItem = item;
    this.targetIndex = index;

    tools.tipsConfirm('确认停止服务?', '', 'warning', this.endOrder.bind(this));
  }

  endOrder() {
    const data = {
      'serviceOrderId': this.targetItem['serviceOrderId'],
    };
    tools.loading(true);
    this.orderPackageService.pkgEnd(data).subscribe((res) => {
      tools.loading(false);
      if (res.success) {
        tools.tips('结束订单成功', '', 'success');
        this.personBuyPkg[this.targetIndex].orderStatus = 2;
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

  startOrderConfirm(item, index) {
    this.targetItem = item;
    this.targetIndex = index;
    tools.tipsConfirm('确认启动服务?', '', 'warning', this.startOrder.bind(this));
  }

  startOrder() {
    const data = {
      'serviceOrderId': this.targetItem['serviceOrderId'],
    };
    tools.loading(true);
    this.orderPackageService.pkgStart(data).subscribe((res) => {
      tools.loading(false);
      if (res.success) {
        tools.tips('启动成功', '', 'success');
        this.personBuyPkg[this.targetIndex].orderStatus = '1';
      } else {
        tools.tips(res.errMsg);
      }

    }, (res) => {
      tools.loading(false);
      tools.tips('网络错误', '', 'error');
    });
  }

  sellPackageConfirm(pkgId, item) {
    this.targetItem = item;
    if (item.sources !== 'hele') {
      tools.tipsConfirm('确定订购服务包?', '', 'warning', this.sellPackage.bind(this));
    } else {

      if (typeof this.personInfo.cardId !== 'undefined' && this.personInfo.cardId !== null && this.personInfo.cardId !== 'null') { // 用户有身份证时
        tools.tipsConfirm('确定订购服务包?', '', 'warning', this.sellPackage.bind(this));
      } else { // 用户身份证不存在时，需要输入身份证
        swal({
          title: '需要填写身份证号才能购买',
          type: 'input',
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        },
          (inputValue) => {
            if (inputValue) {
              const flag = tools.isCardID(inputValue);
              if (typeof flag !== 'boolean') {
                swal.showInputError(flag);
                return false;
              } else {
                this.sellPackage(inputValue);
                swal.close();
                return true;
              }
            }
            if (inputValue === '') {
              swal.showInputError('请输入身份证号');
              return false;
            }
          });
      }
    }
  }

  sellPackage(val?: any) {
    let card = '';
    if (val) {
      card = val;
    }
    const data = {
      'servicePackId': this.targetItem['servicePackId'],
      'customerId': this.personInfo.customerId,
      'cardId': card
    };
    this.orderPackageService.pkgBuy(data).subscribe((res) => {
      if (res.success) {
        tools.tips('订购成功', '', 'success');
        this.refreshPersonBuyPkg();
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

  refreshPersonBuyPkg() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': 1,
      'customerId': this.userId
    };
    this.personBuyPkgInfo(data);
  }


  personBuyPkgInfo(data) {
    this.orderPackageService.personBuyPkg(data).subscribe((res) => {
      if (res.success) {
        this.personBuyPkg = [];
        this.pages = res.data.navigatepageNums;
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].statue === '1') { // 根据statue标志，剔除掉没有上架的服务包
            this.personBuyPkg.push(res.data.list[i]);
          }
        }
      }
    });
  }

  getAge(num) {
    return tools.getAge(num);
  }

}
