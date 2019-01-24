import Component from '@ember/component';
import { computed } from '@ember/object';
import { tryInvoke } from '@ember/utils';

/**
 * @public
 */
export default Component.extend({

  /**
   * @protected
   * @type {String}
   */
  tagName: "header",

  /**
   * @protected
   * @type {String[]}
   */
  classNames: ["header", "bordered"],

  /**
   * @public
   * @type {Array}
   */
  columns: null,

  /**
   * @protected
   */
  currentSortedColumn: computed("columns.@each.order", function () {
    return this.get("columns").find((column) => !!column.order);
  }).readOnly(),

  /**
   * @protected
   * @type {Object}
   */
  actions: {
    /**
     * @private
     * @param {String} column
     */
    clearPreviousColumn(column) {
      const previousColumn = this.get("currentSortedColumn");

      if (previousColumn && previousColumn.get("id") !== column) {
        previousColumn.set("order", null);
      }
    },

    /**
     * @protected
     * @param {Component} column
     */
    onClickColumn(column) {
      if (column.get("sortable") === true) {
        this.send("clearPreviousColumn", column.get("slug"));
        column.send("toggleOrder");
        if (column.get('order')) {
          // tryInvoke(this, "action", column.get('name'), column.get('order'), [this]);
          tryInvoke(this, "action", [column.get('name'), column.get('order')]);
        }

        return tryInvoke(this, "onClickColumn", [this]) === true;
      }
    },

  }
}).reopenClass({
  /**
   * @type {string[]}
   */
  positionalParams: ["columns"],
});
