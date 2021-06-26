import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

const DEBOUNCE_MS = 250;

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj);
    return acc;
  }, {});
}

export default class CalendarContainerComponent extends Component {
  tagName = '';

  @service store;

  activities = ['Activity 1', 'Activity 2', 'Activity 3'];

  @(task(function* (term) {
    // Pause here for DEBOUNCE_MS milliseconds. Because this
    // task is `restartable`, if the user starts typing again,
    // the current search will be canceled at this point and
    // start over from the beginning. This is the
    // ember-concurrency way of debouncing a task.
    yield timeout(DEBOUNCE_MS);

    const timeslotsQuery = yield this.store.query('timeslot', {
      activityName: term,
    });
    const timeslots = timeslotsQuery.toArray();
    return groupBy(timeslots, 'date');
  }).restartable())
  fetchTimeslotsTask;
}
