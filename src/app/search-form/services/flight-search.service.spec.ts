import { TestBed, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlightSearchService } from './flight-search.service';

describe('FlightSearchService', () => {
  let injector: TestBed;
  let service: FlightSearchService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ FlightSearchService ]
    });
    injector = getTestBed();
    service = injector.get(FlightSearchService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
 
  it('should be created', inject([FlightSearchService], (service: FlightSearchService) => {
    expect(service).toBeTruthy();
  }));
  it('should return an Observable<City[]>', () => {
    const cities = [
      {
        "name": "Delhi",
        "code": "DEL"
      },
      {
        "name": "Mumbai",
        "code": "MUM"
      },
      {
        "name": "Pune",
        "code": "PNQ"
      }
    ];

    service.getCities().subscribe(cities => {
      expect(cities.length).toBe(3);
      expect(cities).toEqual(cities);
      expect(service.filteredCities(cities,"Mu").length).toBe(1);
      expect(service.filteredCities(cities,"ab").length).toBe(0);
    });

    const req = httpMock.expectOne(`/assets/Cities.json`);
    expect(req.request.method).toBe("GET");
    req.flush(cities);
  });
  it('should set flights based on input params', (done) => {
    const flights = [
        {
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
        {
          "price": 460,
            "seats": 2,
            "origin": {
              "name": "Delhi",
              "code": "DEL"
            },
            "destination": {
              "name": "Pune",
              "code": "PNQ"
            },
            "flightNumber": "AI-202",
            "departureTime": "09:15 AM",
            "arrivalTime": "03:30 PM",
            "departureDate": "11/04/2018",
            "arrivalDate": "11/04/2018"
        }
    ];
  
    let spy = spyOn(service, 'setFlights').and.callFake(function() {
       expect(arguments[0]).toEqual('DEL');
       expect(arguments[1]).toEqual('MUM');
      expect(arguments[2]).toEqual({day: 11, month: 3, year: 2018});
      expect(arguments[3]).toEqual(null);
      expect(arguments[4]).toEqual(1);
    }).and.returnValue(Promise.resolve(true));
    service.setFlights("DEL", "MUM", {day: 11, month: 3, year: 2018}, null, 1);
    spy.calls.mostRecent().returnValue.then(() => { 
      expect(service.result.origin.code).toBe("DEL");
      done(); 
    });
    const params = "origin=DEL&destination=MUM&departDate=" + service.getFancyDate({day: 11, month: 3, year: 2018}) 
      + "&arriveDate=null&numPassengers=1";
    const req = httpMock.expectOne(req => req.url.includes(`/assets/Flights.json`+ params));
    expect(req.request.method).toBe("GET");
    req.flush(flights);
  });
});
