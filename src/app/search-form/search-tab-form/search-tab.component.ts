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
  @Input() departureDateControl: FormControl;
  arrivalDate: NgbDateStruct;
  searchForm: FormGroup;
  originError = 'Please type and select origin';
  destinationError = 'Please type and select destination';
  departureDateError = 'Please select departure date';
  arrivalDateError = 'Please select arrival date';
 constructor(private flightService: FlightSearchService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup ({
      originCode: this.origin.code,
      destinationCode: this.destination.code,
      departureDt: this.departureDateControl
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
    Object.keys(this.searchForm.controls).forEach(field => {
      const control = this.searchForm.get(field);
      if (control instanceof FormControl) {
        if (field === 'originCode' && this.origin.code.value) {
          if (this.origin.code.value !== this.origin.codeVal) {
            this.originError = 'Inalid code. Select from the suggestions.';
            control.setErrors({
               notValid: true
            });
          }
        }
        if (field === 'destinationCode'&& this.destination.code.value) {
          if (this.destination.code.value !== this.destination.codeVal) {
            this.destinationError = 'Inalid code. Select from the suggestions.';
            control.setErrors({
               notValid: true
            });
          }
          if (this.origin.codeVal === this.destination.codeVal) {
            this.destinationError = 'Origin and destination can not be same';
            control.setErrors({
               notValid: true
            });
          }
        }
        control.markAsTouched({ onlySelf: true });
      }
    });
    if (this.searchForm.valid) {
      this.flightService.setFlights(this.origin.code.value, this.destination.code.value, this.departureDateControl.value,
        (this.isReturn ? this.arrivalDate : null));
    }
  }
  get arrivalDt() { return this.searchForm.get('arrivalDt'); }
  get departureDt() { return this.searchForm.get('departureDt'); }
}
