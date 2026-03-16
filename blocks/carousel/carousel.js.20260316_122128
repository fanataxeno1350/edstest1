import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('position-relative');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper', 'primary-swiper', 'primary-swiper-carousel', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiperContainer.setAttribute('role', 'group');
  swiperContainer.setAttribute('aria-live', 'polite');
  swiperContainer.setAttribute('aria-roledescription', 'carousel');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'primary-swiper-wrapper', 'z-0');

  const slideItems = block.querySelectorAll('[data-aue-model="slide"]');

  slideItems.forEach((slideNode) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');

    const bannerSectionWrapper = document.createElement('div');
    bannerSectionWrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

    const videoElement = slideNode.querySelector('[data-aue-prop="video"]');
    const imageElement = slideNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkElement = slideNode.querySelector('[data-aue-prop="ctaLink"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');

      const video = document.createElement('video');
      video.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('autoplay', 'true');
      video.setAttribute('muted', 'true');
      video.setAttribute('loop', 'false');

      const source = document.createElement('source');
      source.setAttribute('src', videoElement.textContent.trim());
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      videoWrapper.append(video);

      const controlsWrapper = document.createElement('div');
      controlsWrapper.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      // Assuming the SVG path is the text content of the original button
      playButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848418.svg" alt="Play">';

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      pauseButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848469.svg" alt="Pause">';

      controlsWrapper.append(playButton, pauseButton);
      videoWrapper.append(controlsWrapper);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      muteButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848534.svg" alt="Mute">';

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      unmuteButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848607.svg" alt="Unmute">';

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      noAudioButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848680.svg" alt="No Audio">';

      muteIconWrapper.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteIconWrapper);

      bannerSectionWrapper.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
      picture.querySelector('img').setAttribute('loading', 'eager');
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('decoding', 'async');
      bannerSectionWrapper.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

    const bannerCtaDiv = document.createElement('div');
    bannerCtaDiv.classList.add('banner-cta');

    if (ctaLinkElement) {
      const linkContainer = document.createElement('div');
      linkContainer.classList.add('text-center');

      const link = document.createElement('a');
      link.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');
      link.setAttribute('href', ctaLinkElement.querySelector('a')?.href || '#');
      link.setAttribute('target', '_blank');

      const span = document.createElement('span');
      span.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
      span.textContent = ctaLinkElement.querySelector('a')?.textContent || '';
      link.append(span);
      linkContainer.append(link);
      bannerCtaDiv.append(linkContainer);
      moveInstrumentation(ctaLinkElement, bannerCtaDiv);
    }

    ctaWrapper.append(bannerCtaDiv);
    bannerSectionWrapper.append(ctaWrapper);
    bannerSection.append(bannerSectionWrapper);
    bannerDiv.append(bannerSection);
    swiperSlide.append(bannerDiv);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(slideNode, swiperSlide);
  });

  swiperContainer.append(swiperWrapper);

  // Add navigation buttons and pagination (simplified, as their content is not authored)
  const navContainer = document.createElement('div');
  navContainer.classList.add('swiper-container');

  const nextButtonDiv = document.createElement('div');
  const nextButton = document.createElement('button');
  nextButton.classList.add('primary-swiper__buttonNext', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  // Assuming SVG content or path for the button
  nextButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848767.svg" alt="Next">';
  nextButtonDiv.append(nextButton);

  const prevButtonDiv = document.createElement('div');
  const prevButton = document.createElement('button');
  prevButton.classList.add('primary-swiper__buttonPrev', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  // Assuming SVG content or path for the button
  prevButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848830.svg" alt="Previous">';
  prevButtonDiv.append(prevButton);

  navContainer.append(nextButtonDiv, prevButtonDiv);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'primary-swiper-pagination', 'pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');

  swiperContainer.append(navContainer, paginationDiv);

  carouselWrapper.append(swiperContainer);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = 'carousel block'; // Ensure block.dataset.blockName is used if available
  block.dataset.blockStatus = 'loaded';
}
