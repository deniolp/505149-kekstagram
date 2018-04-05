'use strict';

var LIMIT_PHOTOS = 25;
var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTION_LIST = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var photoList = [];
var photoTemplate = document.querySelector('#picture').content.querySelector('a');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var bigPhoto = document.querySelector('.big-picture');

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateComments = function (quantityOfComments) {
  var comments = [];
  for (var i = 1; i <= quantityOfComments; i++) {
    comments.push(COMMENTS_LIST[generateRandomNumber(0, COMMENTS_LIST.length - 1)]);
  }
  return comments;
};

var generatePhoto = function (index) {
  return {
    url: 'photos/' + index + '.jpg',
    likes: generateRandomNumber(15, 200),
    comments: generateComments(generateRandomNumber(1, 2)),
    description: DESCRIPTION_LIST[generateRandomNumber(0, DESCRIPTION_LIST.length - 1)]
  };
};

var createPictureElement = function (template, object) {
  var element = template.cloneNode(true);
  element.querySelector('img').src = object.url;
  element.querySelector('.picture__stat--likes').textContent = object.likes;
  element.querySelector('.picture__stat--comments').textContent = object.comments.length;
  return element;
};

var openPhoto = function (array) {
  bigPhoto.classList.remove('hidden');
  bigPhoto.querySelector('.big-picture__img').querySelector('img').src = array.url;
  bigPhoto.querySelector('.likes-count').textContent = array.likes;
  bigPhoto.querySelector('.comments-count').textContent = array.comments.length;
  var commentBlock = bigPhoto.querySelectorAll('.social__comment');

  if (array.comments.length === 1) {
    bigPhoto.querySelector('.social__comments').removeChild(commentBlock[1]);
  }
  for (var i = 0; i < commentBlock.length; i++) {
    commentBlock[i].innerHTML = '<img class="social__picture" src="img/avatar-' + generateRandomNumber(1, 6) + '.svg"' + 'alt="Аватар комментатора фотографии" width="35" height="35">' + array.comments[i];
  }

  bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPhoto.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
};

for (var i = 0; i < LIMIT_PHOTOS; i++) {
  photoList.push(generatePhoto(i + 1));
}

for (var j = 0; j < LIMIT_PHOTOS; j++) {
  fragment.appendChild(createPictureElement(photoTemplate, photoList[j]));
}

pictures.appendChild(fragment);

openPhoto(photoList[0]);
