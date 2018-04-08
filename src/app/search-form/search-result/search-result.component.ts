import { JourneyDetails } from '../entities/JourneyDetails';
import { FlightSearchService } from '../services/flight-search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  constructor(private flightService: FlightSearchService) { }

  ngOnInit() {
  }
  get journeys(): JourneyDetails[] { return this.flightService.getJourneys(); }
}
