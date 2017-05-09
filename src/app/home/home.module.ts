import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import { ClientComponent } from './client/client.component';
import { ROUTER_CONFIG } from './home.routes';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import { PlanmanComponent } from './planman/planman.component'
import {FormsModule} from '@angular/forms'
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [
    HomeComponent,
    ClientComponent,
    PlanmanComponent
  ]
})
export class HomeModule { }
