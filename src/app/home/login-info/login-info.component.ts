import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginInfoService } from './login-info.service';
@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss'],
  providers: [LoginInfoService]
})
export class LoginInfoComponent implements OnInit {

  pageSize: number = 10;
  pageNumber: number = 1;
  socialWelfareId: string = '';
  orgName: string = '';
  orgCode: string = '';
  list: Array<any> = [];
  pages: Array<any> = [];
  totalPage;
  constructor(private route: ActivatedRoute, private loginInfoService: LoginInfoService) {
    this.socialWelfareId = this.route.snapshot.params['socialWelfareId'];
  }

  ngOnInit() {
    this.getList()
  }

  getList() {
    let data = {
      pageSize: this.pageSize,
      pageNum: this.pageNumber,
      socialWelfareId: this.socialWelfareId
    }
    this.loginInfoService.loginList(data).subscribe(res => {
      if (res.success) {
        this.list = res.data.list;
        this.pages = res.data.navigatepageNums;
        this.totalPage = res.data.total;
        if (this.list.length > 0) {
          this.orgCode = this.list[0]['socialWelfareCode'];
          this.orgName = this.list[0]['socialWelfareName'];
        }
      }
    })
  }

  pageTurning(num) {
    this.pageNumber = num;
    this.getList()
  }

}
