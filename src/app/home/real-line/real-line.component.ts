import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import * as moment from 'moment';
import * as $ from 'jquery';
@Component({
  selector: 'app-real-line',
  templateUrl: './real-line.component.html',
  styleUrls: ['./real-line.component.scss']
})
export class RealLineComponent implements OnInit, OnChanges {

  optionBreath: EChartOption;
  option2: EChartOption;
  option3: EChartOption;
  breathInfo: Array<any> = [];
  moveInfo: Array<any> = [];
  heartInfo: Array<any> = [];
  realTime: Array<any> = [];
  nothingFlag = false;
  @Input('breath') breathDot = 0;
  @Input('move') moveDot = 0;
  @Input('heart') heartDot = 0;
  @Input('time') timeDot: string = undefined;
  @Input() echartsStyle: any = { 'height': '350px' };
  @ViewChild('tt') el: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['timeDot']) {
      if (changes['timeDot']['currentValue'] !== undefined) {
        if (!isNaN(this.breathDot) && !isNaN(this.moveDot) && !isNaN(this.heartDot)) {
          changes['breathDot'] ? this.breathInfo.push([changes['timeDot']['currentValue'], changes['breathDot']['currentValue']]) : this.breathInfo.push([changes['timeDot']['currentValue'], this.breathDot]);
          changes['moveDot'] ? this.moveInfo.push([changes['timeDot']['currentValue'], changes['moveDot']['currentValue']]) : this.moveInfo.push([changes['timeDot']['currentValue'], this.moveDot]);
          changes['heartDot'] ? this.heartInfo.push([changes['timeDot']['currentValue'], changes['heartDot']['currentValue']]) : this.heartInfo.push([changes['timeDot']['currentValue'], this.heartDot]);
          changes['timeDot'] ? this.realTime.push(changes['timeDot']['currentValue']) : this.realTime.push(this.timeDot);
          this.el.nativeElement.className = 'realTimeLine';
          this.nothingFlag = true;
          if (this.breathInfo.length > 30) {
            this.breathInfo.shift();
            this.heartInfo.shift();
            this.moveInfo.shift();
            this.realTime.shift();
          }

          this.initBreathEcharts();
          this.initMoveEcharts();
          this.initHeartEcharts();
        }

      } else {
        this.el.nativeElement.className = 'realTimeLine black-hole';
        this.nothingFlag = false;

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
    };
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
    };
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
    };
  }

  livingData(data) {
    if ($('.realTimeLine').hasClass('black-hole')) {
      $('.realTimeLine').removeClass('black-hole');
      $('.nothing').addClass('black-hole');
    }
    if (data.Data) {
      // this.realTimeHeartLine(data.Data.HR, data.Data.Time)
      // this.realTimeBreathLine(data.Data.RR, data.Data.Time)
      // this.realTimeMoveLine(data.Data.MV, data.Data.Time)
    } else {
      const time = moment(data.lastMsgTime).format('YYYY-MM-DD HH:mm:ss');
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
