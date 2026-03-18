import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'boing', 'banner-section__wrapper');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('banner-video-wrapper');

  const videoElement = block.querySelector('video');
  if (videoElement) {
    videoElement.classList.add('banner-video-w-100', 'banner-video-object-fit-cover', 'banner-media', 'banner-video');
    videoWrapper.append(videoElement);
    moveInstrumentation(videoElement, videoWrapper);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.classList.add('position-absolute', 'banner-video-w-100', 'banner-video-h-100', 'banner-video-start-0', 'banner-video-top-0', 'banner-video-d-flex', 'banner-video-justify-content-center', 'banner-video-align-items-center', 'banner-video-cursor-pointer');

  const playButton = block.querySelector('.banner-video-icon-play');
  if (playButton) {
    playButton.classList.add('banner-video-bg-transparent', 'banner-video-d-flex', 'banner-video-align-items-center', 'banner-video-justify-content-center', 'banner-video-cursor-pointer');
    playPauseWrapper.append(playButton);
    moveInstrumentation(playButton, playPauseWrapper);
  }

  const pauseButton = block.querySelector('.banner-video-icon-pause');
  if (pauseButton) {
    pauseButton.classList.add('banner-video-bg-transparent', 'banner-video-d-flex', 'banner-video-align-items-center', 'banner-video-justify-content-center', 'banner-video-cursor-pointer');
    playPauseWrapper.append(pauseButton);
    moveInstrumentation(pauseButton, playPauseWrapper);
  }
  videoWrapper.append(playPauseWrapper);

  const muteIconWrapper = document.createElement('div');
  muteIconWrapper.classList.add('position-absolute', 'banner-video-z-2', 'banner-video-d-flex', 'banner-video-justify-content-center', 'banner-video-align-items-center', 'banner-video-cursor-pointer', 'banner-mute-icon');

  const muteButton = block.querySelector('.banner-icon-mute');
  if (muteButton) {
    muteButton.classList.add('banner-video-icon-volume', 'banner-video-bg-transparent', 'banner-video-d-flex', 'banner-video-align-items-center', 'banner-video-justify-content-center', 'banner-video-cursor-pointer');
    muteIconWrapper.append(muteButton);
    moveInstrumentation(muteButton, muteIconWrapper);
  }

  const unmuteButton = block.querySelector('.banner-icon-unmute');
  if (unmuteButton) {
    unmuteButton.classList.add('banner-video-icon-volume', 'banner-video-bg-transparent', 'banner-video-d-flex', 'banner-video-align-items-center', 'banner-video-justify-content-center', 'banner-video-cursor-pointer');
    muteIconWrapper.append(unmuteButton);
    moveInstrumentation(unmuteButton, muteIconWrapper);
  }

  const noAudioButton = block.querySelector('.banner-no-audio-icon');
  if (noAudioButton) {
    noAudioButton.classList.add('banner-video-icon-volume', 'banner-video-bg-transparent', 'banner-video-d-flex', 'banner-video-align-items-center', 'banner-video-justify-content-center', 'banner-video-cursor-pointer');
    muteIconWrapper.append(noAudioButton);
    moveInstrumentation(noAudioButton, muteIconWrapper);
  }
  videoWrapper.append(muteIconWrapper);

  positionRelativeDiv.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100', 'banner-boing__banner--cta');

  const bannerCta = block.querySelector('.banner-cta');
  if (bannerCta) {
    ctaWrapper.append(bannerCta);
    moveInstrumentation(bannerCta, ctaWrapper);
  }

  positionRelativeDiv.append(ctaWrapper);
  bannerSection.append(positionRelativeDiv);

  block.textContent = '';
  block.append(bannerSection);
  block.className = `banner block`;
  block.dataset.blockStatus = 'loaded';
}
