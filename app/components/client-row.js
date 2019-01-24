import Component from '@ember/component';

/**
 * @public
 */
export default Component.extend({

  /**
   * @protected
   * @type {String}
   */
  tagName: "div",

  /**
   * @protected
   * @type {String[]}
   */
  classNames: ["client-row", "clean"],

  /**
   * @protected
   * @type {Object}
   */
  actions: {

  }
}).reopenClass({
  /**
   * @type {string[]}
   */
  positionalParams: ["client"],
});
