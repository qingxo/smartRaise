import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, Renderer, ElementRef, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import { BloodOxygenService } from './blood-oxygen.service';
import * as moment from 'moment';
@Component({
  selector: 'app-blood-oxygen',
  templateUrl: './blood-oxygen.component.html',
  styleUrls: ['./blood-oxygen.component.scss'],
  providers: [BloodOxygenService]
})
export class BloodOxygenComponent implements OnInit, OnChanges {

  private option: EChartOption;
  private oxygenList: Array<any> = [];
  private xOxygenData: Array<any> = [];
  private nothingFlag = false;
  @Input() periodDay = 1;
  @Input() userId = '';
  @Input() echartsStyle: any = { 'height': '350px' };

  @ViewChild('tt') el: ElementRef;
  constructor(private bloodOxygenService: BloodOxygenService) { }

  ngOnInit() {
    // this.oxygenDataInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.oxygenDataInit();
  }

  oxygenDataInit() {
    this.bloodOxygenService.oxygenList({ 'customerId': this.userId, 'day': this.periodDay, 'signType': 'spo2' }).subscribe((res) => {
      if (res.success) {
        this.oxygenList = [];
        this.xOxygenData = [];
        const arr = eval(res.data);
        for (let i = 0; i < arr.length; i++) {
          this.oxygenList[i] = Number(arr[i].spo2);
          if (this.periodDay === 1) {
            this.xOxygenData[i] = moment(arr[i].createDt).format('HH:mm');
          } else {
            this.xOxygenData[i] = moment(arr[i].createDt).format('YYYY-MM-DD');
          }
        }
        if (this.oxygenList.length > 0) {
          this.nothingFlag = true;
          this.el.nativeElement.className = '';
        } else {
          this.nothingFlag = false;
          this.el.nativeElement.className = 'black-hole';

        }
        this.refreshOxygenEchart();
      }
    });
  }

  refreshOxygenEchart() {
    this.option = {
      title: {
        text: '血氧监测',
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
        data: ['血氧饱和度'],
        right: '2%'
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.xOxygenData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '血氧饱和度',
          type: 'line',
          data: this.oxygenList,
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
