import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultRefinerComponent } from './search-result-refiner.component';

describe('SearchResultRefinerComponent', () => {
  let component: SearchResultRefinerComponent;
  let fixture: ComponentFixture<SearchResultRefinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultRefinerComponent ]
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
