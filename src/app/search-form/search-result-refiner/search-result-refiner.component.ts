import { FlightSearchService } from '../services/flight-search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result-refiner',
  templateUrl: './search-result-refiner.component.html',
  styleUrls: ['./search-result-refiner.component.scss']
})
export class SearchResultRefinerComponent implements OnInit {

  constructor(private flightService: FlightSearchService) { }
  priceRangeConfig: any = {
    behaviour: 'drag',
    connect: true,
    margin: 1,
    range: {
      min: 0,
      max: 15000
    },
    pips: {
      mode: 'steps',
      density: 5,
      step: 10,
      stepped: true
    }
  };
  priceRange: Number[] = [100, 6000];
  ngOnInit() {
    const range: Number[] = this.flightService.getPriceRange();
    this.priceRange = [range[0], range[1]];
  }
  
  rangeChanged() {
    this.flightService.filterResults(this.priceRange);
  }

}
