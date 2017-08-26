import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewChecked {

  @Input() pages: Array<any> = [];
  @Input() currentPage = 1;
  @Input() sum = 0;
  @Input() pageSize = 10;
  @Output() pageInfo = new EventEmitter<any>();
  @ViewChild('hh') hh: ElementRef;
  @ViewChild('tt') tt: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.hh && this.tt) {
      const t = this.getLastPage();
      if (t > 12) {
        if (this.tt && this.hh) {
          this.hh.nativeElement.className = 'p-head';
          this.tt.nativeElement.className = 'p-tail';
        }
      }
    }
  }

  getLastPage() {
    return Math.ceil(this.sum / this.pageSize);
  }

  changePage(num) {
    let pageNum = num;
    if (pageNum < 1) {
      pageNum = 1;
    }
    if (pageNum > this.pages[this.pages.length - 1]) {
      pageNum = this.pages[this.pages.length - 1];
    }

    if (pageNum !== this.currentPage) {
      this.pageInfo.emit(pageNum);
    }
  }

  goLastPage() {
    this.pageInfo.emit(this.getLastPage());
  }

}
