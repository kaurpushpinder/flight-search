import { Flight } from '../../entities/flight';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss']
})
export class FlightInfoComponent implements OnInit {
  @Input() flight: Flight;
  constructor() { }

  ngOnInit() {
  }

}
