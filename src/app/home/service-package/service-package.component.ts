import { Component, OnInit } from '@angular/core';
import {ServicePackageService} from './service-package.service'
import {SweetAlertService} from 'ng2-sweetalert2'
@Component({
  selector: 'app-service-package',
  templateUrl: './service-package.component.html',
  styleUrls: ['./service-package.component.scss'],
  providers: [ServicePackageService, SweetAlertService]
})
export class ServicePackageComponent implements OnInit {
  private pageSize: number = 10
  private pageNumber: number = 1
  private pages: Array<any> = []
  private list: Array<any> = []
  private queryInfo: string = ''
  private totalPage: string
  constructor(private servicePackageService: ServicePackageService, private sweetAlertService: SweetAlertService) { }

  ngOnInit() {
    this.packageList()
  }

  handlePackageConfirm(item) {
    let msg = item.statue == '0' ? '上架' : '下架'
    this.sweetAlertService.swal({
      title: `确认需要${msg}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      this.handlePackageStatus(item)
    }, (dismiss) => {
    })
  }

  handlePackageStatus(data) {
    let status = typeof data.item.statue === 'undefined' ? 0 : parseInt(data.item.statue)
    status === 1 ? status = 0 : status = 1
    let param = { 'servicePackId': data.item.servicePackId, 'statue': status }

    this.servicePackageService.changeStatus(param).subscribe((res) => {
      if (res.success) {
        this.sweetAlertService.swal(status === 0 ? '下架成功' : '上架成功', "", 'success')
        status == 1 ? data.item.statue = 1 : data.item.statue = 0
      } else {
        this.sweetAlertService.swal(res.errMsg, '', 'error')
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
