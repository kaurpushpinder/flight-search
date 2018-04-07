import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FlightSearchService } from './search-form/services/flight-search.service';

import { AppComponent } from './app.component';
import { SearchTabFormComponent } from './search-form/search-tab-form/search-tab-form.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchHeaderComponent } from './search-form/search-header/search-header.component';
import { SearchResultComponent } from './search-form/search-result/search-result.component';
import { ResultCardComponent } from './search-form/search-result/result-card/result-card.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchTabFormComponent,
    SearchFormComponent,
    SearchHeaderComponent,
    SearchResultComponent,
    ResultCardComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    FlightSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
