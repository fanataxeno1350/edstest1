import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSectionWrapper = document.createElement('div');
  bannerSectionWrapper.className = 'banner-section__wrapper position-relative boing';

  const bannerVideoWrapper = document.createElement('div');
  bannerVideoWrapper.className = 'banner-video-wrapper';

  const videoElement = document.createElement('video');
  videoElement.className = 'banner-video w-100 object-fit-cover banner-media';
  videoElement.title = 'Video';
  videoElement.ariaLabel = 'Video';
  videoElement.playsInline = true;
  videoElement.preload = 'metadata';
  videoElement.fetchPriority = 'high';
  videoElement.loop = false;
  videoElement.muted = true;
  videoElement.autoplay = true;

  const videoSrc = block.querySelector('[data-aue-prop="videoSrc"]');
  if (videoSrc) {
    const sourceElement = document.createElement('source');
    sourceElement.src = videoSrc.textContent.trim();
    sourceElement.type = 'video/mp4';
    videoElement.append(sourceElement);
    moveInstrumentation(videoSrc, videoElement);
  } else {
    const videoLink = block.querySelector('a[href$=".mp4"], a[href$=".webm"]');
    if (videoLink) {
      const sourceElement = document.createElement('source');
      sourceElement.src = videoLink.href;
      sourceElement.type = videoLink.href.endsWith('.mp4') ? 'video/mp4' : 'video/webm';
      videoElement.append(sourceElement);
      moveInstrumentation(videoLink, videoElement);
    }
  }

  bannerVideoWrapper.append(videoElement);

  const playPauseContainer = document.createElement('div');
  playPauseContainer.className = 'position-absolute w-100 h-100 start-0 top-0 d-flex justify-content-center align-items-center cursor-pointer';

  const playIcon = block.querySelector('[data-aue-prop="playIcon"]');
  if (playIcon) {
    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.className = 'video-icon icon-play bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
    playButton.textContent = playIcon.textContent.trim();
    playPauseContainer.append(playButton);
    moveInstrumentation(playIcon, playButton);
  }

  const pauseIcon = block.querySelector('[data-aue-prop="pauseIcon"]');
  if (pauseIcon) {
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.className = 'video-icon icon-pause bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-block';
    pauseButton.textContent = pauseIcon.textContent.trim();
    playPauseContainer.append(pauseButton);
    moveInstrumentation(pauseIcon, pauseButton);
  }

  bannerVideoWrapper.append(playPauseContainer);

  const muteContainer = document.createElement('div');
  muteContainer.className = 'mute-icon position-absolute z-2 d-flex justify-content-center align-items-center cursor-pointer ';

  const muteIcon = block.querySelector('[data-aue-prop="muteIcon"]');
  if (muteIcon) {
    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.className = 'video-icon-volume icon-mute bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
    muteButton.textContent = muteIcon.textContent.trim();
    muteContainer.append(muteButton);
    moveInstrumentation(muteIcon, muteButton);
  }

  const unmuteIcon = block.querySelector('[data-aue-prop="unmuteIcon"]');
  if (unmuteIcon) {
    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.className = 'video-icon-volume icon-unmute bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
    unmuteButton.textContent = unmuteIcon.textContent.trim();
    muteContainer.append(unmuteButton);
    moveInstrumentation(unmuteIcon, unmuteButton);
  }

  const noAudioIcon = block.querySelector('[data-aue-prop="noAudioIcon"]');
  if (noAudioIcon) {
    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.className = 'video-icon-volume no-audio-icon bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    noAudioButton.textContent = noAudioIcon.textContent.trim();
    muteContainer.append(noAudioButton);
    moveInstrumentation(noAudioIcon, noAudioButton);
  }

  bannerVideoWrapper.append(muteContainer);
  bannerSectionWrapper.append(bannerVideoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'boing__banner--cta position-absolute start-50 translate-middle-x w-100';

  const bannerCta = document.createElement('div');
  bannerCta.className = 'banner-cta';
  // Assuming any other content for banner-cta would be moved here if present in authored HTML
  // For this specific example, the authored .banner-cta is empty, so we just create the div.

  ctaWrapper.append(bannerCta);
  bannerSectionWrapper.append(ctaWrapper);

  block.textContent = '';
  block.append(bannerSectionWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}