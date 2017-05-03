import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {SharedModule} from '../shared';

import {HomeComponent} from './home.component';
import { ClientComponent } from './client/client.component';
import {LineInfoComponent} from '../shared/line-info';
import { ROUTER_CONFIG } from './home.routes';
import {RouterModule} from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    // SharedModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [HomeComponent,ClientComponent,LineInfoComponent]
})
export class HomeModule { }
