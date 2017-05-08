import { Component, OnInit ,Input,Output} from '@angular/core';

@Component({
  selector: 'app-power-table',
  templateUrl: './power-table.component.html',
  styleUrls: ['./power-table.component.scss']
})
export class PowerTableComponent implements OnInit {

  @Input() dataSource:Object
  @Input() headList:Array<any> = []
  @Input() bodyList:Array<any>
  @Input() operate:string = ''
  @Input() listName:Array<any> = []
  constructor() { }

  ngOnInit() {
    console.log(this.bodyList)
  }
  ngOnChanges() {
  }

}
