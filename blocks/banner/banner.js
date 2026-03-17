import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('banner-section');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('position-relative', 'boing', 'banner-section__wrapper');

  const bannerVideoWrapper = document.createElement('div');
  bannerVideoWrapper.classList.add('banner-video-wrapper');

  const videoElement = block.querySelector('video');
  if (videoElement) {
    videoElement.classList.add('w-100', 'object-fit-cover', 'banner-section-media', 'banner-section-video');
    videoElement.setAttribute('title', 'Video');
    videoElement.setAttribute('aria-label', 'Video');
    videoElement.setAttribute('data-is-autoplay', 'true');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('preload', 'metadata');
    videoElement.setAttribute('fetchpriority', 'high');
    videoElement.setAttribute('loop', 'false');
    videoElement.setAttribute('muted', 'true');
    videoElement.setAttribute('autoplay', 'true');
    bannerVideoWrapper.append(videoElement);
    moveInstrumentation(videoElement, bannerVideoWrapper);
  }

  const playPauseContainer = document.createElement('div');
  playPauseContainer.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const iconPlay = block.querySelector('[data-aue-prop="iconPlay"]');
  if (iconPlay) {
    const playButton = document.createElement('button');
    playButton.setAttribute('type', 'button');
    playButton.classList.add('d-none', 'banner-video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    playButton.innerHTML = iconPlay.outerHTML; // Assuming iconPlay is an SVG or similar
    playPauseContainer.append(playButton);
    moveInstrumentation(iconPlay, playButton);
  }

  const iconPause = block.querySelector('[data-aue-prop="iconPause"]');
  if (iconPause) {
    const pauseButton = document.createElement('button');
    pauseButton.setAttribute('type', 'button');
    pauseButton.classList.add('d-block', 'banner-video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    pauseButton.innerHTML = iconPause.outerHTML; // Assuming iconPause is an SVG or similar
    playPauseContainer.append(pauseButton);
    moveInstrumentation(iconPause, pauseButton);
  }
  bannerVideoWrapper.append(playPauseContainer);

  const muteUnmuteContainer = document.createElement('div');
  muteUnmuteContainer.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'banner-mute-icon');

  const iconMute = block.querySelector('[data-aue-prop="iconMute"]');
  if (iconMute) {
    const muteButton = document.createElement('button');
    muteButton.setAttribute('type', 'button');
    muteButton.classList.add('banner-video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    muteButton.innerHTML = iconMute.outerHTML; // Assuming iconMute is an SVG or similar
    muteUnmuteContainer.append(muteButton);
    moveInstrumentation(iconMute, muteButton);
  }

  const iconUnmute = block.querySelector('[data-aue-prop="iconUnmute"]');
  if (iconUnmute) {
    const unmuteButton = document.createElement('button');
    unmuteButton.setAttribute('type', 'button');
    unmuteButton.classList.add('banner-video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    unmuteButton.innerHTML = iconUnmute.outerHTML; // Assuming iconUnmute is an SVG or similar
    muteUnmuteContainer.append(unmuteButton);
    moveInstrumentation(iconUnmute, unmuteButton);
  }

  const iconNoAudio = block.querySelector('[data-aue-prop="iconNoAudio"]');
  if (iconNoAudio) {
    const noAudioButton = document.createElement('button');
    noAudioButton.setAttribute('type', 'button');
    noAudioButton.classList.add('banner-video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    noAudioButton.innerHTML = iconNoAudio.outerHTML; // Assuming iconNoAudio is an SVG or similar
    muteUnmuteContainer.append(noAudioButton);
    moveInstrumentation(iconNoAudio, noAudioButton);
  }
  bannerVideoWrapper.append(muteUnmuteContainer);
  wrapperDiv.append(bannerVideoWrapper);

  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

  const bannerCtaDiv = document.createElement('div');
  bannerCtaDiv.classList.add('banner-cta');

  // Find any remaining content in the original block that might be the CTA
  const authoredCta = block.querySelector('.banner-cta');
  if (authoredCta) {
    // Move all children of the authored CTA into the new bannerCtaDiv
    Array.from(authoredCta.children).forEach(child => {
      bannerCtaDiv.append(child);
      moveInstrumentation(child, bannerCtaDiv);
    });
    moveInstrumentation(authoredCta, bannerCtaDiv); // Instrument the container itself if it was moved
  }

  ctaContainer.append(bannerCtaDiv);
  wrapperDiv.append(ctaContainer);

  section.append(wrapperDiv);

  block.textContent = '';
  block.append(section);
  block.className = `banner block`;
  block.dataset.blockStatus = 'loaded';
}
