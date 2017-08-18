import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, Renderer, ElementRef, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import { BloodPressureService } from './blood-pressure.service'
import storage from '../../shared/storage'
@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.scss'],
  providers: [BloodPressureService]
})
export class BloodPressureComponent implements OnInit, OnChanges {
  private sources: string = ''
  private option: EChartOption
  private bloodPressureList: Array<any> = []
  private bloodPressureDate: Array<any> = []
  private heartRateValue: Array<any> = []
  private bloodPressureHigh: Array<any> = []
  private bloodPressureLower: Array<any> = []
  private nothingFlag: boolean = false
  @Input() userId: string = ''
  @Input() periodDay: number = 1
  @ViewChild('tt') el: ElementRef
  constructor(private bloodPressureService: BloodPressureService, private render: Renderer) { }

  ngOnInit() {


    this.bloodDataInit()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.bloodDataInit()
  }



  bloodDataInit() {
    this.bloodPressureList = []
    this.bloodPressureDate = []
    this.heartRateValue = []
    this.bloodPressureHigh = []
    this.bloodPressureLower = []
    this.bloodPressureList = []
    this.nothingFlag = false
    this.bloodPressureService.getBloodPressList({ 'customerId': this.userId, 'day': this.periodDay }).subscribe((res) => {
      if (res.success) {
        this.bloodPressureList = eval(res.data)
        console.log("the all list:", this.bloodPressureList)
        if (this.bloodPressureList instanceof Array) {
          for (var i = 0; i < this.bloodPressureList.length; i++) {
            this.bloodPressureHigh[i] = this.bloodPressureList[i].systolicPressure
            this.bloodPressureLower[i] = this.bloodPressureList[i].stretchPressure
            this.heartRateValue[i] = this.bloodPressureList[i].heartRateValue
            if (this.periodDay === 1) {
              this.bloodPressureDate[i] = this.bloodPressureList[i].measurementTime.split(' ')[1]
            } else {
              this.bloodPressureDate[i] = this.bloodPressureList[i].measurementTime.split(' ')[0]
            }
          }
        }

        if (this.bloodPressureList.length > 0) {
          this.nothingFlag = true
          this.el.nativeElement.className = ""
        } else {
          this.nothingFlag = false
          this.el.nativeElement.className = "black-hole"

        }
        console.log("flag:" + this.nothingFlag + ",this.heartRateValue:" + this.heartRateValue + ", strechtPressure:" + this.bloodPressureList)
        this.startEchartPress()
      }
    })
  }

  startEchartPress() {
    this.option = {
      title: {
        text: '血压监测',
        textStyle: {
          fontSize: '14'
        },
        top: '2%',
        left: '2%'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: [
          '舒张压', '收缩压', '心率'
        ],
        right: '2%'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.bloodPressureDate
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} '
        }
      },
      series: [
        {
          name: '舒张压',
          type: 'line',
          data: this.bloodPressureLower,
          markLine: {
            data: [
              {
                yAxis: '140',
                name: '最高值'
              }, {
                yAxis: '90',
                name: '最低值'
              }
            ]
          }
        }, {
          name: '收缩压',
          type: 'line',
          data: this.bloodPressureHigh
        }, {
          name: '心率',
          type: 'line',
          data: this.heartRateValue
        }
      ]
    }
  }

}
