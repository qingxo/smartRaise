import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineInfoComponent } from './line-info/line-info.component';
import { SearchLineComponent } from './search-line/search-line.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LineInfoComponent, SearchLineComponent]
})
export class SharedModule { }
