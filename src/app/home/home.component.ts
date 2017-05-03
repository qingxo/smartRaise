import { Component, OnInit } from '@angular/core';
import storage from '../shared/storage';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private toggleLogOutFlag:boolean = true;
  private userName:any = '';
  private icon:any = '';

  constructor(private router:Router) { }

  ngOnInit() {
    this.initUserInfo()
  }


    logOut() {
      storage.remove('state');
      this.router.navigate(['/login'])
    }

  initUserInfo() {
    this.userName = storage.get('state')['userName'];
    this.icon = storage.get('state')['icon'];

  }


  toogleUserInfo() {
    this.toggleLogOutFlag = !this.toggleLogOutFlag
  }

}
