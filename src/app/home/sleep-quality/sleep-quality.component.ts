import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import * as moment from 'moment'
import * as $ from 'jquery'
import { SleepQualityService } from './sleep-quality.service'
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import * as Flatpickr from 'flatpickr'
import * as zh_lang from 'flatpickr/dist/l10n/zh.js'
@Component({
  selector: 'app-sleep-quality',
  templateUrl: './sleep-quality.component.html',
  styleUrls: ['./sleep-quality.component.scss'],
  providers: [SleepQualityService],
  encapsulation: ViewEncapsulation.None
})
export class SleepQualityComponent implements OnInit, OnChanges {

  private option: EChartOption
  private option2: EChartOption
  private option3: EChartOption
  private option4: EChartOption
  private option5: EChartOption
  private option6: EChartOption

  private recovery: any
  private relaxation: any

  private deepRate: any
  private lightRate: any
  private remRate: any

  private sleepQuality: any
  private averageHeartRate: any
  private averageRespiration: any
  private focusData: Array<any> = []
  private focusDay: any = moment(new Date()).format('YYYY-MM-DD')

  private exampleOptions: FlatpickrOptions = {
    enableTime: false,
    static: true,
    time_24hr: true,
    dateFormat: 'Y-m-d',
    defaultDate: this.focusDay,
    maxDate: moment(new Date()).format('YYYY-MM-DD'),
    onChange: this.chooseDay.bind(this)
  }
  private nothingFlag: boolean = false

  private backgroundColor: string;
  private color: any;
  private fontSize: string;
  private name: string;
  private value: any
  private styleFormat: any
  private title: string
  @Input() echartsStyle: any = { 'height': '350px' }
  @Input() equipNo: string = ''
  @ViewChild('tt') el: ElementRef
  @ViewChild('bb') bb: ElementRef
  constructor(private sleepQualityService: SleepQualityService) { }

  ngOnInit() {
    Flatpickr.localize(zh_lang.zh)
    moment.locale('zh-cn')
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.equipNo != "") {
      this.sleepAnalysis()
    }
  }

  showSomething(flag) {
    if (flag) {
      this.bb.nativeElement.className = "block-table "
    } else {
      this.bb.nativeElement.className = "block-table black-hole"
    }
  }


  chooseDay(val) {
    this.focusDay = moment(new Date(val)).format('YYYY-MM-DD')
    this.sleepAnalysis()
  }

  showCircleZoom(flag) {
    if (flag) {
      this.el.nativeElement.className = "circle-zoom"
      $(".circle-zoom").removeClass('black-hole')
      this.nothingFlag = true
    } else {
      this.el.nativeElement.className = "circle-zoom black-hole"
      this.nothingFlag = false
    }
  }

  sleepAnalysis() {
    this.sleepQualityService.sleepQuality(this.equipNo, this.focusDay).subscribe((res) => {
      console.log(res);
      if (res.success && res.data) {
        this.showCircleZoom(true)
        this.recovery = res.data.recovery
        this.relaxation = res.data.relaxation

        this.deepRate = res.data.deepRate
        this.lightRate = res.data.lightRate
        this.remRate = res.data.remRate

        this.sleepQuality = res.data.sleepQuality
        this.averageHeartRate = res.data.averageHeartRate
        this.averageRespiration = res.data.averageRespiration
        this.averagePic()
        this.option = this.percentPic({
          value: parseFloat(this.recovery),
          name: '恢复程度'
        })

        this.option2 = this.percentPic({
          value: parseFloat(this.relaxation),
          name: '放松程度',
          color: ['#cd38ea', '#d2d9e9']
        })

        this.option4 = this.percentPic({
          value: parseFloat(this.sleepQuality),
          name: '睡眠质量',
          color: ['#512cb8', '#d2d9e9']
        })

        this.option5 = this.percentPic({
          value: parseFloat(this.averageRespiration),
          name: '平均呼吸',
          color: [
            '#9ede72', '#d2d9e9'
          ],
          styleFormat: '{b}\n{c}'

        })

        this.option6 = this.percentPic({
          value: parseFloat(this.averageHeartRate),
          name: '平均心率',
          color: [
            '#f98316', '#d2d9e9'
          ],
          styleFormat: '{b}\n{c}'
        })
      } else {
        this.showCircleZoom(false)
      }
    })
  }


  averagePic() {
    this.focusData = []
    this.focusData.push({
      value: parseInt(this.remRate),
      name: '快速眼动占比'
    })
    this.focusData.push({
      value: parseInt(this.lightRate),
      name: '浅睡占比'
    })
    this.focusData.push({
      value: parseInt(this.deepRate),
      name: '深睡占比'
    })

    this.option3 = {
      tooltip: {
        trigger: 'none',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color: [
        '#79b4ee', '#444349', '#8fee78'
      ],
      legend: {
        orient: 'horizontal',
        left: 'center',
        bottom: '20px',
        data: [
          {
            name: '快速眼动占比',
            icon: 'circle'
          }, {
            name: '浅睡占比',
            icon: 'circle'
          }, {
            name: '深睡占比',
            icon: 'circle'
          }
        ]
      },
      series: [
        {
          type: 'pie',
          radius: '72%',
          center: [
            '50%', '50%'
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
    }
  }


  percentPic(option) {
    var _that = this;

    this.backgroundColor = '#fff';
    this.color = option.color || ['#fdc903', '#d2d9e9'];
    this.fontSize = option.fontSize || '22';
    this.name = option.name;
    this.value = option.value
    this.styleFormat = option.styleFormat || '{b}\n{c}%'
    let tmpOption: any = {
      backgroundColor: _that.backgroundColor,
      color: _that.color,
      title: {
        text: _that.title,
        top: '3%',
        left: '1%',
        textStyle: {
          color: '#333',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 16
        }
      },
      series: [
        {
          type: 'pie',
          radius: [
            '60%', '75%'
          ],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              textStyle: {
                fontSize: _that.fontSize,
                fontWeight: 'bold'
              },
              formatter: _that.styleFormat
            }
          },
          data: [
            {
              value: _that.value,
              name: _that.name,
              label: {
                normal: {
                  show: true
                }
              }
            }, {
              value: 100 - _that.value,
              name: ''
            }
          ]
        }
      ]
    }
    return tmpOption
  }
}
