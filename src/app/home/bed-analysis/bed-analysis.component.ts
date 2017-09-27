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

  @Input() equipNo: string = '';
  @Input() echartsStyle: any = { 'height': '350px' };
  @Input() title: any = '睡眠分析';
  @Input() yAxisData: Array<string> = ['离床', '在床', '设备异常'];
  @ViewChild('tt') el: ElementRef;
  @Input() bedAwayAnalysis: Array<any> = [];
  @Input() bedAwayTime: Array<any> = [];
  @Input() isOpen: boolean = false;
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

    if (this.equipNo === '' && this.bedAwayTime.length > 0 && this.bedAwayAnalysis.length > 0) {
      this.initBedAwayEcharts();
    } else if (this.equipNo === '' && this.bedAwayTime.length === 0 && this.bedAwayAnalysis.length === 0) {
      this.el.nativeElement.className = 'lines black-hole';
      this.nothingFlag = false;
    }
  }



  bedAnalysis() {
    this.bedAnalysisService.bedAnalysis(this.equipNo, this.focusDay).subscribe((res) => {
      if (res.success) {
        this.bedAwayAnalysis = [];
        this.bedAwayTime = [];
        if (res.data.data.indexOf('设备') !== -1) {
          return;
        }
        const tmp = eval(res.data.data);
        if (tmp.length > 0) {
          for (let i = 0; i < tmp.length; i++) {
            this.bedAwayAnalysis.push(tmp[i].status);
            this.bedAwayTime.push(tmp[i].startTime.split(' ')[1]);
          }
          this.initBedAwayEcharts();

        } else {
          this.el.nativeElement.className = 'lines black-hole';
          this.nothingFlag = false;
        }
      } else {
        this.nothingFlag = true;
        this.el.nativeElement.className = 'lines black-hole';
      }
    });
  }


  initBedAwayEcharts() {
    this.nothingFlag = true;
    this.el.nativeElement.className = 'lines ';
    this.option = {
      title: {
        text: this.title
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
        data: this.yAxisData
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
