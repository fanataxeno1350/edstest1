import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'boing', 'banner-section__wrapper');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('video-wrapper');

  const videoElement = block.querySelector('video[data-aue-prop="video"]');
  if (videoElement) {
    videoWrapper.append(videoElement);
    moveInstrumentation(videoElement, videoWrapper);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const iconPlay = block.querySelector('[data-aue-prop="iconPlay"]');
  if (iconPlay) {
    const playButton = document.createElement('button');
    playButton.setAttribute('type', 'button');
    playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    playButton.innerHTML = iconPlay.innerHTML;
    playPauseWrapper.append(playButton);
    moveInstrumentation(iconPlay, playButton);
  }

  const iconPause = block.querySelector('[data-aue-prop="iconPause"]');
  if (iconPause) {
    const pauseButton = document.createElement('button');
    pauseButton.setAttribute('type', 'button');
    pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    pauseButton.innerHTML = iconPause.innerHTML;
    playPauseWrapper.append(pauseButton);
    moveInstrumentation(iconPause, pauseButton);
  }
  videoWrapper.append(playPauseWrapper);

  const muteIconWrapper = document.createElement('div');
  muteIconWrapper.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

  const iconMute = block.querySelector('[data-aue-prop="iconMute"]');
  if (iconMute) {
    const muteButton = document.createElement('button');
    muteButton.setAttribute('type', 'button');
    muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    muteButton.innerHTML = iconMute.innerHTML;
    muteIconWrapper.append(muteButton);
    moveInstrumentation(iconMute, muteButton);
  }

  const iconUnmute = block.querySelector('[data-aue-prop="iconUnmute"]');
  if (iconUnmute) {
    const unmuteButton = document.createElement('button');
    unmuteButton.setAttribute('type', 'button');
    unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    unmuteButton.innerHTML = iconUnmute.innerHTML;
    muteIconWrapper.append(unmuteButton);
    moveInstrumentation(iconUnmute, unmuteButton);
  }

  const iconNoAudio = block.querySelector('[data-aue-prop="iconNoAudio"]');
  if (iconNoAudio) {
    const noAudioButton = document.createElement('button');
    noAudioButton.setAttribute('type', 'button');
    noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    noAudioButton.innerHTML = iconNoAudio.innerHTML;
    muteIconWrapper.append(noAudioButton);
    moveInstrumentation(iconNoAudio, noAudioButton);
  }
  videoWrapper.append(muteIconWrapper);
  positionRelativeDiv.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');

  // Assuming the banner-cta content is directly inside the block and not explicitly defined with data-aue-prop
  // If there's specific authored content for banner-cta, it needs a data-aue-prop to be extracted.
  // For now, we'll assume it's an empty container or content needs to be moved from an existing element.
  const existingBannerCta = block.querySelector('.banner-cta');
  if (existingBannerCta) {
    Array.from(existingBannerCta.children).forEach((child) => {
      bannerCta.append(child);
      moveInstrumentation(child, bannerCta);
    });
    moveInstrumentation(existingBannerCta, bannerCta);
  }

  ctaWrapper.append(bannerCta);
  positionRelativeDiv.append(ctaWrapper);

  bannerSection.append(positionRelativeDiv);

  block.textContent = '';
  block.append(bannerSection);
  block.className = 'banner block';
  block.dataset.blockStatus = 'loaded';
}
