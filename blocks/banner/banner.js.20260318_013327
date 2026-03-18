import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('position-relative', 'boing', 'banner-section__wrapper');

  const bannerVideoWrapper = document.createElement('div');
  bannerVideoWrapper.classList.add('banner-video-wrapper');

  const videoElement = block.querySelector('[data-aue-prop="video"]');
  if (videoElement) {
    const video = document.createElement('video');
    video.classList.add('w-100', 'object-fit-cover', 'banner-section-banner-media', 'banner-section-banner-video');
    video.setAttribute('title', 'Video');
    video.setAttribute('aria-label', 'Video');
    video.setAttribute('data-is-autoplay', 'true');
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'metadata');
    video.setAttribute('fetchpriority', 'high');
    video.setAttribute('loop', 'false');
    video.setAttribute('muted', 'true');
    video.setAttribute('autoplay', 'true');

    const source = document.createElement('source');
    source.setAttribute('src', videoElement.src);
    source.setAttribute('type', 'video/mp4');
    video.append(source);
    bannerVideoWrapper.append(video);
    moveInstrumentation(videoElement, video);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const iconPlay = block.querySelector('[data-aue-prop="iconPlay"]');
  if (iconPlay) {
    const playButton = document.createElement('button');
    playButton.setAttribute('type', 'button');
    playButton.classList.add('d-none', 'banner-video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    playButton.textContent = iconPlay.textContent.trim();
    playPauseWrapper.append(playButton);
    moveInstrumentation(iconPlay, playButton);
  }

  const iconPause = block.querySelector('[data-aue-prop="iconPause"]');
  if (iconPause) {
    const pauseButton = document.createElement('button');
    pauseButton.setAttribute('type', 'button');
    pauseButton.classList.add('d-block', 'banner-video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    pauseButton.textContent = iconPause.textContent.trim();
    playPauseWrapper.append(pauseButton);
    moveInstrumentation(iconPause, pauseButton);
  }
  bannerVideoWrapper.append(playPauseWrapper);

  const muteUnmuteWrapper = document.createElement('div');
  muteUnmuteWrapper.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'banner-mute-icon');

  const iconMute = block.querySelector('[data-aue-prop="iconMute"]');
  if (iconMute) {
    const muteButton = document.createElement('button');
    muteButton.setAttribute('type', 'button');
    muteButton.classList.add('banner-video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    muteButton.textContent = iconMute.textContent.trim();
    muteUnmuteWrapper.append(muteButton);
    moveInstrumentation(iconMute, muteButton);
  }

  const iconUnmute = block.querySelector('[data-aue-prop="iconUnmute"]');
  if (iconUnmute) {
    const unmuteButton = document.createElement('button');
    unmuteButton.setAttribute('type', 'button');
    unmuteButton.classList.add('banner-video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    unmuteButton.textContent = iconUnmute.textContent.trim();
    muteUnmuteWrapper.append(unmuteButton);
    moveInstrumentation(iconUnmute, unmuteButton);
  }

  const iconNoAudio = block.querySelector('[data-aue-prop="iconNoAudio"]');
  if (iconNoAudio) {
    const noAudioButton = document.createElement('button');
    noAudioButton.setAttribute('type', 'button');
    noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    noAudioButton.textContent = iconNoAudio.textContent.trim();
    muteUnmuteWrapper.append(noAudioButton);
    moveInstrumentation(iconNoAudio, noAudioButton);
  }
  bannerVideoWrapper.append(muteUnmuteWrapper);

  wrapperDiv.append(bannerVideoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');

  // Move existing content (if any) to the bannerCta div
  const authoredCtaContent = block.querySelector('.banner-cta');
  if (authoredCtaContent) {
    Array.from(authoredCtaContent.children).forEach((child) => {
      bannerCta.append(child);
      moveInstrumentation(child, bannerCta);
    });
    moveInstrumentation(authoredCtaContent, bannerCta);
  }

  ctaWrapper.append(bannerCta);
  wrapperDiv.append(ctaWrapper);
  bannerSection.append(wrapperDiv);

  block.textContent = '';
  block.append(bannerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
