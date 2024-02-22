const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carouselSlide = document.querySelector('.carousel-slide');

let slideIndex = 0;

nextBtn.addEventListener('click', () => {
  slideIndex++;
  showSlides();
});

prevBtn.addEventListener('click', () => {
  slideIndex--;
  showSlides();
});

function showSlides() {
  const slides = document.querySelectorAll('.card1');
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  const offset = -(slideIndex * 100);
  carouselSlide.style.transform = `translateX(${offset}%)`;
}

// Ensure initial responsiveness
window.addEventListener('resize', showSlides);

