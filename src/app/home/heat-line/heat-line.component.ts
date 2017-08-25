import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, Renderer, ElementRef, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import { HeatLineService } from './heat-line.service';
import storage from '../../shared/storage';
@Component({
  selector: 'app-heat-line',
  templateUrl: './heat-line.component.html',
  styleUrls: ['./heat-line.component.scss'],
  providers: [HeatLineService]
})
export class HeatLineComponent implements OnInit, OnChanges {
  private sources = '';
  private option: EChartOption;
  private heatList: Array<any> = [];
  private xHeatData: Array<any> = [];
  private nothingFlag = false;
  @Input() userId = '';
  @Input() periodDay = 1;
  @Input() echartsStyle: any = { 'height': '350px' };
  @ViewChild('tt') el: ElementRef;
  constructor(private heatLineService: HeatLineService) { }


  ngOnInit() {
    this.initHeatEcharts();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.initHeatEcharts();
  }

  initHeatEcharts() {
    this.heatLineService.heatList({ 'customerId': this.userId, 'day': this.periodDay, 'signType': 'temp' }).subscribe((res) => {
      if (res.success) {
        this.heatList = [];
        this.xHeatData = [];
        const arr = eval(res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.heatList[i] = Number(res.data[i].temp);
          if (this.periodDay === 1) {
            this.xHeatData[i] = res.data[i].occurDtStr.split(' ')[1];
          } else {
            this.xHeatData[i] = res.data[i].occurDtStr.split(' ')[0];
          }
        }
        if (this.heatList.length > 0) {
          this.refreshHeatEcharts();
          this.nothingFlag = true;
          this.el.nativeElement.className = '';
        } else {
          this.nothingFlag = false;
          this.el.nativeElement.className = 'black-hole';
        }

      }
    });
  }

  refreshHeatEcharts() {
    this.option = {
      title: {
        text: '体温监测',
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
        data: ['体温'],
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
          name: '体温',
          type: 'line',
          data: this.heatList,
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
