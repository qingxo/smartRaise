import { Component, OnInit } from '@angular/core';
import {SweetAlertService} from 'ng2-sweetalert2'
import {AccountsService} from './accounts.service'
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers:[AccountsService,SweetAlertService]

})
export class AccountsComponent implements OnInit {
  private pageSize:number =10
  private pageNumber:number =1
  private pages:Array<any> = []
  private queryInfo:string = ''
  private list:Array<any> = []
  constructor(private accountsService:AccountsService,private sweetAlertService:SweetAlertService) { }

  ngOnInit() {
    this.accountsList()
  }


  searchTable(queryInfo:string) {
    this.queryInfo = queryInfo
    this.pageNumber = 1
    this.accountsList()
  }

  pageTurning(number) {
    this.pageNumber = number
    this.accountsList()
  }

  delConfirm(userId) {
    this.sweetAlertService.swal({
      title: `确认删除吗?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText:'取消'
    }).then(() => {
      this.delPerson(userId)
        },(dismiss)=>{
      })
  }

  delPerson(userId){
    this.accountsService.delPerson(userId).subscribe((res) => {
      if (res.success) {
        this.sweetAlertService.swal('删除成功','','success')
        this.delList(userId)
      }else{
        this.sweetAlertService.swal(res.errMsg,'','error')
      }
    })
  }

  delList(userId) {
    for(let i = 0;i<this.list.length;i++) {
      if(this.list[i].userId == userId) {
        this.list.splice(i,1)
      }
    }
  }

  accountsList() {
    let data = {
      'pageSize':this.pageSize,
      'pageNum':this.pageNumber,
      'query':this.queryInfo
    }
    this.accountsService.accountsList(data).subscribe((res) => {
      if (res.success) {
        this.list = res.data.result
        this.pages = res.data.linkPageNumbers
        this.pageNumber = res.data.pageNumber
      }else{
        this.sweetAlertService.swal(res.errMsg,'','error')
      }
    })
  }

}
