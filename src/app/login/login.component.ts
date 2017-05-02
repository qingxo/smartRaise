import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Observable} from'rxjs/Rx';
import * as md5 from 'md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  private loginAction:Observable<any>
  private passWord:string = ''
  private loginName:string ='sys'
  private errorMsg:string = ''
  constructor(private loginService:LoginService) {
  }

  ngOnInit() {
    // this.loginAction =  this.loginService.login("password="+this.passWord+"&userName="+this.loginName)
  }
  login() {
    var datas = {
      "password":md5(this.passWord),
      "userName":this.loginName
    }
    console.log(this.passWord+","+this.loginName)
    this.loginService.login(datas).subscribe(
      (data) =>{
        console.log(data)
        if(data.success){

        }else{
        this.errorMsg = data.errMsg
        }
      }
    )

  }

}
