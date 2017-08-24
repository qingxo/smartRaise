import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-host]'
})
export class HostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
