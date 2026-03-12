import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoSrc = block.querySelector('[data-aue-prop="videoSrc"]');
  const playIcon = block.querySelector('[data-aue-prop="playIcon"]');
  const pauseIcon = block.querySelector('[data-aue-prop="pauseIcon"]');
  const muteIcon = block.querySelector('[data-aue-prop="muteIcon"]');
  const unmuteIcon = block.querySelector('[data-aue-prop="unmuteIcon"]');
  const noAudioIcon = block.querySelector('[data-aue-prop="noAudioIcon"]');

  const rootWrapper = document.createElement('div');
  rootWrapper.className = 'banner-section__wrapper banner-position-relative banner-boing';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  if (videoSrc) {
    const videoElement = document.createElement('video');
    videoElement.className = 'banner-video banner-w-100 banner-object-fit-cover banner-media';
    videoElement.title = 'Video';
    videoElement.ariaLabel = 'Video';
    videoElement.setAttribute('data-is-autoplay', 'true');
    videoElement.playsInline = true;
    videoElement.preload = 'metadata';
    videoElement.fetchPriority = 'high';
    videoElement.loop = false;
    videoElement.muted = true;
    videoElement.autoplay = true;

    const sourceElement = document.createElement('source');
    sourceElement.src = videoSrc.textContent.trim();
    sourceElement.type = 'video/mp4';
    videoElement.append(sourceElement);
    moveInstrumentation(videoSrc, sourceElement);
    videoWrapper.append(videoElement);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.className = 'banner-video-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  if (playIcon) {
    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.className = 'banner-video-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
    playButton.innerHTML = playIcon.textContent.trim();
    moveInstrumentation(playIcon, playButton);
    playPauseWrapper.append(playButton);
  }

  if (pauseIcon) {
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.className = 'banner-video-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
    pauseButton.innerHTML = pauseIcon.textContent.trim();
    moveInstrumentation(pauseIcon, pauseButton);
    playPauseWrapper.append(pauseButton);
  }
  videoWrapper.append(playPauseWrapper);

  const muteUnmuteWrapper = document.createElement('div');
  muteUnmuteWrapper.className = 'banner-video-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  if (muteIcon) {
    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.className = 'banner-video-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
    muteButton.innerHTML = muteIcon.textContent.trim();
    moveInstrumentation(muteIcon, muteButton);
    muteUnmuteWrapper.append(muteButton);
  }

  if (unmuteIcon) {
    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.className = 'banner-video-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
    unmuteButton.innerHTML = unmuteIcon.textContent.trim();
    moveInstrumentation(unmuteIcon, unmuteButton);
    muteUnmuteWrapper.append(unmuteButton);
  }

  if (noAudioIcon) {
    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.className = 'banner-video-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
    noAudioButton.innerHTML = noAudioIcon.textContent.trim();
    moveInstrumentation(noAudioIcon, noAudioButton);
    muteUnmuteWrapper.append(noAudioButton);
  }
  videoWrapper.append(muteUnmuteWrapper);

  rootWrapper.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';

  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-cta';
  ctaWrapper.append(ctaDiv);
  rootWrapper.append(ctaWrapper);

  block.textContent = '';
  block.append(rootWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
