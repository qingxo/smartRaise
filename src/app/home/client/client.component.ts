import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers:[ClientService]
})
export class ClientComponent implements OnInit {

  private clientHead:string[] = []
  private operate:string = '操作'
  private listData:Array<any> = []
  private listName:Array<any> = []
  private pages:Array<any> = []
  private pageSize:number = 10
  private pageNumber:number = 1
  constructor(private clientService:ClientService) { }

  ngOnInit() {
    this.initData()
    this.initAsyc()
  }

  initAsyc() {
    let data = {
        'pageSize': this.pageSize,
        'pageNum': this.pageNumber
    }
    this.clientService.clientList(data).subscribe((data)=>{
      console.log(data)
      this.listData = data.data.result
      this.pages = data.data.linkPageNumbers

    })
  }

  initData() {
    this.clientHead = ['编号','客户姓名','手机号码','意见']
    this.listName = ['mobile','commissionerUserName','name','openId']

  }

  searchTable(queryInfo:string) {
    console.log(queryInfo)
  }

  pageTurning(number) {
    this.pageNumber = number
    this.initAsyc()
  }

}
