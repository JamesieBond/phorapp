import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  vouchers: service(),

  successMessage: "",
  errorMessage: "",

  clearMessages() {
    this.set('successMessage', "");
    this.set('errorMessage', "");
  },

  actions: {
    createVoucher() {
      this.clearMessages();
      this.get('vouchers').createVoucher(this.get('newVoucher')).then(result => {
        let message = "Successfully Created a Voucher for " + this.get('model.fullName') + ", for the value of " + result.get('originalBalance');
        this.set('successMessage', message);
      }).catch(ex => {
        this.set('errorMessage', ex);
      })
    }
  }

});
