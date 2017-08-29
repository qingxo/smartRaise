import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, Renderer, ElementRef, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import { BloodSugarService } from './blood-sugar.service';
@Component({
  selector: 'app-blood-sugar',
  templateUrl: './blood-sugar.component.html',
  styleUrls: ['./blood-sugar.component.scss'],
  providers: [BloodSugarService]
})
export class BloodSugarComponent implements OnInit, OnChanges {

  private bloodSugarListAfter: Array<any> = [];
  private bloodSugarListBefore: Array<any> = [];
  private bloodSugarBefore: Array<any> = [];
  private bloodSugarAfter: Array<any> = [];
  private nothingFlag = false;
  private bloodSugarDateBefore: Array<any> = [];
  private bloodSugarDateAfter: Array<any> = [];
  private option: EChartOption;
  @Input() userId = '';
  @Input() periodDay = 1;
  @Input() echartsStyle: any = { 'height': '350px' };
  @ViewChild('tt') el: ElementRef;
  constructor(private bloodSugarService: BloodSugarService) { }

  ngOnInit() {
    // this.bloodDataInit();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.bloodDataInit();
  }


  bloodDataInit() {
    this.bloodSugarService.getBloodSugarList({ 'customerId': this.userId, 'day': this.periodDay }).subscribe((res) => {
      if (res.success) {
        const arr = res.data;
        this.bloodSugarListAfter = [];
        this.bloodSugarListBefore = [];
        if (arr.bloodSugarAfters) {
          this.bloodSugarListAfter = eval(res.data.bloodSugarAfters);
        }

        if (arr.bloodSugarBegins) {
          this.bloodSugarListBefore = eval(res.data.bloodSugarBegins);
        }
        if (this.bloodSugarListAfter instanceof Array) {
          for (let i = 0; i < this.bloodSugarListAfter.length; i++) {
            this.bloodSugarAfter[i] = this.bloodSugarListAfter[i].sugarValue;
            if (this.periodDay === 1) {
              this.bloodSugarDateAfter[i] = this.bloodSugarListAfter[i].measurementTime.split(' ')[1];
            } else {
              this.bloodSugarDateAfter[i] = this.bloodSugarListAfter[i].measurementTime.split(' ')[0];
            }
          }
        }

        if (this.bloodSugarListBefore instanceof Array) {
          for (let i = 0; i < this.bloodSugarListBefore.length; i++) {
            this.bloodSugarBefore[i] = this.bloodSugarListBefore[i].sugarValue;
            if (this.periodDay === 1) {
              this.bloodSugarDateBefore[i] = this.bloodSugarListBefore[i].measurementTime.split(' ')[1];
            } else {
              this.bloodSugarDateBefore[i] = this.bloodSugarListBefore[i].measurementTime.split(' ')[0];
            }
          }
        }

        if (this.bloodSugarListBefore.length === 0 && this.bloodSugarListAfter.length === 0) {
          this.nothingFlag = false;
          this.el.nativeElement.className = 'black-hole';

        } else {
          this.startEchartSugar();
          this.nothingFlag = true;
          this.el.nativeElement.className = '';
        }

      }
    });
  }

  startEchartSugar() {
    this.option = {
      color: [
        '#5793f3', '#d14a61', '#675bba'
      ],
      title: {
        text: '血糖监测',
        textStyle: {
          fontSize: '14'
        },
        top: '2%',
        left: '2%'
      },
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: [
          '餐前血糖', '餐后血糖'
        ],
        right: '2%'
      },
      grid: {
        top: 70,
        bottom: 50
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#d14a61'
            }
          },
          axisPointer: {
            label: {
              formatter: function(params) {
                return '餐后血糖  ' + params.value + (params.seriesData.length
                  ? '：' + params.seriesData[0].data
                  : '');
              }
            }
          },
          data: this.bloodSugarDateAfter
        }, {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#5793f3'
            }
          },
          axisPointer: {
            label: {
              formatter: function(params) {
                return '餐前血糖  ' + params.value + (params.seriesData.length
                  ? '：' + params.seriesData[0].data
                  : '');
              }
            }
          },
          data: this.bloodSugarDateBefore
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '餐前血糖',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          data: this.bloodSugarBefore
        }, {
          name: '餐后血糖',
          type: 'line',
          smooth: true,
          data: this.bloodSugarAfter
        }
      ]
    };

  }
}
