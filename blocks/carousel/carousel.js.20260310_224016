import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('carousel-swiper-wrapper');

  [...block.children].forEach((row) => {
    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.classList.add('carousel-swiper-slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const sectionWrapper = document.createElement('div');
    sectionWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const video = row.querySelector('video');
    const img = row.querySelector('img');
    const ctaLink = row.querySelector('.carousel-banner-cta a');

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const newVideo = document.createElement('video');
      newVideo.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      newVideo.title = video.title;
      newVideo.ariaLabel = video.ariaLabel;
      newVideo.setAttribute('data-is-autoplay', video.dataset.isAutoplay);
      newVideo.playsInline = video.playsInline;
      newVideo.preload = video.preload;
      newVideo.fetchPriority = video.fetchPriority;
      newVideo.loop = video.loop;
      newVideo.muted = video.muted;
      newVideo.autoplay = video.autoplay;

      const source = document.createElement('source');
      source.src = video.querySelector('source').src;
      source.type = video.querySelector('source').type;
      newVideo.append(source);
      videoWrapper.append(newVideo);

      // Transfer play/pause and mute/unmute buttons if they exist
      const playPauseWrapper = row.querySelector('.carousel-position-absolute.carousel-w-100.carousel-h-100');
      if (playPauseWrapper) {
        videoWrapper.append(playPauseWrapper.cloneNode(true));
      }
      const muteIconWrapper = row.querySelector('.carousel-position-absolute.carousel-z-2');
      if (muteIconWrapper) {
        videoWrapper.append(muteIconWrapper.cloneNode(true));
      }

      sectionWrapper.append(videoWrapper);
    } else if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      optimizedPic.querySelector('img').loading = img.loading;
      optimizedPic.querySelector('img').fetchPriority = img.fetchPriority;
      optimizedPic.querySelector('img').decoding = img.decoding;
      sectionWrapper.append(optimizedPic);
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
      newCtaLink.setAttribute('data-link-region', ctaLink.dataset.linkRegion);
      newCtaLink.setAttribute('data-is-internal', ctaLink.dataset.isInternal);
      newCtaLink.setAttribute('data-enable-gating', ctaLink.dataset.enableGating);
      newCtaLink.href = ctaLink.href;
      newCtaLink.target = ctaLink.target;

      const span = document.createElement('span');
      span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      span.textContent = ctaLink.querySelector('.carousel-cmp-button__text').textContent.trim();
      newCtaLink.append(span);
      textCenterDiv.append(newCtaLink);

      // Transfer pop-up if it exists
      const popupDiv = row.querySelector('.carousel-pop-up');
      if (popupDiv) {
        textCenterDiv.append(popupDiv.cloneNode(true));
      }

      bannerCtaDiv.append(textCenterDiv);
      ctaWrapper.append(bannerCtaDiv);
      sectionWrapper.append(ctaWrapper);
    }

    section.append(sectionWrapper);
    bannerDiv.append(section);
    swiperSlide.append(bannerDiv);
    swiperWrapper.append(swiperSlide);
  });

  carouselWrapper.append(swiperWrapper);

  // Transfer carousel actions (prev/next/pause/play buttons)
  const actionsDiv = block.querySelector('.carousel-cmp-carousel__actions');
  if (actionsDiv) {
    carouselWrapper.append(actionsDiv.cloneNode(true));
  }

  // Transfer swiper container (next/prev buttons)
  const swiperContainerDiv = block.querySelector('.carousel-swiper-container');
  if (swiperContainerDiv) {
    carouselWrapper.append(swiperContainerDiv.cloneNode(true));
  }

  // Transfer swiper pagination
  const paginationDiv = block.querySelector('.carousel-swiper-pagination');
  if (paginationDiv) {
    carouselWrapper.append(paginationDiv.cloneNode(true));
  }

  // Set attributes from the original block
  carouselWrapper.classList.add('carousel-swiper', 'carousel-primary-swiper', 'carousel-swiper-initialized', 'carousel-swiper-horizontal', 'carousel-swiper-backface-hidden');
  carouselWrapper.setAttribute('data-swiper-id', block.dataset.swiperId);
  carouselWrapper.id = block.id;
  carouselWrapper.role = block.role;
  carouselWrapper.setAttribute('aria-live', block.ariaLive);
  carouselWrapper.setAttribute('aria-roledescription', block.ariaRoledescription);
  carouselWrapper.setAttribute('data-is-autoplay', block.dataset.isAutoplay);
  carouselWrapper.setAttribute('data-delay', block.dataset.delay);
  carouselWrapper.setAttribute('data-autopause-disabled', block.dataset.autopauseDisabled);
  carouselWrapper.setAttribute('data-is-loop', block.dataset.isLoop);
  carouselWrapper.setAttribute('data-placeholder-text', block.dataset.placeholderText);

  block.textContent = '';
  block.append(carouselWrapper);
}
