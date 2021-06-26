import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PeekCalendarComponent extends Component {
  @tracked currentTimeslot = null;

  @action
  onClickSlot(timeslot) {
    this.currentTimeslot = timeslot;
  }

  @action
  setupCalendar() {
    this.currentTimeslot = null;
  }
}
