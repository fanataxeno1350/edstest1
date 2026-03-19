import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'boing', 'banner-section-wrapper');

  const bannerVideoWrapper = document.createElement('div');
  bannerVideoWrapper.classList.add('banner-video-wrapper');

  const videoElement = document.createElement('video');
  videoElement.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
  videoElement.setAttribute('title', 'Video');
  videoElement.setAttribute('aria-label', 'Video');
  videoElement.setAttribute('data-is-autoplay', 'true');
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('preload', 'metadata');
  videoElement.setAttribute('fetchpriority', 'high');
  videoElement.setAttribute('loop', 'false');
  videoElement.setAttribute('muted', 'true');
  videoElement.setAttribute('autoplay', 'true');

  const sourceElement = document.createElement('source');
  const videoSrc = block.querySelector('[data-aue-prop="video"]');
  if (videoSrc) {
    sourceElement.setAttribute('src', videoSrc.textContent.trim());
    sourceElement.setAttribute('type', 'video/mp4');
    videoElement.append(sourceElement);
    moveInstrumentation(videoSrc, videoElement);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const playButton = document.createElement('button');
  playButton.setAttribute('type', 'button');
  playButton.classList.add('d-none', 'banner-video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const iconPlay = block.querySelector('[data-aue-prop="iconPlay"]');
  if (iconPlay) {
    playButton.innerHTML = iconPlay.textContent.trim();
    moveInstrumentation(iconPlay, playButton);
  }

  const pauseButton = document.createElement('button');
  pauseButton.setAttribute('type', 'button');
  pauseButton.classList.add('d-block', 'banner-video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const iconPause = block.querySelector('[data-aue-prop="iconPause"]');
  if (iconPause) {
    pauseButton.innerHTML = iconPause.textContent.trim();
    moveInstrumentation(iconPause, pauseButton);
  }

  playPauseWrapper.append(playButton, pauseButton);

  const muteIconWrapper = document.createElement('div');
  muteIconWrapper.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'banner-mute-icon');

  const muteButton = document.createElement('button');
  muteButton.setAttribute('type', 'button');
  muteButton.classList.add('banner-video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
  const iconMute = block.querySelector('[data-aue-prop="iconMute"]');
  if (iconMute) {
    muteButton.innerHTML = iconMute.textContent.trim();
    moveInstrumentation(iconMute, muteButton);
  }

  const unmuteButton = document.createElement('button');
  unmuteButton.setAttribute('type', 'button');
  unmuteButton.classList.add('banner-video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
  const iconUnmute = block.querySelector('[data-aue-prop="iconUnmute"]');
  if (iconUnmute) {
    unmuteButton.innerHTML = iconUnmute.textContent.trim();
    moveInstrumentation(iconUnmute, unmuteButton);
  }

  const noAudioButton = document.createElement('button');
  noAudioButton.setAttribute('type', 'button');
  noAudioButton.classList.add('banner-video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const iconNoAudio = block.querySelector('[data-aue-prop="iconNoAudio"]');
  if (iconNoAudio) {
    noAudioButton.innerHTML = iconNoAudio.textContent.trim();
    moveInstrumentation(iconNoAudio, noAudioButton);
  }

  muteIconWrapper.append(muteButton, unmuteButton, noAudioButton);

  bannerVideoWrapper.append(videoElement, playPauseWrapper, muteIconWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing-banner-cta');

  const bannerCtaDiv = document.createElement('div');
  bannerCtaDiv.classList.add('banner-cta');
  // Assuming CTA content is not directly authored in the block but comes from a nested block or other content
  // For now, we'll just append an empty div as per the structure.
  // If there's specific content for banner-cta, it needs to be extracted here.
  // Example: const ctaContent = block.querySelector('.button-container');
  // if (ctaContent) { bannerCtaDiv.append(ctaContent); moveInstrumentation(ctaContent, bannerCtaDiv); }

  ctaWrapper.append(bannerCtaDiv);

  positionRelativeDiv.append(bannerVideoWrapper, ctaWrapper);
  bannerSection.append(positionRelativeDiv);

  block.textContent = '';
  block.append(bannerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
