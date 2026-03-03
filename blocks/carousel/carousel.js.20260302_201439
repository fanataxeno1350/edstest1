import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-primary-swiper', 'carousel-primary-swiper-carousel-419d8524f7', 'carousel-swiper-initialized', 'carousel-swiper-horizontal', 'carousel-swiper-backface-hidden');
  carouselWrapper.setAttribute('role', 'group');
  carouselWrapper.setAttribute('aria-live', 'polite');
  carouselWrapper.setAttribute('aria-roledescription', 'carousel');
  carouselWrapper.setAttribute('data-is-autoplay', 'true');
  carouselWrapper.setAttribute('data-delay', '5000');
  carouselWrapper.setAttribute('data-autopause-disabled', 'true');
  carouselWrapper.setAttribute('data-is-loop', 'false');
  carouselWrapper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('carousel-swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  [...block.children].forEach((row) => {
    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.classList.add('carousel-swiper-slide', 'carousel-primary-swiper-slide');
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoCell = row.children[0]; // Assuming video is the first cell
    const imageCell = row.children[1]; // Assuming image is the second cell
    const ctaCell = row.children[2]; // Assuming cta is the third cell

    const video = videoCell ? videoCell.querySelector('video') : null;
    const image = imageCell ? imageCell.querySelector('img') : null;
    const ctaLink = ctaCell ? ctaCell.querySelector('a') : null;

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const newVideo = document.createElement('video');
      newVideo.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      newVideo.setAttribute('title', video.getAttribute('title'));
      newVideo.setAttribute('aria-label', video.getAttribute('aria-label'));
      newVideo.setAttribute('data-is-autoplay', video.getAttribute('data-is-autoplay'));
      newVideo.setAttribute('playsinline', '');
      newVideo.setAttribute('preload', 'metadata');
      newVideo.setAttribute('fetchpriority', 'high');
      newVideo.setAttribute('loop', video.getAttribute('loop'));
      newVideo.setAttribute('muted', video.getAttribute('muted'));
      newVideo.setAttribute('autoplay', video.getAttribute('autoplay'));

      const source = document.createElement('source');
      source.setAttribute('src', video.querySelector('source').getAttribute('src'));
      source.setAttribute('type', video.querySelector('source').getAttribute('type'));
      newVideo.append(source);
      moveInstrumentation(video, newVideo);
      videoWrapper.append(newVideo);

      // Add play/pause buttons (simplified, actual SVG handling might be more complex)
      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playButton.innerHTML = videoCell.querySelector('.carousel-icon-play').innerHTML; // Transfer SVG content
      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      pauseButton.innerHTML = videoCell.querySelector('.carousel-icon-pause').innerHTML; // Transfer SVG content
      playPauseWrapper.append(playButton, pauseButton);
      videoWrapper.append(playPauseWrapper);

      // Add mute/unmute buttons
      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteButton.innerHTML = videoCell.querySelector('.carousel-icon-mute') ? videoCell.querySelector('.carousel-icon-mute').innerHTML : ''; // Transfer SVG content
      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      unmuteButton.innerHTML = videoCell.querySelector('.carousel-icon-unmute') ? videoCell.querySelector('.carousel-icon-unmute').innerHTML : ''; // Transfer SVG content
      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      noAudioButton.innerHTML = videoCell.querySelector('.carousel-no-audio-icon') ? videoCell.querySelector('.carousel-no-audio-icon').innerHTML : ''; // Transfer SVG content
      muteIconWrapper.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteIconWrapper);

      wrapperDiv.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, image.alt);
      optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      optimizedPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', 'async');
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      wrapperDiv.append(optimizedPic);
    }

    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');
      const bannerCtaDiv = document.createElement('div');
      bannerCtaDiv.classList.add('carousel-banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const newCtaLink = document.createElement('a');
      newCtaLink.id = ctaLink.id;
      newCtaLink.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      newCtaLink.setAttribute('data-link-region', ctaLink.getAttribute('data-link-region'));
      newCtaLink.setAttribute('data-is-internal', ctaLink.getAttribute('data-is-internal'));
      newCtaLink.setAttribute('data-enable-gating', ctaLink.getAttribute('data-enable-gating'));
      newCtaLink.href = ctaLink.href;
      newCtaLink.target = ctaLink.target;

      const span = document.createElement('span');
      span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      span.textContent = ctaLink.textContent.trim();
      newCtaLink.append(span);
      moveInstrumentation(ctaLink, newCtaLink);
      textCenterDiv.append(newCtaLink);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popupDiv.innerHTML = ctaCell.querySelector('.carousel-pop-up').innerHTML; // Transfer inner HTML for hidden inputs
      textCenterDiv.append(popupDiv);

      bannerCtaDiv.append(textCenterDiv);
      ctaWrapper.append(bannerCtaDiv);
      wrapperDiv.append(ctaWrapper);
    }

    section.append(wrapperDiv);
    bannerDiv.append(section);
    slide.append(bannerDiv);
    swiperWrapper.append(slide);
  });

  carouselWrapper.append(swiperWrapper);

  // Add actions (Previous, Next, Pause, Play buttons)
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('carousel-cmp-carousel__actions');
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('data-cmp-hook-carousel', 'previous');
  prevButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Previous</span>';

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('data-cmp-hook-carousel', 'next');
  nextButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Next</span>';

  const pauseButton = document.createElement('button');
  pauseButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--pause');
  pauseButton.setAttribute('type', 'button');
  pauseButton.setAttribute('aria-label', 'Pause');
  pauseButton.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Pause</span>';

  const playButton = document.createElement('button');
  playButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--play', 'carousel-cmp-carousel__action--disabled');
  playButton.setAttribute('type', 'button');
  playButton.setAttribute('aria-label', 'Play');
  playButton.setAttribute('data-cmp-hook-carousel', 'play');
  playButton.setAttribute('disabled', '');
  playButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Play</span>';

  actionsDiv.append(prevButton, nextButton, pauseButton, playButton);
  carouselWrapper.append(actionsDiv);

  // Add navigation buttons (swiper-container)
  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('carousel-swiper-container');

  const nextNavDiv = document.createElement('div');
  const nextNavButton = document.createElement('button');
  nextNavButton.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click', 'carousel-disabled');
  nextNavButton.setAttribute('disabled', '');
  nextNavButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772509295138.svg+xml'; // Assuming this is an SVG string or path
  nextNavDiv.append(nextNavButton);

  const prevNavDiv = document.createElement('div');
  const prevNavButton = document.createElement('button');
  prevNavButton.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  prevNavButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772509295158.svg+xml'; // Assuming this is an SVG string or path
  prevNavDiv.append(prevNavButton);

  swiperNavContainer.append(nextNavDiv, prevNavDiv);
  carouselWrapper.append(swiperNavContainer);

  // Add pagination
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('carousel-swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'carousel-swiper-pagination-clickable', 'carousel-swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');
  // Dynamically add bullets based on the number of slides
  [...block.children].forEach((_, index) => {
    const bullet = document.createElement('span');
    bullet.classList.add('carousel-swiper-pagination-bullet');
    if (index === 0) { // Assuming first slide is active initially
      bullet.classList.add('carousel-swiper-pagination-bullet-active');
    }
    paginationDiv.append(bullet);
  });
  carouselWrapper.append(paginationDiv);

  block.textContent = '';
  const outerWrapper = document.createElement('div');
  outerWrapper.classList.add('carousel-position-relative');
  outerWrapper.append(carouselWrapper);
  block.append(outerWrapper);
}
