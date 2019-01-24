import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  clients: service(),

  beforeModel() {
    this.get('clients').getClients(1, 20);
  },

  setupController() {
    this.get('clients').initInfiniteScroll();
  },

  resetController () {
    this.get('clients').destroyInfiniteScroll();
  }

});
