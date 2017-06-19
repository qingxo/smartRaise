import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from './client.service';
import storage from '../../shared/storage'
import {SweetAlertService} from 'ng2-sweetalert2'

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [ClientService, SweetAlertService]
})
export class ClientComponent implements OnInit {

  private clientHead: string[] = []
  private operate: string = '操作'
  private listData: Array<any> = []
  private listName: Array<any> = []
  private pages: Array<any> = []
  private pageSize: number = 10
  private pageNumber: number = 1
  private queryInfo: string = ''
  private totalPage: number
  constructor(private clientService: ClientService, private sweetAlertService: SweetAlertService) { }

  ngOnInit() {
    this.initData()
    this.initAsyc()
  }

  initAsyc() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'userId': storage.get('state')['userId']
    }
    this.clientService.clientList(data).subscribe((res) => {
      if (res.success) {
        this.listData = res.data.list
        this.pages = res.data.navigatepageNums
        this.totalPage = res.data.total
      } else {
        this.sweetAlertService.swal(res.errMsg, '', 'error')
      }


    })
  }

  initData() {
    this.clientHead = ['编号', '客户姓名', '手机号码', '意见']
    this.listName = ['mobile', 'commissionerUserName', 'name', 'openId']

  }

  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo
    this.pageNumber = 1
    this.initAsyc()
  }

  pageTurning(number) {
    this.pageNumber = number
    this.initAsyc()
  }

}
