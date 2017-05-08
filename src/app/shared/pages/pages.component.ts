import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

@Input() pages:Array<any> = []
@Input() currentPage:number = 1
@Output() pageInfo = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
  }

  changePage(num) {
    let pageNum = num
    if(pageNum<1){
      pageNum = 1
    }

    if(pageNum>this.pages[this.pages.length-1]){
      pageNum = this.pages[this.pages.length-1]
    }

    this.pageInfo.emit(pageNum)
  }

}
