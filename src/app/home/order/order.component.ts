import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OrderService} from './order.service'
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
  constructor(private orderService: OrderService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.queryInfo = this.activedRoute.queryParams['value']['query']
    this.orderList()
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

}
