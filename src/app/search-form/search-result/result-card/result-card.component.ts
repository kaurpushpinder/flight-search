import { JourneyDetails } from '../../entities/JourneyDetails';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent implements OnInit {
  @Input() journey: JourneyDetails;
  constructor() { }

  ngOnInit() {
  }
  bookJourney(journey: JourneyDetails) {
    alert('Flight booked');
  }
}
