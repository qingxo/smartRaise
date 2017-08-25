import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-line-info',
  templateUrl: './line-info.component.html',
  styleUrls: ['./line-info.component.scss']
})
export class LineInfoComponent implements OnInit {
  @Input() lineInfo = '';
  constructor() { }

  ngOnInit() {
  }

}
