import { JourneyDetails } from '../entities/JourneyDetails';
import { City } from '../entities/city';
import { Flight } from '../entities/flight';
import { ResultSet } from '../entities/result-set';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FlightSearchService {

  cities: City[] = [];
  result: ResultSet;
  resultObs: Observable<ResultSet>;
  constructor(private _http: HttpClient) { }
  // get suggestions for entered key
  getSuggestions(queryString: string): City[] {
    if (this.cities && this.cities.length) {
       return this.filteredCities(this.cities, queryString);
    } else {
      this.getCities().subscribe(data => {
        this.cities = data;
        return this.filteredCities(this.cities, queryString);
      });
    }
  }
  filteredCities (cities: City[], queryString: string): City[] {
    return this.cities.filter( function(item) {
      return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        || item.code.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
    } );
  }
  getCities() {
    return this._http.get<City[]>('/assets/Cities.json');
  }
  getCityFromCode (code: string): City {
    if (this.cities) {
      return this.cities.find(function (city) { return city.code === code; } );
    } else {
      this.getCities().subscribe(data => {
        this.cities = data;
        return this.cities.find(function (city) { return city.code === code; } );
      });
    }
  }
  // get flights based on search
  setFlights(origin: string, destination: string, departDate: NgbDateStruct, arriveDate: NgbDateStruct) {
    let startFlights: Flight[];
    this._http.get<Flight[]>('/assets/Flights.json')
        .subscribe(data => {
          startFlights = data;
          if (arriveDate) {
            this._http.get<Flight[]>('/assets/Flights.json')
            .subscribe(resp => {
              this.result = {
                origin: this.getCityFromCode(origin),
                destination: this.getCityFromCode(destination),
                departDate: this.getFancyDate(departDate),
                isReturn: arriveDate ? true : false,
                returnDate: arriveDate ? this.getFancyDate(arriveDate) : null,
                journeys: this.createJourneys(startFlights, resp)
              };
            });
          } else {
            this.result = {
                origin: this.getCityFromCode(origin),
                destination: this.getCityFromCode(destination),
                departDate: this.getFancyDate(departDate),
                isReturn: arriveDate ? true : false,
                returnDate: arriveDate ? this.getFancyDate(arriveDate) : null,
                journeys: this.createJourneys(startFlights, null)
              };
          }
        });
  }
  createJourneys(startFlights: Flight[], arriveFlights: Flight[]): JourneyDetails[] {
    const journeys: JourneyDetails[] = [];
    for (let i = 0; i < startFlights.length; i++) {
      let j = 0;
      do {
        journeys.push({
          startJourney: startFlights[i],
          returnJourney: arriveFlights ? arriveFlights[j] : null,
          price: startFlights[i].price + (arriveFlights && arriveFlights[j].price ? arriveFlights[j].price : 0)
        });
        j++;
      } while (arriveFlights && j < arriveFlights.length);
    }
    console.log(journeys);
    return journeys;
  }
  // return result meta data
  getResultMetaData(): ResultSet {
    return this.result;
  }
  // return already set flight data
  getJourneys(): JourneyDetails[] {
    if (this.result && this.result.journeys) {
      return this.result.journeys;
    }
  }
  getFancyDate(dateVar: NgbDateStruct): string {
    return dateVar.day.toString() + '-' + dateVar.month.toString() + '-' + dateVar.year.toString();
  }
  filterResults(priceRange: Number[]) {
    this.result = {
                origin: this.result.origin,
                destination: this.result.destination,
                departDate: this.result.departDate,
                isReturn: this.result.isReturn,
                returnDate: this.result.returnDate,
                journeys: this.result.journeys.filter( function(journey) {
                            return (journey.price >= priceRange[0] &&
                              journey.price <= priceRange[1]);
                          } )
              };
  }
}
