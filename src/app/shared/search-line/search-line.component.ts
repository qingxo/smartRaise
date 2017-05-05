import { Component, OnInit ,Output,Input,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.scss']
})
export class SearchLineComponent implements OnInit {

  @Input() searchInput:string = ''
  @Output() search = new EventEmitter<string>()
  @Input() placeHolderValue:string = '请输入'
  constructor() { }

  ngOnInit() {

  }

  searchInfo(event,flag=true) {
    if(!flag){
      if(event.keyCode != 13) {
        return
      }
    }
    this.search.emit(this.searchInput)
  }


}
