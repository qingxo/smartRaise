import { Component, OnInit ,Output,Input,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.scss']
})
export class SearchLineComponent implements OnInit {

  @Input() searchInput:string = 'a'
  @Output() search = new EventEmitter<string>()
  constructor() { }

  ngOnInit() {

  }

  searchInfo() {
    console.log(this.searchInput)
    this.search.emit(this.searchInput)
  }


}
