import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import storage from '../../shared/storage';
import tools from '../../shared/tools';
import { SleepTestService } from './sleep-test.service';
@Component({
  selector: 'app-sleep-test',
  templateUrl: './sleep-test.component.html',
  styleUrls: ['./sleep-test.component.scss'],
  providers: [SleepTestService]
})
export class SleepTestComponent implements OnInit {

  private item: any = {};
  private sources = '';
  private customerId: string;
  private xData: Array<any> = [];
  private sleepQuality: Array<any> = [];
  private sleepFeeling: Array<any> = [];
  private sleepBlue: Array<any> = [];
  constructor(private sleepTestService: SleepTestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['userId'];
    this.getUserInfo();
    this.initEcharts();
  }

  getUserInfo() {
    this.sleepTestService.getUserInfo(this.customerId).subscribe((res) => {

      if (res.success) {
        this.item = res.data;
        if (this.item.sources) {
          this.sources = this.item.sources;
        }

      }
    });
  }

  initEcharts() {
    this.sleepTestService.getEchartsInfo(this.customerId).subscribe((res) => {
      if (res.success) {
        const echartsData = eval(res.data), sq = [], sf = [], sb = [], xd = [];
        if (echartsData.length === 0) {
          return;
        }
        console.log(res);
        for (let i = 0; i < echartsData.length; i++) {
          sq.push(parseInt(echartsData[i].psqiScore, 10));
          sf.push(parseInt(echartsData[i].gad7score, 10));
          sb.push(parseInt(echartsData[i].phq9score, 10));
          xd.push(echartsData[i].evaluationTime);
        }

        this.sleepQuality = sq;
        this.sleepFeeling = sf;
        this.sleepBlue = sb;
        this.xData = xd;
        // this.instance = this.$echarts.create(this.theme, this.initOptions, this.mediaOptions).setOption(this.getOption('睡眠质量-PSQI', '正常睡眠质量:0~4分', this.sleepQuality));
      }
    });
  }

}
