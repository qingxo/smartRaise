import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, Renderer, ElementRef, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
@Component({
  selector: 'app-bar-lines',
  templateUrl: './bar-lines.component.html',
  styleUrls: ['./bar-lines.component.scss']
})
export class BarLinesComponent implements OnInit, OnChanges {

  private option: EChartOption;
  private nothingFlag = false;
  @Input() topTitle = '';
  @Input() legendData: Array<string> = [];
  @Input() xData: Array<string> = [];
  @Input() serisesData: Array<Array<string>> = [];
  @Input() echartsStyle: any = { 'height': '360px' };
  @ViewChild('tt') el: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.serisesData.length > 0 && this.legendData.length > 0) {
      console.log('caeed');
      this.option = this.getOption();
      this.el.nativeElement.className = 'lines';
      this.nothingFlag = true;
    }
  }

  getOption() {

    const opt: EChartOption = {
      title: {
        text: this.topTitle,
        left: 'center',
        textStyle: {
          fontSize: '22',
          color: '#686868'
        }

      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      color: ['#4e9dd2', '#f47b38', '#a5a5a5', '#ffbd2e'],
      legend: {
        data: this.legendData,
        bottom: '0'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.xData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
      ]
    };
    for (let i = 0; i < this.serisesData.length; i++) {
      opt['series'].push({ 'name': this.legendData[i], 'type': 'bar', 'data': this.serisesData[i] });
    }
    return opt;
  }

}
