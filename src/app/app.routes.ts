import { Routes } from '@angular/router';

import {OneComponent} from './one/one.component';
import {TestComponent} from './one/test/test.component';
import {LoginComponent} from './login/login.component';
export const ROUTER_CONFIG: Routes = [
  { path: 'one/:id', component:OneComponent },
  { path:'test', component:TestComponent},
  { path:'login', component:LoginComponent},
  { path: '' , redirectTo:'one', pathMatch:'full'}
  // { path: 'blog', loadChildren: 'app/blog-app/blog-app.module#BlogAppModule' },
  // { path: 'manage', loadChildren: 'app/manage-app/manage-app.module#ManageAppModule' },
];
