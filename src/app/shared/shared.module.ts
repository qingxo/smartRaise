import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LineInfoComponent } from './line-info/line-info.component';
import { SearchLineComponent } from './search-line/search-line.component';
import { PowerTableComponent } from './power-table/power-table.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LineInfoComponent,
    SearchLineComponent,
    PowerTableComponent,
    PagesComponent
  ],
  exports:[
    LineInfoComponent,
    SearchLineComponent,
    PowerTableComponent,
    PagesComponent
  ]
})
export class SharedModule { }
