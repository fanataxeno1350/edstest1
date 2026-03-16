import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides-container');

  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');

  carouselItems.forEach((itemNode) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const videoElement = itemNode.querySelector('[data-aue-prop="video"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkElement = itemNode.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextElement = itemNode.querySelector('[data-aue-prop="ctaText"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');

      const source = document.createElement('source');
      source.setAttribute('src', videoElement.src || videoElement.href);
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      videoWrapper.append(video);
      slide.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      slide.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    if (ctaLinkElement || ctaTextElement) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta');
      const link = document.createElement('a');
      link.href = ctaLinkElement?.href || '#';
      link.textContent = ctaTextElement?.textContent || 'Learn More';
      link.classList.add('button');
      ctaWrapper.append(link);
      slide.append(ctaWrapper);
      if (ctaLinkElement) moveInstrumentation(ctaLinkElement, link);
      if (ctaTextElement) moveInstrumentation(ctaTextElement, link);
    }

    slidesContainer.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  carouselWrapper.append(slidesContainer);

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-nav', 'carousel-prev');
  prevButton.textContent = 'Previous';
  carouselWrapper.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-nav', 'carousel-next');
  nextButton.textContent = 'Next';
  carouselWrapper.append(nextButton);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';

  let currentIndex = 0;
  const slides = slidesContainer.children;
  const totalSlides = slides.length;

  function showSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  showSlide(0);
}