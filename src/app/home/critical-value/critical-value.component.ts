import { Component, OnInit } from '@angular/core';
import { CriticalValueService } from './critical-value.service';
@Component({
  selector: 'app-critical-value',
  templateUrl: './critical-value.component.html',
  styleUrls: ['./critical-value.component.scss'],
  providers: [CriticalValueService]
})
export class CriticalValueComponent implements OnInit {

  private list: Array<any> = [];
  constructor(private criticalValueService: CriticalValueService) { }

  ngOnInit() {
    this.showList();
  }

  showList() {
    this.criticalValueService.getCriticalList().subscribe((res) => {
    });
  }
}
