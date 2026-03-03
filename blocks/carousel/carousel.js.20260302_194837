import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
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
  carouselSwiper.append(swiperWrapper);

  [...block.children].forEach((row) => {
    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.className = 'carousel-swiper-slide carousel-primary-swiper-slide';
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'carousel-banner-banner';

    const section = document.createElement('section');
    section.className = 'carousel-banner-banner-section';

    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-position-relative carousel-boing carousel-banner-banner-section__wrapper';

    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

    const ctaBanner = document.createElement('div');
    ctaBanner.className = 'carousel-banner-banner-cta';

    const textCenter = document.createElement('div');
    textCenter.className = 'carousel-text-center';

    const cells = [...row.children];

    // Extract video, image, ctaLink, ctaText
    const videoCell = cells[0]; // Assuming video is in the first cell if present
    const imageCell = cells[1]; // Assuming image is in the second cell if present
    const ctaLinkCell = cells[2]; // Assuming CTA link is in the third cell if present
    const ctaTextCell = cells[3]; // Assuming CTA text is in the fourth cell if present

    const video = videoCell?.querySelector('video');
    const image = imageCell?.querySelector('img');
    const ctaLink = ctaLinkCell?.querySelector('a');
    const ctaText = ctaTextCell?.textContent.trim();

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-banner-video-wrapper';
      const newVideo = document.createElement('video');
      newVideo.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-banner-media carousel-banner-banner-video';
      newVideo.title = video.title;
      newVideo.ariaLabel = video.ariaLabel;
      newVideo.setAttribute('data-is-autoplay', video.getAttribute('data-is-autoplay'));
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

      // Add play/pause and mute/unmute buttons if they exist in the original video cell
      const playPauseWrapper = videoCell.querySelector('.carousel-position-absolute.carousel-w-100.carousel-h-100.carousel-start-0');
      if (playPauseWrapper) {
        videoWrapper.append(playPauseWrapper.cloneNode(true));
      }
      const muteIconWrapper = videoCell.querySelector('.carousel-position-absolute.carousel-z-2.carousel-d-flex');
      if (muteIconWrapper) {
        videoWrapper.append(muteIconWrapper.cloneNode(true));
      }

      wrapper.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, image.alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-banner-media carousel-banner-banner-image';
      optimizedPic.querySelector('img').loading = image.loading;
      optimizedPic.querySelector('img').fetchPriority = image.fetchPriority;
      optimizedPic.querySelector('img').decoding = image.decoding;
      wrapper.append(optimizedPic);
    }

    if (ctaLink && ctaText) {
      const newLink = document.createElement('a');
      newLink.id = ctaLink.id;
      newLink.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      newLink.setAttribute('data-link-region', 'CTA');
      newLink.setAttribute('data-is-internal', ctaLink.getAttribute('data-is-internal'));
      newLink.setAttribute('data-enable-gating', ctaLink.getAttribute('data-enable-gating'));
      newLink.href = ctaLink.href;
      newLink.target = ctaLink.target;

      const span = document.createElement('span');
      span.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      span.textContent = ctaText;
      newLink.append(span);

      const popUp = document.createElement('div');
      popUp.className = 'carousel-pop-up carousel-d-none';
      popUp.innerHTML = '<input type="hidden" class="carousel-popup-message"/><input type="hidden" class="carousel-proceed-button-label"/><input type="hidden" class="carousel-cancel-button-label"/><input type="hidden" class="carousel-background-color"/>';

      textCenter.append(newLink, popUp);
      ctaBanner.append(textCenter);
      ctaWrapper.append(ctaBanner);
      wrapper.append(ctaWrapper);
    }

    section.append(wrapper);
    bannerDiv.append(section);
    slide.append(bannerDiv);
    swiperWrapper.append(slide);
  });

  // Add navigation buttons and pagination
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
            /content/dam/aemigrate/uploaded-folder/image/1772470143441.svg+xml
        </button>
    </div>
    <div>
        <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
            /content/dam/aemigrate/uploaded-folder/image/1772470143563.svg+xml
        </button>
    </div>
  `;
  carouselSwiper.append(swiperContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  paginationDiv.innerHTML = '<span class="carousel-swiper-pagination-bullet"></span><span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>';
  carouselSwiper.append(paginationDiv);

  block.textContent = '';
  block.className = 'carousel-position-relative'; // Set the outer div class
  block.append(carouselSwiper);
}
