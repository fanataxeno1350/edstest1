import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const heroFullWidthCmp = document.createElement('div');
  heroFullWidthCmp.className = 'hero-full-width-cmp-hero-full-width hero-full-width-parallax-child-2';
  heroFullWidthCmp.setAttribute('data-media-type', 'videoTypeSelected');

  const viewportImage = document.createElement('div');
  viewportImage.className = 'hero-full-width-viewport-image';
  viewportImage.hidden = true;
  viewportImage.setAttribute('aria-hidden', 'true');
  heroFullWidthCmp.append(viewportImage);

  const viewportVideo = document.createElement('div');
  viewportVideo.className = 'hero-full-width-viewport-video';
  viewportVideo.hidden = true;
  viewportVideo.setAttribute('aria-hidden', 'true');
  heroFullWidthCmp.append(viewportVideo);

  const heroCover = document.createElement('div');
  heroCover.className = 'hero-full-width-hero-full-width__cover';
  heroFullWidthCmp.append(heroCover);

  const heroBackground = document.createElement('div');
  heroBackground.className = 'hero-full-width-hero-full-width__background';
  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.className = 'hero-full-width-hero-full-width__background-wrapper hero-full-width-zoom-out';
  heroBackground.append(backgroundWrapper);
  heroFullWidthCmp.append(heroBackground);

  const heroContent = document.createElement('div');
  heroContent.className = 'hero-full-width-hero-full-width__content';
  heroFullWidthCmp.append(heroContent);

  const modalDialog = document.createElement('dialog');
  modalDialog.className = 'hero-full-width-hero-full-width__content--modal';
  modalDialog.id = 'home-page-video-dialog';
  modalDialog.setAttribute('closedby', 'any');
  modalDialog.setAttribute('aria-modal', 'true');
  modalDialog.setAttribute('aria-label', 'Video Modal');
  heroContent.append(modalDialog);

  const form = document.createElement('form');
  form.method = 'dialog';
  modalDialog.append(form);

  const closeButton = document.createElement('button');
  closeButton.className = 'hero-full-width-hero-full-width__content--modal__close-button';
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.tabIndex = 0;
  closeButton.textContent = 'X';
  form.append(closeButton);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.className = 'hero-full-width-video hero-full-width-hero-full-width__content--modal__video';
  modalDialog.append(videoModalDiv);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'hero-full-width-video-container hero-full-width-show-controls';
  videoModalDiv.append(videoContainer);

  const videoViewportVideo = document.createElement('div');
  videoViewportVideo.className = 'hero-full-width-video-viewport-video';
  videoViewportVideo.hidden = true;
  videoViewportVideo.setAttribute('aria-hidden', 'true');
  videoContainer.append(videoViewportVideo);

  const videoControls = document.createElement('div');
  videoControls.className = 'hero-full-width-video-container__controls';
  videoContainer.append(videoControls);

  const videoTimer = document.createElement('div');
  videoTimer.className = 'hero-full-width-video-container__controls__timer';
  videoControls.append(videoTimer);

  const progressArea = document.createElement('div');
  progressArea.className = 'hero-full-width-video-container__controls__timer__progress-area';
  videoTimer.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.className = 'hero-full-width-video-container__controls__timer__progress-area__progress-bar';
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.className = 'hero-full-width-video-container__controls__timer__progress-area__pointer';
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.className = 'hero-full-width-video-container__controls__timer__progress-area__progress-pending';
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.className = 'hero-full-width-video-container__controls__timer__current-time';
  currentTime.textContent = '00:00';
  videoTimer.append(currentTime);

  const duration = document.createElement('p');
  duration.className = 'hero-full-width-video-container__controls__timer__duration';
  duration.textContent = '00:00';
  videoTimer.append(duration);

  const videoButtons = document.createElement('div');
  videoButtons.className = 'hero-full-width-video-container__controls__buttons';
  videoControls.append(videoButtons);

  const playButton = document.createElement('button');
  playButton.className = 'hero-full-width-video-container__controls__buttons__play-button hero-full-width-video-container__controls__buttons--button';
  const playIcon = document.createElement('span');
  playIcon.className = 'hero-full-width-video-container__controls__buttons__icon hero-full-width-qd-icon hero-full-width-qd-icon--play';
  playButton.append(playIcon);
  videoButtons.append(playButton);

  const muteButton = document.createElement('button');
  muteButton.className = 'hero-full-width-video-container__controls__buttons__mute-button hero-full-width-video-container__controls__buttons--button';
  const muteIcon = document.createElement('span');
  muteIcon.className = 'hero-full-width-video-container__controls__buttons__icon hero-full-width-qd-icon hero-full-width-qd-icon--volume';
  muteButton.append(muteIcon);
  videoButtons.append(muteButton);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'hero-full-width-video-container__controls__buttons__fullscreen-button hero-full-width-video-container__controls__buttons--button';
  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'hero-full-width-video-container__controls__buttons__icon hero-full-width-qd-icon hero-full-width-qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);
  videoButtons.append(fullscreenButton);

  const videoElement = document.createElement('video');
  videoElement.className = 'hero-full-width-video-container__video';
  videoElement.playsInline = true;
  videoElement.setAttribute('webkit-playsinline', '');
  videoElement.setAttribute('x-webkit-airplay', 'allow');
  videoContainer.append(videoElement);

  let backgroundVideoSrc = '';
  let backgroundPosterImgSrc = '';
  let titleContent = '';
  let descriptionContent = '';
  let primaryCtaLabel = '';
  let primaryCtaUrl = '';
  let secondaryCtaLabel = '';
  let secondaryCtaUrl = '';

  // Extract content from block rows
  [...block.children].forEach((row, index) => {
    moveInstrumentation(row, heroFullWidthCmp); // Transfer instrumentation to the main component

    const cells = [...row.children];
    if (cells.length > 0) {
      const fieldName = cells[0].textContent.trim(); // Assuming the first cell is the field name
      const fieldValue = cells[1]; // The second cell contains the value

      switch (fieldName) {
        case 'Background Video':
          const videoLink = fieldValue.querySelector('a');
          if (videoLink) {
            backgroundVideoSrc = videoLink.href;
          }
          break;
        case 'Background Poster Image':
          const posterImg = fieldValue.querySelector('img');
          if (posterImg) {
            backgroundPosterImgSrc = posterImg.src;
          }
          break;
        case 'Title':
          titleContent = fieldValue.innerHTML;
          break;
        case 'Description':
          descriptionContent = fieldValue.innerHTML;
          break;
        case 'Primary CTA Label':
          primaryCtaLabel = fieldValue.textContent.trim();
          break;
        case 'Primary CTA URL':
          const primaryLink = fieldValue.querySelector('a');
          if (primaryLink) {
            primaryCtaUrl = primaryLink.href;
          }
          break;
        case 'Secondary CTA Label':
          secondaryCtaLabel = fieldValue.textContent.trim();
          break;
        case 'Secondary CTA URL':
          const secondaryLink = fieldValue.querySelector('a');
          if (secondaryLink) {
            secondaryCtaUrl = secondaryLink.href;
          }
          break;
        default:
          break;
      }
    }
  });

  // Populate the background video and poster image
  const backgroundVideo = document.createElement('video');
  backgroundVideo.className = 'hero-full-width-hero-full-width__background-video';
  backgroundVideo.loop = true;
  backgroundVideo.muted = true;
  backgroundVideo.playsInline = true;
  backgroundVideo.autoplay = true;
  backgroundVideo.setAttribute('data-responsive-video', '');
  backgroundVideo.src = backgroundVideoSrc; // Set initial src
  if (titleContent) {
    backgroundVideo.setAttribute('aria-label', titleContent);
    backgroundVideo.setAttribute('aria-hidden', 'true');
  }

  const sourceMpegUrl = document.createElement('source');
  sourceMpegUrl.src = backgroundVideoSrc;
  sourceMpegUrl.type = 'application/x-mpegURL';
  backgroundVideo.append(sourceMpegUrl);

  // Assuming a .mp4 version is also available by replacing the extension
  const mp4Src = backgroundVideoSrc.replace('.avs.vnd.apple.mpegurl', '.mp4');
  const sourceMp4 = document.createElement('source');
  sourceMp4.src = mp4Src;
  sourceMp4.type = 'video/mp4';
  backgroundVideo.append(sourceMp4);

  backgroundWrapper.append(backgroundVideo);

  const backgroundPoster = document.createElement('img');
  backgroundPoster.alt = 'Background poster image';
  backgroundPoster.loading = 'lazy';
  backgroundPoster.className = 'hero-full-width-hero-full-width__background-poster';
  backgroundPoster.style.display = 'none';
  backgroundPoster.setAttribute('aria-hidden', 'true');
  if (backgroundPosterImgSrc) {
    const optimizedPoster = createOptimizedPicture(backgroundPosterImgSrc, backgroundPoster.alt);
    moveInstrumentation(backgroundPoster, optimizedPoster.querySelector('img'));
    backgroundWrapper.append(optimizedPoster);
  } else {
    backgroundWrapper.append(backgroundPoster);
  }

  // Populate the content section
  const slideWrap1 = document.createElement('div');
  slideWrap1.className = 'hero-full-width-slide-wrap';
  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.className = 'hero-full-width-slide-up';
  slideWrap1.append(slideUp1);
  heroContent.append(slideWrap1);

  if (titleContent) {
    const titleDiv = document.createElement('div');
    titleDiv.className = 'hero-full-width-hero-full-width__content__title';
    titleDiv.tabIndex = 0;
    titleDiv.innerHTML = titleContent;
    slideUp1.append(titleDiv);
    heroFullWidthCmp.setAttribute('aria-label', titleContent);
  }

  if (descriptionContent) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'hero-full-width-hero-full-width__content__description';
    descriptionDiv.tabIndex = 0;
    descriptionDiv.innerHTML = descriptionContent;
    slideUp1.append(descriptionDiv);
  }

  const slideWrap2 = document.createElement('div');
  slideWrap2.className = 'hero-full-width-slide-wrap';
  const slideUp2 = document.createElement('div');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideUp2.className = 'hero-full-width-slide-up';
  slideWrap2.append(slideUp2);
  heroContent.append(slideWrap2);

  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'hero-full-width-hero-full-width__content--ctas';
  slideUp2.append(ctaContainer);

  if (primaryCtaUrl && primaryCtaLabel) {
    const primaryCta = document.createElement('a');
    primaryCta.href = primaryCtaUrl;
    primaryCta.className = 'hero-full-width-cta hero-full-width-cta__secondary hero-full-width-primaryCta';
    primaryCta.target = '_self';
    primaryCta.setAttribute('aria-label', primaryCtaLabel);
    primaryCta.setAttribute('data-palette', 'palette-light');
    const primaryCtaLabelSpan = document.createElement('span');
    primaryCtaLabelSpan.className = 'hero-full-width-cta__label';
    primaryCtaLabelSpan.textContent = primaryCtaLabel;
    primaryCta.append(primaryCtaLabelSpan);
    ctaContainer.append(primaryCta);
  }

  const chevronWrapper = document.createElement('div');
  chevronWrapper.className = 'hero-full-width-chevron-wrapper';
  ctaContainer.append(chevronWrapper);

  const chevronButton = document.createElement('button');
  chevronButton.type = 'button';
  chevronButton.className = 'hero-full-width-chevron-icon';
  chevronButton.setAttribute('aria-label', 'Open video modal');
  chevronWrapper.append(chevronButton);

  if (secondaryCtaUrl && secondaryCtaLabel) {
    const secondaryCta = document.createElement('a');
    secondaryCta.href = secondaryCtaUrl;
    secondaryCta.className = 'hero-full-width-cta hero-full-width-cta__link hero-full-width-secondaryCta';
    secondaryCta.target = '_self';
    secondaryCta.setAttribute('aria-label', secondaryCtaLabel);
    secondaryCta.setAttribute('data-palette', 'palette-light');
    const secondaryCtaIcon = document.createElement('span');
    secondaryCtaIcon.className = 'hero-full-width-cta__icon hero-full-width-qd-icon hero-full-width-qd-icon--cheveron-right';
    secondaryCtaIcon.setAttribute('aria-hidden', 'true');
    secondaryCta.append(secondaryCtaIcon);
    const secondaryCtaLabelSpan = document.createElement('span');
    secondaryCtaLabelSpan.className = 'hero-full-width-cta__label';
    secondaryCtaLabelSpan.textContent = secondaryCtaLabel;
    secondaryCta.append(secondaryCtaLabelSpan);
    chevronWrapper.append(secondaryCta);
  }

  // Set modal video src
  videoElement.src = backgroundVideoSrc; // Reusing the background video for the modal
  videoElement.setAttribute('data-video-src', backgroundVideoSrc);

  block.textContent = '';
  block.append(heroFullWidthCmp);
}