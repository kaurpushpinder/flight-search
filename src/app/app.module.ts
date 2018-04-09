import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlightSearchService } from './search-form/services/flight-search.service';

import { AppComponent } from './app.component';
import { SearchTabFormComponent } from './search-form/search-tab-form/search-tab-form.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchHeaderComponent } from './search-form/search-header/search-header.component';
import { SearchResultComponent } from './search-form/search-result/search-result.component';
import { ResultCardComponent } from './search-form/search-result/result-card/result-card.component';
import { FlightInfoComponent } from './search-form/search-result/flight-info/flight-info.component';
import { SearchTabComponent } from './search-form/search-tab-form/search-tab.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchTabFormComponent,
    SearchFormComponent,
    SearchHeaderComponent,
    SearchResultComponent,
    ResultCardComponent,
    FlightInfoComponent,
    SearchTabComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    FlightSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
