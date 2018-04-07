import { City } from '../entities/city';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { FlightSearchService } from '../services/flight-search.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
interface SuggestionElem {
    code: FormControl;
    suggestions: City[];
}
@Component({
  selector: 'app-search-tab-form',
  templateUrl: './search-tab-form.component.html',
  styleUrls: ['./search-tab-form.component.scss']
})
export class SearchTabFormComponent implements OnInit {
  origin: SuggestionElem = {
    code: new FormControl(),
    suggestions: []
  };
  destination: SuggestionElem = {
    code: new FormControl(),
    suggestions: []
  };
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
    console.log(this.flightService.setFlights(this.origin.code.value, this.destination.code.value));
  }

}
