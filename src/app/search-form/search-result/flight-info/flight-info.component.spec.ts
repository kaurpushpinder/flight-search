import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Flight } from '../../entities/flight';
import { FlightInfoComponent } from './flight-info.component';

describe('FlightInfoComponent', () => {
  let component: FlightInfoComponent;
  let fixture: ComponentFixture<FlightInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInfoComponent);
    component = fixture.componentInstance;
    component.flight = {
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
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
