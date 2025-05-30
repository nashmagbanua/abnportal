const swiper = new Swiper('.main-swiper', {
  effect: 'slide',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  on: {
    slideChangeTransitionStart: () => {
      const slides = document.querySelectorAll('.swiper-slide');
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
    },
    slideChangeTransitionEnd: () => {
      const activeSlide = document.querySelector('.swiper-slide-active');
      if (activeSlide) activeSlide.classList.add('active');
    }
  }
});
