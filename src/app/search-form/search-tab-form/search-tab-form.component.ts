import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { City } from '../entities/city';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface SuggestionElem {
    code: FormControl;
    codeVal: string;
    suggestions: City[];
}
@Component({
  selector: 'app-search-tab-form',
  templateUrl: './search-tab-form.component.html',
  styleUrls: ['./search-tab-form.component.scss']
})
export class SearchTabFormComponent implements OnInit {
  constructor() {
  }
  origin: SuggestionElem = {
    code: new FormControl('', [Validators.required]),
    suggestions: [],
    codeVal: ''
  };
  destination: SuggestionElem = {
    code: new FormControl(),
    suggestions: [],
    codeVal: ''
  };
  departureDate: NgbDateStruct;
  departureDateControl: FormControl = new FormControl(this.departureDate, [Validators.required]);
  ngOnInit() {
  }
}
