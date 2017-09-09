import { Component, OnInit } from '@angular/core';
import { SignManageService } from '../sign-manage/sign-manage.service';
import { StatisticsService } from './statistics.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [SignManageService, StatisticsService]
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

  constructor(private signManageService: SignManageService, private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.initGroupPlanList();
    this.showList();

  }

  toogleChoosed(val) {
    this.choosedBtn = '' + val;
    this.equipArrays = []
    this.orderList = []
    this.orgName = []
    this.showList();
  }

  showList() {
    if (this.choosedBtn === '0') {
      this.statisticsService.getCustomerList(this.groupName).subscribe((res) => {
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
      this.statisticsService.getEquipList().subscribe((res) => {
        this.equipUseArray = eval(res);
        let customerN = 0;
        let cardSign = 0;
        let bedN = 0;
        this.customerArray = [];
        this.manySignArray = [];
        this.smartBedArray = [];
        this.orgName = [];
        this.equipArrays = [];
        for (let i = 0; i < this.equipUseArray.length; i++) {
          customerN += this.equipUseArray[i]['customerCount'];
          cardSign += this.equipUseArray[i]['manySignsCardCount'];
          bedN += this.equipUseArray[i]['smartBedCount'];
          this.customerArray.push(this.equipUseArray[i]['customerCount']);
          this.manySignArray.push(this.equipUseArray[i]['manySignsCardCount']);
          this.smartBedArray.push(this.equipUseArray[i]['smartBedCount']);
          this.orgName.push(this.equipUseArray[i]['organizationName']);
        }
        this.equipArrays.push(this.customerArray, this.manySignArray, this.smartBedArray);

        this.equipUseArray.push({ 'organizationName': '合计', 'customerCount': customerN, 'manySignsCardCount': cardSign, 'smartBedCount': bedN });
        this.equipArrays = Array.from(this.equipArrays)
        this.orgName = Array.from(this.orgName)
      });
    } else if (this.choosedBtn === '2') {
      this.customerArray = [];
      this.manySignArray = [];
      this.smartBedArray = [];
      this.orgName = [];
      this.equipArrays = [];
      this.manySignArray = [];
      this.sleepArray = [];
      this.slowArray = [];
      this.statisticsService.getOrderList().subscribe((res) => {
        this.orderList = eval(res);
        let customerN = 0;
        let cardSign = 0;
        let sleepN = 0;
        let slowN = 0;
        for (let i = 0; i < this.orderList.length; i++) {
          customerN += this.orderList[i]['customerCount'];
          cardSign += this.orderList[i]['manySignsServicePackCount'];
          sleepN += this.orderList[i]['sleepServicePacksCount'];
          slowN += this.orderList[i]['slowDiseaseServicePacksCount'];
          this.orgName.push(this.orderList[i]['organizationName']);
          this.customerArray.push(this.orderList[i]['customerCount']);
          this.manySignArray.push(this.orderList[i]['manySignsServicePackCount']);
          this.sleepArray.push(this.orderList[i]['sleepServicePacksCount']);
          this.slowArray.push(this.orderList[i]['slowDiseaseServicePacksCount']);
        }
        this.orderList.push({ 'organizationName': '合计', 'customerCount': customerN, 'manySignsServicePackCount': cardSign, 'sleepServicePacksCount': sleepN, 'slowDiseaseServicePacksCount': slowN });
        this.equipArrays.push(this.customerArray, this.manySignArray, this.sleepArray, this.slowArray);
        this.orderList = Array.from(this.orderList)
        this.equipArrays = Array.from(this.equipArrays)
        this.orgName = Array.from(this.orgName)
      });
    }

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
    });
  }

  onChange(val) {
    this.showList();
  }

}
