import { City } from '../entities/city';
import { FlightSearchService } from '../services/flight-search.service';
import { SuggestionElem } from './search-tab-form.component';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.component.html',
})
export class SearchTabComponent implements OnInit {
  @Input() isReturn: boolean;
  @Input() origin: SuggestionElem;
  @Input() destination: SuggestionElem;
  @Input() departureDate: NgbDateStruct;
  arrivalDate: NgbDateStruct;
 constructor(private flightService: FlightSearchService) {
  }

  ngOnInit() {
    this.origin.code.valueChanges
     .debounceTime(200)
     .subscribe(queryField => this.origin.suggestions = this.flightService.getSuggestions(queryField));
    this.destination.code.valueChanges
     .debounceTime(200)
     .subscribe(queryField => this.destination.suggestions = this.flightService.getSuggestions(queryField));
  }
  onselectCity(city: City, elem: SuggestionElem) {
    elem.code.setValue(city.code);
    elem.suggestions = [];
  }
  search (): void  {
    console.log(this.origin.code.value);
    console.log(this.destination.code.value);
    this.flightService.setFlights(this.origin.code.value, this.destination.code.value, this.departureDate, 
      (this.isReturn ? this.arrivalDate : null));
  }
}
