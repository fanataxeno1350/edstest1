import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slides = [...block.querySelectorAll('[data-aue-model="slide"]')];

  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slideContainer = document.createElement('div');
  slideContainer.classList.add('slide-container');

  slides.forEach((slide) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('carousel-slide');

    const videoElement = slide.querySelector('[data-aue-prop="video"]');
    const imageElement = slide.querySelector('[data-aue-prop="image"]');
    const ctaLinkContainer = slide.querySelector('[data-aue-prop="ctaLink"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      const source = document.createElement('source');
      source.setAttribute('src', videoElement.getAttribute('src'));
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      videoWrapper.append(video);
      slideWrapper.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      slideWrapper.append(picture);
      moveInstrumentation(imageElement, picture);
    } else {
      // Fallback for image/video if not found by data-aue-prop
      const mediaLink = slide.querySelector('a[href$=".mp4"], a[href$=".jpeg"], a[href$=".jpg"], a[href$=".png"], a[href$=".webp"]');
      if (mediaLink) {
        const mediaUrl = mediaLink.href;
        if (mediaUrl.endsWith('.mp4')) {
          const videoWrapper = document.createElement('div');
          videoWrapper.classList.add('video-wrapper');
          const video = document.createElement('video');
          video.setAttribute('controls', '');
          video.setAttribute('autoplay', '');
          video.setAttribute('loop', '');
          video.setAttribute('muted', '');
          video.setAttribute('playsinline', '');
          const source = document.createElement('source');
          source.setAttribute('src', mediaUrl);
          source.setAttribute('type', 'video/mp4');
          video.append(source);
          videoWrapper.append(video);
          slideWrapper.append(videoWrapper);
          moveInstrumentation(mediaLink, videoWrapper);
        } else {
          const picture = createOptimizedPicture(mediaUrl, mediaLink.textContent || 'Carousel image');
          slideWrapper.append(picture);
          moveInstrumentation(mediaLink, picture);
        }
      }
    }

    if (ctaLinkContainer) {
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');
      const ctaLink = ctaLinkContainer.querySelector('a');
      if (ctaLink) {
        const newCta = document.createElement('a');
        newCta.href = ctaLink.href;
        newCta.textContent = ctaLink.textContent.trim();
        newCta.className = ctaLink.className;
        buttonContainer.append(newCta);
        slideWrapper.append(buttonContainer);
        moveInstrumentation(ctaLink, newCta);
      }
      moveInstrumentation(ctaLinkContainer, buttonContainer);
    }

    slideContainer.append(slideWrapper);
    moveInstrumentation(slide, slideWrapper);
  });

  carouselWrapper.append(slideContainer);

  // Add navigation buttons
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-button', 'carousel-prev');
  prevButton.textContent = 'Previous';
  carouselWrapper.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-button', 'carousel-next');
  nextButton.textContent = 'Next';
  carouselWrapper.append(nextButton);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = 'carousel block';
  block.dataset.blockStatus = 'loaded';

  // Basic carousel logic (for demonstration, can be enhanced with a library)
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel() {
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  updateCarousel(); // Initialize position
}
