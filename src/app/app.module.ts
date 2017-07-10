import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTER_CONFIG } from './app.routes';

import { Http, HttpModule, XHRBackend, RequestOptions }    from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CoreComponent } from './core/core.component';
import {LoginGuard} from './guard/LoginGuard';
import { InterceptedHttp, httpFactory}   from './shared/base.http.interceptor';
// import { requestOptionsProvider} from './shared/default.request.option';
import { HomeModule } from './home';
import {SharedModule} from './shared';
import {SweetAlertService} from 'ng2-sweetalert2';
import { DialogsComponent } from './dialogs/dialogs.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoreComponent,
    DialogsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    HomeModule,
    RouterModule.forRoot(ROUTER_CONFIG),
    NgbModule.forRoot()
  ],
  // providers: [requestOptionsProvider,LoginGuard],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }, LoginGuard, SweetAlertService
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
