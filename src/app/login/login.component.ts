import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Observable} from'rxjs/Rx';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  private loginAction:Observable<any>
  constructor(private loginService:LoginService) {
  }

  ngOnInit() {
    this.loginAction =  this.loginService.login('test')
  }
  login() {
    console.log("haha")
    this.loginAction.subscribe(
      (data) =>{
        console.log(data)
      }
    )

  }

}
