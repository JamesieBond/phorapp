import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | clients', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:clients');
    assert.ok(service);
  });

  // A real test.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:clients');
    service.getClients(1, 10);
    assert.equal(this.get('allClients.length'), 10);
  });
});
