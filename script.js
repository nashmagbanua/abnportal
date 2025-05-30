
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 3 }
  },
  on: {
    slideChange: function () {
      const bgUrl = document.querySelectorAll(".swiper-slide")[this.realIndex].getAttribute("data-bg");
      document.getElementById("background-blur").style.backgroundImage = `url('${bgUrl}')`;
    }
  }
});

// Set initial background
window.addEventListener("load", () => {
  const firstSlide = document.querySelector(".swiper-slide-active");
  const initialBg = firstSlide.getAttribute("data-bg");
  document.getElementById("background-blur").style.backgroundImage = `url('${initialBg}')`;
});
