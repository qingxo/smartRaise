import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasureDetailService } from './measure-detail.service';
@Component({
  selector: 'app-measure-detail',
  templateUrl: './measure-detail.component.html',
  styleUrls: ['./measure-detail.component.scss'],
  providers: [MeasureDetailService]
})
export class MeasureDetailComponent implements OnInit {

  list: Array<any> = [];
  socialWelfareId: string = '';
  currentOrg: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  pages: Array<any> = [];
  totalPage: number = 0;
  measureItem: string = '';
  measureTime: string = '3'
  searchList: Array<any> = [{ name: '全部', sign: '' },
  { name: '血氧', sign: 'spo2' }, { name: '血压', sign: 'bp' },
  { name: '血糖', sign: 'bg' }, { name: '体脂', sign: 'bf' },
  { name: '体温', sign: 'temp' }, { name: '心率', sign: 'pulse' }]
  se
  constructor(public measureDetailService: MeasureDetailService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.socialWelfareId = this.route.snapshot.params['socialWelfareId'];
    this.currentOrg = this.route.snapshot.params['socialWelfareName'];
    this.getServerList()
  }

  startSearch(e) {
    this.getServerList()
  }

  pageTurning(number) {
    this.pageNumber = number;
    this.getServerList()
  }

  getServerList() {
    let data = {
      socialWelfareId: this.socialWelfareId,
      page: this.pageNumber,
      pageRecorders: this.pageSize,
      signType: this.measureItem,
      timeType: this.measureTime
    }
    // if (this.measureItem === 'pp') {
    //   data['signType'] = '';
    //   data['pulse'] = '1'
    // } else {
    //   delete data['pulse']
    // }
    this.measureDetailService.getList(data).subscribe(res => {
      if (res.success) {
        this.list = []
        if (res.data.list) {
          this.list = res.data.list;
        }
        this.pages = res.data.navigatepageNums;
        this.totalPage = res.data.total;
      }
    })
  }

}
