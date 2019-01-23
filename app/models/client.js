import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({

  address: DS.attr(),
  archived: DS.attr('boolean'),
  banned: DS.attr('boolean'),
  clientId: DS.attr('string'),
  clientSince: DS.attr('date'),
  creatingBranchId: DS.attr('string'),
  creditAccount: DS.attr(),
  email: DS.attr('string'),
  emailMarketingConsent: DS.attr('boolean'),
  emailReminderConsent: DS.attr('boolean'),
  firstName: DS.attr('string'),
  gender: DS.attr('string'),
  landline: DS.attr('string'),
  lastName: DS.attr('string'),
  mobile: DS.attr('string'),
  notes: DS.attr('string'),
  smsMarketingConsent: DS.attr('boolean'),
  smsReminderConsent: DS.attr('boolean'),
  version: DS.attr('number'),

  fullName: computed('firstName', 'lastName', function(){
    return this.get('firstName') + " " + this.get('lastName');
  })

});
