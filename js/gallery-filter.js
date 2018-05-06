'use strict';

(function () {

  var sorters = {
    'filter-popular': function (a, b) {
      if (a.likes > b.likes) {
        return -1;
      }
      if (a.likes < b.likes) {
        return 1;
      }
      return 0;
    },
    'filter-discussed': function (a, b) {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    },
    'filter-randomed': function () {
      return Math.random() - 0.5;
    }
  };

  window.galleryFilter = {
    addFilteredPictures: function (pictures, sorterName) {
      var sortBy = sorters[sorterName];
      var copiedPictures = pictures.slice();
      var sortedPictures = sortBy ? copiedPictures.sort(sortBy) : copiedPictures;

      window.gallery.addPictures(sortedPictures);
    }
  };
})();
