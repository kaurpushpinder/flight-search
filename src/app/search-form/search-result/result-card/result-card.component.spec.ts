import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JourneyDetails } from '../../entities/JourneyDetails';
import { ResultCardComponent } from './result-card.component';
import { FlightInfoComponent } from '../flight-info/flight-info.component';

describe('ResultCardComponent', () => {
  let component: ResultCardComponent;
  let fixture: ComponentFixture<ResultCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultCardComponent, FlightInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCardComponent);
    component = fixture.componentInstance;
    component.journey = {
      startJourney: {
        "price": 560,
        "seats": 4,
        "origin": {
          "name": "Delhi",
          "code": "DEL"
        },
        "destination": {
          "name": "Pune",
          "code": "PNQ"
        },
        "flightNumber": "AI-201",
        "departureTime": "07:15 AM",
        "arrivalTime": "11:30 AM",
        "departureDate": "11/04/2018",
        "arrivalDate": "11/04/2018"
      },
      returnJourney: {
        "price": 560,
        "seats": 4,
        "origin": {
          "name": "Delhi",
          "code": "DEL"
        },
        "destination": {
          "name": "Pune",
          "code": "PNQ"
        },
        "flightNumber": "AI-201",
        "departureTime": "07:15 AM",
        "arrivalTime": "11:30 AM",
        "departureDate": "11/04/2018",
        "arrivalDate": "11/04/2018"
      },
      price: 1000
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
