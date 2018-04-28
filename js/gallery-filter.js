'use strict';

(function () {

  var removePhotos = function () {
    var allPhotos = picturesElements.querySelectorAll('.picture__link');
    allPhotos.forEach(function (item) {
      item.remove();
    });
  };

  var changeFilter = function (pictures, filter) {
    var picturesCopy = pictures.slice();
    var picturesToReRender;

    removePhotos();

    switch (filter) {
      case 'filter-popular': {
        picturesToReRender = picturesCopy.sort(function (a, b) {
          if (a.likes > b.likes) {
            return -1;
          } else if (a.likes < b.likes) {
            return 1;
          } else {
            return 0;
          }
        });
        window.processPictures(picturesToReRender);
        break;
      }
      case 'filter-discussed': {
        picturesToReRender = picturesCopy.sort(function (a, b) {
          if (a.comments.length > b.comments.length) {
            return -1;
          } else if (a.comments.length < b.comments.length) {
            return 1;
          } else {
            return 0;
          }
        });
        window.processPictures(picturesToReRender);
        break;
      }
      case 'filter-randomed': {
        picturesToReRender = picturesCopy.sort(function () {
          return Math.random() - 0.5;
        });
        window.processPictures(picturesToReRender);
        break;
      }
      case 'filter-new': {
        window.processPictures(pictures);
        break;
      }
    }
  };

  var picturesElements = document.querySelector('.pictures');

  window.changeFilter = changeFilter;
})();
