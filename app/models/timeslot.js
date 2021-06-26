import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class TimeslotModel extends Model {
  // date the activity timeslot takes place
  @attr('string') date;

  // hh:mm formatted timeslot start time
  @attr('string') startTime;

  // hh:mm formatted timeslot end time
  @attr('string') endTime;

  // name of the activity the timeslot is for
  @attr('string') activityName;

  // number of spots booked for the activity timeslot
  @attr('number') bookedCount;

  // number of spots available for the timeslot
  @attr('number') availableSpots;

  // max number of guests allowed on this timeslot
  @attr('number') maxGuests;
}
