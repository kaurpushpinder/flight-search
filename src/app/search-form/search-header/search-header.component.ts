import { City } from '../entities/city';
import { ResultSet } from '../entities/result-set';
import { FlightSearchService } from '../services/flight-search.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {

  constructor(private flightService: FlightSearchService) { }

  ngOnInit() {
  }

  get result(): ResultSet {
    return this.flightService.getResultMetaData();
  }
}
