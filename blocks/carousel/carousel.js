import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

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

    const cells = [...row.children];

    // Assume first cell contains the media (video or image)
    const mediaCell = cells[0];
    const video = mediaCell.querySelector('video');
    const img = mediaCell.querySelector('img');

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const newVideo = document.createElement('video');
      newVideo.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      newVideo.setAttribute('title', video.title);
      newVideo.setAttribute('aria-label', video.ariaLabel);
      newVideo.setAttribute('data-is-autoplay', video.dataset.isAutoplay);
      newVideo.setAttribute('playsinline', '');
      newVideo.setAttribute('preload', 'metadata');
      newVideo.setAttribute('fetchpriority', 'high');
      newVideo.setAttribute('loop', video.loop);
      newVideo.setAttribute('muted', video.muted);
      newVideo.setAttribute('autoplay', video.autoplay);

      const source = document.createElement('source');
      source.setAttribute('src', video.querySelector('source').src);
      source.setAttribute('type', video.querySelector('source').type);
      newVideo.append(source);
      moveInstrumentation(video, newVideo);
      videoWrapper.append(newVideo);

      // Transfer play/pause buttons if they exist
      const playPauseContainer = mediaCell.querySelector('.carousel-position-absolute.carousel-w-100');
      if (playPauseContainer) {
        videoWrapper.append(playPauseContainer.cloneNode(true));
      }

      // Transfer mute/unmute buttons if they exist
      const muteContainer = mediaCell.querySelector('.carousel-position-absolute.carousel-z-2');
      if (muteContainer) {
        videoWrapper.append(muteContainer.cloneNode(true));
      }

      wrapperDiv.append(videoWrapper);
    } else if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      optimizedPic.querySelector('img').setAttribute('loading', img.loading);
      optimizedPic.querySelector('img').setAttribute('fetchpriority', img.fetchpriority);
      optimizedPic.querySelector('img').setAttribute('decoding', img.decoding);
      wrapperDiv.append(optimizedPic);
    }

    // Assume second cell contains the CTA
    const ctaCell = cells[1];
    const ctaLink = ctaCell ? ctaCell.querySelector('a') : null;

    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCtaDiv = document.createElement('div');
      bannerCtaDiv.classList.add('carousel-banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const newCtaLink = document.createElement('a');
      newCtaLink.id = ctaLink.id;
      newCtaLink.classList.add(...ctaLink.classList);
      newCtaLink.href = ctaLink.href;
      newCtaLink.target = ctaLink.target;

      const span = document.createElement('span');
      span.classList.add(...ctaLink.querySelector('span').classList);
      span.textContent = ctaLink.querySelector('span').textContent.trim();
      newCtaLink.append(span);
      moveInstrumentation(ctaLink, newCtaLink);

      textCenterDiv.append(newCtaLink);

      const popUpDiv = ctaLink.closest('.carousel-text-center')?.querySelector('.carousel-pop-up');
      if (popUpDiv) {
        textCenterDiv.append(popUpDiv.cloneNode(true));
      }

      bannerCtaDiv.append(textCenterDiv);
      ctaWrapper.append(bannerCtaDiv);
      wrapperDiv.append(ctaWrapper);
    }

    section.append(wrapperDiv);
    bannerDiv.append(section);
    slide.append(bannerDiv);
    carouselWrapper.append(slide);
  });

  block.textContent = '';

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-swiper', 'carousel-primary-swiper');
  // Transfer attributes from the original carousel-swiper div
  const originalSwiper = block.querySelector('.carousel-swiper');
  if (originalSwiper) {
    [...originalSwiper.attributes].forEach(attr => {
      if (!['class', 'style'].includes(attr.name)) {
        carouselContainer.setAttribute(attr.name, attr.value);
      }
    });
  }

  carouselContainer.append(carouselWrapper);

  // Transfer action buttons (Previous, Next, Pause, Play)
  const actionsDiv = block.querySelector('.carousel-cmp-carousel__actions');
  if (actionsDiv) {
    carouselContainer.append(actionsDiv.cloneNode(true));
  }

  // Transfer swiper navigation buttons (primary-swiper__buttonNext, primary-swiper__buttonPrev)
  const swiperContainerNav = block.querySelector('.carousel-swiper-container');
  if (swiperContainerNav) {
    carouselContainer.append(swiperContainerNav.cloneNode(true));
  }

  // Transfer pagination
  const paginationDiv = block.querySelector('.carousel-swiper-pagination');
  if (paginationDiv) {
    carouselContainer.append(paginationDiv.cloneNode(true));
  }

  block.append(carouselContainer);
}
