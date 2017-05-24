import { Component, OnInit } from '@angular/core';
import {SyncDataService} from './sync-data.service'
import {SweetAlertService} from 'ng2-sweetalert2'
import storage from '../../shared/storage'
import tools from '../../shared/tools'
@Component({
  selector: 'app-sync-data',
  templateUrl: './sync-data.component.html',
  styleUrls: ['./sync-data.component.scss'],
  providers: [SyncDataService,SweetAlertService]
})
export class SyncDataComponent implements OnInit {
  private pageSize:number = 10
  private pageNumber:number =1
  private pages:Array<any> = []
  private list:Array<any> = []
  private taskProgress:number = 0 //0 客户数据，1 健康专员数据

  constructor(private sweetAlertService:SweetAlertService,private syncDataService:SyncDataService) { }

  ngOnInit() {
    this.showList()
  }

  synData() {
    tools.loading(true)
    this.syncDataService.synTask().subscribe((res)=>{
      if(res.success) {
          this.sweetAlertService.swal("同步成功",'','success')
          this.showList()
          tools.loading(false)
      }else{
        this.sweetAlertService.swal(res.data.errMsg,'','error');
        tools.loading(false)
      }
    })
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


    showList() {
      let data = {
        'pageSize': this.pageSize,
        'pageNum': this.pageNumber,
        'userId': storage.get('state')['userId'],
        'sendheleFlag':0  // 0表示客户查询
      }
      if(this.taskProgress == 0){
        this.syncDataService.clientProblemList(data).subscribe((res) => {
          if (res.success) {
            this.list = res.data.result
            this.pages = res.data.linkPageNumbers
            this.pageNumber = res.data.pageNumber
          }else{
            this.sweetAlertService.swal(res.errMsg,'','error')
          }

        })
      }else{

      }
    }

    pageTurning(number) {
      this.pageNumber = number
      this.showList()
    }

}
