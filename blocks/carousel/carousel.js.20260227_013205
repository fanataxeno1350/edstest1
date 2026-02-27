import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');
  moveInstrumentation(block, carouselWrapper);

  const carouselSwiper = document.createElement('div');
  carouselSwiper.classList.add('carousel-swiper', 'carousel-primary-swiper');
  carouselSwiper.setAttribute('role', 'group');
  carouselSwiper.setAttribute('aria-live', 'polite');
  carouselSwiper.setAttribute('aria-roledescription', 'carousel');

  const isAutoplay = block.dataset.isAutoplay || 'false';
  const delay = block.dataset.delay || '5000';
  const autopauseDisabled = block.dataset.autopauseDisabled || 'true';
  const isLoop = block.dataset.isLoop || 'false';
  const placeholderText = block.dataset.placeholderText || 'false';

  carouselSwiper.setAttribute('data-is-autoplay', isAutoplay);
  carouselSwiper.setAttribute('data-delay', delay);
  carouselSwiper.setAttribute('data-autopause-disabled', autopauseDisabled);
  carouselSwiper.setAttribute('data-is-loop', isLoop);
  carouselSwiper.setAttribute('data-placeholder-text', placeholderText);

  const carouselSwiperWrapper = document.createElement('div');
  carouselSwiperWrapper.classList.add('carousel-swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  [...block.children].forEach((row) => {
    const carouselSwiperSlide = document.createElement('div');
    carouselSwiperSlide.classList.add('carousel-swiper-slide', 'carousel-primary-swiper-slide');
    carouselSwiperSlide.setAttribute('role', 'tabpanel');
    carouselSwiperSlide.setAttribute('aria-roledescription', 'slide');
    carouselSwiperSlide.setAttribute('data-cmp-hook-carousel', 'item');
    moveInstrumentation(row, carouselSwiperSlide);

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const carouselBannerSection = document.createElement('section');
    carouselBannerSection.classList.add('carousel-banner-section');

    const carouselPositionRelative = document.createElement('div');
    carouselPositionRelative.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoCell = row.children[0]; // Assuming video is the first cell
    const imageCell = row.children[1]; // Assuming image is the second cell
    const altTextCell = row.children[2]; // Assuming alt text is the third cell
    const ctaLinkCell = row.children[3]; // Assuming cta link is the fourth cell
    const ctaLabelCell = row.children[4]; // Assuming cta label is the fifth cell

    const videoSrc = videoCell?.querySelector('a')?.href || videoCell?.textContent?.trim();
    const imgSrc = imageCell?.querySelector('img')?.src;
    const altText = altTextCell?.textContent?.trim();
    const ctaLink = ctaLinkCell?.querySelector('a')?.href || ctaLinkCell?.textContent?.trim();
    const ctaLabel = ctaLabelCell?.textContent?.trim();

    if (videoSrc) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.setAttribute('src', videoSrc);
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      videoWrapper.append(video);

      // Add play/pause buttons and mute/unmute buttons if needed, extracting their SVG paths
      // For simplicity, we'll just add the video element here based on the JSON structure.
      // More complex button logic would require additional cells or data attributes.

      carouselPositionRelative.append(videoWrapper);
    } else if (imgSrc) {
      const picture = createOptimizedPicture(imgSrc, altText || '');
      picture.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      const imgElement = picture.querySelector('img');
      if (imgElement) {
        imgElement.setAttribute('loading', 'eager');
        imgElement.setAttribute('fetchpriority', 'high');
        imgElement.setAttribute('decoding', 'async');
        moveInstrumentation(imageCell.querySelector('img'), imgElement);
      }
      carouselPositionRelative.append(picture);
    }

    if (ctaLink && ctaLabel) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('carousel-banner-cta');

      const textCenter = document.createElement('div');
      textCenter.classList.add('carousel-text-center');

      const link = document.createElement('a');
      link.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');
      link.href = ctaLink;
      link.setAttribute('target', '_blank');

      const span = document.createElement('span');
      span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      span.textContent = ctaLabel;

      link.append(span);
      textCenter.append(link);
      bannerCta.append(textCenter);
      ctaWrapper.append(bannerCta);
      carouselPositionRelative.append(ctaWrapper);
    }

    carouselBannerSection.append(carouselPositionRelative);
    carouselBanner.append(carouselBannerSection);
    carouselSwiperSlide.append(carouselBanner);
    carouselSwiperWrapper.append(carouselSwiperSlide);
  });

  carouselSwiper.append(carouselSwiperWrapper);

  // Add navigation buttons and pagination if needed. These are static elements in the example HTML.
  // For this exercise, we'll only focus on the dynamic content based on the block JSON.

  carouselWrapper.append(carouselSwiper);

  block.textContent = '';
  block.append(carouselWrapper);
}
