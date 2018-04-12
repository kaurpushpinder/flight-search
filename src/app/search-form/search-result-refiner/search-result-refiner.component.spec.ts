import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NouisliderModule } from 'ng2-nouislider';
import { FlightSearchService } from '../services/flight-search.service';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { SearchResultRefinerComponent } from './search-result-refiner.component';

describe('SearchResultRefinerComponent', () => {
  let component: SearchResultRefinerComponent;
  let fixture: ComponentFixture<SearchResultRefinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultRefinerComponent ],
      imports: [
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
    fixture = TestBed.createComponent(SearchResultRefinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
