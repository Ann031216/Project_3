'use strict';

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__list');
const overlay = document.querySelector('.header__overlay');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  burger.classList.remove('active');
  menu.classList.remove('active');
  overlay.classList.remove('active');
});

