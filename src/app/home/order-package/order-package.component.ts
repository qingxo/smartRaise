import { Component, OnInit } from '@angular/core';
import {OrderPackageService} from './order-package.service'
import {ActivatedRoute} from '@angular/router'
import tools from '../../shared/tools'
import {SweetAlertService} from 'ng2-sweetalert2'
@Component({
  selector: 'app-order-package',
  templateUrl: './order-package.component.html',
  styleUrls: ['./order-package.component.scss'],
  providers:[OrderPackageService,SweetAlertService]
})
export class OrderPackageComponent implements OnInit {

  private userId:string = ''
  private pageSize:number = 10
  private pageNumber:number =1
  private personBuyPkg:Array<any> =[]
  private personInfo:any = {}
  private pages:Array<any> = []


  constructor(private orderPackageService:OrderPackageService,private activatedRoute:ActivatedRoute,private sweetAlertService:SweetAlertService) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.queryParams['userId']
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'customerId':this.userId
    }

    this.personDetail(this.userId)
    this.personBuyPkgInfo(data)
  }

  pageTurning(evn) {
    this.pageNumber = evn
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'customerId':this.userId
    }
    this.personBuyPkgInfo(data)
  }

  personDetail(userId) {
    this.orderPackageService.personInfo(userId).subscribe((res) => {
      if (res.success) {
        this.personInfo = res.data
        console.log(this.personInfo)
      }
    })
  }

  unSubscriptionPkgConfirm(item,index){
    this.sweetAlertService.swal({
      title: '确认退订服务?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText:'取消'
    }).then(() => {
      this.unSubscriptionPkg(item,index)
        },(dismiss)=>{
      })
  }

  unSubscriptionPkg(item,index){
    let data = {
        'customerId':this.personInfo.customerId,
        'servicePackId':item.servicePackId
    }
    this.orderPackageService.unSubscriptionPkg(data).subscribe((res)=>{
      if (res.success) {
        this.sweetAlertService.swal("退订成功",'','success')
        this.personBuyPkg[index].myBuyCounts = 0
      }else{
        this.sweetAlertService.swal(res.errMsg,'','error')
      }
    })
  }

  endOrderConfirm(item,index){
    this.sweetAlertService.swal({
      title: '确认停止服务?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText:'取消'
    }).then(() => {
      this.endOrder(item,index)
        },(dismiss)=>{
      })
  }

  endOrder(item,index) {
    let data = {
        'serviceOrderId':item.serviceOrderId,
    }
    tools.loading(true)
    this.orderPackageService.pkgEnd(data).subscribe((res)=>{
      tools.loading(false)
      if (res.success) {
        this.sweetAlertService.swal("结束订单成功",'','success')
        console.log(this.personBuyPkg[index])
        console.log(this.personBuyPkg,index)
        this.personBuyPkg[index].orderStatus = 2
      }else{
        this.sweetAlertService.swal(res.errMsg,'','error')
      }
    })
  }

  startOrderConfirm(item,index){
    this.sweetAlertService.swal({
      title: '确认启动服务?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText:'取消'
    }).then(() => {
      this.startOrder(item,index)
        },(dismiss)=>{
      })
  }

  startOrder(item,index) {
    let data = {
        'serviceOrderId':item.serviceOrderId,
    }
    tools.loading(true)
    this.orderPackageService.pkgStart(data).subscribe((res)=>{
      tools.loading(false)
      if (res.success) {
        this.sweetAlertService.swal("启动成功",'','success')
        this.personBuyPkg[index].orderStatus = '1'
      }else{
        this.sweetAlertService.swal(res.errMsg)
      }

    },(res)=>{
        tools.loading(false)
        this.sweetAlertService.swal("网络错误",'','error')
    })
  }

  sellPackageConfirm(pkgId,item) {
    if(typeof this.personInfo.cardId!= 'undefined' && this.personInfo.cardId.length>1){ //用户有身份证时
      this.sweetAlertService.swal({
        title: '确定订购服务包?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定',
        cancelButtonText:'取消'
      }).then(() => {
        this.sellPackage(pkgId,item)
          },(dismiss)=>{
        })
    }else{ //用户身份证不存在时，需要输入身份证
      this.sweetAlertService.swal({
          title: '需要填写身份证号才能购买',
          input: 'text',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定',
          cancelButtonText:'取消',
          inputValidator: (value)=> {
            return new Promise( (resolve, reject)=> {
              if (value) {
                let flag = tools.isCardID(value)
                if(typeof flag!== 'boolean'){
                  reject(flag)
                }
                resolve()
              } else {
                reject('请输入身份证号')
              }
            })
          }
        }).then((result)=> {
          this.sellPackage(pkgId,item)
        },(res)=>{
        })
    }
  }

  sellPackage(pkgId,item) {
    let data = {
      'servicePackId':pkgId,
      'customerId':this.personInfo.customerId,
      'cardId':this.personInfo.cardId
    }
    this.orderPackageService.pkgBuy(data).subscribe((res)=>{
      if (res.success) {
        this.sweetAlertService.swal("订购成功",'','success')
        this.refreshPersonBuyPkg()
      }else{
        this.sweetAlertService.swal(res.errMsg,'','error')
      }
    })
  }

  refreshPersonBuyPkg() {
    var data = {
      'pageSize': this.pageSize,
      'pageNum': 1,
      'customerId':this.userId
    }
    this.personBuyPkgInfo(data)
  }


  personBuyPkgInfo(data) {
    this.orderPackageService.personBuyPkg(data).subscribe((res) => {
      if (res.success) {
        this.personBuyPkg = []
        this.pages = res.data.linkPageNumbers
        for(let i =0; i<res.data.result.length;i++) {
          if(res.data.result[i].statue ==1) { //根据statue标志，剔除掉没有上架的服务包
            this.personBuyPkg.push(res.data.result[i])
          }
        }
      }
    })
  }

}
