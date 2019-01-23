import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';

export default Service.extend({

  store: service(),

  currentSortingProperties: ["price:desc"],
  currentSortingProperty: 'price',
  currentSortingDirection: 'desc',

  page: 1,
  size: 10,

  getClients(page, perPage) {
    return new Promise((resolve, reject) => {
      this.get('store').query('client', { page: page, size: perPage })
        .then((response) => {
          return resolve(response);
        })
        .catch(ex => {
          return reject(ex);
        });
    })
  },
});
