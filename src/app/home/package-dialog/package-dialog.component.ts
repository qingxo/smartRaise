import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { PackageDialogService } from './package-dialog.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import tools from '../../shared/tools';
import storage from '../../shared/storage';
@Component({
  selector: 'app-package-dialog',
  templateUrl: './package-dialog.component.html',
  styleUrls: ['./package-dialog.component.scss'],
  providers: [PackageDialogService]
})
export class PackageDialogComponent implements OnInit, AfterViewInit {

  private closeResult: string;
  private modalRef: any;
  private servicePackName = '';
  private sources = false;
  private imageSrc = '';
  private remark = '';
  private currentPrice: number;
  private oldPrice: number;
  private tasks: Array<any> = [];
  private taskName: Array<any> = [];
  private taskTimes: Array<any> = [
    {
      'name': '一次性任务',
      'value': 0
    }, {
      'name': '周期性任务',
      'value': 1
    }
  ];
  private taskCount: Array<any> = [
    {
      'name': '天',
      'value': 0
    }, {
      'name': '周',
      'value': 1
    }, {
      'name': '月',
      'value': 2
    }, {
      'name': '季',
      'value': 3
    }, {
      'name': '半年',
      'value': 4
    }, {
      'name': '年',
      'value': 5
    }
  ];
  private role = '';
  private isEdit = false;

  private bothprice = '';
  private errorServicePackName = '';
  private errorImg = '';
  private errorTasks = '';
  private errorRemark = '';
  private errorOldPrice = '';
  private errorCurrentPrice = '';

  @Input() packageId = '';
  @Input() showList: any;
  @ViewChild('content') el: ElementRef;

  constructor(private packageDialogService: PackageDialogService, private modalService: NgbModal) { }

  ngOnInit() {
    this.initTaskName();
    this.role = storage.get('state')['role'];

  }

  timeChoosed(num, index) {
    this.tasks[index]['times'] = num;
  }

  addTasks() {
    this.tasks.push({ 'missionName': '建档', 'times': 0, 'count': '天' });
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
  }

  imageUploadDone(val) {
    this.imageSrc = val;
  }



  priceDesc(price, num) {
    if (num == 1) {
      if (this.currentPrice > 0) {
        this.currentPrice = this.currentPrice - 1;
      } else {
        this.currentPrice = 0;
      }
    } else {
      if (this.oldPrice > 0) {
        this.oldPrice = this.oldPrice - 1;
      } else {
        this.oldPrice = 0;
      }
    }
  }

  pricePlus(price, num) {
    if (num == 1) {
      if (this.currentPrice >= 0) {
        this.currentPrice = this.currentPrice + 1;
      } else {
        this.currentPrice = 0;
      }
    } else {
      if (this.oldPrice >= 0) {
        this.oldPrice = this.oldPrice + 1;
      } else {
        this.oldPrice = 0;
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.open(this.el);
      if (this.packageId != '') {
        this.isEdit = true;
        this.initItemData();
      }
    }, 10);
  }

  initItemData() {
    this.packageDialogService.packageInfo(this.packageId).subscribe((res) => {
      if (res.success) {
        const info = res.data;
        this.servicePackName = info.servicePackName;
        this.imageSrc = info.servicePackImg;
        this.oldPrice = info.priceOld;
        this.currentPrice = info.priceNew;
        this.remark = info.remark;
        this.tasks = info.detailMissions;
        if (info.sources) {
          this.sources = true;
        } else {
          this.sources = false;
        }

        for (let i = 0; i < this.tasks.length; i++) {
          for (let j = 0; j < this.taskName.length; j++) {
            if (this.tasks[i]['missionId'] == this.taskName[j].missionId) {
              this.tasks[i]['missionName'] = this.taskName[j].missionName;
            }
          }

          for (let k = 0; k < this.taskTimes.length; k++) {
            if (this.tasks[i]['missionType'] == this.taskTimes[k].value) {
              this.tasks[i]['times'] = this.taskTimes[k].value;
            }
          }

          for (let k = 0; k < this.taskCount.length; k++) {
            if (this.tasks[i]['rate'] == this.taskCount[k].value) {
              this.tasks[i]['count'] = this.taskCount[k].name;
            }
          }
        }
      }
    });
  }


  initTaskName() {
    this.packageDialogService.taskName().subscribe((res) => {
      if (res.success) {
        this.taskName = res.data;
      }
    });
  }

  save() {
    const mission = this.tasks;
    for (let i = 0; i < mission.length; i++) {
      for (let j = 0; j < this.taskName.length; j++) {
        if (mission[i]['missionName'] === this.taskName[j].missionName) {
          mission[i]['missionId'] = this.taskName[j].missionId;
        }
      }

      for (let k = 0; k < this.taskTimes.length; k++) {
        if (mission[i]['times'] === this.taskTimes[k].value) {
          mission[i]['missionType'] = this.taskTimes[k].value;
        }
      }

      for (let t = 0; t < this.taskCount.length; t++) {
        if (mission[i]['count'] === this.taskCount[t].name) {
          mission[i]['rate'] = this.taskCount[t].value;
        }
      }

    }
    let hele = '';
    if (this.sources) {
      hele = 'hele';
    } else {
      hele = '';
    }

    const data = {
      'servicePackName': this.servicePackName,
      'servicePackImg': this.imageSrc,
      'remark': this.remark,
      'priceOld': this.oldPrice,
      'priceNew': this.currentPrice,
      'sources': hele,
      'missions': JSON.stringify(mission)
    };
    this.errorServicePackName = '';
    this.errorImg = '';
    this.errorTasks = '';
    this.errorRemark = '';
    this.errorOldPrice = '';
    this.errorCurrentPrice = '';
    this.bothprice = '';

    if (typeof this.servicePackName === 'undefined' || this.servicePackName.trim().length < 1) {
      this.errorServicePackName = '请输入服务包名';
    }

    if (this.servicePackName.trim().length > 16) {
      this.errorServicePackName = '服务包名称不能大于16个字符';
    }

    if (typeof this.imageSrc === 'undefined' || this.imageSrc.trim().length < 1) {
      this.errorImg = '请上传图片';
    }


    if (typeof this.remark === 'undefined' || this.remark.trim().length < 1) {
      this.errorRemark = '请填写描述信息';
    }

    if (this.remark.trim().length > 1024) {
      this.errorRemark = '描述信息不能大于1024个字符';
    }

    if (typeof this.oldPrice != 'undefined') {
      if (this.oldPrice.toString().trim().length < 1) {
        this.errorOldPrice = '请填写原价';
        this.bothprice = 'xx';
      } else if (this.oldPrice < 0 || this.oldPrice > 1000000) {
        this.errorOldPrice = '原价值必须在0~1000000之间';
        this.bothprice = 'xx';
      }
    } else {
      this.errorOldPrice = '请填写原价';
      this.bothprice = 'xx';
    }

    if (typeof this.currentPrice != 'undefined') {
      if (this.currentPrice.toString().trim().length < 1) {
        this.errorCurrentPrice = '请填写现价';
        this.bothprice = 'xx';
      } else if (this.currentPrice < 0 || this.currentPrice > 1000000) {
        this.errorCurrentPrice = '现价值必须在0~1000000之间';
        this.bothprice = 'xx';
      }
    } else {
      this.errorCurrentPrice = '请填写现价';
      this.bothprice = 'xx';
    }

    if (typeof this.tasks === 'undefined' || this.tasks.length < 1) {
      this.errorTasks = '请至少填写一个条件';
    }

    for (let i = 0; i < mission.length; i++) {
      const tmpMissionName = mission[i].missionName;
      for (let j = i + 1; j < mission.length; j++) {
        if (tmpMissionName === mission[j].missionName) {
          this.errorTasks = '相同任务只能选择一个';
        }
      }
    }


    if (this.errorServicePackName != '' || this.errorImg != '' || this.errorTasks != '' || this.errorRemark != '' || this.errorOldPrice != '' || this.errorCurrentPrice != '') {
      return;
    }

    if (this.isEdit) {
      data['servicePackId'] = this.packageId;
      this.packageDialogService.editPackage(data).subscribe((res) => {
        if (res.success) {
          tools.tips('编辑成功');
          this.modalRef.close();
        } else {
          tools.tips(res.errMsg, '', 'error');
        }
      });
    } else {
      this.packageDialogService.savePackage(data).subscribe((res) => {
        if (res.success) {
          tools.tips('新增成功');
          this.modalRef.close();
          this.showList();
        } else {
          tools.tips(res.errMsg, '', 'error');
        }
      });
    }
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 't-l-modal' });
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
