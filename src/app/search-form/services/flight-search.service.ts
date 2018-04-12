import { JourneyDetails } from '../entities/JourneyDetails';
import { City } from '../entities/city';
import { Flight } from '../entities/flight';
import { ResultSet } from '../entities/result-set';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FlightSearchService {

  cities: City[] = [];
  result: ResultSet;
  filteredJourneys: JourneyDetails[];
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
    return cities.filter( function(item) {
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
  setFlights(origin: string, destination: string, departDate: NgbDateStruct, arriveDate: NgbDateStruct,
    numPassengers: number) {
    let startFlights: Flight[];
    this.result = null;
    const params = new HttpParams().set("origin", origin).set("destination", destination)
            .set("departDate", this.getFancyDate(departDate)).set("arriveDate", this.getFancyDate(arriveDate))
            .set("numPassengers", (numPassengers + ''));
    this._http.get<Flight[]>('/assets/Flights.json', {params: params})
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
                journeys: this.createJourneys(startFlights, resp, numPassengers)
              };
            });
          } else {
            this.result = {
                origin: this.getCityFromCode(origin),
                destination: this.getCityFromCode(destination),
                departDate: this.getFancyDate(departDate),
                isReturn: arriveDate ? true : false,
                returnDate: arriveDate ? this.getFancyDate(arriveDate) : null,
                journeys: this.createJourneys(startFlights, null, numPassengers)
              };
          }
        },
        error => console.log(error));
  }
  createJourneys(startFlights: Flight[], arriveFlights: Flight[], numPassengers: number): JourneyDetails[] {
    const journeys: JourneyDetails[] = [];
    for (let i = 0; i < startFlights.length; i++) {
      let j = 0;
      do {
        journeys.push({
          startJourney: startFlights[i],
          returnJourney: arriveFlights ? arriveFlights[j] : null,
          price: (startFlights[i].price +
            (arriveFlights && arriveFlights[j].price ? arriveFlights[j].price : 0)) * numPassengers
        });
        j++;
      } while (arriveFlights && j < arriveFlights.length);
    }
    this.filteredJourneys = journeys;
    console.log(journeys);
    return journeys;
  }
  // return result meta data
  getResultMetaData(): ResultSet {
    //debugger;
    return this.result;
  }
  getJourneys(): JourneyDetails[] {
    return this.filteredJourneys;
  }
  getFancyDate(dateVar: NgbDateStruct): string {
    return dateVar ? dateVar.day.toString() + '-' + dateVar.month.toString() + '-' + dateVar.year.toString() : '';
  }
  filterResults(priceRange: Number[]) {
     this.filteredJourneys =  this.result.journeys.filter( function(journey) {
                    return (journey.price >= priceRange[0] &&
                        journey.price <= priceRange[1]);
                    } );
  }
  getPriceRange(): Number[] {
    const priceRange: Number[] = [0, 0];
    if (this.result && this.result.journeys) {
      priceRange[0] = this.result.journeys[0].price;
      priceRange[1] = this.result.journeys[0].price;
      for (let i = 1; i < this.result.journeys.length; i++) {
        const journey = this.result.journeys[i];
        if ( priceRange[0] > journey.price ) {
          priceRange[0] = journey.price;
        } else if ( priceRange[1] < journey.price ) {
          priceRange[1] = journey.price;
        }
      }
    }
    return priceRange;
  }
}
