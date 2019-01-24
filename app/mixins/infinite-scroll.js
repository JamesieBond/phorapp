import Mixin from '@ember/object/mixin';
import { later } from '@ember/runloop';

export default Mixin.create({

  lastScrollTop: 0,

  destroyInfiniteScroll() {
    return $(this.get('scrollTarget')).off('scroll.infinite');
  },

  performFixedHeightScrolling() {
    return $("." + this.get('tableScrollable')).length > 0;
  },

  initInfiniteScroll() {
    this.set('lastScrollTop', 0);

    return later(() => {

      let target;
      if (this.performFixedHeightScrolling()) {
        target = "." + this.get('tableScrollable');
      } else {
        target = window;
      }

      this.set('scrollTarget', target);

      return $(target).on('scroll.infinite', () => {
        if (!(this.isDestroyed || this.isDestroying)) {
          return this.didScroll();
        }
      });
    }, 100);
  },

  scrolledToBottom() {
    let currentScrolled, fullListContainer, fullListHeight, scrolledToBottomRet, viewportHeight;
    if (this.performFixedHeightScrolling()) {
      fullListContainer = $("." + this.get('tableScrollable'));
      fullListHeight = fullListContainer.prop('scrollHeight');
      viewportHeight = fullListContainer.height();
      currentScrolled = fullListContainer.scrollTop() + viewportHeight;
    } else {
      viewportHeight = $(window).height();
      fullListContainer = $(document);
      fullListHeight = fullListContainer.height() - $('.footer').height();
      currentScrolled = fullListContainer.scrollTop();
    }

    const heightPerPage = fullListHeight / this.get('page');

    if (Math.ceil(currentScrolled / heightPerPage) < this.get('page')) {
      scrolledToBottomRet = false;
    } else {
      const pctScrolled = ((currentScrolled % heightPerPage) * 100) / heightPerPage;

      //Scroll at 60% of the height;
      const pctScrolledToFetch = 30 > 60 ? 60 : 30;
      scrolledToBottomRet = (pctScrolled >= pctScrolledToFetch);
    }

    this.set('lastScrollTop', currentScrolled);
    return scrolledToBottomRet;
  },

  didScroll() {
    if (this.scrolledToBottom() && !this.get('isLoadingClients') && (this.get('totalClients') != this.get('allClients.length'))) {
      this.incrementProperty('page');
      return this.getClients(this.get('page'), this.get('size'));
    }
  },

});



