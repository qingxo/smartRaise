import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { PkginfoDialogService } from './pkginfo-dialog.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import tools from '../../shared/tools';
import storage from '../../shared/storage';
@Component({
  selector: 'app-pkginfo-dialog',
  templateUrl: './pkginfo-dialog.component.html',
  styleUrls: ['./pkginfo-dialog.component.scss'],
  providers: [PkginfoDialogService]
})
export class PkginfoDialogComponent implements OnInit, AfterViewInit {

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
      'value': '0'
    }, {
      'name': '周期性任务',
      'value': '1'
    }
  ];
  private taskCount: Array<any> = [
    {
      'name': '天',
      'value': '0'
    }, {
      'name': '周',
      'value': '1'
    }, {
      'name': '月',
      'value': '2'
    }, {
      'name': '季',
      'value': '3'
    }, {
      'name': '半年',
      'value': '4'
    }, {
      'name': '年',
      'value': '5'
    }
  ];
  @Input() pkgId = '';
  @ViewChild('content') el: ElementRef;
  constructor(private pkginfoDialogService: PkginfoDialogService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.pkgId !== '') {
        this.open(this.el);
        this.initPkgInfo();
      }
    }
      , 10);

  }

  initPkgInfo() {
    this.pkginfoDialogService.packageInfo(this.pkgId).subscribe((res) => {
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
            if (this.tasks[i]['missionId'] === this.taskName[j].missionId) {
              this.tasks[i]['missionName'] = this.taskName[j].missionName;
            }
          }

          for (let k = 0; k < this.taskTimes.length; k++) {
            if (this.tasks[i]['missionType'] === this.taskTimes[k].value) {
              this.tasks[i]['times'] = this.taskTimes[k].name;
            }
          }

          for (let k = 0; k < this.taskCount.length; k++) {
            if (this.tasks[i]['rate'] === this.taskCount[k].value) {
              this.tasks[i]['count'] = this.taskCount[k].name;
            }
          }

        }
      }
    });
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
