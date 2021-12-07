import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { JwtIncerteptor } from './security/jwt.interceptor';
import { AltaComponent } from './pages/alta/alta.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AltaComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
     //le agreglo la constante llamada Http_interseptor(es de sistema), que use mi clase creada llamada JwtInterceptor
    {provide: HTTP_INTERCEPTORS, useClass: JwtIncerteptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
