import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Observable} from'rxjs/Rx';
import {Router} from '@angular/router';
import * as md5 from 'md5';
import storage from '../shared/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  private loginAction: Observable<any>
  private passWord: string = ''
  private loginName: string = 'sys'
  private errorMsg: string = ''
  private loginErr: boolean
  private role: number
  private rememberPWD: boolean
  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

  loginConfirm(e) {
    if (e.keyCode == 13) {
      this.loginHandler()
    }
  }

  loginHandler() {
    console.log("click")
    if (!this.passWord && !this.loginName) {
      this.loginErr = true
      this.errorMsg = '请输入用户名和密码'
      return
    }

    if (!this.loginName) {
      this.loginErr = true
      this.errorMsg = '请输入用户名'
      return
    }
    if (!this.passWord) {
      this.loginErr = true
      this.errorMsg = '请输入密码'
      return
    }

    if (this.rememberPWD) {
      let data = { 'userName': this.loginName, 'password': window.btoa(this.passWord) }
      storage.set('ywLogin', data)
    } else {
      storage.remove('ywLogin')
    }

    var loginParam = 'userName=' + this.loginName + '&password=' + md5(this.passWord)

    this.loginService.login(loginParam)
      .subscribe(
      (data) => {
        storage.set('state', data.data)
        if (data.success) {
          this.router.navigate(['/home/client'])
        } else {
          this.errorMsg = data.errMsg
          this.loginErr = true
        }
      }
      )

  }
}
