import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'clientId',

  /**
   * Ember data expects model name to be the key of the JSON Object for serialization
   *
   * @protected
   * @return {Object}
   * @see https://www.emberjs.com/api/ember-data/3.5/classes/DS.RESTSerializer/methods/normalizeResponse?anchor=normalizeResponse
   */
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.meta = JSON.parse(JSON.stringify(payload.page));
    payload.clients = JSON.parse(JSON.stringify(payload._embedded.clients));

    delete payload.page;
    delete payload._embedded;

    return this._super(...arguments);
  },

});
