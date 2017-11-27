import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import * as Flatpickr from 'flatpickr';
import * as zh_lang from 'flatpickr/dist/l10n/zh.js';
import * as moment from 'moment';
import { SignManageService } from '../sign-manage/sign-manage.service';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [SignManageService, StatisticsService],
  encapsulation: ViewEncapsulation.None
})
export class StatisticsComponent implements OnInit {

  private groupList: Array<any> = [];
  private groupName = '';
  private choosedBtn = '0';
  private orgArray: Array<any> = [];
  private ageArray: Array<any> = [];
  private genderArray: Array<any> = [];
  private equipUseArray: Array<any> = [];

  private customerArray: Array<number> = [];
  private manySignArray: Array<number> = [];
  private smartBedArray: Array<number> = [];
  private equipArrays: Array<Array<number>> = [];
  private orgName: Array<string> = [];

  private orderList: Array<any> = [];
  private sleepArray: Array<number> = [];
  private slowArray: Array<number> = [];

  private totalPage = 0;
  private pageNumber = 1;
  private pages: Array<any> = [];
  private statistInfo: any = {}; // 用于统计明细信息
  private statisticsDetails: Array<any> = []; // 明细列表
  private organizationList: Array<any> = [];
  private startDate = '';
  private endDate = '';
  private startDateOptions: FlatpickrOptions = {
    enableTime: false,
    static: true,
    time_24hr: true,
    dateFormat: 'Y-m-d',
    defaultDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    locale: zh_lang['zh'],
    onChange: this.changeStartDate.bind(this),
    onClose: this.closeTime.bind(this)
  };
  private endDateOptions: FlatpickrOptions = {
    enableTime: false,
    static: true,
    time_24hr: true,
    dateFormat: 'Y-m-d',
    defaultDate: moment().format('YYYY-MM-DD'),
    locale: zh_lang['zh'],
    onChange: this.changeEndDate.bind(this),
    onClose: this.closeTime.bind(this)
  };

  constructor(private signManageService: SignManageService, private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.initGroupPlanList();
    this.showList();
  }

  toogleChoosed(val) {
    this.choosedBtn = '' + val;
    this.equipArrays = [];
    this.orderList = [];
    this.orgName = [];
    this.startDate = '';
    this.endDate = '';
    this.pageNumber = 1;
    this.showList();
  }

  pageTurning(number) {
    this.pageNumber = number;
    this.getStatisticsDetails();
  }

  changeStartDate(val) {
    this.startDate = moment(new Date(val)).format('YYYY-MM-DD');
  }
  changeEndDate(val) {
    this.endDate = moment(new Date(val)).format('YYYY-MM-DD');
  }
  closeTime(selectedDates, dateStr, instance) {
    instance.input.blur();
  }

  showList() {
    if (this.choosedBtn === '0') {
      const data = {
        socialWelfareId: this.groupName === '无机构' ? '' : this.groupName,
        flag: this.groupName === '无机构' ? '0' : ''
      };
      this.statisticsService.getCustomerList(data).subscribe((res) => {
        const arrStatistics = eval(res.statisticsInstitutionsList);
        const arrAge = eval(res.ageStatisticsList);
        const arrGender = res.genderStatistics;
        const tmp: Array<any> = [];
        const tmp2: Array<any> = [];
        const tmp3: Array<any> = [];
        for (let i = 0; i < arrStatistics.length; i++) {
          tmp.push({ value: arrStatistics[i]['customerNumber'], name: arrStatistics[i]['organizationName'] });
        }

        for (let i = 0; i < arrAge.length; i++) {
          tmp2.push({ value: arrAge[i]['customerNum'], name: arrAge[i]['ageBracket'] });
        }

        if (arrGender['manCustomerCount'] !== 0) {
          tmp3.push({ value: arrGender['manCustomerCount'], name: '男' });
        }

        if (arrGender['womanCustomerCount'] !== 0) {
          tmp3.push({ value: arrGender['womanCustomerCount'], name: '女' });
        }


        this.orgArray = tmp;
        this.ageArray = tmp2;
        this.genderArray = tmp3;

      });
    } else if (this.choosedBtn === '1') {
      // 设备使用统计
      this.statisticsService.getEquipList().subscribe((res) => {
        this.equipUseArray = eval(res);
        let customerN = 0;
        let cardSign = 0;
        let cardSignOpen = 0;
        let bedN = 0;
        let bedOutageN = 0;
        let bedUnusualN = 0;
        this.customerArray = [];
        this.manySignArray = [];
        this.smartBedArray = [];
        this.orgName = [];
        this.equipArrays = [];
        for (let i = 0; i < this.equipUseArray.length; i++) {
          customerN += this.equipUseArray[i]['customerCount'];
          cardSign += this.equipUseArray[i]['manySignsCardCount'];
          cardSignOpen += this.equipUseArray[i]['manySingCardOpenCount'];
          bedN += this.equipUseArray[i]['smartBedCount'];
          bedOutageN += this.equipUseArray[i]['smartBedOutageCount'];
          bedUnusualN += this.equipUseArray[i]['smartBedUnusualCount'];
          this.customerArray.push(this.equipUseArray[i]['customerCount']);
          this.manySignArray.push(this.equipUseArray[i]['manySignsCardCount']);
          this.smartBedArray.push(this.equipUseArray[i]['smartBedCount']);
          this.orgName.push(this.equipUseArray[i]['organizationName']);
        }
        this.equipArrays.push(this.customerArray, this.manySignArray, this.smartBedArray);

        this.equipUseArray.push({ 'organizationName': '合计', 'customerCount': customerN, 'manySignsCardCount': cardSign, 'manySingCardOpenCount': cardSignOpen, 'smartBedCount': bedN, 'smartBedUnusualCount': bedUnusualN, 'smartBedOutageCount': bedOutageN});
        this.equipArrays = Array.from(this.equipArrays);
        this.orgName = Array.from(this.orgName);

        // 默认获取第一个机构的明细信息
        this.statistInfo = this.equipUseArray[0];
        this.getStatisticsDetails();
      });

    } else if (this.choosedBtn === '2') {
      const startDate = this.startDate || moment().subtract(7, 'days').format('YYYY-MM-DD');
      const endDate = this.endDate || moment().format('YYYY-MM-DD');
      console.log(startDate, endDate);
      this.customerArray = [];
      this.manySignArray = [];
      this.smartBedArray = [];
      this.orgName = [];
      this.equipArrays = [];
      this.manySignArray = [];
      this.sleepArray = [];
      this.slowArray = [];
      this.statisticsService.getOrderList({
        startDate,
        endDate
      }).subscribe((res) => {
        this.orderList = eval(res);
        let customerN = 0;
        // let cardSign = 0;
        // let sleepN = 0;
        // let slowN = 0;
        let boundCount = 0;
        let measurementCount = 0;
        for (let i = 0; i < this.orderList.length; i++) {
          customerN += this.orderList[i]['customerCount'];
          // cardSign += this.orderList[i]['manySignsServicePackCount'];
          // sleepN += this.orderList[i]['sleepServicePacksCount'];
          // slowN += this.orderList[i]['slowDiseaseServicePacksCount'];
          boundCount += this.orderList[i]['boundCount'];
          measurementCount += this.orderList[i]['measurementCount'];
          this.orgName.push(this.orderList[i]['organizationName']);
          this.customerArray.push(this.orderList[i]['customerCount']);
          this.manySignArray.push(this.orderList[i]['manySignsServicePackCount']);
          this.sleepArray.push(this.orderList[i]['sleepServicePacksCount']);
          this.slowArray.push(this.orderList[i]['slowDiseaseServicePacksCount']);
        }
        this.orderList.push({ 'organizationName': '合计', 'customerCount': customerN, 'measurementCount': measurementCount, 'boundCount': boundCount });
        this.equipArrays.push(this.customerArray, this.manySignArray, this.sleepArray, this.slowArray);
        this.orderList = Array.from(this.orderList);
        this.equipArrays = Array.from(this.equipArrays);
        this.orgName = Array.from(this.orgName);

        // 默认获取第一个机构的明细信息
        this.statistInfo = this.orderList[0];
        this.getStatisticsDetails();
      });
    }

  }
  // 获取明细信息
  getStatisticsDetails() {
    if (!this.statistInfo.socialWelfareId) {
      return;
    }
    this.statisticsService.getStatisticsDetails({
      pageSize: 10,
      pageNum: this.pageNumber,
      socialWelfareId: this.statistInfo.socialWelfareId
    }).subscribe(res => {
      this.statisticsDetails = res.data.list;
      this.pages = res.data.navigatepageNums;
      this.totalPage = res.data.total;
      this.pageNumber = res.data.pageNum;
    });
  }
  getStatisticsDetails2(statistInfo) {
    this.statistInfo = statistInfo;
    this.pageNumber = 1;
    this.getStatisticsDetails();
  }
  // 获取机构列表
  initGroupPlanList() {
    const data = {
      'pageSize': 100,
      'pageNum': 1
    };
    this.signManageService.groupList(data).subscribe((res) => {
      if (res.success) {
        this.groupList = res.data.list;
      }
      this.groupList.unshift({ 'socialWelfareId': '', 'socialWelfareName': '请选择' });
      this.groupList.push({ 'socialWelfareId': '无机构', 'socialWelfareName': '无机构' });
    });
  }

  onChange(val) {
    this.showList();
  }

}
