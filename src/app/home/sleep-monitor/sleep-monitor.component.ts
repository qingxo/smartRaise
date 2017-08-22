import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import tools from '../../shared/tools'
import { ClientDetailService } from '../client-detail/client-detail.service'
@Component({
  selector: 'app-sleep-monitor',
  templateUrl: './sleep-monitor.component.html',
  styleUrls: ['./sleep-monitor.component.scss'],
  providers: [ClientDetailService]
})
export class SleepMonitorComponent implements OnInit {

  private pageSize: number = 10
  private pageNumber: number = 1
  private heartBeating: string = '-'
  private breathLevel: string = '-'
  private missionList: Array<string> = ['实时曲线', '历史曲线', '在离床分析', '睡眠质量分析']
  private missionListB: Array<string> = ['实时曲线', '历史曲线']
  private showTable: number = 0
  private customerId: string = ''
  private equipNo: string = ''
  private item: any = {}
  private sources: string = ''
  @ViewChild('tt') el: ElementRef
  constructor(private route: ActivatedRoute, private clientDetailService: ClientDetailService) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId']
    this.equipNo = this.route.snapshot.params['equipNo']
    this.getUserInfo()
  }

  getUserInfo() {
    this.clientDetailService.getUserInfo(this.customerId).subscribe((res) => {
      if (res.success) {
        this.item = res.data
        if (this.item.sources) {
          this.sources = this.item.sources
          this.getRealTimeData()
        }

      }
    })
  }

  showChoosed(e, index) {
    for (let i = 0; i < this.el.nativeElement.children.length; i++) {
      this.el.nativeElement.children[i].className = 'mission-table'
    }
    e.toElement.className = 'mission-table show-table'
  }

  // 获取实时数据
  getRealTimeData() {
    var self = this
    let option = {}
    let count = 0
    if (this.sources == 'A') {
      option = {
        topics: [
          window['mqttHelper']['subscribeTopic'].getSingleBcgData('' + this.equipNo), // 主题-体征数据（呼吸、心率）
          window['mqttHelper']['subscribeTopic'].getSingleLeaveBedData('' + this.equipNo) // 主题-设备状态（设备状态：0，离床；1，在床；2，异常）
        ],
        dealData: (topic, data) => {
          this.livingData(data, count)
          count++
        }
      }
      window['mqttHelper'].connect(option)

    } else {

      window['sleepcareAPI'].beginReceiveData(this.equipNo, (res) => {
        this.livingData(res, count)
        count++
      })
    }

  }
  livingData(data, count) {
    if (this.sources == 'B') {
      $("#ht" + this.equipNo).text(data.hr)
      $("#bl" + this.equipNo).text(data.rr)
      let status = ''
      switch (data.status) {
        case 1:
          status = "在床"
          break;
        case 2:
          status = '离床'
          break;
        case 3:
          status = '异常'
          break;
        default:

      }
      $("#sta" + this.equipNo).text(status)
    } else {
      $("#ht" + this.equipNo).text(data.Data.HR)
      $("#bl" + this.equipNo).text(data.Data.RR)
    }
  }

  getAge(num) {
    return tools.getAge(num)
  }

}
