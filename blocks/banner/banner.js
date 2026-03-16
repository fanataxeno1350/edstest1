import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'boing', 'banner-section__wrapper');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('video-wrapper');

  const videoElement = block.querySelector('video');
  if (videoElement) {
    videoElement.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
    videoElement.setAttribute('title', 'Video');
    videoElement.setAttribute('aria-label', 'Video');
    videoElement.setAttribute('data-is-autoplay', 'true');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('preload', 'metadata');
    videoElement.setAttribute('fetchpriority', 'high');
    videoElement.setAttribute('loop', 'false');
    videoElement.setAttribute('muted', 'true');
    videoElement.setAttribute('autoplay', 'true');
    videoWrapper.append(videoElement);
    moveInstrumentation(videoElement, videoWrapper);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const playButton = block.querySelector('.video-icon.icon-play');
  if (playButton) {
    playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    playButton.setAttribute('type', 'button');
    playPauseWrapper.append(playButton);
    moveInstrumentation(playButton, playPauseWrapper);
  }

  const pauseButton = block.querySelector('.video-icon.icon-pause');
  if (pauseButton) {
    pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    pauseButton.setAttribute('type', 'button');
    playPauseWrapper.append(pauseButton);
    moveInstrumentation(pauseButton, playPauseWrapper);
  }
  videoWrapper.append(playPauseWrapper);

  const muteIconWrapper = document.createElement('div');
  muteIconWrapper.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

  const muteButton = block.querySelector('.video-icon-volume.icon-mute');
  if (muteButton) {
    muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    muteButton.setAttribute('type', 'button');
    muteIconWrapper.append(muteButton);
    moveInstrumentation(muteButton, muteIconWrapper);
  }

  const unmuteButton = block.querySelector('.video-icon-volume.icon-unmute');
  if (unmuteButton) {
    unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    unmuteButton.setAttribute('type', 'button');
    muteIconWrapper.append(unmuteButton);
    moveInstrumentation(unmuteButton, muteIconWrapper);
  }

  const noAudioIcon = block.querySelector('.video-icon-volume.no-audio-icon');
  if (noAudioIcon) {
    noAudioIcon.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    noAudioIcon.setAttribute('type', 'button');
    muteIconWrapper.append(noAudioIcon);
    moveInstrumentation(noAudioIcon, muteIconWrapper);
  }
  videoWrapper.append(muteIconWrapper);

  positionRelativeDiv.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');

  const authoredCta = block.querySelector('.banner-cta > div:not(.video-wrapper)');
  if (authoredCta) {
    bannerCta.append(...authoredCta.children);
    moveInstrumentation(authoredCta, bannerCta);
  }
  ctaWrapper.append(bannerCta);

  positionRelativeDiv.append(ctaWrapper);
  bannerSection.append(positionRelativeDiv);

  block.textContent = '';
  block.append(bannerSection);
  block.classList.add('banner');
  block.dataset.blockStatus = 'loaded';
}
