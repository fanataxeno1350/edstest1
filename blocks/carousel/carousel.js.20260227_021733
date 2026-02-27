import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container carousel-position-relative';
  moveInstrumentation(block, carouselContainer);

  const swiper = document.createElement('div');
  swiper.className = 'carousel-swiper carousel-primary-swiper carousel-primary-swiper-carousel-419d8524f7 carousel-swiper-initialized carousel-swiper-horizontal carousel-swiper-backface-hidden';
  swiper.setAttribute('data-swiper-id', '.carousel-primary-swiper-carousel-419d8524f7');
  swiper.id = 'carousel-419d8524f7';
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');
  swiper.setAttribute('data-is-autoplay', 'true');
  swiper.setAttribute('data-delay', '5000');
  swiper.setAttribute('data-autopause-disabled', 'true');
  swiper.setAttribute('data-is-loop', 'false');
  swiper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'carousel-swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';
  swiperWrapper.style.cssText = 'transition-duration: 0ms; transform: translate3d(-508px, 0px, 0px; transition-delay: 0ms;';

  [...block.children].forEach((row, index) => {
    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.className = `carousel-swiper-slide carousel-primary-swiper-slide${index === 0 ? ' carousel-swiper-slide-prev' : ''}${index === 1 ? ' carousel-swiper-slide-active' : ''}`;
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.style.width = '508px';

    const banner = document.createElement('div');
    banner.className = 'carousel-banner';

    const section = document.createElement('section');
    section.className = 'carousel-banner-section';

    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-position-relative carousel-boing carousel-banner-section__wrapper';

    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

    const bannerCta = document.createElement('div');
    bannerCta.className = 'carousel-banner-cta';

    const textCenter = document.createElement('div');
    textCenter.className = 'carousel-text-center';

    const popUp = document.createElement('div');
    popUp.className = 'carousel-pop-up carousel-d-none';
    popUp.innerHTML = `
      <input type="hidden" class="carousel-popup-message"/>
      <input type="hidden" class="carousel-proceed-button-label"/>
      <input type="hidden" class="carousel-cancel-button-label"/>
      <input type="hidden" class="carousel-background-color"/>
    `;

    const videoCell = row.children[0];
    const imageCell = row.children[1];
    const altTextCell = row.children[2];
    const ctaTextCell = row.children[3];
    const ctaLinkCell = row.children[4];

    const video = videoCell?.querySelector('a');
    const image = imageCell?.querySelector('img');
    const altText = altTextCell?.textContent.trim();
    const ctaText = ctaTextCell?.textContent.trim();
    const ctaLink = ctaLinkCell?.querySelector('a');

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-video-wrapper';
      videoWrapper.innerHTML = `
        <video class="carousel-w-100 carousel-object-fit-cover carousel-banner-media carousel-banner-video" title="Video" aria-label="Video" data-is-autoplay="true" playsinline="" preload="metadata" fetchpriority="high" loop="false" muted="true" autoplay="true">
          <source src="${video.href}" type="video/mp4"/>
        </video>
        <div class="carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer">
          <button type="button" class="carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
            /content/dam/aemigrate/uploaded-folder/image/1772185485326.svg+xml
          </button>
          <button type="button" class="carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
            /content/dam/aemigrate/uploaded-folder/image/1772185485369.svg+xml
          </button>
        </div>
        <div class="carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon">
          <button type="button" class="carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none">
            /content/dam/aemigrate/uploaded-folder/image/1772185485418.svg+xml
          </button>
          <button type="button" class="carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none">
            /content/dam/aemigrate/uploaded-folder/image/1772185485479.svg+xml
          </button>
          <button type="button" class="carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
            /content/dam/aemigrate/uploaded-folder/image/1772185485535.svg+xml
          </button>
        </div>
      `;
      wrapper.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, altText || image.alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-media carousel-banner-image';
      optimizedPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', 'async');
      wrapper.append(optimizedPic);
    }

    if (ctaText && ctaLink) {
      const ctaAnchor = document.createElement('a');
      ctaAnchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      ctaAnchor.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      ctaAnchor.setAttribute('data-link-region', 'CTA');
      ctaAnchor.setAttribute('data-is-internal', 'true');
      ctaAnchor.setAttribute('data-enable-gating', 'false');
      ctaAnchor.href = ctaLink.href;
      ctaAnchor.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      ctaSpan.textContent = ctaText;

      ctaAnchor.append(ctaSpan);
      textCenter.append(ctaAnchor, popUp);
      bannerCta.append(textCenter);
      ctaWrapper.append(bannerCta);
      wrapper.append(ctaWrapper);
    }

    section.append(wrapper);
    banner.append(section);
    slide.append(banner);
    swiperWrapper.append(slide);
  });

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
  swiperWrapper.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';
  swiperContainer.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
        /content/dam/aemigrate/uploaded-folder/image/1772185485595.svg+xml
      </button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
        /content/dam/aemigrate/uploaded-folder/image/1772185485711.svg+xml
      </button>
    </div>
  `;

  const pagination = document.createElement('div');
  pagination.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  pagination.innerHTML = `
    <span class="carousel-swiper-pagination-bullet"></span>
    <span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>
  `;

  swiper.append(swiperWrapper, swiperContainer, pagination);
  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);
}
