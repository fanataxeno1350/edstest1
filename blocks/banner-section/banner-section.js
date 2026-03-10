import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');
  moveInstrumentation(block, bannerSection);

  const bannerWrapper = document.createElement('div');
  bannerWrapper.classList.add('banner-section__wrapper', 'banner-position-relative');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('banner-video-wrapper');

  const video = document.createElement('video');
  video.classList.add('banner-video');
  video.title = 'Video';
  video.ariaLabel = 'Video';
  video.setAttribute('data-is-autoplay', 'true');
  video.playsInline = true;
  video.preload = 'metadata';
  video.fetchPriority = 'high';
  video.loop = false;
  video.muted = true;
  video.autoplay = true;

  const source = document.createElement('source');
  const videoSrcCell = block.children[0]?.children[0];
  if (videoSrcCell) {
    const videoLink = videoSrcCell.querySelector('a');
    if (videoLink) {
      source.src = videoLink.href;
      source.type = 'video/mp4';
    }
  }
  video.append(source);
  videoWrapper.append(video);

  const videoControls = document.createElement('div');
  videoControls.classList.add('banner-video-controls', 'banner-position-absolute', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer');

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.classList.add('banner-video-icon', 'banner-icon-play', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
  const playIconCell = block.children[0]?.children[1];
  if (playIconCell) {
    playButton.innerHTML = playIconCell.innerHTML;
  }
  videoControls.append(playButton);

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.classList.add('banner-video-icon', 'banner-icon-pause', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-block');
  const pauseIconCell = block.children[0]?.children[2];
  if (pauseIconCell) {
    pauseButton.innerHTML = pauseIconCell.innerHTML;
  }
  videoControls.append(pauseButton);
  videoWrapper.append(videoControls);

  const muteIconWrapper = document.createElement('div');
  muteIconWrapper.classList.add('banner-mute-icon', 'banner-position-absolute', 'banner-z-2', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer');

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
  const muteIconCell = block.children[0]?.children[3];
  if (muteIconCell) {
    muteButton.innerHTML = muteIconCell.innerHTML;
  }
  muteIconWrapper.append(muteButton);

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
  const unmuteIconCell = block.children[0]?.children[4];
  if (unmuteIconCell) {
    unmuteButton.innerHTML = unmuteIconCell.innerHTML;
  }
  muteIconWrapper.append(unmuteButton);

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
  const noAudioIconCell = block.children[0]?.children[5];
  if (noAudioIconCell) {
    noAudioButton.innerHTML = noAudioIconCell.innerHTML;
  }
  muteIconWrapper.append(noAudioButton);
  videoWrapper.append(muteIconWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('banner-cta-wrapper', 'banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100');
  const cta = document.createElement('div');
  cta.classList.add('banner-cta');
  ctaWrapper.append(cta);

  bannerWrapper.append(videoWrapper, ctaWrapper);
  bannerSection.append(bannerWrapper);

  block.textContent = '';
  block.append(bannerSection);
}