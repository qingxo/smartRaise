import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.scss']
})
export class SearchLineComponent implements OnInit {

  @Input() searchInput = '';
  @Output() search = new EventEmitter<string>();
  @Input() placeHolderValue = '请输入';
  constructor() { }

  ngOnInit() {

  }

  searchFind() {
    this.search.emit(this.searchInput);
  }

  searchStart(event) {
    if (event.keyCode === 13) {
      this.searchFind();
    }
  }


}
