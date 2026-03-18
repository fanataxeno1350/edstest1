import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides');

  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');
  carouselItems.forEach((itemNode) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const videoEl = itemNode.querySelector('[data-aue-prop="video"]');
    const imageEl = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaContainer = itemNode.querySelector('[data-aue-prop="cta"]');

    if (videoEl) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');

      const source = document.createElement('source');
      source.src = videoEl.href || videoEl.textContent.trim();
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);
      slide.append(videoWrapper);
      moveInstrumentation(videoEl, videoWrapper);
    } else if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt);
      slide.append(picture);
      moveInstrumentation(imageEl, picture);
    }

    if (ctaContainer) {
      const ctaLink = ctaContainer.querySelector('a');
      if (ctaLink) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('carousel-cta');
        const newCtaLink = document.createElement('a');
        newCtaLink.href = ctaLink.href;
        newCtaLink.textContent = ctaLink.textContent.trim();
        // Copy over relevant classes from the original link if needed
        newCtaLink.className = 'button primary'; // Example, adjust as per design
        buttonWrapper.append(newCtaLink);
        slide.append(buttonWrapper);
        moveInstrumentation(ctaLink, newCtaLink);
      }
      moveInstrumentation(ctaContainer, slide);
    }

    slidesContainer.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  carouselWrapper.append(slidesContainer);

  // Add navigation buttons (example, adjust as per design)
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-button', 'carousel-button-prev');
  prevButton.textContent = 'Previous';
  carouselWrapper.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-button', 'carousel-button-next');
  nextButton.textContent = 'Next';
  carouselWrapper.append(nextButton);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';

  // Basic carousel functionality (for demonstration, a real carousel would use a library)
  let currentIndex = 0;
  const slides = slidesContainer.children;

  function showSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    }
    for (let i = 0; i < slides.length; i += 1) {
      slides[i].style.display = 'none';
    }
    slides[currentIndex].style.display = 'block';
  }

  prevButton.addEventListener('click', () => {
    currentIndex -= 1;
    showSlide(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex += 1;
    showSlide(currentIndex);
  });

  showSlide(currentIndex);
}
