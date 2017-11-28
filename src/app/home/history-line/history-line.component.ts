import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, Renderer, ElementRef, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import storage from '../../shared/storage';
import { HistoryLineService } from './history-line.service';
@Component({
  selector: 'app-history-line',
  templateUrl: './history-line.component.html',
  styleUrls: ['./history-line.component.scss'],
  providers: [HistoryLineService]
})
export class HistoryLineComponent implements OnInit, OnChanges {

  bedList: Array<any> = [];
  nothingFlag = false;
  yBreathData: Array<any> = [];
  yHeartData: Array<any> = [];
  ySignData: Array<any> = [];
  xData: Array<any> = [];
  periodDay = 1;
  option: EChartOption;
  option2: EChartOption;
  @Input() sources = '-1';
  @Input() equipNo = '';
  @ViewChild('tt') el: ElementRef;
  @Input() echartsStyle: any = { 'height': '800px' };
  @Input() echartsStyle2: any = { 'height': '400px' };

  constructor(private historyLineService: HistoryLineService) { }

  ngOnInit() {
  }

  changeDay(num) {
    let status = 0;
    switch (num) {
      case 0: status = 1;
        break;
      case 1: status = 7;
        break;
      case 2: status = 30;
        break;
    }
    if (status !== this.periodDay) {
      this.periodDay = status;
      this.smartBedData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.sources !== '-1' && this.equipNo !== '') {
      this.smartBedData();
    }
  }

  smartBedData() {
    this.historyLineService.smartBedHistoryData(this.sources, this.equipNo, this.periodDay).subscribe((res) => {
      if (res.success) {
        if (res.data) {
          this.bedList = eval(res.data);
          if (this.bedList.length > 0) {
            this.nothingFlag = true;
            this.startEchartSmartBed();
            this.el.nativeElement.className = 'lines';
          }
        } else {
          this.el.nativeElement.className = 'lines black-hole';
          this.nothingFlag = false;
        }

      } else {
        this.el.nativeElement.className = 'lines black-hole';
        this.nothingFlag = true;
      }
    });
  }

  startEchartSmartBed() {
    this.yBreathData = [];
    this.yHeartData = [];
    this.ySignData = [];
    this.xData = [];
    if (this.bedList.length > 0) {
      for (let i = 0; i < this.bedList.length; i++) {
        this.yBreathData[i] = this.bedList[i].breathingValue;
        this.yHeartData[i] = this.bedList[i].heartValue;
        this.ySignData[i] = this.bedList[i].signDataValue;

        if (this.periodDay === 1) {
          this.xData[i] = this.bedList[i].measuretime.split(' ')[1];
        } else {
          this.xData[i] = this.bedList[i].measuretime.split(' ')[0];
        }

      }
      this.option = {
        title: {
          text: '心率/呼吸趋势图',
          x: 'left',
          top: '20px',
          left: '2%',
          textStyle: {
            fontSize: '14px'
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
          right: '2%',
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
            type: 'value',
            max: 150,
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          }, {
            gridIndex: 1,
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
      };

      this.option2 = {
        title: {
          text: '体动趋势',
          textStyle: {
            fontSize: '14px'
          },
          left: '2%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['体动趋势'],
          x: 'right',
          top: '20px',
          right: '2%',
          textStyle: {
            fontSize: 10,
            right: 20
          }
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
      };
    }
  }

}
