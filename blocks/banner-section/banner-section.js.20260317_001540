import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoSrc = block.querySelector('[data-aue-prop="videoSrc"]');
  const playIcon = block.querySelector('[data-aue-prop="playIcon"]');
  const pauseIcon = block.querySelector('[data-aue-prop="pauseIcon"]');
  const muteIcon = block.querySelector('[data-aue-prop="muteIcon"]');
  const unmuteIcon = block.querySelector('[data-aue-prop="unmuteIcon"]');
  const noAudioIcon = block.querySelector('[data-aue-prop="noAudioIcon"]');
  const ctaContainer = block.querySelector('.banner-cta');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'banner-section__wrapper banner-position-relative banner-boing';

  const videoWrapperDiv = document.createElement('div');
  videoWrapperDiv.className = 'banner-video-wrapper';

  if (videoSrc) {
    const video = document.createElement('video');
    video.className = 'banner-video banner-media banner-w-100 banner-object-fit-cover';
    video.title = 'Video';
    video.ariaLabel = 'Video';
    video.setAttribute('data-is-autoplay', 'true');
    video.playsInline = true;
    video.preload = 'metadata';
    video.fetchPriority = 'high';
    video.loop = true;
    video.muted = true;
    video.autoplay = true;

    const source = document.createElement('source');
    source.src = videoSrc.textContent.trim();
    source.type = 'video/mp4';
    video.append(source);
    videoWrapperDiv.append(video);
    moveInstrumentation(videoSrc, video);
  }

  const controlsOverlayDiv = document.createElement('div');
  controlsOverlayDiv.className = 'banner-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  if (playIcon) {
    playButton.innerHTML = playIcon.textContent.trim();
    moveInstrumentation(playIcon, playButton);
  }

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-block';
  if (pauseIcon) {
    pauseButton.innerHTML = pauseIcon.textContent.trim();
    moveInstrumentation(pauseIcon, pauseButton);
  }

  controlsOverlayDiv.append(playButton, pauseButton);
  videoWrapperDiv.append(controlsOverlayDiv);

  const muteIconDiv = document.createElement('div');
  muteIconDiv.className = 'banner-mute-icon banner-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  if (muteIcon) {
    muteButton.innerHTML = muteIcon.textContent.trim();
    moveInstrumentation(muteIcon, muteButton);
  }

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  if (unmuteIcon) {
    unmuteButton.innerHTML = unmuteIcon.textContent.trim();
    moveInstrumentation(unmuteIcon, unmuteButton);
  }

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  if (noAudioIcon) {
    noAudioButton.innerHTML = noAudioIcon.textContent.trim();
    moveInstrumentation(noAudioIcon, noAudioButton);
  }

  muteIconDiv.append(muteButton, unmuteButton, noAudioButton);
  videoWrapperDiv.append(muteIconDiv);

  wrapperDiv.append(videoWrapperDiv);

  const ctaWrapperDiv = document.createElement('div');
  ctaWrapperDiv.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';

  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-cta';
  if (ctaContainer) {
    Array.from(ctaContainer.children).forEach((child) => {
      ctaDiv.append(child);
    });
    moveInstrumentation(ctaContainer, ctaDiv);
  }
  ctaWrapperDiv.append(ctaDiv);
  wrapperDiv.append(ctaWrapperDiv);

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
