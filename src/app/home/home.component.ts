import { Component, OnInit } from '@angular/core';
import storage from '../shared/storage';
import tools from '../shared/tools'
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { HomeService } from './home.service'
import * as md5 from 'md5'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

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
  private errorOldPwd: string = ''
  private errorNewPwd: string = ''
  private oldPwd: string = ''
  private newPwd: string = ''
  private confirmNewPwd: string = ''
  private closeResult: string
  private modalRef: any
  constructor(private router: Router, private homeService: HomeService, private modalService: NgbModal) { }

  ngOnInit() {
    this.initUserInfo()
    this.initMenu()
  }

  open(content) {
    this.newPwd = ''
    this.oldPwd = ''
    this.errorNewPwd = ''
    this.errorOldPwd = ''
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' })

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  initMenu() {
    console.log(storage.get('menu'))
    if (storage.get('menu')) {
      this.menu = eval(storage.get('menu'))
      for (let i = 0; i < this.menu.length; i++) {
        for (let j = 0; j < this.menu[i].children.length; j++) {
          let p = "/" + this.menu[i].children[j].url.replace(new RegExp(/\./g), '/')
          this.menu[i].children[j].url = p
        }
      }
      console.log(this.menu)
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



  changePwd() {
    // if (this.oldPwd.trim().length < 6 || this.newPwd.trim().length < 6 ) {
    //   this.tips('密码最少要6位')
    //   return
    // }
    this.errorOldPwd = ''
    this.errorNewPwd = ''
    if (typeof this.oldPwd == 'undefined') {
      this.errorOldPwd = '请输入原密码'
    } else {
      if (this.oldPwd.length < 2) {
        this.errorOldPwd = '请输入原密码'
      }
    }

    if (typeof this.newPwd == 'undefined' || typeof this.confirmNewPwd == 'undefined') {
      this.errorNewPwd = '请输入新密码和确认密码'
    } else {
      if (this.newPwd.trim() != this.confirmNewPwd.trim()) {
        this.errorNewPwd = "新密码输入不一致"
      }
    }



    if (this.errorNewPwd != '' || this.errorOldPwd != '') {
      return
    }

    var data = {
      'oldSecret': md5(this.oldPwd),
      'secret': md5(this.newPwd),
      'userId': storage.get('state')['userId'],
    }


    this.homeService.save(data).subscribe((res) => {
      if (res.success) {
        tools.tips('修改成功！')
        this.modalRef.close()
        setTimeout(() => {
          storage.remove('state')
          storage.remove('ywLogin')
          storage.remove('menu');
          this.router.navigate(['/login'])
        }, 400)

      } else {
        tools.tips(res.errMsg, '', 'error')
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
