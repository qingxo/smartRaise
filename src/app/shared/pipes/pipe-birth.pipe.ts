import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeBirth'
})
export class PipeBirthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'undefined' || value === '' || value === null) {
      return '未知';
    } else {
      const newYear = new Date().getFullYear();
      const num = Number(newYear) - Number(value.split('-')[0]) + 1;
      return num;
    }
  }

}
