import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LineInfoComponent } from './line-info/line-info.component';
import { SearchLineComponent } from './search-line/search-line.component';
import { PagesComponent } from './pages/pages.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { CardCheckDirective } from './moreDirective/card-check.directive';
import { NothingComponent } from './nothing';
import { LineBtnComponent } from './line-btn/line-btn.component';
import { PipeBirthPipe } from './pipes/pipe-birth.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LineInfoComponent,
    SearchLineComponent,
    PagesComponent,
    UploadImageComponent,
    CardCheckDirective,
    NothingComponent,
    LineBtnComponent,
    PipeBirthPipe
  ],
  exports: [
    LineInfoComponent,
    SearchLineComponent,
    PagesComponent,
    UploadImageComponent,
    NothingComponent,
    LineBtnComponent,
    PipeBirthPipe
  ]
})
export class SharedModule { }
