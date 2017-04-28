import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OneComponent} from './one.component';
import { TestComponent } from './test/test.component'

const oneRoutes:Routes = [
  { path: '', component: OneComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(oneRoutes)
  ],
  declarations: [TestComponent]
})
export class OneModule { }
