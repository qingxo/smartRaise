import { Component, OnInit } from '@angular/core';
import { SignManageService } from '../sign-manage/sign-manage.service'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [SignManageService]
})
export class StatisticsComponent implements OnInit {

  private groupList: Array<any> = []
  private groupName: string = ''
  constructor(private signManageService: SignManageService) { }

  ngOnInit() {
    this.initGroupPlanList()
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
      this.groupList.unshift({ 'socialWelfareId': '-1', 'socialWelfareName': '请选择' })
      this.groupName = this.groupList[0].socialWelfareId;
    });
  }

  onChange(val) {
    console.log(val, this.groupName)
  }

}
