import { Component, OnInit } from '@angular/core';
import { CriticalValueService } from './critical-value.service';
import storage from '../../shared/storage';
import tools from '../../shared/tools';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-critical-value',
  templateUrl: './critical-value.component.html',
  styleUrls: ['./critical-value.component.scss'],
  providers: [CriticalValueService]
})
export class CriticalValueComponent implements OnInit {

  private list: Array<any> = [];
  private clickItem = 0;
  private closeResult: string;
  private modalRef: any;
  private highValue: string;
  private lowValue: string;
  constructor(private criticalValueService: CriticalValueService, private modalService: NgbModal) { }

  ngOnInit() {
    this.showList();
  }

  handleModal(index, content) {
    this.clickItem = index;
    this.highValue = this.list[this.clickItem]['highValue'];
    this.lowValue = this.list[this.clickItem]['lowValue'];
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

  saveValue() {
    const data = {
      'abnormalTypeNo': this.list[this.clickItem].abnormalTypeNo,
      'highValue': this.highValue,
      'lowValue': this.lowValue
    };
    this.criticalValueService.valueEdit(data).subscribe((res) => {
      if (res.success) {
        this.modalRef.close();
        // this.showList()
        this.list[this.clickItem]['highValue'] = this.highValue;
        this.list[this.clickItem]['lowValue'] = this.lowValue;
        tools.tips('保存成功');
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

  showList() {
    this.criticalValueService.getCriticalList().subscribe((res) => {
      if (res.success) {
        this.list = res.data;
      }
    });
  }
}
