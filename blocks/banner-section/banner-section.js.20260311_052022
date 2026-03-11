import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('banner-section__wrapper', 'banner-position-relative', 'banner-boing');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('banner-video-wrapper');

  const videoElement = block.querySelector('video');
  if (videoElement) {
    videoElement.classList.add('banner-video', 'banner-w-100', 'banner-object-fit-cover', 'banner-media');
    videoWrapper.append(videoElement);
    moveInstrumentation(block.querySelector('[data-aue-prop="video"]'), videoWrapper);
  } else {
    const videoLink = block.querySelector('[data-aue-prop="video"] a');
    if (videoLink && videoLink.href.endsWith('.mp4')) {
      const newVideo = document.createElement('video');
      newVideo.classList.add('banner-video', 'banner-w-100', 'banner-object-fit-cover', 'banner-media');
      newVideo.setAttribute('title', 'Video');
      newVideo.setAttribute('aria-label', 'Video');
      newVideo.setAttribute('playsinline', '');
      newVideo.setAttribute('preload', 'metadata');
      newVideo.setAttribute('fetchpriority', 'high');
      newVideo.setAttribute('loop', 'false');
      newVideo.setAttribute('muted', 'true');
      newVideo.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.src = videoLink.href;
      source.type = 'video/mp4';
      newVideo.append(source);
      videoWrapper.append(newVideo);
      moveInstrumentation(videoLink, newVideo);
    }
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.classList.add('banner-video-position-absolute', 'banner-w-100', 'banner-h-100', 'banner-start-0', 'banner-top-0', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer');

  const playButton = document.createElement('button');
  playButton.setAttribute('type', 'button');
  playButton.classList.add('banner-video-d-none', 'banner-video-icon', 'banner-icon-play', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
  const playIcon = block.querySelector('[data-aue-prop="playIcon"]');
  if (playIcon) {
    playButton.innerHTML = playIcon.innerHTML;
    moveInstrumentation(playIcon, playButton);
  }
  playPauseWrapper.append(playButton);

  const pauseButton = document.createElement('button');
  pauseButton.setAttribute('type', 'button');
  pauseButton.classList.add('banner-video-d-block', 'banner-video-icon', 'banner-icon-pause', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
  const pauseIcon = block.querySelector('[data-aue-prop="pauseIcon"]');
  if (pauseIcon) {
    pauseButton.innerHTML = pauseIcon.innerHTML;
    moveInstrumentation(pauseIcon, pauseButton);
  }
  playPauseWrapper.append(pauseButton);
  videoWrapper.append(playPauseWrapper);

  const muteControlWrapper = document.createElement('div');
  muteControlWrapper.classList.add('banner-video-position-absolute', 'banner-z-2', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer', 'banner-mute-icon');

  const muteButton = document.createElement('button');
  muteButton.setAttribute('type', 'button');
  muteButton.classList.add('banner-video-video-icon-volume', 'banner-icon-mute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
  const muteIcon = block.querySelector('[data-aue-prop="muteIcon"]');
  if (muteIcon) {
    muteButton.innerHTML = muteIcon.innerHTML;
    moveInstrumentation(muteIcon, muteButton);
  }
  muteControlWrapper.append(muteButton);

  const unmuteButton = document.createElement('button');
  unmuteButton.setAttribute('type', 'button');
  unmuteButton.classList.add('banner-video-video-icon-volume', 'banner-icon-unmute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
  const unmuteIcon = block.querySelector('[data-aue-prop="unmuteIcon"]');
  if (unmuteIcon) {
    unmuteButton.innerHTML = unmuteIcon.innerHTML;
    moveInstrumentation(unmuteIcon, unmuteButton);
  }
  muteControlWrapper.append(unmuteButton);

  const noAudioButton = document.createElement('button');
  noAudioButton.setAttribute('type', 'button');
  noAudioButton.classList.add('banner-video-video-icon-volume', 'banner-no-audio-icon', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
  const noAudioIcon = block.querySelector('[data-aue-prop="noAudioIcon"]');
  if (noAudioIcon) {
    noAudioButton.innerHTML = noAudioIcon.innerHTML;
    moveInstrumentation(noAudioIcon, noAudioButton);
  }
  muteControlWrapper.append(noAudioButton);
  videoWrapper.append(muteControlWrapper);

  wrapperDiv.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('banner-boing__banner--cta', 'banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100');

  const ctaContent = block.querySelector('.banner-cta');
  if (ctaContent) {
    ctaWrapper.append(ctaContent);
    moveInstrumentation(ctaContent, ctaWrapper);
  }
  wrapperDiv.append(ctaWrapper);

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
