import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  const carouselSlides = block.querySelectorAll('[data-aue-model="carouselSlide"]');

  carouselSlides.forEach((slide) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');

    const section = document.createElement('section');
    section.classList.add('banner-section');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('position-relative', 'boing', 'banner-section__wrapper');

    const videoElement = slide.querySelector('[data-aue-prop="video"]');
    const imageElement = slide.querySelector('[data-aue-prop="image"]');
    const ctaLink = slide.querySelector('[data-aue-prop="ctaLink"] a');
    const ctaText = slide.querySelector('[data-aue-prop="ctaText"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');

      const video = document.createElement('video');
      video.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('data-is-autoplay', 'true');
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

      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      // Assuming the SVG content is directly in the text content, otherwise, adjust
      playButton.innerHTML = videoElement.nextElementSibling?.textContent.trim() || ''; // Placeholder, adjust if SVG is separate

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      pauseButton.innerHTML = videoElement.nextElementSibling?.nextElementSibling?.textContent.trim() || ''; // Placeholder

      playPauseWrapper.append(playButton, pauseButton);

      const muteWrapper = document.createElement('div');
      muteWrapper.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      muteButton.innerHTML = videoElement.nextElementSibling?.nextElementSibling?.nextElementSibling?.textContent.trim() || ''; // Placeholder

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      unmuteButton.innerHTML = videoElement.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.textContent.trim() || ''; // Placeholder

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      noAudioButton.innerHTML = videoElement.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.textContent.trim() || ''; // Placeholder

      muteWrapper.append(muteButton, unmuteButton, noAudioButton);

      videoWrapper.append(video, playPauseWrapper, muteWrapper);
      wrapperDiv.append(videoWrapper);
      moveInstrumentation(videoElement, videoWrapper);
    } else if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const optimizedPicture = createOptimizedPicture(img.src, img.alt, true, [{ width: '2000' }]);
        const newImg = optimizedPicture.querySelector('img');
        newImg.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
        newImg.setAttribute('loading', 'eager');
        newImg.setAttribute('fetchpriority', 'high');
        newImg.setAttribute('decoding', 'async');
        wrapperDiv.append(optimizedPicture);
        moveInstrumentation(imageElement, optimizedPicture);
      }
    }

    if (ctaLink || ctaText) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('text-center');

      if (ctaLink) {
        const newCtaLink = document.createElement('a');
        newCtaLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate unique ID
        newCtaLink.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
        newCtaLink.setAttribute('data-link-region', 'CTA');
        newCtaLink.setAttribute('data-is-internal', 'true');
        newCtaLink.setAttribute('data-enable-gating', 'false');
        newCtaLink.href = ctaLink.href;
        newCtaLink.target = ctaLink.target || '_self';

        const span = document.createElement('span');
        span.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
        span.textContent = ctaLink.textContent.trim();
        newCtaLink.append(span);

        textCenterDiv.append(newCtaLink);
        moveInstrumentation(ctaLink, newCtaLink);
      } else if (ctaText) {
        const newCtaText = document.createElement('div');
        newCtaText.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
        newCtaText.innerHTML = ctaText.innerHTML;
        textCenterDiv.append(newCtaText);
        moveInstrumentation(ctaText, newCtaText);
      }

      // Add pop-up div if needed (empty as per HTML)
      const popUpDiv = document.createElement('div');
      popUpDiv.classList.add('pop-up', 'd-none');
      popUpDiv.innerHTML = '<input type="hidden" class="popup-message">\n<input type="hidden" class="proceed-button-label">\n<input type="hidden" class="cancel-button-label">\n<input type="hidden" class="background-color">';
      textCenterDiv.append(popUpDiv);

      bannerCta.append(textCenterDiv);
      ctaWrapper.append(bannerCta);
      wrapperDiv.append(ctaWrapper);
    }

    section.append(wrapperDiv);
    swiperSlide.append(section);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(slide, swiperSlide);
  });

  // Clear the block and append the new structure
  block.textContent = '';

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-primary-swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  // Add data attributes from the original block if they exist
  if (block.dataset.swiperId) carouselContainer.dataset.swiperId = block.dataset.swiperId;
  if (block.id) carouselContainer.id = block.id;
  carouselContainer.setAttribute('role', 'group');
  carouselContainer.setAttribute('aria-live', 'polite');
  carouselContainer.setAttribute('aria-roledescription', 'carousel');
  carouselContainer.setAttribute('data-is-autoplay', block.dataset.isAutoplay || 'true');
  carouselContainer.setAttribute('data-delay', block.dataset.delay || '5000');
  carouselContainer.setAttribute('data-autopause-disabled', block.dataset.autopauseDisabled || 'true');
  carouselContainer.setAttribute('data-is-loop', block.dataset.isLoop || 'false');
  carouselContainer.setAttribute('data-placeholder-text', block.dataset.placeholderText || 'false');

  carouselContainer.append(swiperWrapper);

  // Add navigation and pagination elements (empty for now, will be populated by swiper.js)
  const navDiv = document.createElement('div');
  navDiv.classList.add('swiper-container');
  navDiv.innerHTML = `
    <div>
        <button class="carousel-primary-swiper__buttonNext position-absolute top-50 swiper-buttonBg d-none d-sm-block cursor-pointer analytics_cta_click disabled" disabled="">
            /content/dam/aemigrate/uploaded-folder/image/1773741306252.svg+xml
        </button>
    </div>
    <div>
        <button class="carousel-primary-swiper__buttonPrev position-absolute top-50 swiper-buttonBg d-none d-sm-block cursor-pointer analytics_cta_click">
            /content/dam/aemigrate/uploaded-folder/image/1773741306355.svg+xml
        </button>
    </div>
  `;

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('carousel-swiper-pagination', 'carousel-pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');

  carouselContainer.append(navDiv, paginationDiv);

  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
