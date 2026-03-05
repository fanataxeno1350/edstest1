import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'hero-full-width-cmp-hero-full-width hero-full-width-parallax-child-2';
  mainDiv.setAttribute('data-media-type', 'videoTypeSelected');

  // Transfer block instrumentation to the mainDiv
  moveInstrumentation(block, mainDiv);

  const viewportImage = document.createElement('div');
  viewportImage.className = 'hero-full-width-viewport-image';
  viewportImage.setAttribute('hidden', '');
  viewportImage.setAttribute('aria-hidden', 'true');
  mainDiv.append(viewportImage);

  const viewportVideo = document.createElement('div');
  viewportVideo.className = 'hero-full-width-viewport-video';
  viewportVideo.setAttribute('hidden', '');
  viewportVideo.setAttribute('aria-hidden', 'true');
  mainDiv.append(viewportVideo);

  const coverDiv = document.createElement('div');
  coverDiv.className = 'hero-full-width-cmp-hero-full-width__cover';
  mainDiv.append(coverDiv);

  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'hero-full-width-cmp-hero-full-width__background';
  mainDiv.append(backgroundDiv);

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.className = 'hero-full-width-cmp-hero-full-width__background-wrapper hero-full-width-zoom-out';
  backgroundDiv.append(backgroundWrapper);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-full-width-cmp-hero-full-width__content';
  mainDiv.append(contentDiv);

  // Extract content from block children
  [...block.children].forEach((row, rowIndex) => {
    const cells = [...row.children];

    if (rowIndex === 0) { // First row for background video and poster
      const backgroundVideoCell = cells[0];
      const backgroundPosterCell = cells[1];

      if (backgroundVideoCell) {
        const videoLink = backgroundVideoCell.querySelector('a');
        if (videoLink) {
          const video = document.createElement('video');
          video.className = 'hero-full-width-cmp-hero-full-width__background-video';
          video.setAttribute('loop', '');
          video.setAttribute('muted', '');
          video.setAttribute('playsinline', '');
          video.setAttribute('data-responsive-video', '');
          video.setAttribute('autoplay', '');

          const sourceMpegUrl = document.createElement('source');
          sourceMpegUrl.src = videoLink.href;
          sourceMpegUrl.type = 'application/x-mpegURL';
          video.append(sourceMpegUrl);

          // Assuming the block provides an mp4 alternative if available
          const mp4SourceLink = backgroundVideoCell.querySelector('a:nth-of-type(2)');
          if (mp4SourceLink) {
            const sourceMp4 = document.createElement('source');
            sourceMp4.src = mp4SourceLink.href;
            sourceMp4.type = 'video/mp4';
            video.append(sourceMp4);
          } else if (videoLink.href.endsWith('.mp4')) {
            // If only one link and it's mp4
            const sourceMp4 = document.createElement('source');
            sourceMp4.src = videoLink.href;
            sourceMp4.type = 'video/mp4';
            video.append(sourceMp4);
          }

          video.src = videoLink.href; // Fallback src
          backgroundWrapper.append(video);
        }
      }

      if (backgroundPosterCell) {
        const img = backgroundPosterCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
          const posterImg = optimizedPic.querySelector('img');
          posterImg.className = 'hero-full-width-cmp-hero-full-width__background-poster';
          posterImg.setAttribute('loading', 'lazy');
          posterImg.style.display = 'none';
          posterImg.setAttribute('aria-hidden', 'true');
          moveInstrumentation(img, posterImg);
          backgroundWrapper.append(optimizedPic);
        }
      }
    } else if (rowIndex === 1) { // Second row for title and description
      const titleCell = cells[0];
      const descriptionCell = cells[1];

      const slideWrap1 = document.createElement('div');
      slideWrap1.className = 'hero-full-width-slide-wrap';
      contentDiv.append(slideWrap1);

      const slideUp1 = document.createElement('div');
      slideUp1.setAttribute('data-slide-type', 'slide-up');
      slideUp1.className = 'hero-full-width-slide-up';
      slideWrap1.append(slideUp1);

      if (titleCell) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'hero-full-width-cmp-hero-full-width__content__title';
        titleDiv.setAttribute('tabindex', '0');
        titleDiv.innerHTML = titleCell.innerHTML.replace(/<p><span class="(.*?)">/g, '<p><span class="hero-full-width-$1">');
        moveInstrumentation(titleCell, titleDiv);
        slideUp1.append(titleDiv);
      }

      if (descriptionCell) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'hero-full-width-cmp-hero-full-width__content__description';
        descriptionDiv.setAttribute('tabindex', '0');
        descriptionDiv.innerHTML = descriptionCell.innerHTML;
        moveInstrumentation(descriptionCell, descriptionDiv);
        slideUp1.append(descriptionDiv);
      }
    } else if (rowIndex === 2) { // Third row for CTAs
      const cta1Cell = cells[0];
      const cta2Cell = cells[1];

      const slideWrap2 = document.createElement('div');
      slideWrap2.className = 'hero-full-width-slide-wrap';
      contentDiv.append(slideWrap2);

      const slideUp2 = document.createElement('div');
      slideUp2.setAttribute('data-slide-type', 'slide-up');
      slideUp2.className = 'hero-full-width-slide-up';
      slideWrap2.append(slideUp2);

      const ctasDiv = document.createElement('div');
      ctasDiv.className = 'hero-full-width-cmp-hero-full-width__content--ctas';
      slideUp2.append(ctasDiv);

      if (cta1Cell) {
        const cta1Link = cta1Cell.querySelector('a');
        if (cta1Link) {
          const newCta1 = document.createElement('a');
          newCta1.href = cta1Link.href;
          newCta1.className = 'hero-full-width-cta hero-full-width-cta__secondary hero-full-width-primaryCta';
          newCta1.target = '_self';
          newCta1.setAttribute('aria-label', cta1Link.textContent);
          newCta1.setAttribute('data-palette', 'palette-light');
          const span = document.createElement('span');
          span.className = 'hero-full-width-cta__label';
          span.textContent = cta1Link.textContent;
          newCta1.append(span);
          moveInstrumentation(cta1Link, newCta1);
          ctasDiv.append(newCta1);
        }
      }

      const chevronWrapper = document.createElement('div');
      chevronWrapper.className = 'hero-full-width-chevron-wrapper';
      ctasDiv.append(chevronWrapper);

      const chevronButton = document.createElement('button');
      chevronButton.type = 'button';
      chevronButton.className = 'hero-full-width-chevron-icon';
      chevronButton.setAttribute('aria-label', 'Open video modal');
      chevronWrapper.append(chevronButton);

      if (cta2Cell) {
        const cta2Link = cta2Cell.querySelector('a');
        if (cta2Link) {
          const newCta2 = document.createElement('a');
          newCta2.href = cta2Link.href;
          newCta2.className = 'hero-full-width-cta hero-full-width-cta__link hero-full-width-secondaryCta';
          newCta2.target = '_self';
          newCta2.setAttribute('aria-label', cta2Link.textContent);
          newCta2.setAttribute('data-palette', 'palette-light');

          const iconSpan = document.createElement('span');
          iconSpan.className = 'hero-full-width-cta__icon hero-full-width-qd-icon hero-full-width-qd-icon--cheveron-right';
          iconSpan.setAttribute('aria-hidden', 'true');
          newCta2.append(iconSpan);

          const labelSpan = document.createElement('span');
          labelSpan.className = 'hero-full-width-cta__label';
          labelSpan.textContent = cta2Link.textContent;
          newCta2.append(labelSpan);
          moveInstrumentation(cta2Link, newCta2);
          chevronWrapper.append(newCta2);
        }
      }
    }
  });

  // Add the dialog structure (static, as it's not driven by block content rows)
  const dialog = document.createElement('dialog');
  dialog.className = 'hero-full-width-cmp-hero-full-width__content--modal';
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  contentDiv.append(dialog);

  const form = document.createElement('form');
  form.setAttribute('method', 'dialog');
  dialog.append(form);

  const closeButton = document.createElement('button');
  closeButton.className = 'hero-full-width-cmp-hero-full-width__content--modal__close-button';
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  form.append(closeButton);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.className = 'hero-full-width-video hero-full-width-cmp-hero-full-width__content--modal__video';
  dialog.append(videoModalDiv);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'hero-full-width-video-container hero-full-width-show-controls';
  videoModalDiv.append(videoContainer);

  const viewportVideoModal = document.createElement('div');
  viewportVideoModal.className = 'hero-full-width-viewport-video';
  viewportVideoModal.setAttribute('hidden', '');
  viewportVideoModal.setAttribute('aria-hidden', 'true');
  videoContainer.append(viewportVideoModal);

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'hero-full-width-video-container__controls';
  videoContainer.append(controlsDiv);

  const timerDiv = document.createElement('div');
  timerDiv.className = 'hero-full-width-video-container__controls__timer';
  controlsDiv.append(timerDiv);

  const progressArea = document.createElement('div');
  progressArea.className = 'hero-full-width-video-container__controls__timer__progress-area';
  progressArea.innerHTML = `
    <span class="hero-full-width-video-container__controls__timer__progress-area__progress-bar"></span>
    <span class="hero-full-width-video-container__controls__timer__progress-area__pointer"></span>
    <span class="hero-full-width-video-container__controls__timer__progress-area__progress-pending"></span>
  `;
  timerDiv.append(progressArea);

  const currentTime = document.createElement('p');
  currentTime.className = 'hero-full-width-video-container__controls__timer__current-time';
  currentTime.textContent = '00:00';
  timerDiv.append(currentTime);

  const duration = document.createElement('p');
  duration.className = 'hero-full-width-video-container__controls__timer__duration';
  duration.textContent = '00:00';
  timerDiv.append(duration);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'hero-full-width-video-container__controls__buttons';
  buttonsDiv.innerHTML = `
    <button class="hero-full-width-video-container__controls__buttons__play-button hero-full-width-video-container__controls__buttons--button">
      <span class="hero-full-width-video-container__controls__buttons__icon hero-full-width-qd-icon hero-full-width-qd-icon--play"></span>
    </button>
    <button class="hero-full-width-video-container__controls__buttons__mute-button hero-full-width-video-container__controls__buttons--button">
      <span class="hero-full-width-video-container__controls__buttons__icon hero-full-width-qd-icon hero-full-width-qd-icon--volume"></span>
    </button>
    <button class="hero-full-width-video-container__controls__buttons__fullscreen-button hero-full-width-video-container__controls__buttons--button">
      <span class="hero-full-width-video-container__controls__buttons__icon hero-full-width-qd-icon hero-full-width-qd-icon--fullscreen"></span>
    </button>
  `;
  controlsDiv.append(buttonsDiv);

  // The modal video source needs to be extracted from the block if available, or default
  // For simplicity, we'll use a placeholder or assume it's the same as background for now
  // In a real scenario, there might be a separate field for modal video.
  const modalVideo = document.createElement('video');
  modalVideo.className = 'hero-full-width-video-container__video';
  modalVideo.setAttribute('playsinline', '');
  modalVideo.setAttribute('webkit-playsinline', '');
  modalVideo.setAttribute('x-webkit-airplay', 'allow');
  // Assuming the background video is also the modal video for this example
  const backgroundVideoLink = block.children[0]?.children[0]?.querySelector('a');
  if (backgroundVideoLink) {
    modalVideo.setAttribute('data-video-src', backgroundVideoLink.href);
    modalVideo.src = backgroundVideoLink.href;
  }
  videoContainer.append(modalVideo);

  block.textContent = '';
  block.append(mainDiv);
}