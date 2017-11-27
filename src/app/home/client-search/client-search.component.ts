import { Component, OnInit } from '@angular/core';
import { ClientSearchService } from './client-search.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss'],
  providers: [ClientSearchService]
})
export class ClientSearchComponent implements OnInit {

  list: Array<any> = [];
  currentClientNumber: number;
  totalClientNumber: number;
  leaveClientNumber: number;
  currentOrg: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  socialWelfareId: string = '';
  pages: Array<any> = [];
  totalPage: number = 0;
  constructor(public clientSearchService: ClientSearchService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.socialWelfareId = this.route.snapshot.params['socialWelfareId'];
    this.currentOrg = this.route.snapshot.params['socialWelfareName'];
    this.getServerList();
    this.getCurrentCount();
  }

  getCurrentCount() {
    let data = {
      socialWelfareId: this.socialWelfareId,
      pageNum: this.pageNumber,
      pageSize: this.pageSize
    }
    this.clientSearchService.getCount(data).subscribe(res => {
      if (res.success) {
        this.currentClientNumber = res.data.nowCustomer
        this.totalClientNumber = res.data.allCustomer;
        this.leaveClientNumber = res.data.departureCustomer;
      }
    })

  }
  getServerList() {
    let data = {
      socialWelfareId: this.socialWelfareId,
      pageNum: this.pageNumber,
      pageSize: this.pageSize
    }
    this.clientSearchService.getList(data).subscribe(res => {
      if (res.success) {
        this.list = res.data.list;
        this.pages = res.data.navigatepageNums;
        this.totalPage = res.data.total;
      }
    })
  }

  pageTurning(number) {
    this.pageNumber = number;
    this.getServerList();
  }


}
