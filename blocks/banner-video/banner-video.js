import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'banner-section__wrapper banner-position-relative banner-boing';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const videoElement = block.querySelector('video');
  if (videoElement) {
    videoWrapper.append(videoElement);
    moveInstrumentation(videoElement, videoWrapper);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.className = 'banner-video-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = block.querySelector('.banner-video-icon.banner-icon-play');
  if (playButton) {
    playPauseWrapper.append(playButton);
    moveInstrumentation(playButton, playPauseWrapper);
  }

  const pauseButton = block.querySelector('.banner-video-icon.banner-icon-pause');
  if (pauseButton) {
    playPauseWrapper.append(pauseButton);
    moveInstrumentation(pauseButton, playPauseWrapper);
  }
  videoWrapper.append(playPauseWrapper);

  const muteUnmuteWrapper = document.createElement('div');
  muteUnmuteWrapper.className = 'banner-video-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = block.querySelector('.banner-video-video-icon-volume.banner-icon-mute');
  if (muteButton) {
    muteUnmuteWrapper.append(muteButton);
    moveInstrumentation(muteButton, muteUnmuteWrapper);
  }

  const unmuteButton = block.querySelector('.banner-video-video-icon-volume.banner-icon-unmute');
  if (unmuteButton) {
    muteUnmuteWrapper.append(unmuteButton);
    moveInstrumentation(unmuteButton, muteUnmuteWrapper);
  }

  const noAudioButton = block.querySelector('.banner-video-video-icon-volume.banner-no-audio-icon');
  if (noAudioButton) {
    muteUnmuteWrapper.append(noAudioButton);
    moveInstrumentation(noAudioButton, muteUnmuteWrapper);
  }
  videoWrapper.append(muteUnmuteWrapper);

  wrapper.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';

  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-cta';

  // Assuming the CTA content is directly within the block but not explicitly modeled
  // We'll look for the first div that isn't one of our known video elements
  const authoredCtaContent = block.querySelector(':scope > div:last-child');
  if (authoredCtaContent && !authoredCtaContent.classList.contains('banner-video-wrapper')) {
    // Move all children of the authored CTA div into the new ctaDiv
    Array.from(authoredCtaContent.children).forEach((child) => {
      ctaDiv.append(child);
      moveInstrumentation(child, ctaDiv);
    });
    moveInstrumentation(authoredCtaContent, ctaWrapper);
  }

  ctaWrapper.append(ctaDiv);
  wrapper.append(ctaWrapper);

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
