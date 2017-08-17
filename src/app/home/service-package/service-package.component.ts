import { Component, OnInit } from '@angular/core';
import { ServicePackageService } from './service-package.service'
import tools from '../../shared/tools'
@Component({
  selector: 'app-service-package',
  templateUrl: './service-package.component.html',
  styleUrls: ['./service-package.component.scss'],
  providers: [ServicePackageService]
})
export class ServicePackageComponent implements OnInit {
  private pageSize: number = 10
  private pageNumber: number = 1
  private pages: Array<any> = []
  private list: Array<any> = []
  private queryInfo: string = ''
  private totalPage: string
  private clickItem: any
  private servicePackageBtn: any
  constructor(private servicePackageService: ServicePackageService) { }

  ngOnInit() {
    this.packageList()
    this.initBtnShow()
  }

  initBtnShow() {
    this.servicePackageBtn = tools.initBtnShow(0, 1, 'servicePackageBtn')
    console.log(this.servicePackageBtn)
  }

  handlePackageConfirm(data) {
    this.clickItem = data
    console.log(data.item.statue, data)
    let msg = data.item.statue == '0' ? '上架' : '下架'
    tools.tipsConfirm(`确认需要${msg}?`, '', 'warning', this.handlePackageStatus.bind(this))
  }

  handlePackageStatus() {
    let data = this.clickItem
    let status = typeof data.item.statue === 'undefined' ? 0 : parseInt(data.item.statue)
    status === 1 ? status = 0 : status = 1
    let param = { 'servicePackId': data.item.servicePackId, 'statue': status }

    this.servicePackageService.changeStatus(param).subscribe((res) => {
      if (res.success) {
        console.log("sussces:" + status)
        tools.tips(status === 0 ? '下架成功' : '上架成功', "", 'success')
        status == 1 ? data.item.statue = 1 : data.item.statue = 0
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo
    this.pageNumber = 1
    this.packageList()
  }

  pageTurning(number) {
    this.pageNumber = number
    this.packageList()
  }

  packageList() {
    let data = {
      "pageSize": this.pageSize,
      "pageNum": this.pageNumber,
      "query": this.queryInfo
    }
    this.servicePackageService.packageList(data).subscribe((res) => {
      if (res.success) {
        this.list = res.data.list
        this.pages = res.data.navigatepageNums
        this.pageNumber = res.data.pageNum
        this.totalPage = res.data.total
      }

    })
  }

}
