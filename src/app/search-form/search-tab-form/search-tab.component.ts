import { City } from '../entities/city';
import { FlightSearchService } from '../services/flight-search.service';
import { SuggestionElem } from './search-tab-form.component';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
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
  searchForm: FormGroup;
 constructor(private flightService: FlightSearchService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup ({
      originCode: this.origin.code,
      destinationCode: this.destination.code,
      departureDt: new FormControl(this.departureDate, [Validators.required])
    });
    this.origin.code.valueChanges
     .debounceTime(200)
     .subscribe(queryField => {
       if (queryField !== this.origin.codeVal) {
         this.origin.suggestions = this.flightService.getSuggestions(queryField);
       }
     });
    this.destination.code.valueChanges
     .debounceTime(200)
     .subscribe(queryField => {
       if (queryField !== this.destination.codeVal) {
         this.destination.suggestions = this.flightService.getSuggestions(queryField);
       }
     });
    if (this.isReturn) {
      this.searchForm.addControl('arrivalDt', new FormControl(this.arrivalDate, [Validators.required]));
    }
  }
  get today(): NgbDateStruct {
    const currDate = new Date();
    const dateToday: NgbDateStruct = {
      year: currDate.getFullYear(),
      month: currDate.getMonth() + 1,
      day: currDate.getDate()
    };
    return dateToday;
  }
  onselectCity(city: City, elem: SuggestionElem) {
    elem.code.setValue(city.code);
    elem.codeVal = city.code;
    elem.suggestions = [];
  }
  search (): void {
    if (this.searchForm.valid) {
      console.log(this.origin.code.value);
      console.log(this.destination.code.value);
      this.flightService.setFlights(this.origin.code.value, this.destination.code.value, this.departureDate,
        (this.isReturn ? this.arrivalDate : null));
    }
  }
}
