import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.classList.add('carousel-position-relative');

  const swiper = document.createElement('div');
  swiper.classList.add('carousel-swiper', 'carousel-primary-swiper', 'carousel-primary-swiper-carousel-419d8524f7', 'carousel-swiper-initialized', 'carousel-swiper-horizontal', 'carousel-swiper-backface-hidden');
  swiper.setAttribute('data-swiper-id', '.primary-swiper-carousel-419d8524f7');
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

    const cells = [...row.children];

    const videoCell = cells[0];
    const imageCell = cells[1];
    const altTextCell = cells[2];
    const ctaTextCell = cells[3];
    const ctaHrefCell = cells[4];

    const videoLink = videoCell.querySelector('a');
    const imageImg = imageCell.querySelector('img');
    const altText = altTextCell?.textContent.trim();
    const ctaText = ctaTextCell?.textContent.trim();
    const ctaHref = ctaHrefCell?.querySelector('a')?.href || ctaHrefCell?.textContent.trim();

    if (videoLink && videoLink.href) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      video.title = 'Video';
      video.ariaLabel = 'Video';
      video.setAttribute('data-is-autoplay', 'true');
      video.playsInline = true;
      video.preload = 'metadata';
      video.fetchPriority = 'high';
      video.loop = false;
      video.muted = true;
      video.autoplay = true;

      const source = document.createElement('source');
      source.src = videoLink.href;
      source.type = 'video/mp4';
      video.append(source);

      videoWrapper.append(video);

      // Add play/pause buttons (simplified for this example, actual SVG handling might be more complex)
      const playPauseDiv = document.createElement('div');
      playPauseDiv.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      // playButton.textContent = 'Play'; // In a real scenario, this would be an SVG
      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      // pauseButton.textContent = 'Pause'; // In a real scenario, this would be an SVG
      playPauseDiv.append(playButton, pauseButton);
      videoWrapper.append(playPauseDiv);

      // Add mute/unmute buttons (simplified)
      const muteDiv = document.createElement('div');
      muteDiv.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      muteDiv.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteDiv);

      wrapperDiv.append(videoWrapper);
    } else if (imageImg && imageImg.src) {
      const optimizedPic = createOptimizedPicture(imageImg.src, altText || imageImg.alt);
      moveInstrumentation(imageImg, optimizedPic.querySelector('img'));
      const imgElement = optimizedPic.querySelector('img');
      imgElement.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      imgElement.loading = 'eager';
      imgElement.fetchPriority = 'high';
      imgElement.decoding = 'async';
      wrapperDiv.append(optimizedPic);
    }

    if (ctaText && ctaHref) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCtaDiv = document.createElement('div');
      bannerCtaDiv.classList.add('carousel-banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const ctaLink = document.createElement('a');
      ctaLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      ctaLink.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.href = ctaHref;
      ctaLink.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaText;

      ctaLink.append(ctaSpan);
      textCenterDiv.append(ctaLink);

      const popUpDiv = document.createElement('div');
      popUpDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popUpDiv.innerHTML = '<input type="hidden" class="carousel-popup-message"><input type="hidden" class="carousel-proceed-button-label"><input type="hidden" class="carousel-cancel-button-label"><input type="hidden" class="carousel-background-color">';
      textCenterDiv.append(popUpDiv);

      bannerCtaDiv.append(textCenterDiv);
      ctaWrapper.append(bannerCtaDiv);
      wrapperDiv.append(ctaWrapper);
    }

    section.append(wrapperDiv);
    bannerDiv.append(section);
    slide.append(bannerDiv);
    swiperWrapper.append(slide);
  });

  swiper.append(swiperWrapper);

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
  swiper.append(actionsDiv);

  // Add swiper container (for navigation buttons)
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
  swiper.append(swiperContainer);

  // Add swiper pagination
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('carousel-swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'carousel-swiper-pagination-clickable', 'carousel-swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');
  // This part would typically be dynamically generated by a Swiper JS instance
  // For static representation, we'll add placeholder bullets if there are items
  if (block.children.length > 0) {
    for (let i = 0; i < block.children.length; i += 1) {
      const bullet = document.createElement('span');
      bullet.classList.add('carousel-swiper-pagination-bullet');
      if (i === 0) {
        // Assuming the first item is active initially, adjust as needed
        bullet.classList.add('carousel-swiper-pagination-bullet-active');
      }
      swiperPagination.append(bullet);
    }
  }
  swiper.append(swiperPagination);

  carouselPositionRelative.append(swiper);

  block.textContent = '';
  block.append(carouselPositionRelative);
}
