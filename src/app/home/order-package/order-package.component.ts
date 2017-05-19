import { Component, OnInit } from '@angular/core';
import {OrderPackageService} from './order-package.service'
import {ActivatedRoute} from '@angular/router'
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
  private personBuyPkg:any = ''
  private personInfo:any=''

  constructor(private orderPackageService:OrderPackageService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.queryParams['userId']
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'customerId':this.userId
    }

    this.personBuyPkgInfo(data)
  }

  personBuyPkgInfo(data) {
    this.orderPackageService.personBuyPkg(data).subscribe((res) => {
      if (!res.data) return
      if (res.data.success) {
        this.personBuyPkg = res.data.data.result
      }
    })
  }

}
