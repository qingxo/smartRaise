import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from './client.service';
import storage from '../../shared/storage'
import tools from '../../shared/tools'
import SysData from '../../shared/sysData'
import * as $ from 'jquery'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [ClientService]
})
export class ClientComponent implements OnInit {

  private clientHead: string[] = []
  private operate: string = '操作'
  private listData: Array<any> = []
  private listName: Array<any> = []
  private pages: Array<any> = []
  private pageSize: number = 10
  private pageNumber: number = 1
  private queryInfo: string = ''
  private totalPage: number
  private clientBtn = []
  private closeResult: string
  private modalRef: any
  private itemTarget: number = 0 //用户点击的列的值
  private smartBed: string
  private sources: string = 'A' //智能床默认值
  private healthpersonlist: Array<any> = [] //健康专员列表
  private healthCarePerson: string //用户默认的健康专员
  private role: number
  private bedType: Array<any> = [
    {
      'name': '智能床A',
      'value': 'A'
    }, {
      'name': '智能床B',
      'value': 'B'
    }
  ]
  private realname = ''
  private mobile = null
  private sex = ''
  private userName = ''
  private weight = ''
  private height = ''
  private email = ''
  private address = ''
  private remark = ''
  private birdthday = ''
  private relationShip = ''
  private cardId = ''
  private checkList = []
  private myGroup = ''
  private isEdit: boolean = false
  private commissionerUserId: string
  private group: Array<any> //监护人列表
  private helpList: Array<any>
  private queryHelpInfo: string

  private errorRealname = ""
  private errorCardId = ""
  private errorMobile = ""
  private errorHeight = ""
  private errorWeight = ""
  private bothhw = ""
  private bothNumber = ""
  constructor(private clientService: ClientService, private modalService: NgbModal) { }

  ngOnInit() {
    this.role = storage.get('state')['role']
    this.initBtnShow()
    this.initAsyc()
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' })

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openHealth(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-sm-modal' })

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openClientDetail(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-l-modal' })

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  sexChoosed(val) {
    this.sex = val
  }

  clientActive(index, clientDetail) {
    this.itemTarget = index
    this.clearInfo()
    if (index == -1) {
      this.isEdit = false
    } else {
      this.isEdit = true
      this.initEditData()
    }
    this.initHelpList()
    this.initGroupList()
    this.openClientDetail(clientDetail)
  }

  initGroupList() {
    let data = {
      'pageSize': 100,
      'pageNum': 1
    }
    this.clientService.groupList(data).subscribe((res) => {
      if (res.success) {
        this.group = []
        this.group = res.data.list
        this.group.unshift({ 'socialWelfareId': '', 'socialWelfareName': '请选择' })
      }
    })
  }

  initEditData() {
    let customerId = this.listData[this.itemTarget].customerId
    this.clientService.personInfo(customerId).subscribe((res) => {
      if (res.success) {
        let info = res.data
        this.realname = info.name
        this.mobile = parseInt(info.mobile)
        this.sex = info.sex
        this.userName = info.userName
        this.weight = info.weight
        this.height = info.height
        this.email = info.mail
        this.address = info.address
        this.remark = info.remark
        this.birdthday = info.birdthday
        this.relationShip = info.relationToCustomer
        // this.imageUrl = info.imgUrl
        if (info.socialWelfareId) {
          this.myGroup = info.socialWelfareId
        } else {
          this.myGroup = ''
        }
        if (info.cardId) {
          this.cardId = info.cardId
        }

        if (info.commissionerUserId) {
          this.commissionerUserId = info.commissionerUserId
        }

        this.initGuardians(info.guardians)
      }
    })
  }

  initGuardians(array) {
    this.checkList = []
    for (var i = 0; i < array.length; i++) {
      this.checkList.push({ "name": array[i].name, "mobile": array[i].mobile, "id": array[i].customerId })
    }
  }

  initHelpList() {
    let data = {
      'pageSize': 100,
      'pageNum': 1,
      'query': this.queryHelpInfo
    }
    data['userId'] = storage.get('state')['userId']
    this.clientService.clientList(data).subscribe((res) => {
      if (res.success) {
        this.helpList = res.data.list
        this.expceptSelf()
      }
    })
  }

  expceptSelf() {
    for (var i = 0; i < this.helpList.length; i++) {
      if (this.itemTarget != -1) {
        if (this.helpList[i].customerId == this.listData[this.itemTarget].customerId) {
          this.helpList.splice(i, 1)
        }
      }

    }
    this.initCheckBox()
  }

  initCheckBox() {
    for (var i = 0; i < this.helpList.length; i++) {
      this.helpList[i].isChecked = false
    }
    for (var i = 0; i < this.checkList.length; i++) {
      var tmp = this.checkList[i].id
      for (var j = 0; j < this.helpList.length; j++) {
        if (tmp == this.helpList[j].customerId) {
          this.helpList[j].isChecked = true
        }
      }
    }
  }

  changeState(flag, num) {
    if (flag) {
      this.checkList.push({ 'name': this.helpList[num].name, 'mobile': this.helpList[num].mobile, 'id': this.helpList[num].customerId })
    } else {
      for (var i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i].id == this.helpList[num].customerId) {
          this.checkList.splice(i, 1)
        }
      }
    }
  }

  killCheckListNum(id) {
    for (var i = 0; i < this.checkList.length; i++) {
      if (this.checkList[i].id == id) {
        this.checkList.splice(i, 1)
        for (var i = 0; i < this.helpList.length; i++) {
          if (this.helpList[i].customerId == id) {
            this.helpList[i].isChecked = false
            return
          }
        }
      }
    }
  }




  clearInfo() {
    this.realname = ''
    this.mobile = null
    this.sex = 'F'
    this.userName = ''
    this.weight = ''
    this.height = ''
    this.email = ''
    this.address = ''
    this.remark = ''
    this.birdthday = ''
    this.relationShip = ''
    this.cardId = ''
    this.checkList = []
    this.myGroup = ''
  }

  healthCareOpen(index, content) {
    this.itemTarget = index
    this.openHealth(content)
    this.initHealthCarePerson()
  }

  initHealthCarePerson() {
    this.clientService.healthList('?pageSize=20&pageNum=1&role=2').subscribe((res) => {
      if (res.success) {
        this.healthpersonlist = res.data.list
        if (!this.listData[this.itemTarget].commissionerUserId) {
          this.healthCarePerson = res.data.result[0].userId
        } else {
          this.healthCarePerson = this.listData[this.itemTarget].commissionerUserId
        }

      }
    })
  }

  saveHealthCare() {
    let data = {
      'customerId': this.listData[this.itemTarget].customerId,
      'commissionerUserId': this.healthCarePerson
    }
    this.clientService.saveHealthPerson(data).subscribe((res) => {
      if (res.success) {
        tools.tips('分配专员成功')
        this.modalRef.close()
        this.listData[this.itemTarget].commissionerUserId = this.healthCarePerson
        for (var i = 0; i < this.healthpersonlist.length; i++) {
          if (this.healthpersonlist[i].userId == this.healthCarePerson) {
            this.listData[this.itemTarget].commissionerUserName = this.healthpersonlist[i].name
          }
        }
      } else {
        tools.tips('错误', '', 'error')
      }
    })
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

  bindSmartBedConfirm(index, content) {
    this.itemTarget = index
    this.smartBed = ''
    this.sources = 'A'
    this.open(content)
  }

  cancelSmartBed(index) {
    console.log(index)
    this.itemTarget = index
    tools.tipsConfirm('确认解除绑定?', '', 'info', this.unBinding.bind(this))
  }


  unBinding() {
    let customerId = this.listData[this.itemTarget].customerId,
      equipId = this.listData[this.itemTarget].equipmentNo,
      bedSources = this.listData[this.itemTarget].sources
    let data = '?customerId=' + customerId + '&equipmentNo=' + equipId + '&sources=' + bedSources

    this.clientService.unbind(data).subscribe((res) => {
      if (res.success) {
        tools.tips("解绑成功", '', 'success')
        this.listData[this.itemTarget].equipmentNo = ''
      } else {
        tools.tips(res.data.errormsg, '', 'error')
      }
    })
  }

  reBunding() {
    if (!this.smartBed) {
      return
    }

    let data = {
      'customerId': this.listData[this.itemTarget].customerId,
      'mobile': this.listData[this.itemTarget].mobile,
      'name': this.listData[this.itemTarget].name,
      'equipmentNo': this.smartBed,
      'sources': this.sources
    }

    this.clientService.reBunding(data).subscribe((res) => {
      if (!res)
        return
      if (res.code === 200) {
        tools.tips('强制绑定成功')
        this.modalRef.close()

        this.initAsyc()
      } else {
        tools.tips(res.errormsg)
      }
    })
  }


  saveSmartBed() {
    if (!this.smartBed) {
      return
    }

    var data = {
      'customerId': this.listData[this.itemTarget].customerId,
      'mobile': this.listData[this.itemTarget].mobile,
      'name': this.listData[this.itemTarget].name,
      'sources': this.sources,
      'equipmentNo': this.smartBed
    }
    this.clientService.save(data).subscribe((res) => {

      if (res.code === 200) {
        tools.tips('成功', '', 'success')
        this.listData[this.itemTarget].equipmentNo = this.smartBed
        this.listData[this.itemTarget].sources = this.sources
        this.modalRef.close()
      } else if (res.code === 404) {
        tools.tips(res.errormsg, '', 'error')
      } else {
        tools.tipsConfirm(res.errormsg, '', 'warning', this.reBunding.bind(this))

      }
    })
  }


  initBtnShow() {
    this.clientBtn = tools.initBtnShow(0, 0, 'clientBtn')
  }

  initAsyc() {
    let data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo,
      'userId': storage.get('state')['userId']
    }
    this.clientService.clientList(data).subscribe(
      (res) => {
        this.listData = res.data.list
        this.pages = res.data.navigatepageNums
        this.totalPage = res.data.total
      }
    )
  }

  getAge(age) {
    return tools.getAge(age)
  }

  initData() {
    this.clientHead = ['编号', '客户姓名', '手机号码', '意见']
    this.listName = ['mobile', 'commissionerUserName', 'name', 'openId']
  }

  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo
    this.pageNumber = 1
    this.initAsyc()
  }

  pageTurning(number) {
    this.pageNumber = number
    this.initAsyc()
  }

  showHelpPanel() {
    $(".find").toggle()
    this.initCheckBox()
  }

  saveClientAddOrEdit() {
    this.errorRealname = ""
    this.errorCardId = ""
    this.errorMobile = ""
    this.errorHeight = ""
    this.errorWeight = ""
    this.bothhw = ""
    this.bothNumber = ""
    let tmpIds = ''
    for (var i = 0; i < this.checkList.length; i++) {
      tmpIds += (this.checkList[i].id + ',')
    }
    tmpIds = tmpIds.substr(0, tmpIds.length - 1)

    var data = {
      'commissionerUserId': storage.get('state')['userId'],
      'name': this.realname,
      'mobile': this.mobile,
      'sex': this.sex,
      'birdthday': this.birdthday,
      'height': this.height,
      'weight': this.weight,
      'address': this.address,
      'role': this.role,
      // 'imgUrl': this.imageUrl,
      'cardId': this.cardId,
      'socialWelfareId': this.myGroup,
      'guardianIds': tmpIds
    }

    if (this.realname.trim().length < 1) {
      this.errorRealname = "请输入姓名"
    } else if (this.realname.trim().length > 30) {
      this.errorRealname = "名字的长度不能超过30个字符"
    }

    if (this.mobile != null) {
      if (isNaN(this.mobile)) {
        this.errorMobile = ''
        this.bothNumber = ""
      } else if (!tools.checkMobile(this.mobile)) {
        this.errorMobile = '手机号码格式错误'
        this.bothNumber = "xxxx"
      }
    } else {
      this.errorMobile = ''
      this.bothNumber = ""

    }

    if (this.cardId.length != 0) {
      var flag = tools.isCardID(this.cardId)
      if (typeof flag !== 'boolean') {
        this.errorCardId = flag
        this.bothNumber = 'xxxxx'
      }
    }

    if (typeof this.height != 'undefined') {
      if (parseInt(this.height) < 50 || parseInt(this.height) > 250) {
        this.errorHeight = '身高的取值范围在50~250之间'
        this.bothhw = 'xxx'
      }
    }

    if (typeof this.weight != 'undefined') {
      if (parseInt(this.weight) < 1 || parseInt(this.weight) > 300) {
        this.errorWeight = '体重的取值范围在1~300之间'
        this.bothhw = 'xxx'
      }
    }

    if (this.bothhw != "" || this.errorCardId != "" || this.errorRealname != "" || this.errorMobile != '') {
      return
    }

    if (this.isEdit) {
      if (isNaN(data.mobile)) {
        delete data.mobile
      }
      data['customerId'] = this.listData[this.itemTarget].customerId
      this.clientService.editClient(data).subscribe((res) => {
        if (res.success) {
          tools.tips('编辑成功')
          this.modalRef.close()
          this.initAsyc()
        } else {
          tools.tips(res.errMsg, '', 'error')
        }
      })
    } else {
      this.clientService.addClient(data).subscribe((res) => {
        if (res.success) {
          tools.tips('新增成功')
          this.modalRef.close()
          this.initAsyc()
        } else {
          tools.tips(res.errMsg, '', 'error')
        }
      })
    }
  }

}
