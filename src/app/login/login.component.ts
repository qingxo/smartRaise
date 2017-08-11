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
  private loginName: string = ''
  private errorMsg: string = ''
  private loginErr: boolean
  private role: number
  private rememberPWD: boolean
  private loginFlag: boolean = true
  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    if (storage.get('ywLogin')) {
      this.rememberPWD = true
      this.loginName = storage.get('ywLogin')['userName']
      this.passWord = window.atob(storage.get('ywLogin')['password'])
      this.loginFlag = false
    }
  }

  loginConfirm(e) {
    if (e.keyCode == 13) {
      this.loginHandler()
    }
  }

  rememberChange() {
    this.rememberPWD = !this.rememberPWD
  }

  styleChange() {
    if (this.passWord.length > 0 && this.loginName.length > 0) {
      this.loginFlag = false
    } else {
      this.loginFlag = true
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
        this.role = parseInt(storage.get('state')['role'])
        if (data.success) {
          this.initMenu()
        } else {
          this.errorMsg = data.errMsg
          this.loginErr = true
        }
      }
      )
  }

  initMenu() {
    let numId = this.role + 1
    this.loginService.getMenuList(numId).subscribe((res) => {
      if (res.success) {
        storage.set('menu', res.data)
        let menu = eval(res.data)
        this.router.navigate(["/" + menu[0].children[0].url.replace(new RegExp(/\./g), '/')])
      }
    })
  }
}
