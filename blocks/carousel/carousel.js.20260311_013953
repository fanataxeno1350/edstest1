import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.classList.add('carousel-position-relative');
  moveInstrumentation(block, carouselPositionRelative);

  const carouselSwiper = document.createElement('div');
  carouselSwiper.classList.add('carousel-swiper', 'carousel-primary-swiper', 'carousel-primary-swiper-carousel-419d8524f7', 'carousel-swiper-initialized', 'carousel-swiper-horizontal', 'carousel-swiper-backface-hidden');
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

  const carouselSwiperWrapper = document.createElement('div');
  carouselSwiperWrapper.classList.add('carousel-swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');
  carouselSwiperWrapper.style.transitionDuration = '0ms';
  carouselSwiperWrapper.style.transform = 'translate3d(-508px, 0px, 0px)';
  carouselSwiperWrapper.style.transitionDelay = '0ms';

  [...block.children].forEach((row, index) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-swiper-slide', 'carousel-primary-swiper-slide');
    moveInstrumentation(row, slide);

    // Determine active/prev class based on index, assuming the first element is prev, second is active
    if (index === 0) {
      slide.classList.add('carousel-swiper-slide-prev');
      slide.setAttribute('data-active', '1');
      slide.id = `carousel-419d8524f7-item-b7a95db365-tabpanel`; // Placeholder ID
      slide.setAttribute('aria-labelledby', `carousel-419d8524f7-item-b7a95db365-tab`); // Placeholder ID
    } else if (index === 1) {
      slide.classList.add('carousel-swiper-slide-active');
      slide.id = `carousel-419d8524f7-item-eb780d0459-tabpanel`; // Placeholder ID
      slide.setAttribute('aria-labelledby', `carousel-419d8524f7-item-eb780d0459-tab`); // Placeholder ID
    }
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('data-cmp-hook-carousel', 'item');
    slide.style.width = '508px';

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const ctaDiv = document.createElement('div');
    ctaDiv.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');
    const bannerCtaDiv = document.createElement('div');
    bannerCtaDiv.classList.add('carousel-banner-cta');
    ctaDiv.append(bannerCtaDiv);

    const cells = [...row.children];

    // Assume the first cell contains video/image, and the second cell contains CTA
    const mediaCell = cells[0];
    const ctaCell = cells[1];

    const video = mediaCell.querySelector('video');
    const image = mediaCell.querySelector('img');

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const newVideo = document.createElement('video');
      newVideo.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
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
      moveInstrumentation(video, newVideo);
      videoWrapper.append(newVideo);

      // Add play/pause buttons
      const playPauseDiv = document.createElement('div');
      playPauseDiv.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773138350907.svg+xml'; // Placeholder

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      pauseButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773138350940.svg+xml'; // Placeholder

      playPauseDiv.append(playButton, pauseButton);
      videoWrapper.append(playPauseDiv);

      // Add mute/unmute buttons
      const muteDiv = document.createElement('div');
      muteDiv.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773138350994.svg+xml'; // Placeholder

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      unmuteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773138351066.svg+xml'; // Placeholder

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      noAudioButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773138351139.svg+xml'; // Placeholder

      muteDiv.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteDiv);

      wrapperDiv.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, image.alt);
      optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      optimizedPic.querySelector('img').loading = image.loading;
      optimizedPic.querySelector('img').fetchPriority = image.fetchPriority;
      optimizedPic.querySelector('img').decoding = image.decoding;
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      wrapperDiv.append(optimizedPic);
    }

    const ctaLink = ctaCell.querySelector('a');
    if (ctaLink) {
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

      const popUpDiv = document.createElement('div');
      popUpDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popUpDiv.innerHTML = `
        <input type="hidden" class="carousel-popup-message">
        <input type="hidden" class="carousel-proceed-button-label">
        <input type="hidden" class="carousel-cancel-button-label">
        <input type="hidden" class="carousel-background-color">
      `;

      textCenterDiv.append(newCtaLink, popUpDiv);
      bannerCtaDiv.append(textCenterDiv);
    }

    wrapperDiv.append(ctaDiv);
    section.append(wrapperDiv);
    bannerDiv.append(section);
    slide.append(bannerDiv);
    carouselSwiperWrapper.append(slide);
  });

  carouselSwiper.append(carouselSwiperWrapper);

  // Add carousel actions (Previous, Next, Pause, Play buttons)
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('carousel-cmp-carousel__actions');
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

  // Add swiper container with navigation buttons
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('carousel-swiper-container');
  swiperContainer.innerHTML = `
    <div>
        <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
            /content/dam/aemigrate/uploaded-folder/image/1773138351188.svg+xml
        </button>
    </div>
    <div>
        <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
            /content/dam/aemigrate/uploaded-folder/image/1773138351237.svg+xml
        </button>
    </div>
  `;
  carouselSwiper.append(swiperContainer);

  // Add pagination
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('carousel-swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'carousel-swiper-pagination-clickable', 'carousel-swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');
  paginationDiv.innerHTML = `
    <span class="carousel-swiper-pagination-bullet"></span><span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>
  `;
  carouselSwiper.append(paginationDiv);

  carouselPositionRelative.append(carouselSwiper);

  block.textContent = '';
  block.append(carouselPositionRelative);
}
