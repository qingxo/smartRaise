import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, Renderer, ElementRef, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts-ng2';

@Component({
  selector: 'app-move-action',
  templateUrl: './move-action.component.html',
  styleUrls: ['./move-action.component.scss']
})
export class MoveActionComponent implements OnInit, OnChanges {
  private sources = '';
  private option: EChartOption;
  private nothingFlag = false;
  @Input('dataList') moveList: Array<any> = [];
  @Input('xAxisList') xHeatData: Array<any> = [];
  @Input() echartsStyle: any = { 'height': '350px' };
  @ViewChild('tt') el: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.moveList.length > 0 && this.xHeatData.length > 0) {
      this.nothingFlag = true;
      this.el.nativeElement.className = '';
      this.refreshHeartEcharts();
    } else {
      this.nothingFlag = false;
      this.el.nativeElement.className = 'black-hole';
    }
  }




  refreshHeartEcharts() {
    this.option = {
      title: {
        text: '体动走势',
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
        data: ['体动走势'],
        right: '2%'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.xHeatData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '体动走势',
          type: 'bar',
          data: this.moveList,
          symbolSize: 4,
          itemStyle: {
            normal: {
              color: '#2f78f9'
            }
          }
        }
      ]
    };
  }


}
