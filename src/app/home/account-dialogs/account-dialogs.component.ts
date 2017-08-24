import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { AccountDialogs } from './account-dialogs.model'
import * as moment from 'moment'
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import * as Flatpickr from 'flatpickr'
import * as zh_lang from 'flatpickr/dist/l10n/zh.js'
import { AccountDialogsService } from './account-dialogs.service'
import * as md5 from 'md5'
import tools from '../../shared/tools'
@Component({
  selector: 'app-account-dialogs',
  templateUrl: './account-dialogs.component.html',
  styleUrls: ['./account-dialogs.component.scss'],
  providers: [AccountDialogsService]
})
export class AccountDialogsComponent implements OnInit, AfterViewInit, OnChanges {
  private closeResult: string
  private modalRef: any
  private count: number = 0
  private myAccount: AccountDialogs = new AccountDialogs()
  private exampleOptions: FlatpickrOptions = {
    enableTime: false,
    static: true,
    time_24hr: true,
    dateFormat: 'Y-m-d',
    onChange: this.changeBirthday.bind(this)
  }
  private chooseRole: string = '2' //0：表示系统管理员，1:表示平台管理员，2：表示健康专员
  private name: string
  private userName: string
  private mobile: number
  private pwd: string
  private sex: string = 'F'
  private birdthday: any = ''
  private height: number
  private weight: number
  private email: string
  private address: string
  private remark: string

  private errorRealname: string = ''
  private errorUserName: string = ''
  private bothNames: string = ''
  private errorMobile: string = ''
  private errorPwd: string = ''
  private bothTwop: string = ''
  private errorHeight: string = ''
  private errorWeight: string = ''
  private bothhw: string = ''
  private errorEmail: string = ''

  private isEdit: boolean = false
  @Input() fly: number = 0
  @Input() userId: string = ''
  @Input() freezeRole: boolean = false
  @Input() showList: any
  @ViewChild('content') el: ElementRef

  constructor(private modalService: NgbModal, private accountDialogsService: AccountDialogsService) { }

  ngOnInit() {
    Flatpickr.localize(zh_lang.zh)
    moment.locale('zh-cn')
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("thechanges,", changes)
    if (this.userId != '') {
      this.initUserInfo()
    }
  }

  initUserInfo() {
    this.accountDialogsService.getUserDetail(this.userId).subscribe((res) => {
      if (res.success && res.data) {
        let info = res.data
        this.chooseRole = info.role
        this.name = info.name
        this.userName = info.userName
        this.mobile = info.mobile
        this.sex = info.sex
        this.birdthday = info.birdthday
        this.email = info.mail
        this.address = info.address
        this.remark = info.remark
      }
    })
  }

  changeBirthday(val) {
    this.birdthday = moment(new Date(val)).format('YYYY-MM-DD')
  }

  chooseRoled(val) {
    if (this.freezeRole) return
    this.chooseRole = val
  }

  sexChoosed(val) {
    this.sex = val
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.open(this.el)
      if (this.userId != '') {
        this.isEdit = true
        this.initUserInfo()
      }
    }, 10)
  }

  save() {
    this.errorRealname = ''
    this.errorMobile = ''
    this.errorUserName = ''
    this.errorPwd = ''
    this.errorEmail = ''
    this.bothNames = ''
    this.bothTwop = ''

    if (!this.name) {
      this.errorRealname = '姓名必填'
      this.bothNames = 'xxx'
    }

    if (!this.mobile) {
      this.errorMobile = '手机号必填'
      this.bothTwop = 'xxx'
    }

    if (!tools.checkMobile(this.mobile)) {
      this.errorMobile = '手机号码错误'
      this.bothTwop = "xxx"
    }

    if (!this.userName) {
      this.errorUserName = '用户名必填'
      this.bothNames = 'xxx'

    } else {
      if (/[^\a-\z\A-\Z0-9]/.test(this.userName.trim())) {
        this.errorUserName = '用户名只能输入英文和数字'
        this.bothNames = 'xxx'

      }
    }

    if (!this.isEdit) {
      if (!this.pwd) {
        this.errorPwd = '密码必填'
        this.bothTwop = 'xxx'
      }
    }

    if (!!this.email) {
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email.trim())) {
        this.errorEmail = "邮箱格式错误"
      }
    }

    if (this.errorEmail != '' || this.bothTwop != '' || this.bothNames != '' || this.errorMobile != '') {
      return
    }
    let data = {
      'name': this.name,
      'mobile': this.mobile,
      'userName': this.userName,
      'sex': this.sex,
      'birdthday': this.birdthday,
      'mail': this.email,
      'address': this.address,
      'role': this.chooseRole,
      'height': this.height,
      'weight': this.weight,
      'remark': this.remark
    }

    if (this.isEdit) {
      data['userId'] = this.userId
      this.accountDialogsService.editHealth(data).subscribe((res) => {
        if (res.success) {
          tools.tips('编辑成功')
          this.modalRef.close()
        } else {
          tools.tips(res.errMsg, '', 'error')
        }
      })
    } else {
      data['secret'] = md5(this.pwd)
      this.accountDialogsService.saveHealth(data).subscribe((res) => {
        if (res.success) {
          tools.tips('新增成功')
          this.modalRef.close()
          if (this.showList) {
            this.showList()
          }
        } else {
          tools.tips(res.errMsg, '', 'error')
        }
      })
    }

  }

  open(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-l-modal' })
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
