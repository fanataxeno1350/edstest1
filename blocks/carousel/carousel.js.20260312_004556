import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides-container');

  const items = block.querySelectorAll('[data-aue-model="carouselItem"]');

  items.forEach((itemNode) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const videoSrc = itemNode.querySelector('[data-aue-prop="videoSrc"]');
    const imageSrc = itemNode.querySelector('[data-aue-prop="imageSrc"]');
    const ctaLink = itemNode.querySelector('[data-aue-prop="ctaLink"]');
    const ctaText = itemNode.querySelector('[data-aue-prop="ctaText"]');

    if (videoSrc && videoSrc.querySelector('source')) {
      const videoElement = document.createElement('video');
      videoElement.classList.add('carousel-video');
      videoElement.setAttribute('autoplay', '');
      videoElement.setAttribute('loop', '');
      videoElement.setAttribute('muted', '');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      const sourceElement = videoSrc.querySelector('source');
      if (sourceElement) {
        videoElement.append(sourceElement);
        moveInstrumentation(sourceElement, videoElement);
      }
      slide.append(videoElement);
      moveInstrumentation(videoSrc, slide);
    } else if (imageSrc && imageSrc.querySelector('img')) {
      const imgElement = imageSrc.querySelector('img');
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      slide.append(picture);
      moveInstrumentation(imgElement, picture);
      moveInstrumentation(imageSrc, slide);
    }

    if (ctaLink || ctaText) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta-wrapper');
      const link = document.createElement('a');
      if (ctaLink) {
        link.href = ctaLink.href || ctaLink.textContent.trim();
        moveInstrumentation(ctaLink, link);
      }
      if (ctaText) {
        link.textContent = ctaText.textContent.trim();
        moveInstrumentation(ctaText, link);
      } else if (ctaLink) {
        // Fallback for button text if only link is provided
        link.textContent = new URL(link.href).pathname.split('/').pop().replace(/\.html$/, '').replace(/-/g, ' ');
      }
      if (link.href && link.textContent) {
        ctaWrapper.append(link);
        slide.append(ctaWrapper);
      }
    }

    slidesContainer.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  carouselWrapper.append(slidesContainer);

  // Add navigation buttons
  const navButtons = document.createElement('div');
  navButtons.classList.add('carousel-nav-buttons');

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-prev');
  prevButton.textContent = 'Previous';
  navButtons.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-next');
  nextButton.textContent = 'Next';
  navButtons.append(nextButton);

  carouselWrapper.append(navButtons);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = 'carousel block';
  block.dataset.blockStatus = 'loaded';

  // Basic carousel logic (can be expanded with a proper library like Swiper)
  let currentIndex = 0;
  const slides = slidesContainer.children;
  const totalSlides = slides.length;

  function showSlide(index) {
    slidesContainer.style.transform = `translateX(${-index * 100}%)`;
    Array.from(slides).forEach((slide, i) => {
      if (i === index) {
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.setAttribute('aria-hidden', 'true');
      }
    });
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  });

  showSlide(currentIndex);
}
