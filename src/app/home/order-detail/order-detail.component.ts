import { Component, OnInit } from '@angular/core';
import {OrderDetailService} from './order-detail.service'
import {OrderPackageService} from '../order-package/order-package.service'
import {ActivatedRoute,Router} from '@angular/router'
import {SweetAlertService} from 'ng2-sweetalert2'
import tools from '../../shared/tools'
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers:[OrderDetailService,OrderPackageService,SweetAlertService]
})
export class OrderDetailComponent implements OnInit {
  private pageSize:number = 10
  private pageNumber:number =1
  private pkgId:string =''
  private item:any = {}
  private list:Array<any> = []
  private missionType:Array<string> = ['一次性任务','周期性任务']
  constructor(private orderDetailService:OrderDetailService,private orderPackageService:OrderPackageService,private sweetAlertService:SweetAlertService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.pkgId = this.activatedRoute.snapshot.queryParams['pkgId']
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

  endOrderConfirm(orderId){
    this.sweetAlertService.swal({
      title: '确认停止服务?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText:'取消'
    }).then(() => {
      this.endOrder(orderId)
        },(dismiss)=>{
      })
  }

  endOrder(orderId) {
    let data = {
        'serviceOrderId':orderId
    }
    tools.loading(true)
    this.orderPackageService.pkgEnd(data).subscribe((res)=>{
      tools.loading(false)
      if (res.success) {
        this.sweetAlertService.swal("结束订单成功",'','success')
        this.item.statue = '2'
      }else{
        this.sweetAlertService.swal(res.errMsg,'','error')
      }
    })
  }


  startOrderConfirm(orderId){
    this.sweetAlertService.swal({
      title: '确认启动服务?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText:'取消'
    }).then(() => {
      this.startOrder(orderId)
        },(dismiss)=>{
      })
  }

  startOrder(orderId) {
    let data = {
        'serviceOrderId':orderId
    }
    tools.loading(true)
    this.orderPackageService.pkgStart(data).subscribe((res)=>{
      tools.loading(false)
      if (res.success) {
        this.sweetAlertService.swal("启动成功",'','success')
        this.item.statue = '1'
      }else{
        this.sweetAlertService.swal(res.errMsg)
      }

    },(res)=>{
        tools.loading(false)
        this.sweetAlertService.swal("网络错误",'','error')
    })
  }



    unsubscribeConfirm(pkgId,userId){
      this.sweetAlertService.swal({
        title: '确认退订服务?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定',
        cancelButtonText:'取消'
      }).then(() => {
        this.unSubscriptionPkg(pkgId,userId)
          },(dismiss)=>{
        })
    }

    unSubscriptionPkg(pkgId,userId){
      let data = {
          'customerId':userId,
          'servicePackId':pkgId
      }
      this.orderPackageService.unSubscriptionPkg(data).subscribe((res)=>{
        if (res.success) {
          this.sweetAlertService.swal("退订成功",'','success')
          this.router.navigate(['/home/order'])
        }else{
          this.sweetAlertService.swal(res.errMsg,'','error')
        }
      })
    }

}
