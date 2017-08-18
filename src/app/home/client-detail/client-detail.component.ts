import { Component, OnInit } from '@angular/core';
import { ClientDetailService } from './client-detail.service'
import { BmiMonitorService } from '../bmi-monitor/bmi-monitor.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment'
import tools from '../../shared/tools'
import storage from '../../shared/storage'
import SysData from '../../shared/sysData'
import { EChartOption } from 'echarts-ng2';


@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  providers: [ClientDetailService, BmiMonitorService]
})
export class ClientDetailComponent implements OnInit {

  private chartOption: object = {}
  private userInfo: object = {
    'name': null,
    'mobile': null,
    'sex': 'F',
    'createDt': null,
    'birdthday': null,
    'commissionerUserName': null,
    'cardId': null
  }
  private userId: string
  private sources: any = '-1'
  private equipNo: string
  private pageSize: number = 10
  private pageNumber: number = 1
  private list: Array<any> = []
  private pagination: any
  private totalCount: any
  private reportList: Array<any> = []
  private bedList: Array<any> = []
  private reportDomain: string
  private healthReportDomain: string
  private periodDay: any = 1
  private bmiList: Array<any> = []
  private xBMIData: Array<any> = []
  private bloodPressureList: Array<any> = []
  private bloodSugarListAfter: Array<any> = []
  private bloodSugarListBefore: Array<any> = []
  private bloodSugarAfter: Array<any> = []
  private bloodSugarBefore: Array<any> = []
  private bloodSugarDateBefore: Array<any> = []
  private bloodSugarDateAfter: Array<any> = []
  private bloodPressureHigh: Array<any> = []
  private bloodPressureLower: Array<any> = []
  private heartRateValue: Array<any> = []
  private bloodPressureDate: Array<any> = []
  private bloodSugarFlag: string = '0'
  private yBreathData: Array<any> = []
  private yHeartData: Array<any> = []
  private ySignData: Array<any> = []
  private xData: Array<any> = []
  private bloodSugarDate: Array<any> = []
  private bloodPressure: Array<any> = []
  private optionOne: EChartOption
  private optionTwo: EChartOption
  private optionThree: EChartOption
  private optionFour: EChartOption
  private optionFive: EChartOption
  constructor(public clientDetailService: ClientDetailService, public bmiMonitorService: BmiMonitorService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId']
    this.equipNo = this.route.snapshot.params['equipNo']
    this.getUserInfo()
    this.userOrderList()
    this.reportListSelf()
    this.initEcharts()

    this.reportDomain = SysData.reportDomain
    this.healthReportDomain = SysData.healthReportDomain
  }

  changePeriodDay(num) {
    this.periodDay = num
    this.yBreathData = []
    this.yHeartData = []
    this.ySignData = []
    this.bloodPressureHigh = []
    this.bloodPressureLower = []
    this.bloodPressureList = []
    this.bloodPressureDate = []
    this.bloodSugarListBefore = []
    this.bloodSugarListAfter = []
    this.bloodSugarDateBefore = []
    this.bloodSugarDateAfter = []
    this.xData = []
    this.initSugarDatas()
    this.initEcharts()
    this.smartBedData()
  }

  initSugarDatas() {
    this.bloodSugarDate = []
    this.bloodSugarBefore = []
    this.bloodSugarAfter = []
  }

  initPressData() {
    this.bloodPressureList = []
    this.bloodPressure = []
    this.bloodPressureDate = []
  }

  smartBedData() {
    if (this.sources != -1) {
      if (this.equipNo == null || this.equipNo == 'null' || this.equipNo == '' || typeof this.equipNo == 'undefined') {
        return
      }
      this.clientDetailService.smartBedLivingData(this.sources, this.equipNo, this.periodDay).subscribe((res) => {
        if (res.success) {
          if (res.data) {
            this.bedList = eval(res.data)
            this.startEchartSmartBed()
          }

        }
      })
    }
  }

  startEchartSmartBed() {
    if (this.bedList.length > 0) {
      for (var i = 0; i < this.bedList.length; i++) {
        this.yBreathData[i] = this.bedList[i].breathingValue
        this.yHeartData[i] = this.bedList[i].heartValue
        this.ySignData[i] = this.bedList[i].signDataValue
        if (this.periodDay === 1) {
          this.xData[i] = this.bedList[i].measuretime.split(' ')[1]
        } else {
          this.xData[i] = this.bedList[i].measuretime.split(' ')[0]
        }

      }
      this.optionOne = this.getOptionOne()
      this.optionFour = this.getOptionFour()
    }

  }

  private getOptionFour(): EChartOption {
    return {
      title: {
        text: '体动趋势'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['体动趋势']
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        }
      ],
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} '
        }
      },
      series: [
        {
          name: '体动趋势',
          type: 'bar',
          data: this.ySignData,
          barWidth: 20
        }
      ]
    }
  }

  private getOptionOne(): EChartOption {
    return {
      title: {
        text: '心率/呼吸趋势图',
        x: 'left',
        top: '20px',
        textStyle: {
          fontSize: 12
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      legend: {
        data: [
          '心率/HR', '呼吸率/RR'
        ],
        x: 'right',
        top: '20px',
        textStyle: {
          fontSize: 10,
          right: 20
        }
      },
      axisPointer: {
        link: {
          xAxisIndex: 'all'
        }
      },
      grid: [
        {
          left: 50,
          right: 50,
          top: '13%',
          height: '30%'
        }, {
          left: 50,
          right: 50,
          top: '55%',
          height: '30%'
        }
      ],
      xAxis: [
        {
          type: 'category',
          boundaryGap: [
            '20%', '20%'
          ],
          axisLine: {
            onZero: false
          },
          data: this.xData,
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        }, {
          gridIndex: 1,
          type: 'category',
          boundaryGap: false,
          axisLine: {
            onZero: true
          },
          data: this.xData,
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        }
      ],
      yAxis: [
        {
          //name : '心率/HR：(次/分)',
          type: 'value',
          max: 150,
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        }, {
          gridIndex: 1,
          //name : '呼吸率/RR：(次/分)',
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          },
          max: 60
        }
      ],
      series: [
        {
          name: '心率/HR',
          type: 'line',
          symbolSize: 2,
          hoverAnimation: false,
          data: this.yHeartData,
          itemStyle: {
            normal: {
              color: '#50abf2'
            }
          }
        }, {
          name: '呼吸率/RR',
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          symbolSize: 2,
          hoverAnimation: false,
          data: this.yBreathData,
          itemStyle: {
            normal: {
              color: '#1d8e0d'
            }
          }
        }
      ]
    }
  }


  initEcharts() {

  }

  getUserInfo() {
    this.clientDetailService.getUserInfo(this.userId).subscribe((res) => {

      if (res.success) {
        this.userInfo = res.data
        if (this.userInfo['sources']) {
          this.sources = this.userInfo['sources']
          // this.smartBedData()
          // this.getRealTimeData()
        }

        if (this.userInfo['cardId']) {
          if (this.userInfo['cardId'].length > 1) {
            this.reportListCallHeLe()
          }
        }
      }
    })
  }


  reportListCallHeLe() {
    let data = {
      'size': this.pageSize,
      'page': this.pageNumber,
      'idCard': this.userInfo['cardId']
    }

    this.clientDetailService.getReportList(data).subscribe((res) => {
      if (res.success) {
        if (res.report) {
          let tmp = eval(res.report)
          this.reportList = this.reportList.concat(tmp)

        }
      }
    })
  }

  reportListSelf() {
    this.clientDetailService.getSelfReportList(this.userId).subscribe((res) => {

      if (res.success) {
        var tem = eval(res.data)
        this.reportList = this.reportList.concat(tem)
      }
    })
  }


  userOrderList() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.userId,
      'userId': storage.get('state')['userId']
    }

    this.clientDetailService.userOrderList(data).subscribe((res) => {
      if (res.success) {
        this.list = eval(res.data.list)
        this.pagination = res.data.navigatepageNums
        this.pageNumber = res.data.pageNum
        this.totalCount = res.data.total
      }
    })
  }


  getAge(age) {
    return tools.getAge(age)
  }

}
