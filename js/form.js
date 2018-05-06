'use strict';

(function () {

  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FILE_TYPE_ERROR = 'Ошибка формата файла';

  var hideUploadOverlay = function () {
    uploadImageElement.classList.add('hidden');
    uploadFileInputElement.value = '';
  };

  var documentPressEscHandler = function (evt) {
    if (hideOverlayFlag && evt.keyCode === KEYCODE_ESC) {
      hideUploadOverlay();
    }
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadImageElement = uploadFormElement.querySelector('.img-upload__overlay');
  var uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
  var uploadImageCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
  var resizeValueElement = uploadFormElement.querySelector('.resize__control--value');
  var previewElement = uploadFormElement.querySelector('.img-upload__preview');
  var effectPreviewElement = uploadFormElement.querySelectorAll('.effects__preview');
  var scaleElement = uploadFormElement.querySelector('.img-upload__scale');
  var commentTextareaElement = uploadFormElement.querySelector('.text__description');
  var hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
  var hideOverlayFlag = true;

  document.addEventListener('keydown', documentPressEscHandler);

  uploadFileInputElement.addEventListener('change', function () {
    uploadImageElement.classList.remove('hidden');
    var file = uploadFileInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewElement.querySelector('img').src = reader.result;

        Array.from(effectPreviewElement).forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
      });

      reader.readAsDataURL(file);
    } else {
      window.errorMessage.show(FILE_TYPE_ERROR);
      uploadFormElement.reset();
    }
  });

  uploadImageCancelElement.addEventListener('click', function () {
    hideUploadOverlay();
  });

  uploadImageCancelElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      hideUploadOverlay();
    }
  });

  hashtagInputElement.addEventListener('focus', function () {
    hideOverlayFlag = false;
  });

  hashtagInputElement.addEventListener('focusout', function () {
    hideOverlayFlag = true;
  });

  commentTextareaElement.addEventListener('focus', function () {
    hideOverlayFlag = false;
  });

  commentTextareaElement.addEventListener('focusout', function () {
    hideOverlayFlag = true;
  });

  uploadFormElement.addEventListener('submit', function (evt) {
    var data = new FormData(uploadFormElement);
    var onSuccessSaved = function () {
      uploadFormElement.reset();

      hideUploadOverlay();

      resizeValueElement.value = '100%';
      scaleElement.classList.add('hidden');

      previewElement.className = 'img-upload__preview--none';
      previewElement.style.transform = 'scale(1)';
      previewElement.style.filter = '';
    };

    window.backend.save(data, onSuccessSaved, window.errorMessage.show);

    evt.preventDefault();
  });
})();
