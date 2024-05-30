export let currentIndex = 0;

export function showSlide(index) {
  const slider = document.querySelector('.slider');
  const slideContainer = document.querySelector('.slider-container'); 

  if (!slider) { 
    console.error('Slider element not found');
    return;
  }

  if (!slideContainer) {
    console.error('Slider container element not found');
    return;
  }

  const slideWidth = slideContainer.offsetWidth;

  currentIndex = index;
  const transformValue = -index * slideWidth;
  slider.style.transform = `translateX(${transformValue}px)`;
}

export function prevSlide() {
  currentIndex = (currentIndex - 1 + getTotalSlides()) % getTotalSlides();
  showSlide(currentIndex);
}

export function nextSlide() {
  currentIndex = (currentIndex + 1) % getTotalSlides();
  showSlide(currentIndex);
}

export function getTotalSlides() {
  return document.querySelectorAll('.slider img').length;
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentIndex);
});
