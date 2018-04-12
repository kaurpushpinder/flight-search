import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlightSearchService } from '../services/flight-search.service';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

import { SearchTabFormComponent } from './search-tab-form.component';
import { SearchTabComponent } from './search-tab.component';

describe('SearchTabFormComponent', () => {
  let component: SearchTabFormComponent;
  let fixture: ComponentFixture<SearchTabFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTabFormComponent,
      SearchTabComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
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
    fixture = TestBed.createComponent(SearchTabFormComponent);
    component = fixture.componentInstance;
    component.origin = {
      code: new FormControl('MUM', [Validators.required]),
      suggestions: [],
      codeVal: ''
    };
    component.destination = {
      code: new FormControl('AMR', [Validators.required]),
      suggestions: [],
      codeVal: ''
    };
    let departDate = {
      year: 2018,
      day: 12,
      month: 3
    };
    component.departureDateControl = new FormControl({departDate}, [Validators.required]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
