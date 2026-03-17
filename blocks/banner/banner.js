import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'boing', 'banner-section__wrapper');

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
  const authoredVideo = block.querySelector('[data-aue-prop="video"]');
  if (authoredVideo) {
    sourceElement.setAttribute('src', authoredVideo.textContent.trim());
    sourceElement.setAttribute('type', 'video/mp4');
    moveInstrumentation(authoredVideo, sourceElement);
  }
  videoElement.append(sourceElement);

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const playButton = document.createElement('button');
  playButton.setAttribute('type', 'button');
  playButton.classList.add('d-none', 'banner-video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const authoredIconPlay = block.querySelector('[data-aue-prop="iconPlay"]');
  if (authoredIconPlay) {
    playButton.textContent = authoredIconPlay.textContent.trim();
    moveInstrumentation(authoredIconPlay, playButton);
  }

  const pauseButton = document.createElement('button');
  pauseButton.setAttribute('type', 'button');
  pauseButton.classList.add('d-block', 'banner-video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const authoredIconPause = block.querySelector('[data-aue-prop="iconPause"]');
  if (authoredIconPause) {
    pauseButton.textContent = authoredIconPause.textContent.trim();
    moveInstrumentation(authoredIconPause, pauseButton);
  }

  playPauseWrapper.append(playButton, pauseButton);

  const muteUnmuteWrapper = document.createElement('div');
  muteUnmuteWrapper.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'banner-mute-icon');

  const muteButton = document.createElement('button');
  muteButton.setAttribute('type', 'button');
  muteButton.classList.add('banner-video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
  const authoredIconMute = block.querySelector('[data-aue-prop="iconMute"]');
  if (authoredIconMute) {
    muteButton.textContent = authoredIconMute.textContent.trim();
    moveInstrumentation(authoredIconMute, muteButton);
  }

  const unmuteButton = document.createElement('button');
  unmuteButton.setAttribute('type', 'button');
  unmuteButton.classList.add('banner-video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
  const authoredIconUnmute = block.querySelector('[data-aue-prop="iconUnmute"]');
  if (authoredIconUnmute) {
    unmuteButton.textContent = authoredIconUnmute.textContent.trim();
    moveInstrumentation(authoredIconUnmute, unmuteButton);
  }

  const noAudioButton = document.createElement('button');
  noAudioButton.setAttribute('type', 'button');
  noAudioButton.classList.add('banner-video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const authoredIconNoAudio = block.querySelector('[data-aue-prop="iconNoAudio"]');
  if (authoredIconNoAudio) {
    noAudioButton.textContent = authoredIconNoAudio.textContent.trim();
    moveInstrumentation(authoredIconNoAudio, noAudioButton);
  }

  muteUnmuteWrapper.append(muteButton, unmuteButton, noAudioButton);

  bannerVideoWrapper.append(videoElement, playPauseWrapper, muteUnmuteWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

  const bannerCtaDiv = document.createElement('div');
  bannerCtaDiv.classList.add('banner-cta');
  // Assuming CTA content might be directly inside the block as a p or a div
  const authoredCta = block.querySelector('.button-container'); // or another selector if CTA is more complex
  if (authoredCta) {
    bannerCtaDiv.append(authoredCta);
    moveInstrumentation(authoredCta, bannerCtaDiv);
  }

  ctaWrapper.append(bannerCtaDiv);

  positionRelativeDiv.append(bannerVideoWrapper, ctaWrapper);
  bannerSection.append(positionRelativeDiv);

  block.textContent = '';
  block.append(bannerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
