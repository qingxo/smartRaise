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
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  private loginAction:Observable<any>
  private passWord:string = ''
  private loginName:string ='sys'
  private errorMsg:string = ''
  constructor(private loginService:LoginService,private router:Router) {
  }

  ngOnInit() {
  }

  login() {
    var datas = {
      "password":md5(this.passWord),
      "userName":this.loginName
    }
    this.loginService.login(datas).subscribe(
      (data) =>{
        storage.set('state',data.data)
        if(data.success){
          this.router.navigate(['/home/client'])
        }else{
        this.errorMsg = data.errMsg
        }
      }
    )
  }


}
