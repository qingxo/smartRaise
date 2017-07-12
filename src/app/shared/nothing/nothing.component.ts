import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'nothing',
  templateUrl: './nothing.component.html',
  styleUrls: ['./nothing.component.scss']
})
export class NothingComponent implements OnInit {

  @Input() myTips: string = '暂无相关数据哦~'
  @Input() isHidden: boolean = true
  constructor() { }

  ngOnInit() {
  }

}
