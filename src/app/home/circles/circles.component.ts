import { Component, OnInit, Input, Output, SimpleChanges, Renderer, ElementRef, ViewChild, AfterContentChecked, OnChanges } from '@angular/core';
import { EChartOption } from 'echarts-ng2';

@Component({
  selector: 'app-circles',
  templateUrl: './circles.component.html',
  styleUrls: ['./circles.component.scss']
})
export class CirclesComponent implements OnInit, OnChanges {

  @Input() title: Array<string> = [];
  @Input() radios: Array<string> = [];
  private focusData: Array<any> = [];
  private legendData: Array<any> = [];
  private option: EChartOption;
  private nothingFlag = false;
  @ViewChild('tt') el: ElementRef;


  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.title.length > 0 && this.radios.length > 0) {
      this.averagePic()
      this.el.nativeElement.className = 'lines';
      this.nothingFlag = true;
    } else {
      this.el.nativeElement.className = 'lines black-hole';
      this.nothingFlag = false;
    }
  }


  averagePic() {
    this.focusData = [];
    for (let i = 0; i < this.radios.length; i++) {
      this.focusData.push({
        value: parseInt(this.radios[i], 10),
        name: this.title[i]
      });

      this.legendData.push({
        name: this.title[i],
        icon: 'circle'
      })
    }


    this.option = {
      tooltip: {
        trigger: 'none',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      color: [
        '#79b4ee', '#444349', '#8fee78'
      ],
      legend: {
        orient: 'horizontal',
        left: 'center',
        bottom: '100px',
        data: this.legendData
      },
      series: [
        {
          type: 'pie',
          radius: '52%',
          center: [
            '50%', '35%'
          ],
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          data: this.focusData
        }
      ]
    };
  }

}
