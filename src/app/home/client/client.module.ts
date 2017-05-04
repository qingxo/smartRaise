import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LineInfoComponent} from '../../shared/line-info'
import { ClientComponent } from './client.component';

@NgModule({
  imports: [
    CommonModule,
    LineInfoComponent
  ],
  declarations: [ClientComponent]
})
export class ClientModule { }
