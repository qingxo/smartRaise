import { Component, OnInit, OnChanges, SimpleChange, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { AccountsService } from './accounts.service'
import tools from '../../shared/tools'
import storage from '../../shared/storage'
import { AccountDialogsComponent } from '../account-dialogs'

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers: [AccountsService]

})
export class AccountsComponent implements OnInit {
  private pageSize: number = 10
  private pageNumber: number = 1
  private pages: Array<any> = []
  private totalPage: number
  private queryInfo: string = ''
  private list: Array<any> = []
  private userId: any = -1
  private accountsBtn: any
  constructor(private accountsService: AccountsService, private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.accountsList()
    this.initBtnShow()
  }
  initBtnShow() {
    this.accountsBtn = tools.initBtnShow(2, 0, 'accountsBtn')
  }

  openModal(userId) {
    let componentFatory = this.componentFactoryResolver.resolveComponentFactory(AccountDialogsComponent)
    let containerRef = this.viewContainerRef;
    containerRef.clear()
    let dd = <AccountDialogsComponent>containerRef.createComponent(componentFatory).instance
    dd.userId = userId
    let ownRole = storage.get('state')['role']
    if (ownRole != 0) {
      dd.freezeRole = true
    }
    dd.showList = this.accountsList.bind(this)
  }


  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo
    this.pageNumber = 1
    this.accountsList()
  }

  pageTurning(number) {
    this.pageNumber = number
    this.accountsList()
  }

  delConfirm(userId) {
    this.userId = userId
    tools.tipsConfirm('确认删除吗?', '', 'warning', this.delPerson.bind(this))
  }

  delPerson() {
    this.accountsService.delPerson(this.userId).subscribe((res) => {
      if (res.success) {
        tools.tips('删除成功', '', 'success')
        this.delList(this.userId)
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

  delList(userId) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].userId == userId) {
        this.list.splice(i, 1)
      }
    }
  }

  accountsList() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo
    }
    this.accountsService.accountsList(data).subscribe((res) => {
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
