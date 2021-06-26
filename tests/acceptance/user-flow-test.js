import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | User flow', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('I can see a sidebar with activities', async function (assert) {
    assert.expect(2);

    await visit('/');

    assert.dom('[data-test-sidebar]').exists();
    assert.dom('[data-test-menu-item]').exists({ count: 3 });
  });

  test('I can see a full week view with the data from all three days', async function (assert) {
    assert.expect(5);

    const timeslot1 = this.server.create('timeslot', {
      date: '2021-06-06',
      startTime: '09:00',
      endTime: '12:00',
      activityName: 'Activity 1',
      availableSpots: 0,
      bookedCount: 10,
      maxGuests: 10,
    });

    const timeslot2 = this.server.create('timeslot', {
      date: '2021-06-05',
      startTime: '10:00',
      endTime: '12:00',
      activityName: 'Activity 1',
      availableSpots: 0,
      bookedCount: 10,
      maxGuests: 10,
    });

    const timeslot3 = this.server.create('timeslot', {
      date: '2021-06-04',
      startTime: '11:00',
      endTime: '13:00',
      activityName: 'Activity 1',
      availableSpots: 0,
      bookedCount: 10,
      maxGuests: 10,
    });

    await visit('/');

    await click('[data-test-menu-item="0"]');

    assert.dom('[data-test-slot-day]').exists({ count: 3 });

    assert.dom('[data-test-slot-button]').exists();
    assert
      .dom('[data-test-slot-button="0"]')
      .hasText(`${timeslot1.startTime} - ${timeslot1.endTime}`);

    assert
      .dom(
        `[data-test-slot-day="${timeslot2.date}"] > [data-test-slot-button="0"]`
      )
      .hasText(`${timeslot2.startTime} - ${timeslot2.endTime}`);

    assert
      .dom(
        `[data-test-slot-day="${timeslot3.date}"] > [data-test-slot-button="0"]`
      )
      .hasText(`${timeslot3.startTime} - ${timeslot3.endTime}`);
  });

  test('I can see the details from a timeslot', async function (assert) {
    assert.expect(5);

    const timeslot = this.server.create('timeslot', {
      date: '2021-06-06',
      startTime: '09:00',
      endTime: '12:00',
      activityName: 'Activity 1',
      availableSpots: 0,
      bookedCount: 10,
      maxGuests: 10,
    });

    await visit('/');

    await click('[data-test-menu-item="0"]');

    assert.dom('[data-test-slot-day]').exists({ count: 1 });

    assert
      .dom('[data-test-slot-button="0"]')
      .hasText(`${timeslot.startTime} - ${timeslot.endTime}`);

    await click('[data-test-slot-button="0"]');

    assert
      .dom('[data-test-max-guests]')
      .hasText(`Max Guests: ${timeslot.maxGuests}`);
    assert
      .dom('[data-test-available-spots]')
      .hasText(`Available Spots: ${timeslot.availableSpots}`);
    assert
      .dom('[data-test-booked-count]')
      .hasText(`Booked Count: ${timeslot.bookedCount}`);
  });
});
