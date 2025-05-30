
const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 20,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
});

swiper.on('slideChange', () => {
  const activeSlide = document.querySelector('.swiper-slide-active');
  const bg = window.getComputedStyle(activeSlide).backgroundImage;
  document.getElementById('background-blur').style.backgroundImage = bg;
});

window.addEventListener("load", () => {
  const activeSlide = document.querySelector(".swiper-slide-active");
  const bg = window.getComputedStyle(activeSlide).backgroundImage;
  document.getElementById("background-blur").style.backgroundImage = bg;
});
