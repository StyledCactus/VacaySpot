export let currentIndex = 0

export function showSlide(index) {
  const slider = document.querySelector('.slider')
  const slideWidth = document.querySelector('.slider-container').offsetWidth

  currentIndex = index
  const transformValue = -index * slideWidth
  slider.style.transform = `translateX(${transformValue}px)`
}

export function prevSlide() {
  currentIndex = (currentIndex - 1 + getTotalSlides()) % getTotalSlides()
  showSlide(currentIndex)
}

export function nextSlide() {
  currentIndex = (currentIndex + 1) % getTotalSlides()
  showSlide(currentIndex)
}

export function getTotalSlides() {
  return document.querySelectorAll('.slider img').length
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentIndex)
})