import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const videoElement = document.createElement('video');
  videoElement.className = 'banner-video banner-media banner-w-100 banner-object-fit-cover';
  videoElement.setAttribute('title', 'Video');
  videoElement.setAttribute('aria-label', 'Video');
  videoElement.setAttribute('data-is-autoplay', 'true');
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('preload', 'metadata');
  videoElement.setAttribute('fetchpriority', 'high');
  videoElement.setAttribute('loop', 'false');
  videoElement.setAttribute('muted', 'true');
  videoElement.setAttribute('autoplay', 'true');

  const videoSource = block.querySelector('[data-aue-prop="video"]');
  if (videoSource) {
    const sourceElement = document.createElement('source');
    sourceElement.src = videoSource.href;
    sourceElement.type = 'video/mp4';
    videoElement.append(sourceElement);
    moveInstrumentation(videoSource, videoElement);
  }
  videoWrapper.append(videoElement);

  const controlsWrapper = document.createElement('div');
  controlsWrapper.className = 'banner-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playIcon = block.querySelector('[data-aue-prop="playIcon"]');
  if (playIcon) {
    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.className = 'banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
    playButton.innerHTML = playIcon.textContent.trim();
    controlsWrapper.append(playButton);
    moveInstrumentation(playIcon, playButton);
  }

  const pauseIcon = block.querySelector('[data-aue-prop="pauseIcon"]');
  if (pauseIcon) {
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.className = 'banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-block';
    pauseButton.innerHTML = pauseIcon.textContent.trim();
    controlsWrapper.append(pauseButton);
    moveInstrumentation(pauseIcon, pauseButton);
  }
  videoWrapper.append(controlsWrapper);

  const muteIconWrapper = document.createElement('div');
  muteIconWrapper.className = 'banner-mute-icon banner-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const muteIcon = block.querySelector('[data-aue-prop="muteIcon"]');
  if (muteIcon) {
    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.className = 'banner-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
    muteButton.innerHTML = muteIcon.textContent.trim();
    muteIconWrapper.append(muteButton);
    moveInstrumentation(muteIcon, muteButton);
  }

  const unmuteIcon = block.querySelector('[data-aue-prop="unmuteIcon"]');
  if (unmuteIcon) {
    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.className = 'banner-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
    unmuteButton.innerHTML = unmuteIcon.textContent.trim();
    muteIconWrapper.append(unmuteButton);
    moveInstrumentation(unmuteIcon, unmuteButton);
  }

  const noAudioIcon = block.querySelector('[data-aue-prop="noAudioIcon"]');
  if (noAudioIcon) {
    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.className = 'banner-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
    noAudioButton.innerHTML = noAudioIcon.textContent.trim();
    muteIconWrapper.append(noAudioButton);
    moveInstrumentation(noAudioIcon, noAudioButton);
  }
  videoWrapper.append(muteIconWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-cta';
  ctaWrapper.append(ctaDiv);

  const rootDiv = document.createElement('div');
  rootDiv.className = 'banner-section__wrapper banner-position-relative banner-boing';
  rootDiv.append(videoWrapper, ctaWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
