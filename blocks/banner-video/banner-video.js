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

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-video-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  const playIconContent = block.querySelector('[data-aue-prop="playIcon"]');
  if (playIconContent) {
    playButton.innerHTML = playIconContent.innerHTML;
    moveInstrumentation(playIconContent, playButton);
  }
  playPauseWrapper.append(playButton);

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-video-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  const pauseIconContent = block.querySelector('[data-aue-prop="pauseIcon"]');
  if (pauseIconContent) {
    pauseButton.innerHTML = pauseIconContent.innerHTML;
    moveInstrumentation(pauseIconContent, pauseButton);
  }
  playPauseWrapper.append(pauseButton);

  videoWrapper.append(playPauseWrapper);
  moveInstrumentation(playPauseWrapper, videoWrapper);

  const muteUnmuteWrapper = document.createElement('div');
  muteUnmuteWrapper.className = 'banner-video-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  const muteIconContent = block.querySelector('[data-aue-prop="muteIcon"]');
  if (muteIconContent) {
    muteButton.innerHTML = muteIconContent.innerHTML;
    moveInstrumentation(muteIconContent, muteButton);
  }
  muteUnmuteWrapper.append(muteButton);

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  const unmuteIconContent = block.querySelector('[data-aue-prop="unmuteIcon"]');
  if (unmuteIconContent) {
    unmuteButton.innerHTML = unmuteIconContent.innerHTML;
    moveInstrumentation(unmuteIconContent, unmuteButton);
  }
  muteUnmuteWrapper.append(unmuteButton);

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  const noAudioIconContent = block.querySelector('[data-aue-prop="noAudioIcon"]');
  if (noAudioIconContent) {
    noAudioButton.innerHTML = noAudioIconContent.innerHTML;
    moveInstrumentation(noAudioIconContent, noAudioButton);
  }
  muteUnmuteWrapper.append(noAudioButton);

  videoWrapper.append(muteUnmuteWrapper);
  moveInstrumentation(muteUnmuteWrapper, videoWrapper);

  wrapper.append(videoWrapper);
  moveInstrumentation(videoWrapper, wrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';
  const ctaContent = block.querySelector('.banner-cta');
  if (ctaContent) {
    ctaWrapper.append(ctaContent);
    moveInstrumentation(ctaContent, ctaWrapper);
  }
  wrapper.append(ctaWrapper);
  moveInstrumentation(ctaWrapper, wrapper);

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
