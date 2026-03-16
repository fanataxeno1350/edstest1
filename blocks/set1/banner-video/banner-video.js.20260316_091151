import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('banner-video-wrapper');

  const videoElement = document.querySelector('[data-aue-prop="videoSource"]');
  if (videoElement) {
    const video = document.createElement('video');
    video.classList.add('banner-video', 'w-100', 'object-fit-cover', 'banner-media');
    video.setAttribute('title', 'Video');
    video.setAttribute('aria-label', 'Video');
    video.setAttribute('data-is-autoplay', 'true');
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'metadata');
    video.setAttribute('fetchpriority', 'high');
    video.setAttribute('loop', 'false');
    video.setAttribute('muted', 'true');
    video.setAttribute('autoplay', 'true');

    const source = document.createElement('source');
    source.src = videoElement.src;
    source.type = 'video/mp4';
    video.append(source);
    videoWrapper.append(video);
    moveInstrumentation(videoElement, video);
  }

  const playPauseContainer = document.createElement('div');
  playPauseContainer.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const playIconElement = document.querySelector('[data-aue-prop="playIcon"]');
  if (playIconElement) {
    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.classList.add('video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    playButton.innerHTML = playIconElement.innerHTML; // Assuming SVG content
    playPauseContainer.append(playButton);
    moveInstrumentation(playIconElement, playButton);
  }

  const pauseIconElement = document.querySelector('[data-aue-prop="pauseIcon"]');
  if (pauseIconElement) {
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.classList.add('video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-block');
    pauseButton.innerHTML = pauseIconElement.innerHTML; // Assuming SVG content
    playPauseContainer.append(pauseButton);
    moveInstrumentation(pauseIconElement, pauseButton);
  }
  videoWrapper.append(playPauseContainer);

  const muteIconContainer = document.createElement('div');
  muteIconContainer.classList.add('mute-icon', 'position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const muteIconElement = document.querySelector('[data-aue-prop="muteIcon"]');
  if (muteIconElement) {
    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    muteButton.innerHTML = muteIconElement.innerHTML; // Assuming SVG content
    muteIconContainer.append(muteButton);
    moveInstrumentation(muteIconElement, muteButton);
  }

  const unmuteIconElement = document.querySelector('[data-aue-prop="unmuteIcon"]');
  if (unmuteIconElement) {
    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    unmuteButton.innerHTML = unmuteIconElement.innerHTML; // Assuming SVG content
    muteIconContainer.append(unmuteButton);
    moveInstrumentation(unmuteIconElement, unmuteButton);
  }

  const noAudioIconElement = document.querySelector('[data-aue-prop="noAudioIcon"]');
  if (noAudioIconElement) {
    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    noAudioButton.innerHTML = noAudioIconElement.innerHTML; // Assuming SVG content
    muteIconContainer.append(noAudioButton);
    moveInstrumentation(noAudioIconElement, noAudioButton);
  }
  videoWrapper.append(muteIconContainer);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('boing__banner--cta', 'position-absolute', 'start-50', 'translate-middle-x', 'w-100');

  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');
  // Assuming any CTA content would be directly inside the block and moved here
  // For this specific example, the authored HTML doesn't show content for banner-cta
  // If there was content, it would be extracted and appended here.
  ctaWrapper.append(bannerCta);

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('banner-section__wrapper', 'position-relative', 'boing');
  rootDiv.append(videoWrapper);
  rootDiv.append(ctaWrapper);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
