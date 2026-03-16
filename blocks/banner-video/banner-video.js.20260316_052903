import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'banner-section__wrapper banner-position-relative banner-boing';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const videoElement = block.querySelector('video');
  if (videoElement) {
    videoElement.className = 'banner-video banner-w-100 banner-object-fit-cover banner-media';
    videoElement.setAttribute('title', 'Video');
    videoElement.setAttribute('aria-label', 'Video');
    videoElement.setAttribute('data-is-autoplay', 'true');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('preload', 'metadata');
    videoElement.setAttribute('fetchpriority', 'high');
    videoElement.setAttribute('loop', 'false');
    videoElement.setAttribute('muted', 'true');
    videoElement.setAttribute('autoplay', 'true');
    moveInstrumentation(videoElement, videoWrapper);
    videoWrapper.append(videoElement);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.className = 'banner-video-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const iconPlay = block.querySelector('[data-aue-prop="iconPlay"]');
  if (iconPlay) {
    const playButton = document.createElement('button');
    playButton.setAttribute('type', 'button');
    playButton.className = 'banner-video-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
    playButton.innerHTML = iconPlay.innerHTML;
    moveInstrumentation(iconPlay, playButton);
    playPauseWrapper.append(playButton);
  }

  const iconPause = block.querySelector('[data-aue-prop="iconPause"]');
  if (iconPause) {
    const pauseButton = document.createElement('button');
    pauseButton.setAttribute('type', 'button');
    pauseButton.className = 'banner-video-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
    pauseButton.innerHTML = iconPause.innerHTML;
    moveInstrumentation(iconPause, pauseButton);
    playPauseWrapper.append(pauseButton);
  }
  videoWrapper.append(playPauseWrapper);

  const muteIconWrapper = document.createElement('div');
  muteIconWrapper.className = 'banner-video-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const iconMute = block.querySelector('[data-aue-prop="iconMute"]');
  if (iconMute) {
    const muteButton = document.createElement('button');
    muteButton.setAttribute('type', 'button');
    muteButton.className = 'banner-video-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
    muteButton.innerHTML = iconMute.innerHTML;
    moveInstrumentation(iconMute, muteButton);
    muteIconWrapper.append(muteButton);
  }

  const iconUnmute = block.querySelector('[data-aue-prop="iconUnmute"]');
  if (iconUnmute) {
    const unmuteButton = document.createElement('button');
    unmuteButton.setAttribute('type', 'button');
    unmuteButton.className = 'banner-video-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
    unmuteButton.innerHTML = iconUnmute.innerHTML;
    moveInstrumentation(iconUnmute, unmuteButton);
    muteIconWrapper.append(unmuteButton);
  }

  const iconNoAudio = block.querySelector('[data-aue-prop="iconNoAudio"]');
  if (iconNoAudio) {
    const noAudioButton = document.createElement('button');
    noAudioButton.setAttribute('type', 'button');
    noAudioButton.className = 'banner-video-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
    noAudioButton.innerHTML = iconNoAudio.innerHTML;
    moveInstrumentation(iconNoAudio, noAudioButton);
    muteIconWrapper.append(noAudioButton);
  }
  videoWrapper.append(muteIconWrapper);

  wrapperDiv.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';

  const ctaContent = block.querySelector('.button-container');
  if (ctaContent) {
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'banner-cta';
    moveInstrumentation(ctaContent, ctaDiv);
    ctaDiv.append(ctaContent);
    ctaWrapper.append(ctaDiv);
  }

  wrapperDiv.append(ctaWrapper);

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
