import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('banner-position-relative', 'banner-boing', 'banner-section__wrapper');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('banner-video-wrapper');

  const video = block.querySelector('[data-aue-prop="video"]');
  if (video) {
    const videoElement = document.createElement('video');
    videoElement.classList.add('banner-video-w-100', 'banner-video-object-fit-cover', 'banner-video-media', 'banner-video-video');
    videoElement.setAttribute('title', 'Video');
    videoElement.setAttribute('aria-label', 'Video');
    videoElement.setAttribute('data-is-autoplay', 'true');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('preload', 'metadata');
    videoElement.setAttribute('fetchpriority', 'high');
    videoElement.setAttribute('loop', 'false');
    videoElement.setAttribute('muted', 'true');
    videoElement.setAttribute('autoplay', 'true');

    const source = document.createElement('source');
    source.src = video.textContent.trim();
    source.type = 'video/mp4';
    videoElement.append(source);
    videoWrapper.append(videoElement);
    moveInstrumentation(video, videoWrapper);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.classList.add('banner-position-absolute', 'banner-video-w-100', 'banner-video-h-100', 'banner-video-start-0', 'banner-video-top-0', 'banner-video-d-flex', 'banner-video-justify-content-center', 'banner-video-align-items-center', 'banner-video-cursor-pointer');

  const playIcon = block.querySelector('[data-aue-prop="playIcon"]');
  if (playIcon) {
    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.classList.add('banner-d-none', 'banner-video-icon', 'banner-video-icon-play', 'banner-video-bg-transparent', 'banner-video-d-flex', 'banner-video-align-items-center', 'banner-video-justify-content-center', 'banner-video-cursor-pointer');
    playButton.innerHTML = playIcon.textContent.trim();
    playPauseWrapper.append(playButton);
    moveInstrumentation(playIcon, playPauseWrapper);
  }

  const pauseIcon = block.querySelector('[data-aue-prop="pauseIcon"]');
  if (pauseIcon) {
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.classList.add('banner-d-block', 'banner-video-icon', 'banner-video-icon-pause', 'banner-video-bg-transparent', 'banner-video-d-flex', 'banner-video-align-items-center', 'banner-video-justify-content-center', 'banner-video-cursor-pointer');
    pauseButton.innerHTML = pauseIcon.textContent.trim();
    playPauseWrapper.append(pauseButton);
    moveInstrumentation(pauseIcon, playPauseWrapper);
  }
  videoWrapper.append(playPauseWrapper);

  const muteUnmuteWrapper = document.createElement('div');
  muteUnmuteWrapper.classList.add('banner-position-absolute', 'banner-video-z-2', 'banner-video-d-flex', 'banner-video-justify-content-center', 'banner-video-align-items-center', 'banner-video-cursor-pointer', 'banner-video-mute-icon');

  const muteIcon = block.querySelector('[data-aue-prop="muteIcon"]');
  if (muteIcon) {
    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.classList.add('banner-video-icon-volume', 'banner-video-icon-mute', 'banner-video-bg-transparent', 'banner-video-d-flex', 'banner-video-align-items-center', 'banner-video-justify-content-center', 'banner-video-cursor-pointer', 'banner-d-none');
    muteButton.innerHTML = muteIcon.textContent.trim();
    muteUnmuteWrapper.append(muteButton);
    moveInstrumentation(muteIcon, muteUnmuteWrapper);
  }

  const unmuteIcon = block.querySelector('[data-aue-prop="unmuteIcon"]');
  if (unmuteIcon) {
    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.classList.add('banner-video-icon-volume', 'banner-video-icon-unmute', 'banner-video-bg-transparent', 'banner-video-d-flex', 'banner-video-align-items-center', 'banner-video-justify-content-center', 'banner-video-cursor-pointer', 'banner-d-none');
    unmuteButton.innerHTML = unmuteIcon.textContent.trim();
    muteUnmuteWrapper.append(unmuteButton);
    moveInstrumentation(unmuteIcon, muteUnmuteWrapper);
  }

  const noAudioIcon = block.querySelector('[data-aue-prop="noAudioIcon"]');
  if (noAudioIcon) {
    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.classList.add('banner-video-icon-volume', 'banner-video-no-audio-icon', 'banner-video-bg-transparent', 'banner-video-d-flex', 'banner-video-align-items-center', 'banner-video-justify-content-center', 'banner-video-cursor-pointer');
    noAudioButton.innerHTML = noAudioIcon.textContent.trim();
    muteUnmuteWrapper.append(noAudioButton);
    moveInstrumentation(noAudioIcon, muteUnmuteWrapper);
  }
  videoWrapper.append(muteUnmuteWrapper);

  wrapperDiv.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100', 'banner-boing__banner--cta');
  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('banner-cta');
  ctaWrapper.append(ctaDiv);
  wrapperDiv.append(ctaWrapper);

  bannerSection.append(wrapperDiv);

  block.textContent = '';
  block.append(bannerSection);
  block.className = 'banner block';
  block.dataset.blockStatus = 'loaded';
}
