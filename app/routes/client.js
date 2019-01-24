import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  vouchers: service(),

  model(params) {
    return this.get('store').findRecord('client', params.id);
  },

  setupController(controller, model) {
    controller.set('newVoucher', this.get('vouchers').newVoucher(model.get('clientId')));
    controller.set('client', model);
  }

});
