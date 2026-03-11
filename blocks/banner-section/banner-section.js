import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoSrc = block.querySelector('[data-aue-prop="videoSrc"]');
  const iconPlay = block.querySelector('[data-aue-prop="iconPlay"]');
  const iconPause = block.querySelector('[data-aue-prop="iconPause"]');
  const iconMute = block.querySelector('[data-aue-prop="iconMute"]');
  const iconUnmute = block.querySelector('[data-aue-prop="iconUnmute"]');
  const iconNoAudio = block.querySelector('[data-aue-prop="iconNoAudio"]');

  const wrapper = document.createElement('div');
  wrapper.classList.add('banner-section__wrapper', 'position-relative', 'boing');

  const bannerVideoWrapper = document.createElement('div');
  bannerVideoWrapper.classList.add('banner-video-wrapper');

  if (videoSrc) {
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
    source.setAttribute('src', videoSrc.textContent.trim());
    source.setAttribute('type', 'video/mp4');
    video.append(source);
    bannerVideoWrapper.append(video);
    moveInstrumentation(videoSrc, video);
  }

  const bannerVideoControls = document.createElement('div');
  bannerVideoControls.classList.add('banner-video-controls', 'position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const playButton = document.createElement('button');
  playButton.setAttribute('type', 'button');
  playButton.classList.add('banner-video-icon', 'icon-play', 'bg-transparent', 'd-none', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  if (iconPlay) {
    playButton.innerHTML = iconPlay.textContent.trim();
    moveInstrumentation(iconPlay, playButton);
  }

  const pauseButton = document.createElement('button');
  pauseButton.setAttribute('type', 'button');
  pauseButton.classList.add('banner-video-icon', 'icon-pause', 'bg-transparent', 'd-block', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  if (iconPause) {
    pauseButton.innerHTML = iconPause.textContent.trim();
    moveInstrumentation(iconPause, pauseButton);
  }

  bannerVideoControls.append(playButton, pauseButton);
  bannerVideoWrapper.append(bannerVideoControls);

  const bannerMuteIcon = document.createElement('div');
  bannerMuteIcon.classList.add('banner-mute-icon', 'position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const muteButton = document.createElement('button');
  muteButton.setAttribute('type', 'button');
  muteButton.classList.add('banner-video-icon-volume', 'icon-mute', 'bg-transparent', 'd-none', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  if (iconMute) {
    muteButton.innerHTML = iconMute.textContent.trim();
    moveInstrumentation(iconMute, muteButton);
  }

  const unmuteButton = document.createElement('button');
  unmuteButton.setAttribute('type', 'button');
  unmuteButton.classList.add('banner-video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-none', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  if (iconUnmute) {
    unmuteButton.innerHTML = iconUnmute.textContent.trim();
    moveInstrumentation(iconUnmute, unmuteButton);
  }

  const noAudioButton = document.createElement('button');
  noAudioButton.setAttribute('type', 'button');
  noAudioButton.classList.add('banner-video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  if (iconNoAudio) {
    noAudioButton.innerHTML = iconNoAudio.textContent.trim();
    moveInstrumentation(iconNoAudio, noAudioButton);
  }

  bannerMuteIcon.append(muteButton, unmuteButton, noAudioButton);
  bannerVideoWrapper.append(bannerMuteIcon);

  wrapper.append(bannerVideoWrapper);

  const bannerCtaWrapper = document.createElement('div');
  bannerCtaWrapper.classList.add('banner-cta-wrapper', 'position-absolute', 'start-50', 'translate-middle-x', 'w-100');

  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');

  // Move any remaining content into the bannerCta div
  const authoredCtaContent = block.querySelector('.button-container');
  if (authoredCtaContent) {
    bannerCta.append(authoredCtaContent);
    moveInstrumentation(authoredCtaContent, bannerCta);
  }

  bannerCtaWrapper.append(bannerCta);
  wrapper.append(bannerCtaWrapper);

  block.textContent = '';
  block.append(wrapper);
  block.className = `banner-section block`;
  block.dataset.blockStatus = 'loaded';
}
