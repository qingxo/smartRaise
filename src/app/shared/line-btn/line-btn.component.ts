import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer } from '@angular/core';

@Component({
  selector: 'app-line-btn',
  templateUrl: './line-btn.component.html',
  styleUrls: ['./line-btn.component.scss']
})
export class LineBtnComponent implements OnInit {

  @ViewChild('kk') el: ElementRef;
  @Input() totalBtn: Array<any> = ['one', 'two'];
  @Input() smartWidth = '100';
  @Output() btnInfo = new EventEmitter<any>();
  constructor(private elRef: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
  }

  btnFired(index) {
    this.btnInfo.emit(index);
    const array = this.el.nativeElement.children;
    for (let i = 0; i < array.length; i++) {
      if (i === index) {
        array[i].className = 'choosed';
      } else {
        array[i].className = 'tips';
      }
    }
  }

}
