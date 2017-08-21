import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, Renderer, ElementRef, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import { BestSleepLineService } from './best-sleep-line.service'
import * as moment from 'moment'
@Component({
  selector: 'app-best-sleep-line',
  templateUrl: './best-sleep-line.component.html',
  styleUrls: ['./best-sleep-line.component.scss'],
  providers: [BestSleepLineService]
})
export class BestSleepLineComponent implements OnInit, OnChanges {

  private option: EChartOption
  @Input() subText: string
  @Input() optTitle: string
  @Input() lineData: Array<any> = []
  @Input() timeData: Array<any> = []
  @Input() echartsStyle: any = { 'height': '350px' }
  @ViewChild('tt') el: ElementRef
  private nothingFlag: boolean = false
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (this.lineData.length > 0) {
      this.initLine()
      this.el.nativeElement.className = ""
      this.nothingFlag = true
    } else {
      this.el.nativeElement.className = "black-hole"
      this.nothingFlag = false

    }
  }
  initLine() {
    this.option = {
      title: {
        text: '',
        x: 'right',
        top: '12px',
        textStyle: {
          fontSize: 20
        },
        subtext: this.subText,
        padding: [
          5, 40
        ],
        subtextStyle: {
          color: '#a8be99'
        }
      },
      legend: {
        data: [
          {
            name: this.optTitle
          }
        ],
        x: 'center',
        top: '20px',
        textStyle: {
          fontSize: 10,
          right: 20
        }
      },
      color: ['#72ab4d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '7%',
        bottom: '3%',
        top: '25%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.timeData,
          axisTick: {
            alignWithLabel: true
          },
          name: '时间',
          nameGap: 10
        }
      ],
      yAxis: [
        {
          type: 'value',
          max: 20,
          name: '单位(分)'
        }
      ],
      series: [
        {
          name: this.optTitle,
          type: 'bar',
          barWidth: '10%',
          data: this.lineData,
          label: {
            normal: {
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              label: {
                show: true, //是否展示
                textStyle: {
                  fontWeight: 'bolder',
                  fontSize: '12',
                  fontFamily: '微软雅黑'
                }
              }
            }
          }
        }
      ]
    }
  }



}
