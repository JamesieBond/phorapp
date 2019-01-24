import EmberObject from '@ember/object';
import InfiniteScrollMixin from 'phorapp/mixins/infinite-scroll';
import { module, test } from 'qunit';

module('Unit | Mixin | infinite-scroll', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let InfiniteScrollObject = EmberObject.extend(InfiniteScrollMixin);
    let subject = InfiniteScrollObject.create();
    assert.ok(subject);
  });
});
