import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.className = 'banner-section';

  const bannerWrapper = document.createElement('div');
  bannerWrapper.className = 'banner-section__wrapper position-relative boing';

  const bannerVideoWrapper = document.createElement('div');
  bannerVideoWrapper.className = 'banner-video-wrapper';

  const videoSrc = block.querySelector('[data-aue-prop="videoSrc"]');
  if (videoSrc) {
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
    source.src = videoSrc.textContent.trim();
    source.type = 'video/mp4';
    video.append(source);
    bannerVideoWrapper.append(video);
    moveInstrumentation(videoSrc, video);
  }

  const bannerVideoControls = document.createElement('div');
  bannerVideoControls.className = 'banner-video-controls position-absolute w-100 h-100 start-0 top-0 d-flex justify-content-center align-items-center cursor-pointer';

  const playIcon = block.querySelector('[data-aue-prop="playIcon"]');
  if (playIcon) {
    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.className = 'banner-video-icon icon-play bg-transparent d-none d-flex align-items-center justify-content-center cursor-pointer';
    const playIconImg = document.createElement('img');
    playIconImg.src = playIcon.textContent.trim();
    playIconImg.alt = 'Play';
    playButton.append(playIconImg);
    bannerVideoControls.append(playButton);
    moveInstrumentation(playIcon, playButton);
  }

  const pauseIcon = block.querySelector('[data-aue-prop="pauseIcon"]');
  if (pauseIcon) {
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.className = 'banner-video-icon icon-pause bg-transparent d-block d-flex align-items-center justify-content-center cursor-pointer';
    const pauseIconImg = document.createElement('img');
    pauseIconImg.src = pauseIcon.textContent.trim();
    pauseIconImg.alt = 'Pause';
    pauseButton.append(pauseIconImg);
    bannerVideoControls.append(pauseButton);
    moveInstrumentation(pauseIcon, pauseButton);
  }
  bannerVideoWrapper.append(bannerVideoControls);

  const bannerMuteIcon = document.createElement('div');
  bannerMuteIcon.className = 'banner-mute-icon position-absolute z-2 d-flex justify-content-center align-items-center cursor-pointer ';

  const muteIcon = block.querySelector('[data-aue-prop="muteIcon"]');
  if (muteIcon) {
    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.className = 'banner-video-icon-volume icon-mute bg-transparent d-none d-flex align-items-center justify-content-center cursor-pointer';
    const muteIconImg = document.createElement('img');
    muteIconImg.src = muteIcon.textContent.trim();
    muteIconImg.alt = 'Mute';
    muteButton.append(muteIconImg);
    bannerMuteIcon.append(muteButton);
    moveInstrumentation(muteIcon, muteButton);
  }

  const unmuteIcon = block.querySelector('[data-aue-prop="unmuteIcon"]');
  if (unmuteIcon) {
    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.className = 'banner-video-icon-volume icon-unmute bg-transparent d-none d-flex align-items-center justify-content-center cursor-pointer';
    const unmuteIconImg = document.createElement('img');
    unmuteIconImg.src = unmuteIcon.textContent.trim();
    unmuteIconImg.alt = 'Unmute';
    unmuteButton.append(unmuteIconImg);
    bannerMuteIcon.append(unmuteButton);
    moveInstrumentation(unmuteIcon, unmuteButton);
  }

  const noAudioIcon = block.querySelector('[data-aue-prop="noAudioIcon"]');
  if (noAudioIcon) {
    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.className = 'banner-video-icon-volume no-audio-icon bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    const noAudioIconImg = document.createElement('img');
    noAudioIconImg.src = noAudioIcon.textContent.trim();
    noAudioIconImg.alt = 'No Audio';
    noAudioButton.append(noAudioIconImg);
    bannerMuteIcon.append(noAudioButton);
    moveInstrumentation(noAudioIcon, noAudioButton);
  }
  bannerVideoWrapper.append(bannerMuteIcon);

  const bannerCtaWrapper = document.createElement('div');
  bannerCtaWrapper.className = 'banner-cta-wrapper position-absolute start-50 translate-middle-x w-100';

  const bannerCta = document.createElement('div');
  bannerCta.className = 'banner-cta';

  // Move any remaining content into the bannerCta div
  const contentDiv = block.querySelector('div:not([data-aue-prop])');
  if (contentDiv) {
    bannerCta.append(...Array.from(contentDiv.children));
    moveInstrumentation(contentDiv, bannerCta);
  }

  bannerCtaWrapper.append(bannerCta);

  bannerWrapper.append(bannerVideoWrapper, bannerCtaWrapper);
  bannerSection.append(bannerWrapper);

  block.textContent = '';
  block.append(bannerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
