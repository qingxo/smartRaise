import { Component, OnInit } from '@angular/core';
import {SmartBedService} from './smart-bed.service'
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-smart-bed',
  templateUrl: './smart-bed.component.html',
  styleUrls: ['./smart-bed.component.scss'],
  providers:[SmartBedService]
})
export class SmartBedComponent implements OnInit {

  private name:string = ''
  private mobile:number
  private customerId:string = ''
  private smartBedId:string = ''
  constructor(private smartBedService:SmartBedService,private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.name = this.activedRoute.snapshot.queryParams["name"]
    this.mobile = this.activedRoute.snapshot.queryParams["mobile"]
    if(isNaN(this.mobile)){
      this.mobile = null
    }
    this.customerId = this.activedRoute.snapshot.queryParams["customerId"]
  }

  save() {
    let data = {
      'customerId': this.customerId,
      'mobile': this.mobile,
      'name': this.name,
      'equipmentNo': this.smartBedId
    }
    this.smartBedService.save(data).subscribe((res)=>{
      if(!res.data) return
      if(res.data.success){
        console.log(res)
      }else{
        console.log(res.data.errormsg)
      }
    })
  }

}
