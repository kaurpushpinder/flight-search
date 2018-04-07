import { City } from '../entities/city';
import { Flight } from '../entities/flight';
import { ResultSet } from '../entities/result-set';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FlightSearchService {

  cities: City[] = [];
  result: ResultSet;
  constructor(private _http: Http) { }
  // get suggestions for entered key
  getSuggestions(queryString: string): City[] {
    this._http.get('/assets/Cities.json')
        .map(res => res.json())
        .subscribe(data =>
          this.cities = data.filter( function(item) {
            return (item.name.indexOf(queryString) > -1 || item.code.indexOf(queryString) > -1);
          } ));
    return this.cities;
  }
  // get flights based on search
  setFlights(origin: string, destination: string) {
    return this._http.get('/assets/Flights.json')
        .map(res => res.json())
        .subscribe(data => console.log(data));
  }
  // ret result meta data
  getResultMetaData(): ResultSet {
    let metaData: ResultSet;
    if (this.result) {
      metaData =  this.result;
    } else {
      metaData = new ResultSet();
    }
    return metaData;
  }
  // return already set flight data
  getFlights(): Flight[] {
    let flights: Flight[];
    if (this.result) {
      flights =  this.result.resultSet;
    } else {
      flights = [];
    }
    return flights;
  }
}
