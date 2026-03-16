import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('banner-position-relative', 'banner-boing', 'banner-section__wrapper');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('banner-video-wrapper');

  const videoElement = block.querySelector('video');
  if (videoElement) {
    videoElement.classList.add('banner-w-100', 'banner-object-fit-cover', 'banner-media', 'banner-video');
    videoWrapper.append(videoElement);
    moveInstrumentation(videoElement, videoWrapper);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.classList.add('banner-position-absolute', 'banner-w-100', 'banner-h-100', 'banner-start-0', 'banner-top-0', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer');

  const playButton = block.querySelector('.banner-icon-play');
  if (playButton) {
    playButton.classList.add('banner-d-none', 'banner-video-icon', 'banner-icon-play', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
    playPauseWrapper.append(playButton);
    moveInstrumentation(playButton, playPauseWrapper);
  }

  const pauseButton = block.querySelector('.banner-icon-pause');
  if (pauseButton) {
    pauseButton.classList.add('banner-d-block', 'banner-video-icon', 'banner-icon-pause', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
    playPauseWrapper.append(pauseButton);
    moveInstrumentation(pauseButton, playPauseWrapper);
  }
  videoWrapper.append(playPauseWrapper);

  const muteIconWrapper = document.createElement('div');
  muteIconWrapper.classList.add('banner-position-absolute', 'banner-z-2', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer', 'banner-mute-icon');

  const muteButton = block.querySelector('.banner-icon-mute');
  if (muteButton) {
    muteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
    muteIconWrapper.append(muteButton);
    moveInstrumentation(muteButton, muteIconWrapper);
  }

  const unmuteButton = block.querySelector('.banner-icon-unmute');
  if (unmuteButton) {
    unmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
    muteIconWrapper.append(unmuteButton);
    moveInstrumentation(unmuteButton, muteIconWrapper);
  }

  const noAudioButton = block.querySelector('.banner-no-audio-icon');
  if (noAudioButton) {
    noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
    muteIconWrapper.append(noAudioButton);
    moveInstrumentation(noAudioButton, muteIconWrapper);
  }
  videoWrapper.append(muteIconWrapper);

  wrapperDiv.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100', 'banner-boing__banner--cta');

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('banner-cta');

  // Assuming CTA content is within a div inside the block, or if it's empty, we create an empty div
  const authoredCtaContent = block.querySelector('.banner-cta');
  if (authoredCtaContent) {
    // Move all children of the authored CTA content into the new ctaDiv
    Array.from(authoredCtaContent.children).forEach((child) => {
      ctaDiv.append(child);
      moveInstrumentation(child, ctaDiv);
    });
    moveInstrumentation(authoredCtaContent, ctaDiv);
  }

  ctaWrapper.append(ctaDiv);
  wrapperDiv.append(ctaWrapper);
  bannerSection.append(wrapperDiv);

  block.textContent = '';
  block.append(bannerSection);
  block.className = `banner block`;
  block.dataset.blockStatus = 'loaded';
}
