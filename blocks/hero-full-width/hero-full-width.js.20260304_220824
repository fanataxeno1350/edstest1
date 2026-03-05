import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'hero-full-width-cmp-hero-full-width hero-full-width-parallax-child-2';
  mainDiv.setAttribute('data-media-type', 'videoTypeSelected');

  // Transfer instrumentation from the block itself if it exists
  // (assuming the block element is the initial container for editor context)
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

  const backgroundVideo = document.createElement('video');
  backgroundVideo.className = 'hero-full-width-cmp-hero-full-width__background-video';
  backgroundVideo.setAttribute('loop', '');
  backgroundVideo.setAttribute('muted', '');
  backgroundVideo.setAttribute('playsinline', '');
  backgroundVideo.setAttribute('data-responsive-video', '');
  backgroundVideo.setAttribute('autoplay', '');
  backgroundWrapper.append(backgroundVideo);

  const backgroundPoster = document.createElement('img');
  backgroundPoster.setAttribute('alt', 'Background poster image');
  backgroundPoster.setAttribute('loading', 'lazy');
  backgroundPoster.className = 'hero-full-width-cmp-hero-full-width__background-poster';
  backgroundPoster.style.display = 'none';
  backgroundPoster.setAttribute('aria-hidden', 'true');
  backgroundWrapper.append(backgroundPoster);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-full-width-cmp-hero-full-width__content';
  mainDiv.append(contentDiv);

  const dialog = document.createElement('dialog');
  dialog.className = 'hero-full-width-cmp-hero-full-width__content--modal';
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  contentDiv.append(dialog);

  const dialogForm = document.createElement('form');
  dialogForm.setAttribute('method', 'dialog');
  dialog.append(dialogForm);

  const closeButton = document.createElement('button');
  closeButton.className = 'hero-full-width-cmp-hero-full-width__content--modal__close-button';
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  dialogForm.append(closeButton);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.className = 'hero-full-width-video hero-full-width-cmp-hero-full-width__content--modal__video';
  dialog.append(videoModalDiv);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'hero-full-width-video-container hero-full-width-show-controls';
  videoModalDiv.append(videoContainer);

  const modalViewportVideo = document.createElement('div');
  modalViewportVideo.className = 'hero-full-width-viewport-video';
  modalViewportVideo.setAttribute('hidden', '');
  modalViewportVideo.setAttribute('aria-hidden', 'true');
  videoContainer.append(modalViewportVideo);

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'hero-full-width-video-container__controls';
  videoContainer.append(controlsDiv);

  const timerDiv = document.createElement('div');
  timerDiv.className = 'hero-full-width-video-container__controls__timer';
  controlsDiv.append(timerDiv);

  const progressBarArea = document.createElement('div');
  progressBarArea.className = 'hero-full-width-video-container__controls__timer__progress-area';
  timerDiv.append(progressBarArea);

  const progressBar = document.createElement('span');
  progressBar.className = 'hero-full-width-video-container__controls__timer__progress-area__progress-bar';
  progressBarArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.className = 'hero-full-width-video-container__controls__timer__progress-area__pointer';
  progressBarArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.className = 'hero-full-width-video-container__controls__timer__progress-area__progress-pending';
  progressBarArea.append(progressPending);

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
  controlsDiv.append(buttonsDiv);

  const playButton = document.createElement('button');
  playButton.className = 'hero-full-width-video-container__controls__buttons__play-button hero-full-width-video-container__controls__buttons--button';
  buttonsDiv.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.className = 'hero-full-width-video-container__controls__buttons__icon hero-full-width-qd-icon hero-full-width-qd-icon--play';
  playButton.append(playIcon);

  const muteButton = document.createElement('button');
  muteButton.className = 'hero-full-width-video-container__controls__buttons__mute-button hero-full-width-video-full-width-container__controls__buttons--button';
  buttonsDiv.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.className = 'hero-full-width-video-container__controls__buttons__icon hero-full-width-qd-icon hero-full-width-qd-icon--volume';
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'hero-full-width-video-container__controls__buttons__fullscreen-button hero-full-width-video-container__controls__buttons--button';
  buttonsDiv.append(fullscreenButton);

  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'hero-full-width-video-container__controls__buttons__icon hero-full-width-qd-icon hero-full-width-qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);

  const modalVideo = document.createElement('video');
  modalVideo.className = 'hero-full-width-video-container__video';
  modalVideo.setAttribute('playsinline', '');
  modalVideo.setAttribute('webkit-playsinline', '');
  modalVideo.setAttribute('x-webkit-airplay', 'allow');
  videoContainer.append(modalVideo);

  // Process rows from the block
  [...block.children].forEach((row, index) => {
    const cells = [...row.children];

    if (index === 0) { // First row: Background Video Source
      const videoSrcCell = cells[0];
      const videoLink = videoSrcCell.querySelector('a');
      if (videoLink) {
        backgroundVideo.src = videoLink.href;
        modalVideo.src = videoLink.href;
        modalVideo.setAttribute('data-video-src', videoLink.href);

        const sourceMpegUrl = document.createElement('source');
        sourceMpegUrl.src = videoLink.href;
        sourceMpegUrl.type = 'application/x-mpegURL';
        backgroundVideo.append(sourceMpegUrl);

        // Assuming a second source for mp4 if present in the same cell
        // This part needs adjustment if the MP4 is in a separate cell
        const mp4Link = videoSrcCell.querySelector('a:nth-of-type(2)'); // Adjust selector if needed
        if (mp4Link && mp4Link.href.endsWith('.mp4')) {
          const sourceMp4 = document.createElement('source');
          sourceMp4.src = mp4Link.href;
          sourceMp4.type = 'video/mp4';
          backgroundVideo.append(sourceMp4);
        }
      }
      // Transfer instrumentation from the original cell to the video element
      moveInstrumentation(videoSrcCell, backgroundVideo);
    } else if (index === 1) { // Second row: Title
      const titleCell = cells[0];
      const slideWrap = document.createElement('div');
      slideWrap.className = 'hero-full-width-slide-wrap';
      contentDiv.append(slideWrap);

      const slideUp = document.createElement('div');
      slideUp.setAttribute('data-slide-type', 'slide-up');
      slideUp.className = 'hero-full-width-slide-up';
      slideWrap.append(slideUp);

      const titleDiv = document.createElement('div');
      titleDiv.className = 'hero-full-width-cmp-hero-full-width__content__title';
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.innerHTML = titleCell.innerHTML;
      slideUp.append(titleDiv);
      moveInstrumentation(titleCell, titleDiv);

    } else if (index === 2) { // Third row: Description
      const descriptionCell = cells[0];
      // Assuming description also goes into the same slide-up div as title
      // If not, a new slideWrap/slideUp needs to be created.
      const existingSlideUp = contentDiv.querySelector('.hero-full-width-slide-wrap .hero-full-width-slide-up');
      if (existingSlideUp) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'hero-full-width-cmp-hero-full-width__content__description';
        descriptionDiv.setAttribute('tabindex', '0');
        descriptionDiv.innerHTML = descriptionCell.innerHTML;
        existingSlideUp.append(descriptionDiv);
        moveInstrumentation(descriptionCell, descriptionDiv);
      }
    } else if (index === 3) { // Fourth row: CTAs
      const cta1Cell = cells[0];
      const cta2Cell = cells[1];

      const slideWrap = document.createElement('div');
      slideWrap.className = 'hero-full-width-slide-wrap';
      contentDiv.append(slideWrap);

      const slideUp = document.createElement('div');
      slideUp.setAttribute('data-slide-type', 'slide-up');
      slideUp.className = 'hero-full-width-slide-up';
      slideWrap.append(slideUp);

      const ctasDiv = document.createElement('div');
      ctasDiv.className = 'hero-full-width-cmp-hero-full-width__content--ctas';
      slideUp.append(ctasDiv);

      // CTA 1
      const cta1Link = cta1Cell.querySelector('a');
      if (cta1Link) {
        const newCta1 = document.createElement('a');
        newCta1.href = cta1Link.href;
        newCta1.className = 'hero-full-width-cta hero-full-width-cta__secondary hero-full-width-primaryCta';
        newCta1.setAttribute('target', '_self');
        newCta1.setAttribute('aria-label', cta1Link.textContent || 'Explore more');
        newCta1.setAttribute('data-palette', 'palette-light');
        const cta1Span = document.createElement('span');
        cta1Span.className = 'hero-full-width-cta__label';
        cta1Span.textContent = cta1Link.textContent;
        newCta1.append(cta1Span);
        ctasDiv.append(newCta1);
        moveInstrumentation(cta1Link, newCta1);
      }

      const chevronWrapper = document.createElement('div');
      chevronWrapper.className = 'hero-full-width-chevron-wrapper';
      ctasDiv.append(chevronWrapper);

      const chevronButton = document.createElement('button');
      chevronButton.type = 'button';
      chevronButton.className = 'hero-full-width-chevron-icon';
      chevronButton.setAttribute('aria-label', 'Open video modal');
      chevronWrapper.append(chevronButton);

      // CTA 2
      const cta2Link = cta2Cell.querySelector('a');
      if (cta2Link) {
        const newCta2 = document.createElement('a');
        newCta2.href = cta2Link.href;
        newCta2.className = 'hero-full-width-cta hero-full-width-cta__link hero-full-width-secondaryCta';
        newCta2.setAttribute('target', '_self');
        newCta2.setAttribute('aria-label', cta2Link.textContent || 'Watch Video');
        newCta2.setAttribute('data-palette', 'palette-light');
        const cta2Icon = document.createElement('span');
        cta2Icon.className = 'hero-full-width-cta__icon hero-full-width-qd-icon hero-full-width-qd-icon--cheveron-right';
        cta2Icon.setAttribute('aria-hidden', 'true');
        newCta2.append(cta2Icon);
        const cta2Span = document.createElement('span');
        cta2Span.className = 'hero-full-width-cta__label';
        cta2Span.textContent = cta2Link.textContent;
        newCta2.append(cta2Span);
        chevronWrapper.append(newCta2);
        moveInstrumentation(cta2Link, newCta2);
      }
    }
  });

  block.textContent = '';
  block.append(mainDiv);
}
