import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper', 'carousel-primary-swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiperContainer.setAttribute('role', 'group');
  swiperContainer.setAttribute('aria-live', 'polite');
  swiperContainer.setAttribute('aria-roledescription', 'carousel');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'z-0');

  carouselItems.forEach((itemNode) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

    const videoEl = itemNode.querySelector('[data-aue-prop="video"]');
    const imageEl = itemNode.querySelector('[data-aue-prop="image"]');
    const linkContainer = itemNode.querySelector('[data-aue-prop="link"]');

    if (videoEl) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('banner-video-wrapper');

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
      source.setAttribute('src', videoEl.getAttribute('href') || videoEl.textContent.trim());
      source.setAttribute('type', 'video/mp4');
      video.append(source);

      const controlsWrapper = document.createElement('div');
      controlsWrapper.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('d-none', 'banner-video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      // Assuming play button content is an SVG or text, extract it.
      // For now, using placeholder as actual content is not in AUE prop
      playButton.textContent = 'Play';

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('d-block', 'banner-video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      // Assuming pause button content is an SVG or text, extract it.
      pauseButton.textContent = 'Pause';

      controlsWrapper.append(playButton, pauseButton);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'banner-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('banner-video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      muteButton.textContent = 'Mute';

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('banner-video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      unmuteButton.textContent = 'Unmute';

      const noAudioIcon = document.createElement('button');
      noAudioIcon.setAttribute('type', 'button');
      noAudioIcon.classList.add('banner-video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      noAudioIcon.textContent = 'No Audio';

      muteIconWrapper.append(muteButton, unmuteButton, noAudioIcon);

      videoWrapper.append(video, controlsWrapper, muteIconWrapper);
      bannerWrapper.append(videoWrapper);
      moveInstrumentation(videoEl, videoWrapper);
    } else if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt, true, [{ width: '2000' }]);
      picture.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
      bannerWrapper.append(picture);
      moveInstrumentation(imageEl, picture);
    }

    if (linkContainer) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('text-center');

      const link = linkContainer.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.id = link.id;
        newLink.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
        newLink.setAttribute('data-link-region', link.getAttribute('data-link-region'));
        newLink.setAttribute('data-is-internal', link.getAttribute('data-is-internal'));
        newLink.setAttribute('data-enable-gating', link.getAttribute('data-enable-gating'));
        newLink.href = link.href;
        newLink.target = link.target;

        const span = document.createElement('span');
        span.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
        span.textContent = link.textContent.trim();
        newLink.append(span);

        textCenterDiv.append(newLink);
        moveInstrumentation(link, newLink);
      }

      const popUpDiv = document.createElement('div');
      popUpDiv.classList.add('pop-up', 'd-none');
      popUpDiv.innerHTML = `
        <input type="hidden" class="popup-message">
        <input type="hidden" class="proceed-button-label">
        <input type="hidden" class="cancel-button-label">
        <input type="hidden" class="background-color">
      `;
      textCenterDiv.append(popUpDiv);

      bannerCta.append(textCenterDiv);
      ctaWrapper.append(bannerCta);
      bannerWrapper.append(ctaWrapper);
      moveInstrumentation(linkContainer, ctaWrapper);
    }

    bannerSection.append(bannerWrapper);
    slide.append(bannerSection);
    swiperWrapper.append(slide);
    moveInstrumentation(itemNode, slide);
  });

  swiperContainer.append(swiperWrapper);

  // Add navigation and pagination (simplified, as their content is not in AUE props)
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('cmp-carousel__actions');
  actionsDiv.innerHTML = `
    <button class="cmp-carousel__action cmp-carousel__action--previous" type="button" aria-label="Previous" data-cmp-hook-carousel="previous">
        <span class="cmp-carousel__action-icon"></span>
        <span class="cmp-carousel__action-text">Previous</span>
    </button>
    <button class="cmp-carousel__action cmp-carousel__action--next" type="button" aria-label="Next" data-cmp-hook-carousel="next">
        <span class="cmp-carousel__action-icon"></span>
        <span class="cmp-carousel__action-text">Next</span>
    </button>
    <button class="cmp-carousel__action cmp-carousel__action--pause" type="button" aria-label="Pause" data-cmp-hook-carousel="pause">
        <span class="cmp-carousel__action-icon"></span>
        <span class="cmp-carousel__action-text">Pause</span>
    </button>
    <button class="cmp-carousel__action cmp-carousel__action--play cmp-carousel__action--disabled" type="button" aria-label="Play" data-cmp-hook-carousel="play">
        <span class="cmp-carousel__action-icon"></span>
        <span class="cmp-carousel__action-text">Play</span>
    </button>
  `;
  swiperContainer.append(actionsDiv);

  const carouselSwiperContainer = document.createElement('div');
  carouselSwiperContainer.classList.add('carousel-swiper-container');
  carouselSwiperContainer.innerHTML = `
    <div>
        <button class="carousel-primary-swiper__buttonNext position-absolute top-50 swiper-buttonBg d-none d-sm-block cursor-pointer analytics_cta_click disabled" disabled="">
            /content/dam/aemigrate/uploaded-folder/image/1773811982561.svg+xml
        </button>
    </div>
    <div>
        <button class="carousel-primary-swiper__buttonPrev position-absolute top-50 swiper-buttonBg d-none d-sm-block cursor-pointer analytics_cta_click">
            /content/dam/aemigrate/uploaded-folder/image/1773811982657.svg+xml
        </button>
    </div>
  `;
  swiperContainer.append(carouselSwiperContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  paginationDiv.innerHTML = `<span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>`;
  swiperContainer.append(paginationDiv);

  wrapper.append(swiperContainer);

  block.textContent = '';
  block.append(wrapper);
  block.className = `carousel block`; // Ensure the block class is set correctly
  block.dataset.blockStatus = 'loaded';
}
