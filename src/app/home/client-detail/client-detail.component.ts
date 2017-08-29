import { Component, OnInit } from '@angular/core';
import { ClientDetailService } from './client-detail.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import tools from '../../shared/tools';
import storage from '../../shared/storage';


@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  providers: [ClientDetailService]
})
export class ClientDetailComponent implements OnInit {

  private userInfo: object = {
    'name': null,
    'mobile': null,
    'sex': 'F',
    'createDt': null,
    'birdthday': null,
    'commissionerUserName': null,
    'cardId': null
  };
  private userId: string;
  private sources: any = '-1';
  private equipNo: string;
  private pageSize = 10;
  private pageNumber = 1;
  private list: Array<any> = [];
  private pagination: any;
  private totalCount: any;
  constructor(public clientDetailService: ClientDetailService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.equipNo = this.route.snapshot.params['equipNo'];
    this.getUserInfo();
    this.userOrderList();
  }

  getUserInfo() {
    this.clientDetailService.getUserInfo(this.userId).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
      }
    });
  }

  userOrderList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.userId,
      'userId': storage.get('state')['userId']
    };

    this.clientDetailService.userOrderList(data).subscribe((res) => {
      if (res.success) {
        this.list = eval(res.data.list);
        this.pagination = res.data.navigatepageNums;
        this.pageNumber = res.data.pageNum;
        this.totalCount = res.data.total;
      }
    });
  }


  getAge(age) {
    return tools.getAge(age);
  }

}
