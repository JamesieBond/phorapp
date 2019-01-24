import DS from 'ember-data';

export default DS.Model.extend({

  clientId: DS.attr('string'),
  voucherId: DS.attr('string'),
  serialNumber: DS.attr('string'),
  issueDate: DS.attr('date'),
  expiryDate: DS.attr('date'),
  creatingBranchId: DS.attr('string'),
  originalBalance: DS.attr('number'),
  remainingBalance: DS.attr('number'),

});
