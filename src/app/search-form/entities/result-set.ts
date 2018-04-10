import { JourneyDetails } from './JourneyDetails';
import { City } from './city';
import { Flight } from './flight';
export class ResultSet {
    origin: City;
    destination: City;
    departDate: string;
    isReturn: boolean;
    returnDate: string;
    journeys: JourneyDetails[];
}
