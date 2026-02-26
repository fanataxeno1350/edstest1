import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSectionWrapper = document.createElement('div');
  bannerSectionWrapper.classList.add('banner-section__wrapper', 'banner-position-relative', 'banner-boing');
  moveInstrumentation(block.firstElementChild, bannerSectionWrapper);

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('banner-video-wrapper');

  const videoElement = document.createElement('video');
  videoElement.classList.add('banner-video', 'banner-w-100', 'banner-object-fit-cover', 'banner-media');
  videoElement.setAttribute('title', 'Video');
  videoElement.setAttribute('aria-label', 'Video');
  videoElement.setAttribute('data-is-autoplay', 'true');
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('preload', 'metadata');
  videoElement.setAttribute('fetchpriority', 'high');
  videoElement.setAttribute('loop', 'false');
  videoElement.setAttribute('muted', 'true');
  videoElement.setAttribute('autoplay', 'true');

  const videoControls = document.createElement('div');
  videoControls.classList.add('banner-video-controls', 'banner-position-absolute', 'banner-w-100', 'banner-h-100', 'banner-start-0', 'banner-top-0', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer');

  const playButton = document.createElement('button');
  playButton.setAttribute('type', 'button');
  playButton.classList.add('banner-video-icon', 'banner-icon-play', 'banner-bg-transparent', 'banner-d-none', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');

  const pauseButton = document.createElement('button');
  pauseButton.setAttribute('type', 'button');
  pauseButton.classList.add('banner-video-icon', 'banner-icon-pause', 'banner-bg-transparent', 'banner-d-block', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');

  const muteIcon = document.createElement('div');
  muteIcon.classList.add('banner-mute-icon', 'banner-position-absolute', 'banner-z-2', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer');

  const muteButton = document.createElement('button');
  muteButton.setAttribute('type', 'button');
  muteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'banner-bg-transparent', 'banner-d-none', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');

  const unmuteButton = document.createElement('button');
  unmuteButton.setAttribute('type', 'button');
  unmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'banner-bg-transparent', 'banner-d-none', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');

  const noAudioButton = document.createElement('button');
  noAudioButton.setAttribute('type', 'button');
  noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('banner-cta-wrapper', 'banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100');

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('banner-cta');

  [...block.children].forEach((row) => {
    const videoCell = row.children[0];
    const imageCell = row.children[1];
    const ctaCell = row.children[2];

    // Handle Video
    const videoSource = videoCell?.querySelector('source');
    if (videoSource) {
      const newSource = document.createElement('source');
      newSource.src = videoSource.src;
      newSource.type = videoSource.type;
      videoElement.append(newSource);
      moveInstrumentation(videoSource, newSource);

      playButton.innerHTML = videoControls.querySelector('.banner-icon-play')?.innerHTML || '';
      pauseButton.innerHTML = videoControls.querySelector('.banner-icon-pause')?.innerHTML || '';
      muteButton.innerHTML = muteIcon.querySelector('.banner-icon-mute')?.innerHTML || '';
      unmuteButton.innerHTML = muteIcon.querySelector('.banner-icon-unmute')?.innerHTML || '';
      noAudioButton.innerHTML = muteIcon.querySelector('.banner-no-audio-icon')?.innerHTML || '';

      videoControls.append(playButton, pauseButton);
      muteIcon.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(videoElement, videoControls, muteIcon);
      bannerSectionWrapper.append(videoWrapper);
    } else {
      // Handle Image
      const img = imageCell?.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.classList.add('banner-image', 'banner-w-100', 'banner-h-100', 'banner-object-fit-cover', 'banner-media');
        optimizedPic.querySelector('img').setAttribute('loading', 'eager');
        optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
        optimizedPic.querySelector('img').setAttribute('decoding', 'async');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        bannerSectionWrapper.append(optimizedPic);
      }
    }

    // Handle CTA
    const ctaLink = ctaCell?.querySelector('a');
    if (ctaLink) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('banner-text-center');

      const newLink = document.createElement('a');
      newLink.id = ctaLink.id;
      newLink.classList.add('banner-cmp-button', 'banner-analytics_cta_click', 'banner-text-center', 'banner-cta-layout');
      newLink.setAttribute('data-link-region', ctaLink.getAttribute('data-link-region'));
      newLink.setAttribute('data-is-internal', ctaLink.getAttribute('data-is-internal'));
      newLink.setAttribute('data-enable-gating', ctaLink.getAttribute('data-enable-gating'));
      newLink.href = ctaLink.href;
      newLink.target = ctaLink.target;

      const spanText = document.createElement('span');
      spanText.classList.add('banner-cmp-button__text', 'banner-primary-btn', 'banner-w-75', 'banner-p-5', 'banner-rounded-pill', 'banner-d-inline-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-famlf-cta-btn');
      spanText.textContent = ctaLink.textContent.trim();
      newLink.append(spanText);

      const popUpDiv = document.createElement('div');
      popUpDiv.classList.add('banner-pop-up', 'banner-d-none');

      const popupMessage = document.createElement('input');
      popupMessage.setAttribute('type', 'hidden');
      popupMessage.classList.add('banner-popup-message');

      const proceedButton = document.createElement('input');
      proceedButton.setAttribute('type', 'hidden');
      proceedButton.classList.add('banner-proceed-button-label');

      const cancelButton = document.createElement('input');
      cancelButton.setAttribute('type', 'hidden');
      cancelButton.classList.add('banner-cancel-button-label');

      const backgroundColor = document.createElement('input');
      backgroundColor.setAttribute('type', 'hidden');
      backgroundColor.classList.add('banner-background-color');

      popUpDiv.append(popupMessage, proceedButton, cancelButton, backgroundColor);
      textCenterDiv.append(newLink, popUpDiv);
      ctaDiv.append(textCenterDiv);
      ctaWrapper.append(ctaDiv);
      bannerSectionWrapper.append(ctaWrapper);
      moveInstrumentation(ctaLink, newLink);
    }
  });

  block.textContent = '';
  block.append(bannerSectionWrapper);
}