import { Component, OnInit } from '@angular/core';
import storage from '../shared/storage';
import {Router} from '@angular/router';
import * as $ from 'jquery'
import {HomeService} from './home.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  private toggleLogOutFlag: boolean = true;
  private userName: any = '';
  private userNameState: string
  private icon: any = '';
  private menu: Array<any>
  constructor(private router: Router, private homeService: HomeService) { }

  ngOnInit() {
    this.initUserInfo()
    this.initMenu()
  }

  initMenu() {
    if (storage.get('menu')) {
      this.menu = eval(storage.get('menu'))
      for (let i = 0; i < this.menu.length; i++) {
        for (let j = 0; j < this.menu[i].children.length; j++) {
          let p = "/" + this.menu[i].children[j].url.replace(new RegExp(/\./g), '/')
          this.menu[i].children[j].url = p
        }
      }
      return
    }
    let role = parseInt(storage.get('state')['role']) + 1
    this.homeService.getMenuList(role).subscribe((res) => {
      if (res.success) {
        this.menu = res.data
        storage.set('menu', res.data)
      }
    })
  }


  logOut() {
    this.homeService.logout().subscribe((res) => {
      console.log(res)
      if (res.success) {
        storage.remove('state');
        storage.remove('menu');
        this.router.navigate(['/login'])
      }
    })
  }

  initUserInfo() {
    this.userNameState = storage.get('state')['userName'];
    this.icon = storage.get('state')['icon'];

  }


  toogleUserInfo() {
    this.toggleLogOutFlag = !this.toggleLogOutFlag
  }

  toggleMenu(e) {
    const el = e.target
    var foldFlag = $(el).siblings('ul').hasClass('menuShow')
    if (foldFlag) {
      $(el).siblings('ul').removeClass('menuShow')
    } else {
      $(el).siblings('ul').addClass('menuShow')
    }
    this.closeUserInfo()
  }

  closeUserInfo() {
    this.toggleLogOutFlag = true
  }

}
