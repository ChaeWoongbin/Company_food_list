import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';
import { InsertFoodComponent } from './insert-food/insert-food.component';
import { InsertSaladComponent } from './insert-salad/insert-salad.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service_item/auth.guard';
import { AlreadyAuthGuard } from './service_item/already-auth.guard';
import { LogOutComponentComponent } from './log-out-component/log-out-component.component';

const AppRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // 첫 화면을 main 페이지로 설정
  
  { path: 'main', component: MainComponent }, // main

  { path: '', canActivate: [AlreadyAuthGuard],
    children: [
      { path: 'login', component: LoginComponent}, // login
    ]
  },  
  
  { path: '', canActivate: [AuthGuard],
    children: [
      
      { path: 'insert_food', component: InsertFoodComponent }, // food
      { path: 'insert_salad', component: InsertSaladComponent }, // salad   
      { path: 'search', component: SearchComponent, }, // search
      { path: 'search_result/:date/:place/:seq', component: SearchResultComponent, }, // search_result
      { path: 'logOut', component: LogOutComponentComponent, },
      { path: '**', redirectTo: '/main', pathMatch: 'full' }, // 잘못된 URL을 사용했을때 main 페이지로 돌려보냄.
    ]
  },  
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes, {useHash: true});