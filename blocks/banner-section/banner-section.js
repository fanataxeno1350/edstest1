import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'position-relative boing banner-section__wrapper';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const videoSource = block.querySelector('[data-aue-prop="video"]');
  if (videoSource) {
    const videoElement = document.createElement('video');
    videoElement.className = 'w-100 object-fit-cover banner-section-media banner-section-video';
    videoElement.title = 'Video';
    videoElement.ariaLabel = 'Video';
    videoElement.playsInline = true;
    videoElement.preload = 'metadata';
    videoElement.fetchPriority = 'high';
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.autoplay = true;

    const sourceElement = document.createElement('source');
    sourceElement.src = videoSource.href;
    sourceElement.type = 'video/mp4';
    videoElement.append(sourceElement);
    videoWrapper.append(videoElement);
    moveInstrumentation(videoSource, videoWrapper);
  }

  const playPauseContainer = document.createElement('div');
  playPauseContainer.className = 'position-absolute w-100 h-100 start-0 top-0 d-flex justify-content-center align-items-center cursor-pointer';

  const iconPlayLink = block.querySelector('[data-aue-prop="iconPlay"]');
  if (iconPlayLink) {
    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.className = 'd-none banner-section-video-icon icon-play bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    playButton.innerHTML = iconPlayLink.href;
    playPauseContainer.append(playButton);
    moveInstrumentation(iconPlayLink, playButton);
  }

  const iconPauseLink = block.querySelector('[data-aue-prop="iconPause"]');
  if (iconPauseLink) {
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.className = 'd-block banner-section-video-icon icon-pause bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    pauseButton.innerHTML = iconPauseLink.href;
    playPauseContainer.append(pauseButton);
    moveInstrumentation(iconPauseLink, pauseButton);
  }
  videoWrapper.append(playPauseContainer);

  const muteUnmuteContainer = document.createElement('div');
  muteUnmuteContainer.className = 'position-absolute z-2 d-flex justify-content-center align-items-center cursor-pointer banner-section-mute-icon';

  const iconMuteLink = block.querySelector('[data-aue-prop="iconMute"]');
  if (iconMuteLink) {
    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.className = 'banner-section-video-icon-volume icon-mute bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
    muteButton.innerHTML = iconMuteLink.href;
    muteUnmuteContainer.append(muteButton);
    moveInstrumentation(iconMuteLink, muteButton);
  }

  const iconUnmuteLink = block.querySelector('[data-aue-prop="iconUnmute"]');
  if (iconUnmuteLink) {
    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.className = 'banner-section-video-icon-volume icon-unmute bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
    unmuteButton.innerHTML = iconUnmuteLink.href;
    muteUnmuteContainer.append(unmuteButton);
    moveInstrumentation(iconUnmuteLink, unmuteButton);
  }

  const iconNoAudioLink = block.querySelector('[data-aue-prop="iconNoAudio"]');
  if (iconNoAudioLink) {
    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.className = 'banner-section-video-icon-volume no-audio-icon bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    noAudioButton.innerHTML = iconNoAudioLink.href;
    muteUnmuteContainer.append(noAudioButton);
    moveInstrumentation(iconNoAudioLink, noAudioButton);
  }
  videoWrapper.append(muteUnmuteContainer);

  wrapper.append(videoWrapper);

  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'position-absolute start-50 translate-middle-x w-100 boing__banner--cta';
  const bannerCta = document.createElement('div');
  bannerCta.className = 'banner-cta';
  ctaContainer.append(bannerCta);
  wrapper.append(ctaContainer);

  block.textContent = '';
  block.append(wrapper);
  block.className = `banner-section block`;
  block.dataset.blockStatus = 'loaded';
}