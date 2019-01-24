import Mixin from '@ember/object/mixin';

export default Mixin.create({

  reverseDirection() {
    return this.get('currentSortingDirection') == 'asc' ? 'desc' : 'asc'
  },

  sortBy(property, direction) {
    if (!direction && this.get('currentSortingProperty') == property) {
      direction = this.reverseDirection()
    } else if (!direction) {
      direction = 'asc';
    }

    this.set('currentSortingProperty', property);
    this.set('currentSortingDirection', direction);
    this.set('currentSortingProperties', [property + ":" + direction]);
  },

  actions: {
    sortBy(property) {
      this.sortBy(property);
    }
  }

});
