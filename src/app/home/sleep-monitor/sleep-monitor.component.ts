import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import tools from '../../shared/tools';
import * as $ from 'jquery';
import * as moment from 'moment';
import { ClientDetailService } from '../client-detail/client-detail.service';
@Component({
  selector: 'app-sleep-monitor',
  templateUrl: './sleep-monitor.component.html',
  styleUrls: ['./sleep-monitor.component.scss'],
  providers: [ClientDetailService]
})
export class SleepMonitorComponent implements OnInit {

  private pageSize = 10;
  private pageNumber = 1;
  private heartBeating = '-';
  private breathLevel = '-';
  private bedStatus = '-';
  private moveInfo = '-';
  private realTime = '';
  private missionList: Array<string> = ['实时曲线', '历史曲线', '在离床分析', '睡眠质量分析'];
  private missionListB: Array<string> = ['实时曲线', '历史曲线'];
  private showTable = 0;
  private customerId = '';
  private equipNo = '';
  private item: any = {};
  private sources = '';

  @ViewChild('tt') el: ElementRef;
  constructor(private route: ActivatedRoute, private clientDetailService: ClientDetailService) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
    this.equipNo = this.route.snapshot.params['equipNo'];
    this.getUserInfo();
  }

  getUserInfo() {
    this.clientDetailService.getUserInfo(this.customerId).subscribe((res) => {
      if (res.success) {
        this.item = res.data;
        if (this.item.sources) {
          this.sources = this.item.sources;
          this.getRealTimeData();
        }

      }
    });
  }

  showChoosed(e, index) {
    this.showTable = index;
    for (let i = 0; i < this.el.nativeElement.children.length; i++) {
      this.el.nativeElement.children[i].className = 'mission-table';
    }
    e.toElement.className = 'mission-table show-table';
  }

  // 获取实时数据
  getRealTimeData() {
    const self = this;
    let option = {};
    let count = 0;
    if (this.sources === 'A') {
      option = {
        topics: [
          window['mqttHelper']['subscribeTopic'].getSingleBcgData('' + this.equipNo), // 主题-体征数据（呼吸、心率）
          window['mqttHelper']['subscribeTopic'].getSingleLeaveBedData('' + this.equipNo) // 主题-设备状态（设备状态：0，离床；1，在床；2，异常）
        ],
        dealData: (topic, data) => {
          this.livingData(data, count);
          count++;
        }
      };
      window['mqttHelper'].connect(option);

    } else {

      window['sleepcareAPI'].beginReceiveData(this.equipNo, (res) => {
        this.livingData(res, count);
        count++;
      });
    }

  }
  livingData(data, count) {
    if (this.sources === 'B') {
      this.breathLevel = data.rr;
      this.heartBeating = data.hr;
      this.moveInfo = data.mv;
      this.realTime = moment(data.lastMsgTime).format('YYYY-MM-DD HH:mm:ss');
      let status = '';
      switch (data.status) {
        case 1:
          status = '在床';
          break;
        case 2:
          status = '离床';
          break;
        case 3:
          status = '异常';
          break;
        default: status = '未知';

      }
      this.bedStatus = status;
    } else {
      this.breathLevel = data.Data.RR;
      this.heartBeating = data.Data.HR;
      this.moveInfo = data.Data.MV;
      this.realTime = data.Data.Time;
      let status = '';

      switch (data.Data.BedStatus) {
        case '1':
          status = '在床';
          break;
        case '2':
          status = '离床';
          break;
        case '3':
          status = '异常';
          break;
        default: status = '未知';
      }
      this.bedStatus = status;
      // $("#ht" + this.equipNo).text(data.Data.HR)
      // $("#bl" + this.equipNo).text(data.Data.RR)
    }
  }

}
