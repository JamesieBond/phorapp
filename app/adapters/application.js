import DS from 'ember-data';
import ENV from 'phorapp/config/environment'

export default DS.RESTAdapter.extend({

  host: ENV.businessApiUrl,
  headers: { 'AUTHORIZATION': 'Basic ' + base64.encode("global/cloud@apiexamples.com" + ":" + "VMlRo/eh+Xd8M~l") },

  /**
   The Adapter `pathForType` method to build underscored URLs
   by decamelizing and pluralizing the object type name.
   To override this functionality for client
   @method pathForType
   @param {String} modelName
   @return String
   */
  pathForType(type) {
    switch (type) {
      default: return type;
    }
  },

})
