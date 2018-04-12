import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { FlightSearchService } from './search-form/services/flight-search.service';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchTabFormComponent } from './search-form/search-tab-form/search-tab-form.component';
import { SearchResultRefinerComponent } from './search-form/search-result-refiner/search-result-refiner.component';
import { SearchResultComponent } from './search-form/search-result/search-result.component';
import { SearchHeaderComponent } from './search-form/search-result/search-header.component';
import { ResultCardComponent } from './search-form/search-result/result-card/result-card.component';
import { FlightInfoComponent } from './search-form/search-result/flight-info/flight-info.component';
import { SearchTabComponent } from './search-form/search-tab-form/search-tab.component';

describe('AppComponent', () => {

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchTabFormComponent,
        SearchFormComponent,
        SearchHeaderComponent,
        SearchResultComponent,
        ResultCardComponent,
        FlightInfoComponent,
        SearchTabComponent,
        SearchResultRefinerComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        NouisliderModule
      ],
      providers: [
        FlightSearchService,
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Flight Search Engine');
  }));
});
