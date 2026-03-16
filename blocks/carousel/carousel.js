import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselSwiper = document.createElement('div');
  carouselSwiper.className = 'carousel-swiper carousel-primary-swiper carousel-swiper-initialized carousel-swiper-horizontal carousel-swiper-backface-hidden';
  carouselSwiper.setAttribute('role', 'group');
  carouselSwiper.setAttribute('aria-live', 'polite');
  carouselSwiper.setAttribute('aria-roledescription', 'carousel');
  carouselSwiper.setAttribute('data-is-autoplay', 'true');
  carouselSwiper.setAttribute('data-delay', '5000');
  carouselSwiper.setAttribute('data-autopause-disabled', 'true');
  carouselSwiper.setAttribute('data-is-loop', 'false');
  carouselSwiper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'carousel-swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';

  [...block.children].forEach((row) => {
    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.className = 'carousel-swiper-slide carousel-primary-swiper-slide';
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');

    const banner = document.createElement('div');
    banner.className = 'carousel-banner';

    const section = document.createElement('section');
    section.className = 'carousel-banner-section';

    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-position-relative carousel-boing carousel-banner-section__wrapper';

    const videoSrcCell = row.children[0];
    const imageSrcCell = row.children[1];
    const imageAltCell = row.children[2];
    const ctaHrefCell = row.children[3];
    const ctaTextCell = row.children[4];

    const video = videoSrcCell.querySelector('source');
    const img = imageSrcCell.querySelector('img');
    const ctaLink = ctaHrefCell.querySelector('a');

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-video-wrapper';

      const videoElement = document.createElement('video');
      videoElement.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-media carousel-banner-video';
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('data-is-autoplay', 'true');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('loop', 'false');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('autoplay', 'true');
      videoElement.innerHTML = `<source src="${video.src}" type="video/mp4">`;
      moveInstrumentation(videoSrcCell.querySelector('video'), videoElement);

      videoWrapper.append(videoElement);

      // Add play/pause buttons (simplified for this example, you might need more complex logic)
      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';
      playPauseWrapper.innerHTML = `
        <button type="button" class="carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1773663798800.svg+xml
        </button>
        <button type="button" class="carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1773663798843.svg+xml
        </button>
      `;
      videoWrapper.append(playPauseWrapper);

      // Add mute/unmute buttons
      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon';
      muteIconWrapper.innerHTML = `
        <button type="button" class="carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none">
          /content/dam/aemigrate/uploaded-folder/image/1773663799024.svg+xml
        </button>
        <button type="button" class="carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none">
          /content/dam/aemigrate/uploaded-folder/image/1773663799275.svg+xml
        </button>
        <button type="button" class="carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1773663799379.svg+xml
        </button>
      `;
      videoWrapper.append(muteIconWrapper);

      wrapper.append(videoWrapper);
    } else if (img) {
      const optimizedPic = createOptimizedPicture(img.src, imageAltCell.textContent || img.alt);
      optimizedPic.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-media carousel-banner-image';
      optimizedPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', 'async');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      wrapper.append(optimizedPic);
    }

    if (ctaLink || ctaTextCell.textContent) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

      const bannerCta = document.createElement('div');
      bannerCta.className = 'carousel-banner-cta';

      const textCenter = document.createElement('div');
      textCenter.className = 'carousel-text-center';

      const newCtaLink = document.createElement('a');
      newCtaLink.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      newCtaLink.setAttribute('data-link-region', 'CTA');
      newCtaLink.setAttribute('data-is-internal', 'true');
      newCtaLink.setAttribute('data-enable-gating', 'false');
      newCtaLink.setAttribute('target', '_blank');
      newCtaLink.href = ctaLink ? ctaLink.href : '#'; // Fallback if no link element

      const span = document.createElement('span');
      span.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      span.textContent = ctaTextCell.textContent || (ctaLink ? ctaLink.textContent : 'Learn More'); // Use text content from cell or link

      newCtaLink.append(span);
      textCenter.append(newCtaLink);
      bannerCta.append(textCenter);
      ctaWrapper.append(bannerCta);
      wrapper.append(ctaWrapper);
    }

    section.append(wrapper);
    banner.append(section);
    slide.append(banner);
    swiperWrapper.append(slide);
  });

  carouselSwiper.append(swiperWrapper);

  // Add navigation buttons (Previous/Next/Pause/Play)
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'carousel-cmp-carousel__actions';
  actionsDiv.innerHTML = `
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--previous" type="button" aria-label="Previous" data-cmp-hook-carousel="previous">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Previous</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--next" type="button" aria-label="Next" data-cmp-hook-carousel="next">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Next</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--pause" type="button" aria-label="Pause" data-cmp-hook-carousel="pause">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Pause</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--play carousel-cmp-carousel__action--disabled" type="button" aria-label="Play" data-cmp-hook-carousel="play" disabled="">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Play</span>
    </button>
  `;
  carouselSwiper.append(actionsDiv);

  // Add swiper container with custom navigation buttons
  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';
  swiperContainer.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
        /content/dam/aemigrate/uploaded-folder/image/1773663799444.svg+xml
      </button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
        /content/dam/aemigrate/uploaded-folder/image/1773663799496.svg+xml
      </button>
    </div>
  `;
  carouselSwiper.append(swiperContainer);

  // Add pagination
  const pagination = document.createElement('div');
  pagination.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  pagination.innerHTML = `<span class="carousel-swiper-pagination-bullet"></span><span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>`;
  carouselSwiper.append(pagination);

  block.textContent = '';
  block.className = 'carousel-position-relative'; // Set the outer container class
  block.append(carouselSwiper);
}
