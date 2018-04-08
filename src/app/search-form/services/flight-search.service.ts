import { JourneyDetails } from '../entities/JourneyDetails';
import { City } from '../entities/city';
import { Flight } from '../entities/flight';
import { ResultSet } from '../entities/result-set';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FlightSearchService {

  cities: City[] = [];
  result: ResultSet;
  resultObs: Observable<ResultSet>;
  constructor(private _http: HttpClientModule) { }
  // get suggestions for entered key
  getSuggestions(queryString: string): City[] {
    if (this.cities && this.cities.length) {
       return this.cities.filter( function(item) {
            return (item.name.indexOf(queryString) > -1 || item.code.indexOf(queryString) > -1);
          } );
    } else {
      this.getCities().subscribe(data => {
        this.cities = data;
        return this.cities.filter( function(item) {
            return (item.name.indexOf(queryString) > -1 || item.code.indexOf(queryString) > -1);
          } );
      });
    }
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
  setFlights(origin: string, destination: string, departDate: string, arriveDate: string) {
    this._http.get<JourneyDetails[]>('/assets/Flights.json')
        .subscribe(data => {
          this.result = {
            origin: this.getCityFromCode(origin),
            destination: this.getCityFromCode(destination),
            departDate: departDate,
            isReturn: arriveDate ? true : false,
            returnDate: arriveDate,
            resultSet: data
          };
        });
  }
  // return result meta data
  getResultMetaData(): ResultSet {
    return this.result;
  }
  // return already set flight data
  getJourneys(): JourneyDetails[] {
    if (this.result && this.result.resultSet) {
      return this.result.resultSet;
    }
  }
}
