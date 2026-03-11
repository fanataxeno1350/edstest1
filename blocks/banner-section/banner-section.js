import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const bannerWrapper = document.createElement('div');
  bannerWrapper.classList.add('banner-section__wrapper', 'position-relative', 'boing');

  const bannerVideoWrapper = document.createElement('div');
  bannerVideoWrapper.classList.add('banner-video-wrapper');

  const videoElement = block.querySelector('[data-aue-prop="video"]');
  if (videoElement) {
    const video = document.createElement('video');
    video.classList.add('banner-video', 'w-100', 'object-fit-cover', 'banner-media');
    video.setAttribute('title', 'Video');
    video.setAttribute('aria-label', 'Video');
    video.setAttribute('data-is-autoplay', 'true');
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'metadata');
    video.setAttribute('loop', 'false');
    video.setAttribute('muted', 'true');
    video.setAttribute('autoplay', 'true');

    const source = document.createElement('source');
    source.setAttribute('src', videoElement.textContent.trim());
    source.setAttribute('type', 'video/mp4');

    video.append(source);
    bannerVideoWrapper.append(video);
    moveInstrumentation(videoElement, video);
  }

  const bannerVideoControls = document.createElement('div');
  bannerVideoControls.classList.add('banner-video-controls', 'position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const iconPlayElement = block.querySelector('[data-aue-prop="iconPlay"]');
  if (iconPlayElement) {
    const playButton = document.createElement('button');
    playButton.setAttribute('type', 'button');
    playButton.classList.add('banner-video-icon', 'icon-play', 'bg-transparent', 'd-none', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const playIcon = document.createElement('img');
    playIcon.setAttribute('src', iconPlayElement.textContent.trim());
    playIcon.setAttribute('alt', 'Play');
    playButton.append(playIcon);
    bannerVideoControls.append(playButton);
    moveInstrumentation(iconPlayElement, playButton);
  }

  const iconPauseElement = block.querySelector('[data-aue-prop="iconPause"]');
  if (iconPauseElement) {
    const pauseButton = document.createElement('button');
    pauseButton.setAttribute('type', 'button');
    pauseButton.classList.add('banner-video-icon', 'icon-pause', 'bg-transparent', 'd-block', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const pauseIcon = document.createElement('img');
    pauseIcon.setAttribute('src', iconPauseElement.textContent.trim());
    pauseIcon.setAttribute('alt', 'Pause');
    pauseButton.append(pauseIcon);
    bannerVideoControls.append(pauseButton);
    moveInstrumentation(iconPauseElement, pauseButton);
  }

  bannerVideoWrapper.append(bannerVideoControls);

  const bannerMuteIcon = document.createElement('div');
  bannerMuteIcon.classList.add('banner-mute-icon', 'position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const iconMuteElement = block.querySelector('[data-aue-prop="iconMute"]');
  if (iconMuteElement) {
    const muteButton = document.createElement('button');
    muteButton.setAttribute('type', 'button');
    muteButton.classList.add('banner-video-icon-volume', 'icon-mute', 'bg-transparent', 'd-none', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const muteIcon = document.createElement('img');
    muteIcon.setAttribute('src', iconMuteElement.textContent.trim());
    muteIcon.setAttribute('alt', 'Mute');
    muteButton.append(muteIcon);
    bannerMuteIcon.append(muteButton);
    moveInstrumentation(iconMuteElement, muteButton);
  }

  const iconUnmuteElement = block.querySelector('[data-aue-prop="iconUnmute"]');
  if (iconUnmuteElement) {
    const unmuteButton = document.createElement('button');
    unmuteButton.setAttribute('type', 'button');
    unmuteButton.classList.add('banner-video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-none', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const unmuteIcon = document.createElement('img');
    unmuteIcon.setAttribute('src', iconUnmuteElement.textContent.trim());
    unmuteIcon.setAttribute('alt', 'Unmute');
    unmuteButton.append(unmuteIcon);
    bannerMuteIcon.append(unmuteButton);
    moveInstrumentation(iconUnmuteElement, unmuteButton);
  }

  const iconNoAudioElement = block.querySelector('[data-aue-prop="iconNoAudio"]');
  if (iconNoAudioElement) {
    const noAudioButton = document.createElement('button');
    noAudioButton.setAttribute('type', 'button');
    noAudioButton.classList.add('banner-video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const noAudioIcon = document.createElement('img');
    noAudioIcon.setAttribute('src', iconNoAudioElement.textContent.trim());
    noAudioIcon.setAttribute('alt', 'No Audio');
    noAudioButton.append(noAudioIcon);
    bannerMuteIcon.append(noAudioButton);
    moveInstrumentation(iconNoAudioElement, noAudioButton);
  }

  bannerVideoWrapper.append(bannerMuteIcon);
  bannerWrapper.append(bannerVideoWrapper);

  const bannerCtaWrapper = document.createElement('div');
  bannerCtaWrapper.classList.add('banner-cta-wrapper', 'position-absolute', 'start-50', 'translate-middle-x', 'w-100');

  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');

  const ctaContent = block.querySelector('div:not([data-aue-prop])'); // Assuming CTA content is the remaining div without data-aue-prop
  if (ctaContent) {
    bannerCta.append(...ctaContent.children);
    moveInstrumentation(ctaContent, bannerCta);
  }

  bannerCtaWrapper.append(bannerCta);
  bannerWrapper.append(bannerCtaWrapper);
  bannerSection.append(bannerWrapper);

  block.textContent = '';
  block.append(bannerSection);
  block.className = `banner-section block`;
  block.dataset.blockStatus = 'loaded';
}
