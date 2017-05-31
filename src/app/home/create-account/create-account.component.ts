import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import * as $ from 'jquery'
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import  * as Flatpickr from 'flatpickr'
import * as moment from 'moment'
import * as flatpickr_local from 'flatpickr/dist/l10n/zh'
import {NormalAccount} from '../accounts-model'
import "rxjs/Observable"
import {forbiddenNameValidator} from '../../shared/moreDirective/forbidden-name.directive'
import {CardCheckDirective} from '../../shared/moreDirective/card-check.directive'
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  private realname:string = ''
  private mobile:string = ''
  private imageUrl:string =''
  private healthperson:string = ''
  private sex:string = 'M'
  private height:number
  private weight:number
  private address:string = ''
  private controlName:string = ''
  private controlMobile:string = ''
  private relationShip:number = 0
  private flatpickrOption:FlatpickrOptions
  private birdthday:any
  private role:number

  private accountForm:FormGroup
  private formErrors = {
  'name': '',
  'power': ''
  }

  private validationMessages = {
    'name': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 4 characters long.',
      'maxlength':     'Name cannot be more than 24 characters long.'
        },
    'power': {
      'required': 'Power is required.'
    }
  };

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.initData()
    this.accountForm = this.fb.group({
      role: ["客户",[Validators.required]], //0 系统账号，1 平台账号，2 健康专员账号， 3 客户账号
      name:["",[Validators.required,forbiddenNameValidator(/kaka/i)]],
      cardId: ["",[]],
      mobile: null,
      headImgUrl: null,
      healthPerson:null,
      sex: 'M',
      birdthDay: null,
      height: null,
      weight: null,
      address:null,
      guardian: null,
      guardianDetail:null
    })
    this.accountForm.valueChanges
         .subscribe(data => this.onValueChanged(data));

    this.onValueChanged()
  }

  getImageUrl(url) {
    this.imageUrl = url
  }

  onValueChanged(data?:any) {
    if(!this.accountForm) return
    const form = this.accountForm
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  initData(){
    this.flatpickrOption = {
      // enableTime: true
    }
    Flatpickr.localize(flatpickr_local.zh)
  }

  revert() {}

  save() {
    // this.birdthday = moment(this.birdthday[0]).format('YYYY-MM-DD')
    var data = {
      // 'name': this.realname,
      // 'mobile': this.mobile,
      // 'sex': this.sex,
      // 'birdthday': this.birdthday,
      // 'height': this.height,
      // 'weight': this.weight,
      // 'address': this.address,
      // 'role': this.role,
      // 'imgUrl':this.imageUrl
    }
    console.log(this.accountForm.value)
  }





}
