import { Component, OnInit } from '@angular/core';
import storage from '../../shared/storage'
import {ErrorTipsService} from './error-tips.service'
import {SweetAlertService} from 'ng2-sweetalert2'
@Component({
  selector: 'app-error-tips',
  templateUrl: './error-tips.component.html',
  styleUrls: ['./error-tips.component.scss'],
  providers:[ErrorTipsService,SweetAlertService]
})
export class ErrorTipsComponent implements OnInit {

  private list:Array<any> = []
  private pages:Array<any> = []
  private pageSize:number = 10
  private pageNumber:number = 1
  private queryInfo:string =''
  private taskProgress = 0 //0 客户数据，1 健康专员数据

  constructor(private errorTipsService:ErrorTipsService,private sweetAlertService:SweetAlertService) { }

  ngOnInit() {
    this.showList()
  }


    showList() {
      let data = {
        'pageSize': this.pageSize,
        'pageNum': this.pageNumber,
        'userId':storage.get('state')['userId'],
        'query':this.queryInfo
      }
      if(this.taskProgress == 0){
        this.errorTipsService.errorList(data).subscribe((res) => {
          if (res.success) {
            this.list = res.data.result
            this.pages = res.data.linkPageNumbers
            this.pageNumber = res.data.pageNumber
          }else{
            this.sweetAlertService.swal(res.errMsg,'','error')
          }

        })
      }else{
        // this.SynDataService.healthProblemList().then((res) => {
        //   if (!res.data) return
        //   if (res.data.success) {
        //     this.missionList = res.data.data
        //     this.taskList(data)
        //   }
        //
        // })
      }
    }

    getContent(content){
      return content
    }

    getAge(ageNum) {
      if (typeof ageNum === 'undefined' || ageNum === '') {
        return '未知'
      } else {
        var newYear = Number(new Date().getFullYear())
        var num = newYear - parseInt(ageNum.split('-')[0])
        return num
      }

    }

    cultOpinion(msg) {
      if(typeof msg == 'undefined'){
        return ''
      }
      if(msg.length>22) {
        return msg.substr(0,22)+"..."
      }else{
        return msg
      }
    }

    searchTable(queryInfo:string) {
      this.queryInfo = queryInfo
      this.pageNumber = 1
      this.showList()
    }

    pageTurning(number) {
      this.pageNumber = number
      this.showList()
    }
}
