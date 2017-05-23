import { Component, OnInit } from '@angular/core';
import {FeedbackService} from './feedback.service'
import {SweetAlertService} from 'ng2-sweetalert2'
import * as $ from 'jquery'
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  providers:[FeedbackService,SweetAlertService]
})
export class FeedbackComponent implements OnInit {
  private list:Array<any> = []
  private pages:Array<any> = []
  private pageSize:number = 10
  private pageNumber:number = 1
  private feedback:number = 1

  constructor(private feedbackService:FeedbackService,private sweetAlertService:SweetAlertService){}
  ngOnInit() {
  }

  feedbackList() {
    var data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber
    }
    if(this.feedback == 1){
      this.feedbackService.customerFeedBackList(data).subscribe((res) => {
        if (res.success) {
          this.list = res.data.result
          this.pages = res.data.linkPageNumbers
          this.pageNumber = res.data.pageNumber
        }

      })
    }else{
      this.feedbackService.userFeedBackList(data).subscribe((res) => {
        if (res.success) {
          this.list = res.data.result
          this.pages = res.data.linkPageNumbers
          this.pageNumber = res.data.pageNumber
        }

      })
    }

  }
  handleFeedBack(id,item) {
    this.sweetAlertService.swal({
      title: `处理意见`,
      type: 'warning',
      input:'textarea',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
      cancelButtonText:'取消'
    }).then(() => {
      this.doneFeedBack(id,item)
        },(dismiss)=>{
      })
  }

  doneFeedBack(id,item) {
    var data ={
      'dealRemark':$("#feedbackMark").val(),
    }
    if(this.feedback == 1) {
        data['opinionId'] = id
        this.feedbackService.customerHandler(data).subscribe((res) =>{
          if(res.success){
            this.sweetAlertService.swal("处理成功",'','success')
            item.dealRemark = data.dealRemark
          }else{
            this.sweetAlertService.swal(res.errMsg,'','error')
          }
        })
    }else{
      data['opinionUserId'] = id
      this.feedbackService.userHandler(data).subscribe((res) =>{
        if(res.success){
          this.sweetAlertService.swal("处理成功",'','success')
          item.dealRemark = data.dealRemark
        }else{
          this.sweetAlertService.swal(res.errMsg,'','error')
        }
      })
    }
  }

  toogleChoosed(e,flag) {
    $('.fbchoose').find('span').removeClass('choosed')
    $(e.target).addClass('choosed')
    this.feedback = parseInt(flag)
    this.pageNumber = 1
    this.feedbackList()
  }

  pageTurning(number) {
    this.pageNumber = number
    this.feedbackList()
  }

}
