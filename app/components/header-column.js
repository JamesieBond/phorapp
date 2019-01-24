import Component from '@ember/component';
import { computed } from '@ember/object';
import { tryInvoke } from '@ember/utils';

/**
 * @public
 */
export default Component.extend({
  /**
   * @protected
   * @type {string}
   */
  tagName: "div",

  /**
   * @protected
   * @type {string[]}
   */
  classNames: ["header__column"],

  /**
   * @public
   * @type {Number}
   */
  icon: computed("order", function () {
    let icon = null;

    if (this.get("sortable")) {
      const order = this.get("order");

      if (order === "asc") {
        icon = "zmdi-long-arrow-up";
      } else if (order === "desc") {
        icon = "zmdi-long-arrow-down";
      }
    }

    return icon;
  }),

  /**
   * @public
   * @type {Number}
   */
  index: null,

  /**
   * @public
   * @type {String}
   */
  slug: null,

  /**
   * @public
   * @type {String}
   */
  label: null,

  /**
   * @public
   * @type {boolean}
   */
  sortable: false,

  /**
   * @public
   * @type {boolean}
   */
  sorted: computed("order", function () {
    return this.get("order") !== null;
  }),

  /**
   * @public
   * @type {String}
   */
  order: null,

  /**
   * @public
   * @type {boolean}
   */
  name: false,

  /**
   * @protected
   */
  click() {
    return tryInvoke(this, "onClick", [this]) === true;
  },

  actions: {
    /**
     * @public
     */
    toggleOrder() {
      let order = this.get("order");

      if (order === null || order === "desc") {
        order = "asc";
      } else {
        order = "desc";
      }

      this.set("order", order);
    }
  }
});
