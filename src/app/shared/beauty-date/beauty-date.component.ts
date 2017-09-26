import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  @Input() maxDate: string = null;
  @ViewChild('tt') tt: ElementRef
  private chooseDay: string = moment(new Date()).format('YYYY-MM-DD');
  private exampleOptions: FlatpickrOptions = {
    enableTime: false,
    static: true,
    time_24hr: true,
    dateFormat: 'Y-m-d',
    defaultDate: this.chooseDay,
    maxDate: null,
    locale: zh_lang['zh'],
    onChange: this.onChanges.bind(this),
    onClose: this.closeTime.bind(this)
  };
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(val) {
    if (this.maxDate !== null) {
      if (this.tt['flatpickr']) {
        this.tt['flatpickr']['config']['maxDate'] === this.maxDate ? '' : this.tt['flatpickr']['config']['maxDate'] = this.maxDate
      }
    }
  }

  onChanges(val) {
    this.chooseDay = moment(new Date(val)).format('YYYY-MM-DD');
    this.fired.emit(this.chooseDay)
  }
  closeTime(selectedDates, dateStr, instance) {
    instance.input.blur();
  }

}
