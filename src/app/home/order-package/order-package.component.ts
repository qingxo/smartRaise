import { Component, OnInit } from '@angular/core';
import {OrderPackageService} from './order-package.service'
import {ActivatedRoute} from '@angular/router'
import tools from '../../shared/tools'
@Component({
  selector: 'app-order-package',
  templateUrl: './order-package.component.html',
  styleUrls: ['./order-package.component.scss'],
  providers:[OrderPackageService]
})
export class OrderPackageComponent implements OnInit {

  private userId:string = ''
  private pageSize:number = 10
  private pageNumber:number =1
  private personBuyPkg:Array<any> =[]
  private personInfo:any = {}

  constructor(private orderPackageService:OrderPackageService,private activatedRoute:ActivatedRoute) { }

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

  personDetail(userId) {
    this.orderPackageService.personInfo(userId).subscribe((res) => {
      if (res.success) {
        this.personInfo = res.data
        console.log(this.personInfo)
      }
    })
  }

  sellPackageConfirm(pkgId,item) {

  }


  personBuyPkgInfo(data) {
    this.orderPackageService.personBuyPkg(data).subscribe((res) => {
      if (res.success) {
        this.personBuyPkg = res.data.result
        console.log(this.personBuyPkg)
      }
    })
  }

}
