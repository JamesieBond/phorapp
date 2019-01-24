import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default Controller.extend({

  clients: service(),

  columnHeaders: A([
    EmberObject.create({id: 1, name: "fullName", label: "Name", sortable: true, order: "desc"}),
    EmberObject.create({id: 2, name: "email", label: "E-mail", sortable: true, order: null}),
    EmberObject.create({id: 3, name: "gender", label: "Gender", sortable: true, order: null}),
    EmberObject.create({id: 4, name: "mobile", label: "Mobile", sortable: true, order: null}),
    EmberObject.create({id: 5, name: "notes", label: "User Notes", sortable: true, order: null}),
    EmberObject.create({id: 6, name: "", label: "", sortable: false, order: null})
  ]),

  actions: {
    sortBy(property, direction) {
      this.get('clients').sortBy(property, direction)
    }
  }

});
