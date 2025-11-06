'use strict';

/*----Кастомний select----*/
document.querySelectorAll('.custom-select').forEach(selectWrapper => {
  const selected = selectWrapper.querySelector('.custom-select__selected');
  const optionsContainer = selectWrapper.querySelector('.custom-select__options');
  const optionsList = optionsContainer.querySelectorAll('li');

  selected.addEventListener('click', e => {
    selectWrapper.classList.toggle('open');
  });

  optionsList.forEach(option => {
    option.addEventListener('click', () => {
      selected.textContent = option.textContent;
      selected.dataset.value = option.dataset.value;
      selectWrapper.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (!selectWrapper.contains(e.target)) {
      selectWrapper.classList.remove('open');
    }
  });
});

/*----Відео в рекламі----*/

const advOverlay = document.querySelector('.adv__video-overlay');
const advModal = document.querySelector('.adv__modal');
const advModalContent = document.querySelector('.adv__modal-content');
const advModalVideo = document.getElementById('advVideoModal');
const advCloseModal = document.querySelector('.adv__close');

advOverlay.addEventListener('click', () => {
  advModal.classList.add('active');
  setTimeout(() => advModalContent.classList.add('visible'), 10);
  advModalVideo.src = "https://www.youtube.com/embed/EvKueQnsdlw?autoplay=1&rel=0";
});

advCloseModal.addEventListener('click', () => {
  advModal.classList.remove('active');
  advModalContent.classList.remove('visible');
  advModalVideo.src = "";
});

advModal.addEventListener('click', (e) => {
  if (e.target === advModal) {
    advModal.classList.remove('active');
    advModalContent.classList.remove('visible');
    advModalVideo.src = "";
  }
});
