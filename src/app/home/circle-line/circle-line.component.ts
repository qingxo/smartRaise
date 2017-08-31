import { Component, OnInit, Input, Output, SimpleChanges, Renderer, ElementRef, ViewChild, AfterContentChecked } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
@Component({
  selector: 'app-circle-line',
  templateUrl: './circle-line.component.html',
  styleUrls: ['./circle-line.component.scss']
})
export class CircleLineComponent implements OnInit, AfterContentChecked {

  private option: EChartOption;
  private nothingFlag = false;
  @Input() topTitle = '';
  @Input() serisesData: Array<any> = [];
  @Input() echartsStyle: any = { 'height': '360px' };
  @ViewChild('tt') el: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    if (this.serisesData.length > 0) {
      this.option = this.getOption();
      this.el.nativeElement.className = 'lines';
      this.nothingFlag = true;
    } else {
      this.el.nativeElement.className = 'lines black-hole';
      this.nothingFlag = false;
    }
  }

  getOption() {
    const opt = {
      title: {
        text: this.topTitle,
        x: 'center',
        textStyle: {
          color: '#686868'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },

      series: [
        {
          name: this.topTitle,
          type: 'pie',
          radius: '70%',
          center: ['50%', '60%'],
          data: this.serisesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    return opt;

  }

}
