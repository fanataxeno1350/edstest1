import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');

  carouselItems.forEach((itemNode) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('swiper-slide');

    const mediaWrapper = document.createElement('div');
    mediaWrapper.classList.add('carousel-media');

    const image = itemNode.querySelector('[data-aue-prop="image"]');
    if (image) {
      if (image.tagName === 'IMG') {
        mediaWrapper.append(createOptimizedPicture(image.src, image.alt));
        moveInstrumentation(image, mediaWrapper);
      } else if (image.tagName === 'VIDEO') {
        const video = document.createElement('video');
        video.setAttribute('autoplay', '');
        video.setAttribute('loop', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'metadata');
        const source = document.createElement('source');
        source.src = image.querySelector('source').src;
        source.type = image.querySelector('source').type;
        video.append(source);
        mediaWrapper.append(video);
        moveInstrumentation(image, mediaWrapper);
      }
    } else {
      // Fallback for video/image if data-aue-prop is missing but asset exists
      const videoLink = itemNode.querySelector('a[href$=".mp4"], a[href$=".webm"]');
      if (videoLink) {
        const video = document.createElement('video');
        video.setAttribute('autoplay', '');
        video.setAttribute('loop', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'metadata');
        const source = document.createElement('source');
        source.src = videoLink.href;
        source.type = `video/${videoLink.href.split('.').pop()}`;
        video.append(source);
        mediaWrapper.append(video);
        moveInstrumentation(videoLink, mediaWrapper);
      } else {
        const imgLink = itemNode.querySelector('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".webp"]');
        if (imgLink) {
          mediaWrapper.append(createOptimizedPicture(imgLink.href, ''));
          moveInstrumentation(imgLink, mediaWrapper);
        }
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-cta');
    const link = itemNode.querySelector('[data-aue-prop="link"]');
    if (link) {
      const linkElement = link.querySelector('a');
      if (linkElement) {
        const newLink = document.createElement('a');
        newLink.href = linkElement.href;
        newLink.textContent = linkElement.textContent.trim();
        newLink.classList.add('button');
        ctaWrapper.append(newLink);
        moveInstrumentation(linkElement, ctaWrapper);
      }
      moveInstrumentation(link, ctaWrapper);
    } else {
      // Fallback for link if data-aue-prop is missing
      const buttonContainer = itemNode.querySelector('.button-container');
      if (buttonContainer) {
        const linkElement = buttonContainer.querySelector('a');
        if (linkElement) {
          const newLink = document.createElement('a');
          newLink.href = linkElement.href;
          newLink.textContent = linkElement.textContent.trim();
          newLink.classList.add('button');
          ctaWrapper.append(newLink);
          moveInstrumentation(linkElement, ctaWrapper);
        }
        moveInstrumentation(buttonContainer, ctaWrapper);
      }
    }

    slideDiv.append(mediaWrapper);
    if (ctaWrapper.children.length > 0) {
      slideDiv.append(ctaWrapper);
    }
    swiperWrapper.append(slideDiv);
    moveInstrumentation(itemNode, slideDiv);
  });

  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add('swiper-navigation');

  const prevButton = document.createElement('button');
  prevButton.classList.add('swiper-button-prev');
  prevButton.setAttribute('aria-label', 'Previous slide');
  navigationDiv.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('swiper-button-next');
  nextButton.setAttribute('aria-label', 'Next slide');
  navigationDiv.append(nextButton);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination');

  carouselWrapper.append(swiperWrapper, navigationDiv, paginationDiv);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
