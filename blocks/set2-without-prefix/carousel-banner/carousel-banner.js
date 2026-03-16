import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  const bannerItems = block.querySelectorAll('[data-aue-model="banner"]');

  bannerItems.forEach((bannerItem) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

    const videoElement = bannerItem.querySelector('[data-aue-prop="video"]');
    const imageElement = bannerItem.querySelector('[data-aue-prop="image"]');
    const ctaLinkElement = bannerItem.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextElement = bannerItem.querySelector('[data-aue-prop="ctaText"]');

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
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.setAttribute('src', videoElement.textContent.trim());
      source.setAttribute('type', 'video/mp4');

      video.append(source);
      videoWrapper.append(video);

      const controlsDiv = document.createElement('div');
      controlsDiv.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      playButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848418.svg+xml" alt="Play">'; // Placeholder SVG

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      pauseButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848469.svg+xml" alt="Pause">'; // Placeholder SVG

      controlsDiv.append(playButton, pauseButton);
      videoWrapper.append(controlsDiv);

      const muteIconDiv = document.createElement('div');
      muteIconDiv.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      muteButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848534.svg+xml" alt="Mute">'; // Placeholder SVG

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      unmuteButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848607.svg+xml" alt="Unmute">'; // Placeholder SVG

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      noAudioButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848680.svg+xml" alt="No Audio">'; // Placeholder SVG

      muteIconDiv.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteIconDiv);

      bannerWrapper.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
      picture.querySelector('img').setAttribute('loading', 'eager');
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('decoding', 'async');
      bannerWrapper.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('banner-cta');

    if (ctaLinkElement && ctaTextElement) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('text-center');

      const link = document.createElement('a');
      link.setAttribute('href', ctaLinkElement.textContent.trim());
      link.setAttribute('target', '_blank');
      link.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');

      const span = document.createElement('span');
      span.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
      span.textContent = ctaTextElement.textContent.trim();

      link.append(span);
      textCenterDiv.append(link);
      bannerCta.append(textCenterDiv);

      moveInstrumentation(ctaLinkElement, link);
      moveInstrumentation(ctaTextElement, span);
    }

    ctaWrapper.append(bannerCta);
    bannerWrapper.append(ctaWrapper);
    bannerSection.append(bannerWrapper);
    swiperSlide.append(bannerSection);
    swiperWrapper.append(swiperSlide);

    moveInstrumentation(bannerItem, swiperSlide);
  });

  const mainDiv = document.createElement('div');
  mainDiv.classList.add('position-relative');

  const swiperDiv = document.createElement('div');
  swiperDiv.classList.add('swiper', 'primary-swiper');
  swiperDiv.setAttribute('data-is-autoplay', 'true');
  swiperDiv.setAttribute('data-delay', '5000');
  swiperDiv.setAttribute('data-autopause-disabled', 'true');
  swiperDiv.setAttribute('data-is-loop', 'false');
  swiperDiv.setAttribute('data-placeholder-text', 'false');

  swiperDiv.append(swiperWrapper);

  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('swiper-container');

  const nextButtonDiv = document.createElement('div');
  const nextButton = document.createElement('button');
  nextButton.classList.add('primary-swiper__buttonNext', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  nextButton.setAttribute('disabled', '');
  nextButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848767.svg+xml" alt="Next">'; // Placeholder SVG
  nextButtonDiv.append(nextButton);

  const prevButtonDiv = document.createElement('div');
  const prevButton = document.createElement('button');
  prevButton.classList.add('primary-swiper__buttonPrev', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  prevButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773679848830.svg+xml" alt="Previous">'; // Placeholder SVG
  prevButtonDiv.append(prevButton);

  swiperNavContainer.append(nextButtonDiv, prevButtonDiv);
  swiperDiv.append(swiperNavContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'primary-swiper-pagination', 'pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute');
  swiperDiv.append(paginationDiv);

  mainDiv.append(swiperDiv);

  block.textContent = '';
  block.append(mainDiv);
  block.className = 'carousel-banner block';
  block.dataset.blockStatus = 'loaded';
}