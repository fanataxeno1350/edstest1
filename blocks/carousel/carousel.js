import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');

  const wrapper = document.createElement('div');
  wrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides');

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
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');
      const source = document.createElement('source');
      source.src = videoEl.getAttribute('href') || videoEl.textContent.trim();
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);
      slide.append(videoWrapper);
      moveInstrumentation(videoEl, videoWrapper);
    } else if (imageEl) {
      const img = imageEl.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        slide.append(picture);
        moveInstrumentation(imageEl, picture);
      }
    } else {
      // Fallback for image/video not explicitly defined by data-aue-prop
      const mediaLink = itemNode.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".webp"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]');
      if (mediaLink) {
        const mediaUrl = mediaLink.href;
        if (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm')) {
          const videoWrapper = document.createElement('div');
          videoWrapper.classList.add('carousel-video-wrapper');
          const video = document.createElement('video');
          video.setAttribute('controls', '');
          video.setAttribute('playsinline', '');
          video.setAttribute('autoplay', '');
          video.setAttribute('muted', '');
          video.setAttribute('loop', '');
          const source = document.createElement('source');
          source.src = mediaUrl;
          source.type = `video/${mediaUrl.split('.').pop()}`;
          video.append(source);
          videoWrapper.append(video);
          slide.append(videoWrapper);
          moveInstrumentation(mediaLink, videoWrapper);
        } else if (mediaUrl.endsWith('.webp') || mediaUrl.endsWith('.png') || mediaUrl.endsWith('.jpg') || mediaUrl.endsWith('.jpeg')) {
          const picture = createOptimizedPicture(mediaUrl, '');
          slide.append(picture);
          moveInstrumentation(mediaLink, picture);
        }
      }
    }

    if (ctaContainer) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta-wrapper');
      const ctaLink = ctaContainer.querySelector('a');
      if (ctaLink) {
        const newCta = document.createElement('a');
        newCta.href = ctaLink.href;
        newCta.textContent = ctaLink.textContent.trim();
        newCta.className = ctaLink.className;
        ctaWrapper.append(newCta);
        moveInstrumentation(ctaLink, newCta);
      }
      slide.append(ctaWrapper);
      moveInstrumentation(ctaContainer, ctaWrapper);
    }

    slidesContainer.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  wrapper.append(slidesContainer);

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
