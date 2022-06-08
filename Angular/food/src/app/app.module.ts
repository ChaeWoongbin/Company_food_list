import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' // HttpClientModule
import { FormsModule } from '@angular/forms';

import { SessionService } from './service_item/session.service';
import { AuthGuard } from './service_item/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { InsertFoodComponent } from './insert-food/insert-food.component';
import { InsertSaladComponent } from './insert-salad/insert-salad.component';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogOutComponentComponent } from './log-out-component/log-out-component.component';
import { BnNgIdleService } from 'bn-ng-idle';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    InsertFoodComponent,
    InsertSaladComponent,
    SearchComponent,
    SearchResultComponent,
    HeaderComponent,
    LogOutComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [    
    AuthGuard, // 라우터
    SessionService, // 세션 관리
    BnNgIdleService // 유휴시간 관리
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
