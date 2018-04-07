import { Flight } from '../entities/flight';
import { FlightSearchService } from '../services/flight-search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  flights: Flight[];
  constructor(private flightService: FlightSearchService) { }

  ngOnInit() {
    this.flights = this.flightService.getFlights();
  }

}
