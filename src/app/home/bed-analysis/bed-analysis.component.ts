import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, Renderer, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import { BedAnalysisService } from './bed-analysis.service';
import * as moment from 'moment';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import * as Flatpickr from 'flatpickr';
import * as zh_lang from 'flatpickr/dist/l10n/zh.js';
@Component({
  selector: 'app-bed-analysis',
  templateUrl: './bed-analysis.component.html',
  styleUrls: ['./bed-analysis.component.scss'],
  providers: [BedAnalysisService],
  encapsulation: ViewEncapsulation.None
})
export class BedAnalysisComponent implements OnInit, OnChanges {

  @Input() equipNo: string;
  @Input() echartsStyle: any = { 'height': '350px' };
  @ViewChild('tt') el: ElementRef;
  private bedAwayAnalysis: Array<any> = [];
  private bedAwayTime: Array<any> = [];
  private nothingFlag = false;
  private option: EChartOption;
  private focusDay: any = moment(new Date()).format('YYYY-MM-DD');
  private exampleOptions: FlatpickrOptions = {
    enableTime: false,
    static: true,
    time_24hr: true,
    dateFormat: 'Y-m-d',
    locale: zh_lang['zh'],
    defaultDate: this.focusDay,
    maxDate: moment(new Date()).format('YYYY-MM-DD'),
    onChange: this.chooseDay.bind(this),
    onClose: this.closeTime.bind(this)

  };

  constructor(private bedAnalysisService: BedAnalysisService) { }

  ngOnInit() {
    moment.locale('zh-cn');
  }

  chooseDay(val) {
    this.focusDay = moment(new Date(val)).format('YYYY-MM-DD');
    this.bedAnalysis();
  }

  closeTime(selectedDates, dateStr, instance) {
    instance.input.blur();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.equipNo !== '') {
      this.bedAnalysis();
    }
  }



  bedAnalysis() {
    this.bedAnalysisService.bedAnalysis(this.equipNo, this.focusDay).subscribe((res) => {
      if (res.success) {
        this.bedAwayAnalysis = [];
        this.bedAwayTime = [];
        if (res.data.data.indexOf('[') === -1) {
          return;
        }
        const tmp = eval(res.data.data);
        if (tmp.length > 0) {
          for (let i = 0; i < tmp.length; i++) {
            this.bedAwayAnalysis.push(tmp[i].status);
            this.bedAwayTime.push(tmp[i].startTime.split(' ')[1]);
          }
          this.initBedAwayEcharts();
          this.nothingFlag = true;
          this.el.nativeElement.className = 'lines black-hole';
        } else {
          this.el.nativeElement.className = 'lines ';

          this.nothingFlag = false;
        }
      } else {
        this.nothingFlag = true;
        this.el.nativeElement.className = 'lines black-hole';
      }
    });
  }

  initBedAwayEcharts() {
    this.option = {
      title: {
        text: '睡眠分析'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['状态']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.bedAwayTime
        }
      ],
      yAxis: {
        type: 'category',
        data: ['离床', '在床', '设备异常']
      },
      series: [
        {
          name: '状态',
          type: 'line',
          step: 'start',
          data: this.bedAwayAnalysis
        }
      ]
    };

  }
}
