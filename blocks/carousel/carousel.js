import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.className = 'carousel-position-relative';

  const carouselSwiper = document.createElement('div');
  carouselSwiper.className = 'carousel-swiper carousel-primary-swiper carousel-primary-swiper-carousel-419d8524f7 carousel-swiper-initialized carousel-swiper-horizontal carousel-swiper-backface-hidden';
  carouselSwiper.setAttribute('data-swiper-id', '.primary-swiper-carousel-419d8524f7');
  carouselSwiper.id = 'carousel-419d8524f7';
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
  swiperWrapper.style.transitionDuration = '0ms';
  swiperWrapper.style.transform = 'translate3d(-508px, 0px, 0px)';
  swiperWrapper.style.transitionDelay = '0ms';

  [...block.children].forEach((row, index) => {
    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.className = `carousel-swiper-slide carousel-primary-swiper-slide ${index === 0 ? 'carousel-swiper-slide-prev' : 'carousel-swiper-slide-active'}`;
    slide.style.width = '508px';

    const banner = document.createElement('div');
    banner.className = 'carousel-banner';

    const section = document.createElement('section');
    section.className = 'carousel-banner-section';

    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-position-relative carousel-boing carousel-banner-section__wrapper';

    const cells = [...row.children];
    const videoCell = cells[0];
    const imageCell = cells[1];
    const ctaTextCell = cells[2];
    const ctaHrefCell = cells[3];

    const video = videoCell?.querySelector('a');
    const image = imageCell?.querySelector('img');
    const ctaText = ctaTextCell?.textContent.trim();
    const ctaHref = ctaHrefCell?.querySelector('a');

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-video-wrapper';

      const videoElement = document.createElement('video');
      videoElement.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-media carousel-banner-video';
      videoElement.title = 'Video';
      videoElement.ariaLabel = 'Video';
      videoElement.setAttribute('data-is-autoplay', 'true');
      videoElement.playsInline = true;
      videoElement.preload = 'metadata';
      videoElement.fetchPriority = 'high';
      videoElement.loop = false;
      videoElement.muted = true;
      videoElement.autoplay = true;

      const source = document.createElement('source');
      source.src = video.href;
      source.type = 'video/mp4';
      videoElement.append(source);
      videoWrapper.append(videoElement);

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';
      playPauseOverlay.innerHTML = `
        <button type="button" class="carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1772439662596.svg+xml
        </button>
        <button type="button" class="carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1772439662613.svg+xml
        </button>
      `;
      videoWrapper.append(playPauseOverlay);

      const muteIcon = document.createElement('div');
      muteIcon.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon';
      muteIcon.innerHTML = `
        <button type="button" class="carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none">
          /content/dam/aemigrate/uploaded-folder/image/1772439662642.svg+xml
        </button>
        <button type="button" class="carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none">
          /content/dam/aemigrate/uploaded-folder/image/1772439662665.svg+xml
        </button>
        <button type="button" class="carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1772439662719.svg+xml
        </button>
      `;
      videoWrapper.append(muteIcon);

      wrapper.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, image.alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-media carousel-banner-image';
      optimizedPic.querySelector('img').loading = 'eager';
      optimizedPic.querySelector('img').fetchPriority = 'high';
      optimizedPic.querySelector('img').decoding = 'async';
      wrapper.append(optimizedPic);
    }

    if (ctaText && ctaHref) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

      const bannerCta = document.createElement('div');
      bannerCta.className = 'carousel-banner-cta';

      const textCenter = document.createElement('div');
      textCenter.className = 'carousel-text-center';

      const link = document.createElement('a');
      link.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      link.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');
      link.href = ctaHref.href;
      link.target = '_blank';

      const span = document.createElement('span');
      span.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      span.textContent = ctaText;

      link.append(span);
      textCenter.append(link);

      const popup = document.createElement('div');
      popup.className = 'carousel-pop-up carousel-d-none';
      popup.innerHTML = `
        <input type="hidden" class="carousel-popup-message"/>
        <input type="hidden" class="carousel-proceed-button-label"/>
        <input type="hidden" class="carousel-cancel-button-label"/>
        <input type="hidden" class="carousel-background-color"/>
      `;
      textCenter.append(popup);

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

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';
  swiperContainer.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
        /content/dam/aemigrate/uploaded-folder/image/1772439662765.svg+xml
      </button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
        /content/dam/aemigrate/uploaded-folder/image/1772439662801.svg+xml
      </button>
    </div>
  `;
  carouselSwiper.append(swiperContainer);

  const pagination = document.createElement('div');
  pagination.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  pagination.innerHTML = `
    <span class="carousel-swiper-pagination-bullet"></span>
    <span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>
  `;
  carouselSwiper.append(pagination);

  carouselPositionRelative.append(carouselSwiper);

  block.textContent = '';
  block.append(carouselPositionRelative);
}
