import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, Renderer, ElementRef, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import { BmiLineService } from './bmi-line.service';
import * as moment from 'moment';
@Component({
  selector: 'app-bmi-line',
  templateUrl: './bmi-line.component.html',
  styleUrls: ['./bmi-line.component.scss'],
  providers: [BmiLineService]
})
export class BmiLineComponent implements OnInit, OnChanges {

  private option: EChartOption;
  private bmiList: Array<any> = [];
  private xBMIData: Array<any> = [];
  private nothingFlag = false;
  @Input() userId: string;
  @Input() periodDay: number;
  @Input() echartsStyle: any = { 'height': '350px' };
  @ViewChild('tt') el: ElementRef;
  constructor(private bmiLineService: BmiLineService) { }

  ngOnInit() {
    // this.initBMILine();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initBMILine();
  }


  initBMILine() {
    this.bmiLineService.bmiList({ 'customerId': this.userId, 'day': this.periodDay, 'signType': 'bf' }).subscribe((res) => {
      if (res.success) {
        this.bmiList = [];
        this.xBMIData = [];

        for (let i = 0; i < res.data.length; i++) {
          this.bmiList.push(Number(res.data[i].bmi));
          if (this.periodDay === 1) {
            this.xBMIData[i] = moment(res.data[i].createDt).format('HH:mm');
          } else {
            this.xBMIData[i] = moment(res.data[i].createDt).format('YYYY-MM-DD');
          }
        }
        if (this.bmiList.length > 0) {
          this.option = this.initBMIEcharts();
          this.el.nativeElement.className = '';
          this.nothingFlag = true;
        } else {
          this.el.nativeElement.className = 'black-hole';
          this.nothingFlag = false;
        }
      }
    });
  }

  initBMIEcharts(): EChartOption {
    return {
      title: {
        text: 'BMI监测',
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
        data: ['BMI'],
        right: '2%'

      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.xBMIData
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} '
        }
      },
      series: [
        {
          name: 'BMI',
          type: 'line',
          data: this.bmiList
        }
      ]
    };
  }

}
