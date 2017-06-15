import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LineInfoComponent } from './line-info/line-info.component';
import { SearchLineComponent } from './search-line/search-line.component';
import { PowerTableComponent } from './power-table/power-table.component';
import { PagesComponent } from './pages/pages.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { CardCheckDirective } from './moreDirective/card-check.directive';
import { NothingComponent } from './nothing';

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
    PagesComponent,
    UploadImageComponent,
    CardCheckDirective,
    NothingComponent
  ],
  exports: [
    LineInfoComponent,
    SearchLineComponent,
    PowerTableComponent,
    PagesComponent,
    UploadImageComponent,
    NothingComponent
  ]
})
export class SharedModule { }
