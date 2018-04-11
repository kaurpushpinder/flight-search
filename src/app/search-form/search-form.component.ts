import { ResultSet } from './entities/result-set';
import { FlightSearchService } from './services/flight-search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  constructor(private flightService: FlightSearchService) { }

  ngOnInit() {
  }
  get result(): ResultSet {
    return this.flightService.getResultMetaData();
  }
}
