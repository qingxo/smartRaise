import { Component, OnInit } from '@angular/core';
import storage from '../../shared/storage'
import tools from '../../shared/tools'
import { SynDataService } from './syn-data.service'
@Component({
  selector: 'app-syn-data',
  templateUrl: './syn-data.component.html',
  styleUrls: ['./syn-data.component.scss'],
  providers: [SynDataService]
})
export class SynDataComponent implements OnInit {

  private pageSize: number = 10
  private pages: Array<any> = []
  private pageNumber: number = 1
  private taskProgress: number = 1
  private list: Array<any> = []
  constructor(private synDataService: SynDataService) { }

  ngOnInit() {
  }

  synData() {
    tools.loading(true)
    this.synDataService.synTask().subscribe((res) => {
      if (res.success) {
        tools.tips("同步成功", '', 'success')
        this.showList()
        tools.loading(false)
      } else {
        tools.tips(res.data.errMsg, '', 'error');
        tools.loading(false)
      }
    })
  }



  showList() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'userId': storage.get('state')['userId'],
      'sendheleFlag': 0  // 0表示客户查询
    }
    if (this.taskProgress == 0) {
      this.synDataService.clientProblemList(data).subscribe((res) => {
        if (res.success) {
          this.list = res.data.list
          this.pages = res.data.navigatepageNums
          this.pageNumber = res.data.pageNum
        } else {
          tools.tips(res.errMsg, '', 'error')
        }

      })
    } else {

    }
  }

  pageTurning(number) {
    this.pageNumber = number
    this.showList()
  }

  getAge(ageNum) {
    return tools.getAge(ageNum)
  }

}
