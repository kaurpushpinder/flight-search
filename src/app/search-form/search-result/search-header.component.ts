import { City } from '../entities/city';
import { ResultSet } from '../entities/result-set';
import { FlightSearchService } from '../services/flight-search.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
})
export class SearchHeaderComponent implements OnInit {
  @Input() result: ResultSet;
  constructor(private flightService: FlightSearchService) { }

  ngOnInit() {
  }

}
