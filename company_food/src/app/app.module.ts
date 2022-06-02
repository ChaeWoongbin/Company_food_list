import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './window/main/main.component';
import { InsertFoodComponent } from './window/insert-food/insert-food.component';
import { InsertSaladComponent } from './window/insert-salad/insert-salad.component';
import { SearchComponent } from './window/search/search.component';
import { SearchResultComponent } from './window/search-result/search-result.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InsertFoodComponent,
    InsertSaladComponent,
    SearchComponent,
    SearchResultComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
