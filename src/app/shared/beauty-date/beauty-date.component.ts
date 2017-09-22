import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import * as Flatpickr from 'flatpickr';
import * as zh_lang from 'flatpickr/dist/l10n/zh.js';
@Component({
  selector: 'app-beauty-date',
  templateUrl: './beauty-date.component.html',
  styleUrls: ['./beauty-date.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class BeautyDateComponent implements OnInit {
  @Input() title: string = '';
  @Output() fired = new EventEmitter();
  private chooseDay: string = moment(new Date()).format('YYYY-MM-DD');
  private exampleOptions: FlatpickrOptions = {
    enableTime: false,
    static: true,
    time_24hr: true,
    dateFormat: 'Y-m-d',
    defaultDate: this.chooseDay,
    locale: zh_lang['zh'],
    onChange: this.onChanges.bind(this),
    onClose: this.closeTime.bind(this)
  };
  constructor() { }

  ngOnInit() {
  }

  onChanges(val) {
    this.chooseDay = moment(new Date(val)).format('YYYY-MM-DD');
    this.fired.emit(this.chooseDay)
  }
  closeTime(selectedDates, dateStr, instance) {
    instance.input.blur();
  }

}
