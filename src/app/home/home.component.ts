import { Component, OnInit, OnChanges, SimpleChange, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import storage from '../shared/storage';
import tools from '../shared/tools';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { HomeService } from './home.service';
import * as md5 from 'md5';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountDialogsComponent } from './account-dialogs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  toggleLogOutFlag = true;
  userName: any = '';
  userNameState: string;
  icon: any = '';
  menu: Array<any>;
  errorOldPwd = '';
  errorNewPwd = '';
  oldPwd = '';
  newPwd = '';
  confirmNewPwd = '';
  closeResult: string;
  modalRef: any;
  constructor(private router: Router, private homeService: HomeService, private modalService: NgbModal, private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.initUserInfo();
    this.initMenu();
  }

  openModal() {
    const ownRole = storage.get('state')['role'];
    const userId = storage.get('state')['userId'];
    const componentFatory = this.componentFactoryResolver.resolveComponentFactory(AccountDialogsComponent);
    const containerRef = this.viewContainerRef;
    containerRef.clear();
    const dd = <AccountDialogsComponent>containerRef.createComponent(componentFatory).instance;
    dd.userId = userId;
    dd.freezeRole = true;
  }

  open(content) {
    this.newPwd = '';
    this.oldPwd = '';
    this.errorNewPwd = '';
    this.errorOldPwd = '';
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' });

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
    if (storage.get('menu')) {
      this.menu = eval(storage.get('menu'));
      for (let i = 0; i < this.menu.length; i++) {
        for (let j = 0; j < this.menu[i].children.length; j++) {
          const p = '/' + this.menu[i].children[j].url.replace(new RegExp(/\./g), '/');
          this.menu[i].children[j].url = p;
        }
      }
      return;
    }
    const role = parseInt(storage.get('state')['role'], 10) + 1;
    this.homeService.getMenuList(role).subscribe((res) => {
      if (res.success) {
        this.menu = res.data;
        storage.set('menu', res.data);
        for (let i = 0; i < this.menu.length; i++) {
          for (let j = 0; j < this.menu[i].children.length; j++) {
            const p = '/' + this.menu[i].children[j].url.replace(new RegExp(/\./g), '/');
            this.menu[i].children[j].url = p;
          }
        }
      }
    });
  }


  logOut() {
    storage.remove('state');
    storage.remove('menu');
    this.router.navigate(['/login']);
    this.homeService.logout().subscribe((res) => {
      if (res.success) {
        storage.remove('state');
        storage.remove('menu');
        this.router.navigate(['/login']);
      }
    });
  }



  changePwd() {
    this.errorOldPwd = '';
    this.errorNewPwd = '';
    if (typeof this.oldPwd === 'undefined') {
      this.errorOldPwd = '请输入原密码';
    } else {
      if (this.oldPwd.length < 2) {
        this.errorOldPwd = '请输入原密码';
      }
    }

    if (typeof this.newPwd === 'undefined' || typeof this.confirmNewPwd === 'undefined') {
      this.errorNewPwd = '请输入新密码和确认密码';
    } else {
      if (this.newPwd.trim() !== this.confirmNewPwd.trim()) {
        this.errorNewPwd = '新密码输入不一致';
      }
    }



    if (this.errorNewPwd !== '' || this.errorOldPwd !== '') {
      return;
    }

    const data = {
      'oldSecret': md5(this.oldPwd),
      'secret': md5(this.newPwd),
      'userId': storage.get('state')['userId'],
    };


    this.homeService.save(data).subscribe((res) => {
      if (res.success) {
        tools.tips('修改成功！');
        this.modalRef.close();
        setTimeout(() => {
          storage.remove('state');
          storage.remove('ywLogin');
          storage.remove('menu');
          this.router.navigate(['/login']);
        }, 400);

      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }



  initUserInfo() {
    this.userNameState = storage.get('state')['userName'];
    this.icon = storage.get('state')['icon'];

  }


  toogleUserInfo() {
    this.toggleLogOutFlag = !this.toggleLogOutFlag;
  }

  toggleMenu(e) {
    const el = e.target;
    const foldFlag = $(el).siblings('ul').hasClass('menuShow');
    if (foldFlag) {
      $(el).siblings('ul').removeClass('menuShow');
    } else {
      $(el).siblings('ul').addClass('menuShow');
    }
    this.closeUserInfo();
  }

  closeUserInfo() {
    this.toggleLogOutFlag = true;
  }

}
