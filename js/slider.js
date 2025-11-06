
'use strict';

document.addEventListener("DOMContentLoaded", function () {
  // === Рейтинг ===
  const ratingSwiper = new Swiper(".rating__slider", {
    loop: true,
    spaceBetween: 20,
    pagination: {
      el: ".rating__slider .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".rating__slider .swiper-button-next",
      prevEl: ".rating__slider .swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  // === Блог ===
  let blogSwiper;
  const blogSection = document.querySelector('.blog');
  const blogCards = document.querySelector('.blog__cards');
  const breakpoint = window.matchMedia('(max-width: 1024px)');

  // Зберігаємо оригінальний стан DOM
  const originalHTML = blogCards.innerHTML;

  function initBlogSwiper() {
    if (blogSwiper) return;

    blogSection.classList.add('is-slider');

    // Створюємо структуру Swiper
    const wrapper = document.createElement('div');
    wrapper.classList.add('swiper-wrapper');

    const cards = Array.from(blogCards.children);
    cards.forEach(card => {
      card.classList.add('swiper-slide');
      wrapper.appendChild(card);
    });

    blogCards.innerHTML = '';
    blogCards.classList.add('swiper');
    blogCards.appendChild(wrapper);

    const pagination = document.createElement('div');
    pagination.classList.add('swiper-pagination', 'blog__pagination');
    blogCards.appendChild(pagination);

    blogSwiper = new Swiper('.blog__cards', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: '.blog__pagination',
        clickable: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });
  }

  function destroyBlogSwiper() {
    if (!blogSwiper) return;

    blogSwiper.destroy(true, true);
    blogSwiper = null;

    // Відновлюємо початкову структуру без перезавантаження
    blogCards.classList.remove('swiper');
    blogSection.classList.remove('is-slider');
    blogCards.innerHTML = originalHTML;
  }

  function handleBlogMode(e) {
    if (e.matches) {
      initBlogSwiper();
    } else {
      destroyBlogSwiper();
    }
  }

  breakpoint.addEventListener('change', handleBlogMode);
  handleBlogMode(breakpoint);
});


document.addEventListener("DOMContentLoaded", () => {
  // --- Swiper ---
  const gallerySwiper = new Swiper(".gallery__slider", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    pagination: {
      el: ".gallery__slider .swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });

  // --- lightGallery для GRID ---
  const gridGallery = document.querySelector(".gallery__grid");
  if (gridGallery) {
    lightGallery(gridGallery, {
      selector: "a",
      plugins: [lgZoom, lgThumbnail, lgAutoplay, lgFullscreen],
      speed: 400,
      download: false,
      hideBarsDelay: 3000,
      mode: "lg-fade",
    });
  }

  // --- lightGallery для SLIDER ---
  const sliderGallery = document.querySelector(".gallery__slider .swiper-wrapper");
  if (sliderGallery) {
    lightGallery(sliderGallery, {
      selector: "a",
      plugins: [lgZoom, lgThumbnail, lgAutoplay, lgFullscreen],
      speed: 400,
      download: false,
      hideBarsDelay: 3000,
      mode: "lg-fade",
    });
  }
});

