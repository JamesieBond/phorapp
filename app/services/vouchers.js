import Service from '@ember/service';
import ENV from 'phorapp/config/environment'
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Service.extend({

  store: service(),

  branchId: ENV.branchId,

  newVoucher(clientId) {
    const issueDate = moment().format();
    const expiryDate = moment().day(7).format();
    return this.get('store').createRecord('voucher', { creatingBranchId: this.get('branchId'), clientId: clientId, issueDate: issueDate, expiryDate: expiryDate});
  },

  createVoucher(voucher) {
    return new Promise((resolve, reject) => {
      voucher.save()
        .then((response) => {
          return resolve(response);
        })
        .catch(ex => {
          return reject(ex);
        });
    })
  },

  getClientsVouchers() {
    return new Promise((resolve, reject) => {
      this.get('store').findAll('voucher')
        .then((response) => {
          return resolve(response);
        })
        .catch(ex => {
          return reject(ex);
        });
    })
  },

});
