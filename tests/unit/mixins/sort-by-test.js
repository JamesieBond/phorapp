import EmberObject from '@ember/object';
import SortByMixin from 'phorapp/mixins/sort-by';
import { module, test } from 'qunit';

module('Unit | Mixin | sort-by', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SortByObject = EmberObject.extend(SortByMixin);
    let subject = SortByObject.create();
    assert.ok(subject);
  });
});
