import { Component, OnInit } from '@angular/core';
import {OrderService} from './order.service'
import storage from '../../shared/storage'
import { SweetAlertService} from 'ng2-sweetalert2'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService, SweetAlertService]
})
export class OrderComponent implements OnInit {
  private pageSize: number = 10
  private pageNumber: number = 1
  private pages: Array<any> = []
  private totalPage: number
  private queryInfo: string = ''
  private list: Array<any> = []
  constructor(private orderService: OrderService, private sweetAlertService: SweetAlertService) { }

  ngOnInit() {
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
        this.list = res.data.result
        this.pages = res.data.linkPageNumbers
        this.pageNumber = res.data.pageNumber
        this.totalPage = res.data.totalCount
      } else {
        this.sweetAlertService.swal(res.errMsg, '', 'error')
      }

    })
  }

}
