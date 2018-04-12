import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { FlightSearchService } from './services/flight-search.service';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

import { SearchFormComponent } from './search-form.component';
import { SearchTabFormComponent } from './search-tab-form/search-tab-form.component';
import { SearchResultRefinerComponent } from './search-result-refiner/search-result-refiner.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchTabComponent } from './search-tab-form/search-tab.component';
import { ResultCardComponent } from './search-result/result-card/result-card.component';
import { FlightInfoComponent } from './search-result/flight-info/flight-info.component';
import { SearchHeaderComponent } from './search-result/search-header.component';
describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormComponent,
        SearchTabFormComponent, SearchTabComponent,
        SearchResultRefinerComponent,
        SearchResultComponent,
        SearchHeaderComponent,
        ResultCardComponent,
        FlightInfoComponent
       ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        NouisliderModule
      ],
      providers: [
        FlightSearchService,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
