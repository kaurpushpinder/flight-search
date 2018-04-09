import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { City } from '../entities/city';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface SuggestionElem {
    code: FormControl;
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
    code: new FormControl(),
    suggestions: []
  };
  destination: SuggestionElem = {
    code: new FormControl(),
    suggestions: []
  };
  departureDate: NgbDateStruct;
  ngOnInit() {
  }
}
