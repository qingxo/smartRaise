import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from './client.service';
import storage from '../../shared/storage'
import tools from '../../shared/tools'
import {SweetAlertService} from 'ng2-sweetalert2'
import SysData from '../../shared/sysData'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  private clientBtn = []
  private closeResult: string
  constructor(private clientService: ClientService, private sweetAlertService: SweetAlertService, private modalService: NgbModal) { }

  ngOnInit() {
    this.initBtnShow()
    this.initAsyc()
  }

  open(content) {
    console.log(this.modalService)
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  initBtnShow() {
    this.clientBtn = tools.initBtnShow(0, 0, 'clientBtn')
  }

  initAsyc() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'userId': storage.get('state')['userId']
    }
    this.clientService.clientList(data).subscribe(
      (res) => {
        this.listData = res.data.list
        this.pages = res.data.navigatepageNums
        this.totalPage = res.data.total
      }
    )
  }

  getAge(age) {
    return tools.getAge(age)
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
