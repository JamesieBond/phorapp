import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'voucherId',

  /**
   * Ember data expects model name to be the key of the JSON Object for serialization
   *
   * @protected
   * @return {Object}
   * @see https://www.emberjs.com/api/ember-data/3.5/classes/DS.RESTSerializer/methods/normalizeResponse?anchor=normalizeResponse
   */
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (requestType === "findRecord") {
      let newPayload = JSON.parse(JSON.stringify(payload));
      payload.client = newPayload;
    } else {
      payload.meta = JSON.parse(JSON.stringify(payload.page));
      if (payload._embedded) {
        payload.vouchers = JSON.parse(JSON.stringify(payload._embedded.vouchers));
      } else {
        payload.vouchers = [];
      }

      delete payload.page;
      delete payload._embedded;
    }

    return this._super(...arguments);
  },

});
