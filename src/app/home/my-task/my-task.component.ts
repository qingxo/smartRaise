import { Component, OnInit } from '@angular/core';
import {MyTaskService} from './my-task.service'
import storage from '../../shared/storage'
import {SweetAlertService} from 'ng2-sweetalert2'
@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss'],
  providers:[MyTaskService,SweetAlertService]
})
export class MyTaskComponent implements OnInit {
  private clientHead:string[] = []
  private operate:string = '操作'
  private list:Array<any> = []
  private pages:Array<any> = []
  private pageSize:number = 10
  private pageNumber:number = 1
  private missionList:Array<any> = []
  private taskProgress:number = 0 //0 未完成任务，1 已完成任务
  private tableProgress:number = 0 // 0 健康监测，1 健康报表 ， 2 建档任务
  private missionName:string = 'missionName'

  constructor(private myTaskService:MyTaskService,private sweetAlertService:SweetAlertService) { }

  ngOnInit() {
    this.missionListMethod()
  }


  pageTurning(number) {
    this.pageNumber = number
    this.missionListMethod()
  }


  toogleTaskProgress(index) {
      this.taskProgress  = index
      this.pageNumber = 1
      this.taskList()
  }

  toogleTableProgress(index) {
    this.tableProgress = index
    this.pageNumber = 1
      this.taskList()
  }

  handlerPkgConfirm(taskId){
    this.sweetAlertService.swal({
      title: '确认完成服务?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText:'取消'
    }).then(() => {
      this.handlePkgDone(taskId)
        },(dismiss)=>{
      })
  }

  handlePkgDone(taskId) {
    this.myTaskService.handlerPkgDoen(taskId).subscribe((res) => {
      if (res.success) {
        this.sweetAlertService.swal('处理成功','','success')
        for(let i=0;i<this.list.length;i++) {
          if(this.list[i].commissionerTaskId == taskId){
            this.list.splice(i,1)
          }
        }
      }else{
        this.sweetAlertService.swal(res.errMsg,'','error')
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
        console.log(this.missionList)
        this.taskList()
      }else{
        this.sweetAlertService.swal(res.errMsg,'','error')
      }

    })
  }


  taskList() {
    let data = {
      "statue":this.taskProgress,
      "missionId":this.missionList[this.tableProgress].missionId,
      "pageSize":this.pageSize,
      "pageNum":this.pageNumber,
      "userId":storage.get('state')['userId']
    }
    this.myTaskService.taskList(data).subscribe((res) => {
      if (res.success) {
        this.list = res.data.result
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].rateCn = 'test'
          if(typeof this.list[i].rate != 'undefined'){
            this.initRateCn(i)
          }
        }
        this.pages = res.data.linkPageNumbers
        this.pageNumber = res.data.pageNumber
      }else{
        this.sweetAlertService.swal(res.errMsg,'','error')
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
    if (typeof ageNum === 'undefined' || ageNum === '') {
      return '未知'
    } else {
      let newYear = Number(new Date().getFullYear())
      let num = newYear - parseInt(ageNum.split('-')[0])
      return num
    }

  }

}
