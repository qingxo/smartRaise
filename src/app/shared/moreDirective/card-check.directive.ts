import { Directive , OnChanges, SimpleChanges, Input} from '@angular/core';
import {Validator, Validators, ValidatorFn, NG_VALIDATORS, AbstractControl} from '@angular/forms';
@Directive({
  selector: '[appCardCheck]'
})
export class CardCheckDirective implements Validator, OnChanges {
  @Input() appCardCheck: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {

  }

  validate(control: AbstractControl): {[key: string]: any}{
    return this.valFn(control);
  }

}
