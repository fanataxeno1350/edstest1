import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.className = 'banner-section';

  const bannerWrapper = document.createElement('div');
  bannerWrapper.className = 'banner-section__wrapper position-relative boing';

  const bannerVideoWrapper = document.createElement('div');
  bannerVideoWrapper.className = 'banner-video-wrapper';

  const videoElement = block.querySelector('[data-aue-prop="video"]');
  if (videoElement) {
    const video = document.createElement('video');
    video.className = 'banner-video w-100 object-fit-cover banner-media';
    video.title = 'Video';
    video.ariaLabel = 'Video';
    video.setAttribute('data-is-autoplay', 'true');
    video.playsInline = true;
    video.preload = 'metadata';
    video.loop = false;
    video.muted = true;
    video.autoplay = true;

    const source = document.createElement('source');
    source.src = videoElement.href;
    source.type = 'video/mp4';
    video.append(source);
    bannerVideoWrapper.append(video);
    moveInstrumentation(videoElement, video);
  }

  const bannerVideoControls = document.createElement('div');
  bannerVideoControls.className = 'banner-video-controls position-absolute w-100 h-100 start-0 top-0 d-flex justify-content-center align-items-center cursor-pointer';

  const playIconElement = block.querySelector('[data-aue-prop="playIcon"]');
  if (playIconElement) {
    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.className = 'banner-video-icon icon-play bg-transparent d-none d-flex align-items-center justify-content-center cursor-pointer';
    const playIconImg = document.createElement('img');
    playIconImg.src = playIconElement.href;
    playIconImg.alt = 'Play';
    playButton.append(playIconImg);
    bannerVideoControls.append(playButton);
    moveInstrumentation(playIconElement, playButton);
  }

  const pauseIconElement = block.querySelector('[data-aue-prop="pauseIcon"]');
  if (pauseIconElement) {
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.className = 'banner-video-icon icon-pause bg-transparent d-block d-flex align-items-center justify-content-center cursor-pointer';
    const pauseIconImg = document.createElement('img');
    pauseIconImg.src = pauseIconElement.href;
    pauseIconImg.alt = 'Pause';
    pauseButton.append(pauseIconImg);
    bannerVideoControls.append(pauseButton);
    moveInstrumentation(pauseIconElement, pauseButton);
  }

  bannerVideoWrapper.append(bannerVideoControls);

  const bannerMuteIcon = document.createElement('div');
  bannerMuteIcon.className = 'banner-mute-icon position-absolute z-2 d-flex justify-content-center align-items-center cursor-pointer ';

  const muteIconElement = block.querySelector('[data-aue-prop="muteIcon"]');
  if (muteIconElement) {
    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.className = 'banner-video-icon-volume icon-mute bg-transparent d-none d-flex align-items-center justify-content-center cursor-pointer';
    const muteIconImg = document.createElement('img');
    muteIconImg.src = muteIconElement.href;
    muteIconImg.alt = 'Mute';
    muteButton.append(muteIconImg);
    bannerMuteIcon.append(muteButton);
    moveInstrumentation(muteIconElement, muteButton);
  }

  const unmuteIconElement = block.querySelector('[data-aue-prop="unmuteIcon"]');
  if (unmuteIconElement) {
    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.className = 'banner-video-icon-volume icon-unmute bg-transparent d-none d-flex align-items-center justify-content-center cursor-pointer';
    const unmuteIconImg = document.createElement('img');
    unmuteIconImg.src = unmuteIconElement.href;
    unmuteIconImg.alt = 'Unmute';
    unmuteButton.append(unmuteIconImg);
    bannerMuteIcon.append(unmuteButton);
    moveInstrumentation(unmuteIconElement, unmuteButton);
  }

  const noAudioIconElement = block.querySelector('[data-aue-prop="noAudioIcon"]');
  if (noAudioIconElement) {
    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.className = 'banner-video-icon-volume no-audio-icon bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    const noAudioIconImg = document.createElement('img');
    noAudioIconImg.src = noAudioIconElement.href;
    noAudioIconImg.alt = 'No Audio';
    noAudioButton.append(noAudioIconImg);
    bannerMuteIcon.append(noAudioButton);
    moveInstrumentation(noAudioIconElement, noAudioButton);
  }

  bannerVideoWrapper.append(bannerMuteIcon);
  bannerWrapper.append(bannerVideoWrapper);

  const bannerCtaWrapper = document.createElement('div');
  bannerCtaWrapper.className = 'banner-cta-wrapper position-absolute start-50 translate-middle-x w-100';

  const bannerCta = document.createElement('div');
  bannerCta.className = 'banner-cta';

  // Assuming any remaining content in the block is for the CTA
  const ctaContent = Array.from(block.children).filter(child => !child.hasAttribute('data-aue-prop'));
  ctaContent.forEach(node => bannerCta.append(node));

  bannerCtaWrapper.append(bannerCta);
  bannerWrapper.append(bannerCtaWrapper);
  bannerSection.append(bannerWrapper);

  block.textContent = '';
  block.append(bannerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
