import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';
import { sort, filter } from '@ember/object/computed';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';
import sortBy from 'phorapp/mixins/sort-by';
import infiniteScroll from 'phorapp/mixins/infinite-scroll';

export default Service.extend(sortBy, infiniteScroll, {

  store: service(),

  tableScrollable: "client-list",

  currentSortingProperties: ["firstName:desc"],
  currentSortingProperty: 'firstName',
  currentSortingDirection: 'desc',

  allClientsSorted: sort('filterClientsByEmailPhone.[]', 'currentSortingProperties'),

  totalClients: 0,
  firstLoad: true,
  isLoadingClients: false,

  page: 1,
  size: 20,

  email: "",
  phone: "",


  filterClientsByEmailPhone: filter( 'filterClientsByEmail.[]', function(client) {
    if (this.get('phone') && client.get('landline') && client.get('mobile')) {
      return client.get('landline').includes(this.get('phone')) || client.get('mobile').includes(this.get('phone'));
    } else if (this.get('phone') && client.get('mobile')) {
      return client.get('mobile').includes(this.get('phone'));
    } else if (this.get('phone') && client.get('landline')) {
      return client.get('landline').includes(this.get('phone'));
    } else {
      return client;
    }
  }).property('filterClientsByEmail.[]', 'phone'),

  filterClientsByEmail: filter( 'allClients.[]', function(client) {
    if (this.get('email')) {
      return client.get('email').includes(this.get('email'));
    } else {
      return client;
    }
  }).property('allClients.[]', 'email'),

  observeSearchValues: observer('email', 'phone', function(){
    this.clearIntervalTimer();
    let intervalT = later(() => {
      this.getClients(this.get('page'), this.get('size'))
    }, 1000);
    this.set('intervalTimer', intervalT);
  }),

  clearIntervalTimer() {
    if (this.get('intervalTimer')) {
      Ember.run.cancel(this.get('intervalTimer'));
      this.set('intervalTimer', null);
    }
  },

  setQueryParams(page, perPage) {
    let queryParams = { page: page, size: perPage};
    if (this.get('email') && this.get('phone')) {
      queryParams = { page: page, size: perPage, email: this.get('email'), phone: this.get('phone')};
    } else if (this.get('email')) {
      queryParams = { page: page, size: perPage, email: this.get('email')};
    } else if (this.get('phone')) {
      queryParams = { page: page, size: perPage, phone: this.get('phone')};
    }
    return queryParams;
  },

  getClients(page, perPage) {
    let queryParams = this.setQueryParams(page, perPage);
    this.set('isLoadingClients', true);
    return new Promise((resolve, reject) => {
      this.get('store').query('client', queryParams )
        .then((response) => {
          this.set('allClients', this.get('store').peekAll('client'));
          this.set('meta', response.meta);
          if (this.get('firstLoad')) {
            this.set('totalClients', response.meta.totalElements);
            this.set('firstLoad', false);
          }
          this.set('isLoadingClients', false);
          return resolve(response);
        })
        .catch(ex => {
          this.set('isLoadingClients', false);
          return reject(ex);
        });
    })
  },
});
