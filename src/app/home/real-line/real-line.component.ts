import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import * as moment from 'moment'
import * as $ from 'jquery'
@Component({
  selector: 'app-real-line',
  templateUrl: './real-line.component.html',
  styleUrls: ['./real-line.component.scss']
})
export class RealLineComponent implements OnInit, OnChanges {

  private optionBreath: EChartOption
  private option2: EChartOption
  private option3: EChartOption
  private breathInfo: Array<any> = []
  private moveInfo: Array<any> = []
  private heartInfo: Array<any> = []
  private realTime: Array<any> = []
  @Input('breath') breathDot: string = ''
  @Input('move') moveDot: string = ''
  @Input('heart') heartDot: string = ''
  @Input('time') timeDot: string = ''
  @Input() echartsStyle: any = { 'height': '350px' }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['timeDot']) {
      console.log("the change", changes)
      if (this.breathInfo.length > 30) {
        this.breathInfo.shift()
        this.heartInfo.shift()
        this.moveInfo.shift()
        this.realTime.shift()
      }

    }
  }

  initBreathEcharts() {
    this.optionBreath = {
      title: {
        text: '呼吸率监测',
        textStyle: {
          fontSize: '14px'
        },
        top: '2%',
        left: '2%'
      },
      tooltip: {
        trigger: 'axis',

        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [
          0, '100%'
        ],
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '呼吸率',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.breathInfo
        }
      ]
    }
  }

  initMoveEcharts() {
    this.option2 = {
      title: {
        text: '实时体动',
        textStyle: {
          fontSize: '14px'
        },
        top: '2%',
        left: '2%'
      },
      tooltip: {
        trigger: 'axis',

        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [
          0, '100%'
        ],
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '体动',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.moveInfo
        }
      ]
    }
  }

  initHeartEcharts() {
    this.option3 = {
      title: {
        text: '心率监测',
        textStyle: {
          fontSize: '14px'
        },
        top: '2%',
        left: '2%'
      },
      tooltip: {
        trigger: 'axis',

        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [
          0, '100%'
        ],
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '心率',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.heartInfo
        }
      ]
    }
  }

  // // 获取实时数据
  // getRealTimeData() {
  //   var self = this
  //   let option = {}
  //   if (this.equipNo == '' || this.equipNo == null) {
  //     return
  //   }
  //   if (this.sources == 'A') {
  //     option = {
  //       topics: [
  //         window['mqttHelper']['subscribeTopic'].getSingleBcgData('' + this.equipNo), // 主题-体征数据（呼吸、心率）
  //         window['mqttHelper']['subscribeTopic'].getSingleLeaveBedData('' + this.equipNo) // 主题-设备状态（设备状态：0，离床；1，在床；2，异常）
  //       ],
  //       dealData: (topic, data) => {
  //         this.livingData(data)
  //       }
  //     }
  //     window['mqttHelper'].connect(option)
  //
  //   } else {
  //
  //     window['sleepcareAPI'].beginReceiveData(this.equipNo, (res) => {
  //       this.livingData(res)
  //     })
  //   }
  // }

  livingData(data) {
    if ($('.realTimeLine').hasClass('black-hole')) {
      $('.realTimeLine').removeClass('black-hole')
      $('.nothing').addClass('black-hole')
    }
    if (data.Data) {
      // this.realTimeHeartLine(data.Data.HR, data.Data.Time)
      // this.realTimeBreathLine(data.Data.RR, data.Data.Time)
      // this.realTimeMoveLine(data.Data.MV, data.Data.Time)
    } else {
      let time = moment(data.lastMsgTime).format('YYYY-MM-DD HH:mm:ss')
      // this.realTimeHeartLine(data.hr, time)
      // this.realTimeBreathLine(data.rr, time)
      // this.realTimeMoveLine(data.mv, time)
    }

  }
  realTimeMoveLine(mv, time) {
    // if (this.moveInfo.length >= 30) {
    //   this.moveInfo.shift()
    // }
    // this.moveInfo.push({
    //   value: [time, mv]
    // })
    // this.instance3.setOption({
    //   series: [
    //     {
    //       data: this.moveInfo
    //     }
    //   ]
    // });
  }

  realTimeHeartLine(heartBeat, time) {
    // if (this.heartInfo.length >= 30) {
    //   this.heartInfo.shift()
    // }
    // this.heartInfo.push({
    //   value: [time, heartBeat]
    // })
    // this.instance.setOption({
    //   series: [
    //     {
    //       data: this.heartInfo
    //     }
    //   ]
    // });
  }

  // realTimeBreathLine(breathing, time) {
  //   if (this.breathInfo.length >= 30) {
  //     this.breathInfo.shift()
  //   }
  //   this.breathInfo.push({
  //     value: [time, breathing]
  //   })
  //   this.instance2.setOption({
  //     series: [
  //       {
  //         data: this.breathInfo
  //       }
  //     ]
  //   });
  // }

}
