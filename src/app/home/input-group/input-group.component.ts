import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import { Router, ActivatedRoute } from '@angular/router'
import * as Flatpickr from 'flatpickr'
import * as zh_lang from 'flatpickr/dist/l10n/zh.js'
import * as moment from 'moment'
import { InputGroupService } from './input-group.service'
import tools from '../../shared/tools'
@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  providers: [InputGroupService]
})
export class InputGroupComponent implements OnInit, OnChanges {

  private chooseDate: string = ''
  private lunchTime: number = 0
  private sugarLevel: number
  private remark: string = ''

  private heartBeat: number
  private highPressure: number
  private lowerPressure: number

  private bmi: number

  private bloodOxygen: number

  private heat: number


  private exampleOptions: FlatpickrOptions = {
    enableTime: true,
    static: true,
    time_24hr: true,
    onChange: this.changeDate.bind(this)
  }
  @Input() inputType: number
  @Input() customerId: string
  @Input() taskId: string
  @Input() height: number
  @Input() weight: number
  constructor(private inputGroupService: InputGroupService, private route: Router) { }

  ngOnInit() {
    Flatpickr.localize(zh_lang.zh)
    moment.locale('zh-cn')
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes['weight']['currentValue'] != 'undefined' && typeof changes['height']['currentValue'] != 'undefined') {
      this.bmi = Number((this.weight * 10000 / Math.pow(this.height, 2)).toFixed(2))
    }
  }

  makeChange() {
    this.bmi = Number((this.weight * 10000 / Math.pow(this.height, 2)).toFixed(2))
  }


  save() {
    if (this.chooseDate.length < 1) {
      tools.tips("日期填写不正确", '', 'warning')
      return
    }

    if (this.remark.trim().length > 10) {
      tools.tips("备注不能超过10个字", '', 'warning')
      return
    }


    if (this.inputType == 2) {

      if (typeof this.heartBeat == 'undefined' || this.heartBeat < 30 || this.heartBeat > 220) {
        tools.tips("心率值在30~220之间", '', 'warning')
        return
      }

      if (typeof this.highPressure == 'undefined' || this.highPressure < 30 || this.highPressure > 240) {
        tools.tips("收缩压的值在30~240之间", '', 'warning')
        return
      }

      if (typeof this.lowerPressure == 'undefined' || this.lowerPressure < 30 || this.lowerPressure > 240) {
        tools.tips("舒张压的值在30~240之间", '', 'warning')
        return
      }

      let data = {
        "heartRateValue": this.heartBeat,
        "systolicPressure": this.highPressure,
        "stretchPressure": this.lowerPressure,
        "measurementTime": this.chooseDate,
        "remark": this.remark,
        "customerId": this.customerId,
        "commissionerTaskId": this.taskId
      }

      console.log(data)


      this.inputGroupService.addBloodPressure(data).subscribe((res) => {
        if (res.success) {
          tools.tips("记录成功")
          this.callSuccessMethod()
        } else {
          tools.tips(res.errMsg, '', 'error')
        }
      })
    } else if (this.inputType == 1) {
      let data = {
        "timeSlot": this.lunchTime,
        "sugarValue": this.sugarLevel,
        "measurementTime": this.chooseDate,
        "remark": this.remark,
        "customerId": this.customerId,
        "commissionerTaskId": this.taskId
      }

      if (typeof this.sugarLevel == 'undefined' || this.sugarLevel < 0 || this.sugarLevel > 30) {
        tools.tips("血糖值应该在0~30之间", '', 'warning')
        return
      }

      this.inputGroupService.addBloodSugar(data).subscribe((res) => {
        if (res.success) {
          tools.tips("记录成功")
          this.callSuccessMethod()
        } else {
          tools.tips(res.errMsg, '', 'error')
        }
      })
    } else if (this.inputType == 3) {
      if (typeof this.weight == 'undefined' || this.weight < 0 || this.weight > 1000) {
        tools.tips("体重值在0~1000之间", '', 'warning')
        return
      }

      if (typeof this.height == "undefined" || this.height < 0 || this.height > 300) {
        tools.tips("身高的值在0~300之间", '', 'warning')
        return
      }

      let data = {
        "height": this.height,
        "weight": this.weight,
        "signType": 'bf',
        "occurDt": this.chooseDate,
        "remark": this.remark,
        "customerId": this.customerId,
        "bmi": this.bmi,
        "commissionerTaskId": this.taskId
      }

      this.inputGroupService.addBmiInfo(data).subscribe((res) => {
        if (res.success) {
          tools.tips("记录成功")
          this.callSuccessMethod()
        } else {
          tools.tips(res.errMsg, '', 'error')
        }
      })
    } else if (this.inputType == 4) {
      if (typeof this.bloodOxygen == 'undefined' || this.bloodOxygen > 100 || this.bloodOxygen < 50) {
        tools.tips("血氧范围在50~100", '', 'warning')
        return
      }

      let data = {
        "signType": 'spo2',
        "occurDt": this.chooseDate,
        "remark": this.remark,
        "customerId": this.customerId,
        "spo2": this.bloodOxygen,
        "commissionerTaskId": this.taskId
      }

      this.inputGroupService.addOxygenInfo(data).subscribe((res) => {
        if (res.success) {
          tools.tips("记录成功")
          this.callSuccessMethod()
        } else {
          tools.tips(res.errMsg, '', 'error')
        }
      })
    } else if (this.inputType == 5) {
      if (typeof this.heat == 'undefined' || this.heat > 45 || this.heat < 35) {
        tools.tips("体温值范围在35~45")
        return
      }


      let data = {
        "signType": 'temp',
        "occurDt": this.chooseDate,
        "remark": this.remark,
        "customerId": this.customerId,
        "temp": this.heat,
        "commissionerTaskId": this.taskId
      }

      this.inputGroupService.addHeatInfo(data).subscribe((res) => {
        if (res.success) {
          tools.tips("记录成功")
          this.callSuccessMethod()
        } else {
          tools.tips(res.errMsg, '', 'error')
        }
      })
    }

  }

  callSuccessMethod() {
    this.inputGroupService.finishedTask(this.taskId).subscribe((res) => {
      if (res.success) {
        this.route.navigate(['/mytask'])
      }
    })
  }


  changeDate(val) {
    this.chooseDate = moment(new Date(val)).format('YYYY-MM-DD HH:mm:ss')
  }

}
