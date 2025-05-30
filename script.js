
const swiper = new Swiper('.swiper', {
  effect: 'slide',
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
.greeting-message {
  font-size: 1.1rem;
  text-align: center;
  color: #ffffff;
  margin-top: -10px;
  margin-bottom: 10px;
  text-shadow: 0 0 5px rgba(255,255,255,0.3);
  animation: fadeInDown 0.6s ease-in-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
const greetingEl = document.getElementById("greeting-message");
const hour = new Date().getHours();
let greeting = "";

if (hour < 12) {
  greeting = "Good morning, sir! 👋";
} else if (hour < 18) {
  greeting = "Good afternoon, sir! 👋";
} else {
  greeting = "Good evening, sir! 👋";
}

greetingEl.textContent = greeting;
