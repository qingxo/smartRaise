import { Component, OnInit } from '@angular/core';
import storage from '../../shared/storage'
import tools from '../../shared/tools'
import { JurisdictionService } from './jurisdiction.service'
import * as $ from 'jquery'
@Component({
  selector: 'app-jurisdiction',
  templateUrl: './jurisdiction.component.html',
  styleUrls: ['./jurisdiction.component.scss'],
  providers: [JurisdictionService]
})
export class JurisdictionComponent implements OnInit {

  private roles: Array<any> = []
  private rolesName: Array<string> = []
  private checkedRole: number = 1
  private tree: Array<any> = []
  private checkedItem: string = ''

  constructor(private jurisdictionService: JurisdictionService) { }

  ngOnInit() {
    this.getRoleBtn()
    this.getRealTree()
  }

  changeRole(num) {
    this.checkedRole = parseInt(num) + 1
    this.getRealTree()
  }

  toogleLevel(e) {
    $(e.target).parent().nextAll().toggle()
  }

  changeCheckBox(item, index) {
    console.log(item, index, item.checked)
    item.checked = !item.checked
    if (item.children) {
      for (var i = 0; i < item.children.length; i++) {
        let itemSub = item.children[i].children
        if (itemSub) {
          for (var j = 0; j < itemSub.length; j++) {
            itemSub[j].checked = item.checked
          }
        }
        item.children[i].checked = item.checked
      }
    }
  }

  getCheckedItem(item) {
    for (var i = 0; i < item.length; i++) {
      if (item[i].checked) {
        this.checkedItem += (item[i].nodeNumer + ',')
      }
      if (item[i].children) {
        this.getCheckedItem(item[i].children)
      }
    }
  }


  getRealTree() {
    tools.loading(true)
    this.jurisdictionService.getTree(this.checkedRole).subscribe((res) => {
      if (res.success) {
        this.tree = res.data
      }
      tools.loading(false)

    })
  }

  getRoleBtn() {
    tools.loading(true)
    this.jurisdictionService.getRoleList().subscribe((res) => {
      if (res.success) {
        this.roles = res.data
        for (let i = 0; i < this.roles.length; i++) {
          this.rolesName[i] = this.roles[i].roleName
        }
      }
      tools.loading(false)
    })
  }

  save() {
    this.getCheckedItem(this.tree)

    this.jurisdictionService.setRolePrivilege(this.checkedItem, this.checkedRole).subscribe((res) => {
      if (res.success) {
        tools.tips("保存成功")
      } else {
        tools.tips(res.errMsg, '', 'error')
      }
    })
  }

}
