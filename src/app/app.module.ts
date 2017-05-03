;
import { SharedComponent } from './shared/shared.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTER_CONFIG } from './app.routes';

import { Http,HttpModule, XHRBackend, RequestOptions }    from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CoreComponent } from './core/core.component';
import {LoginGuard} from './guard/LoginGuard';
import { InterceptedHttp }   from './shared/base.http.interceptor';
import { requestOptionsProvider} from './shared/default.request.option';
import { HomeModule } from './home';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoreComponent,
    SharedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    RouterModule.forRoot(ROUTER_CONFIG)

  ],
  providers: [requestOptionsProvider,LoginGuard],
  bootstrap: [AppComponent]
})



export class AppModule { }
