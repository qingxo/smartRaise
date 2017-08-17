import { Component, OnInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { MyTaskService } from './my-task.service'
import storage from '../../shared/storage'
import tools from '../../shared/tools'
@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss'],
  providers: [MyTaskService]
})
export class MyTaskComponent implements OnInit {
  private clientHead: string[] = []
  private operate: string = '操作'
  private list: Array<any> = []
  private pages: Array<any> = []
  private pageSize: number = 10
  private pageNumber: number = 1
  private totalPage: number
  private missionList: Array<any> = []
  private taskId: any = -1
  private taskProgress: number = 0 //0 未完成任务，1 已完成任务
  private tableProgress: number = 0 // 0 健康监测，1 健康报表 ， 2 建档任务
  private missionName: string = 'missionName'
  private myTaskBtn: any
  @ViewChild('tables') el: ElementRef
  constructor(private myTaskService: MyTaskService, private elRef: ElementRef) { }

  ngOnInit() {
    this.missionListMethod()
    this.initBtnShow()
  }


  initBtnShow() {
    this.myTaskBtn = tools.initBtnShow(1, 0, 'myTaskBtn')
  }


  pageTurning(number) {
    this.pageNumber = number
    this.missionListMethod()
  }


  toogleTaskProgress(index) {
    this.taskProgress = index
    this.pageNumber = 1
    this.taskList()
  }

  toogleTableProgress(index) {
    this.tableProgress = index
    this.pageNumber = 1
    let array = this.el.nativeElement.children
    for (let i = 0; i < array.length; i++) {
      if (index == i) {
        array[i].className = 'choosed'
      } else {
        array[i].className = ""
      }

    }
    this.taskList()
  }

  handlerPkgConfirm(taskId) {
    this.taskId = taskId
    tools.tipsConfirm('确认完成服务?', '', 'warning', this.handlePkgDone.bind(this))
  }

  handlePkgDone() {
    this.myTaskService.handlerPkgDoen(this.taskId).subscribe((res) => {
      if (res.success) {
        tools.tips('处理成功', '', 'success')
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].commissionerTaskId == this.taskId) {
            this.list.splice(i, 1)
          }
        }
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

  missionListMethod() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber
    }
    this.myTaskService.missionList().subscribe((res) => {
      if (res.success) {
        this.missionList = res.data
        this.taskList()
      } else {
        tools.tips(res.errMsg, '', 'error')
      }

    })
  }


  taskList() {
    let data = {
      "statue": this.taskProgress,
      "missionId": this.missionList[this.tableProgress].missionId,
      "pageSize": this.pageSize,
      "pageNum": this.pageNumber,
      "userId": storage.get('state')['userId']
    }
    this.myTaskService.taskList(data).subscribe((res) => {
      if (res.success) {
        this.list = []
        this.list = res.data.list
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].rateCn = 'test'
          if (typeof this.list[i].rate != 'undefined') {
            this.initRateCn(i)
          }
        }
        this.pages = res.data.navigatepageNums
        this.pageNumber = res.data.pageNum
        this.totalPage = res.data.total
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

  initRateCn(num) {
    switch (parseInt(this.list[num].rate)) {
      case 0:
        this.list[num].rateCn = '天'
        break;
      case 1:
        this.list[num].rateCn = '周'
        break;
      case 2:
        this.list[num].rateCn = '月'
        break;
      case 3:
        this.list[num].rateCn = '季'
        break;
      case 4:
        this.list[num].rateCn = '半年'
        break;
      case 5:
        this.list[num].rateCn = '年'
        break;
      default:

    }
  }

  getAge(ageNum) {
    return tools.getAge(ageNum)
  }

}
