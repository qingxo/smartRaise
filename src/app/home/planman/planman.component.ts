import { Component, OnInit,ViewContainerRef } from '@angular/core'
import {Http} from '@angular/http'
import {PlanmanService} from './planman.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-planman',
  templateUrl: './planman.component.html',
  styleUrls: ['./planman.component.scss'],
  providers: [PlanmanService]
})
export class PlanmanComponent implements OnInit {
  private  name:string = ''
  private mobile:number = 0
  private pageSize:number = 20
  private pageNumber:number =1
  private list:Array<any> = []
  private healthCarePerson:string = ''
  private customerId:string = ''
  constructor(private http:Http,private planmanService:PlanmanService,private activedRoute:ActivatedRoute) {
  }

  ngOnInit() {
    this.healthCarePerson = this.activedRoute.snapshot.queryParams["person"]
    this.customerId = this.activedRoute.snapshot.queryParams["customerId"]
    this.mobile = this.activedRoute.snapshot.queryParams["mobile"]
    this.name = this.activedRoute.snapshot.queryParams["name"]
    this.initData()
  }

  resetCarePerson(e) {
    console.log(e)
    this.healthCarePerson = e
  }

  save() {
    var data = {
      'customerId': this.customerId,
      'commissionerUserId': this.healthCarePerson
    }
    this.planmanService.save(data).subscribe((res) => {
      if (!res) return
      console.log(res)
      if (res.success) {

        // this.tips('分配专员成功')
      } else {
        // this.tips('错误')
      }
    })
  }

  tips(data) {

  }


  initData() {
    this.planmanService.healthList('?pageSize=' + this.pageSize + '&pageNum=' + this.pageNumber + '&role=2')
      .subscribe((res)=>{
        console.log(res)
        if (res.success) {
          this.list = res.data.result
          console.log(this.list)
          if(!this.healthCarePerson) {
            this.healthCarePerson = res.data.result[0].userId
          }else{
            let personTrue = false
            for (let i = 0;i<this.list.length;i++) {
              if(this.healthCarePerson === this.list[i].userId) {
                personTrue = true
              }
            }

            if(!personTrue) {
              this.healthCarePerson = res.data.result[0].userId
            }
          }
          console.log(this.healthCarePerson)
        }
      })
  }

}
