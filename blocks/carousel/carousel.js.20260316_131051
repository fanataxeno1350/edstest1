import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides-container');

  const authoredSlides = block.querySelectorAll('[data-aue-model="carouselItem"]');

  authoredSlides.forEach((slide) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('carousel-slide');

    const videoElement = slide.querySelector('[data-aue-prop="video"]');
    const imageElement = slide.querySelector('[data-aue-prop="image"]');
    const ctaTextElement = slide.querySelector('[data-aue-prop="ctaText"]');
    const linkElement = slide.querySelector('.carousel-banner-cta a');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');

      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');

      const source = document.createElement('source');
      source.src = videoElement.src;
      source.type = videoElement.type || 'video/mp4';
      video.append(source);

      videoWrapper.append(video);
      moveInstrumentation(videoElement, videoWrapper);
      slideWrapper.append(videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      slideWrapper.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (linkElement) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta');

      const link = document.createElement('a');
      link.href = linkElement.href;
      link.textContent = ctaTextElement ? ctaTextElement.textContent : linkElement.textContent.trim();
      if (linkElement.target) {
        link.target = linkElement.target;
      }

      ctaWrapper.append(link);
      if (ctaTextElement) {
        moveInstrumentation(ctaTextElement, link);
      }
      moveInstrumentation(linkElement, ctaWrapper);
      slideWrapper.append(ctaWrapper);
    }

    slidesContainer.append(slideWrapper);
    moveInstrumentation(slide, slideWrapper);
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-button', 'carousel-prev');
  prevButton.setAttribute('aria-label', 'Previous Slide');
  prevButton.textContent = '‹';

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-button', 'carousel-next');
  nextButton.setAttribute('aria-label', 'Next Slide');
  nextButton.textContent = '›';

  carouselWrapper.append(slidesContainer, prevButton, nextButton);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';

  let currentSlide = 0;
  const totalSlides = authoredSlides.length;

  function showSlide(index) {
    slidesContainer.style.transform = `translateX(${-index * 100}%)`;
  }

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  });

  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  });

  showSlide(currentSlide);
}
