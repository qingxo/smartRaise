;
import { SharedComponent } from './shared/shared.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTER_CONFIG } from './app.routes';

import { Http,HttpModule, XHRBackend, RequestOptions }    from '@angular/http';
import { AppComponent } from './app.component';
import {OneComponent} from './one/one.component'
import {TestComponent} from './one/test/test.component';
import { LoginComponent } from './login/login.component';
import { CoreComponent } from './core/core.component';

import { InterceptedHttp }   from './shared/base.http.interceptor';
import { requestOptionsProvider} from './shared/default.request.option';
import { HomeComponent } from './home/home.component';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    OneComponent,
    TestComponent,
    LoginComponent,
    CoreComponent,
    SharedComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTER_CONFIG)

  ],
  providers: [requestOptionsProvider],
  bootstrap: [AppComponent]
})



export class AppModule { }
