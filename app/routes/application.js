import Route from '@ember/routing/route';
import fetch from 'ember-fetch/ajax'
import { inject as service } from '@ember/service';

export default Route.extend({

  clients: service(),

  model() {
    return this.get('clients').getClients(1, 10)
  },

  afterModel(model) {
    console.log(model);
  }
});
