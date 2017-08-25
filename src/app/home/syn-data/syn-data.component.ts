import { Component, OnInit } from '@angular/core';
import storage from '../../shared/storage';
import tools from '../../shared/tools';
import { SynDataService } from './syn-data.service';
@Component({
  selector: 'app-syn-data',
  templateUrl: './syn-data.component.html',
  styleUrls: ['./syn-data.component.scss'],
  providers: [SynDataService]
})
export class SynDataComponent implements OnInit {

  private pageSize = 10;
  private pages: Array<any> = [];
  private pageNumber = 1;
  private taskProgress = 0;
  private list: Array<any> = [];
  private missionList: Array<any> = [];
  constructor(private synDataService: SynDataService) { }

  ngOnInit() {
    this.showList();
  }

  synData() {
    tools.loading(true);
    this.synDataService.synTask().subscribe((res) => {
      if (res.success) {
        tools.tips('同步成功', '', 'success');
        this.showList();
        tools.loading(false);
      } else {
        tools.tips(res.data.errMsg, '', 'error');
        tools.loading(false);
      }
    });
  }



  showList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'userId': storage.get('state')['userId'],
      'sendheleFlag': 0  // 0表示客户查询
    };
    if (this.taskProgress == 0) {
      this.synDataService.clientProblemList(data).subscribe((res) => {
        if (res.success) {
          this.list = res.data.list;
          this.pages = res.data.navigatepageNums;
          this.pageNumber = res.data.pageNum;
        } else {
          tools.tips(res.errMsg, '', 'error');
        }

      });
    } else {
      this.synDataService.healthProblemList(data).subscribe((res) => {
        if (res.success) {
          this.missionList = res.data.list;
          this.pageNumber = res.data.pageNum;
          this.pages = res.data.navigatepageNums;
        } else {
          tools.tips(res.errMsg, '', 'error');
        }

      });
    }
  }

  pageTurning(number) {
    this.pageNumber = 1;
    this.taskProgress = parseInt(number);
    this.showList();
  }

  getAge(ageNum) {
    return tools.getAge(ageNum);
  }

}
