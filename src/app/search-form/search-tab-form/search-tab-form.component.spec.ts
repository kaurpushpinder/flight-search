import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTabFormComponent } from './search-tab-form.component';

describe('SearchTabFormComponent', () => {
  let component: SearchTabFormComponent;
  let fixture: ComponentFixture<SearchTabFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTabFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
