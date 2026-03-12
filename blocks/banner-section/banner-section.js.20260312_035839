import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('banner-section__wrapper', 'banner-position-relative', 'banner-boing');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('banner-video-wrapper');

  const videoElement = block.querySelector('video');
  if (videoElement) {
    const srcElement = videoElement.querySelector('source');
    if (srcElement) {
      const video = document.createElement('video');
      video.classList.add('banner-video', 'banner-w-100', 'banner-object-fit-cover', 'banner-media');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');
      if (videoElement.dataset.isAutoplay === 'true') {
        video.setAttribute('autoplay', 'true');
      }

      const source = document.createElement('source');
      source.setAttribute('src', srcElement.src);
      source.setAttribute('type', srcElement.type);
      video.append(source);
      videoWrapper.append(video);
      moveInstrumentation(videoElement, video);
      moveInstrumentation(srcElement, source);
    }
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.classList.add('banner-video-position-absolute', 'banner-w-100', 'banner-h-100', 'banner-start-0', 'banner-top-0', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer');

  const playButton = document.createElement('button');
  playButton.setAttribute('type', 'button');
  playButton.classList.add('banner-video-d-none', 'banner-video-icon', 'banner-icon-play', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
  const iconPlaySrc = block.querySelector('[data-aue-prop="iconPlay"]')?.textContent.trim();
  if (iconPlaySrc) {
    const playImg = document.createElement('img');
    playImg.src = iconPlaySrc;
    playImg.alt = 'Play';
    playButton.append(playImg);
  }
  playPauseWrapper.append(playButton);

  const pauseButton = document.createElement('button');
  pauseButton.setAttribute('type', 'button');
  pauseButton.classList.add('banner-video-d-block', 'banner-video-icon', 'banner-icon-pause', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
  const iconPauseSrc = block.querySelector('[data-aue-prop="iconPause"]')?.textContent.trim();
  if (iconPauseSrc) {
    const pauseImg = document.createElement('img');
    pauseImg.src = iconPauseSrc;
    pauseImg.alt = 'Pause';
    pauseButton.append(pauseImg);
  }
  playPauseWrapper.append(pauseButton);
  videoWrapper.append(playPauseWrapper);

  const muteWrapper = document.createElement('div');
  muteWrapper.classList.add('banner-video-position-absolute', 'banner-z-2', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer', 'banner-mute-icon');

  const muteButton = document.createElement('button');
  muteButton.setAttribute('type', 'button');
  muteButton.classList.add('banner-video-video-icon-volume', 'banner-icon-mute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
  const iconMuteSrc = block.querySelector('[data-aue-prop="iconMute"]')?.textContent.trim();
  if (iconMuteSrc) {
    const muteImg = document.createElement('img');
    muteImg.src = iconMuteSrc;
    muteImg.alt = 'Mute';
    muteButton.append(muteImg);
  }
  muteWrapper.append(muteButton);

  const unmuteButton = document.createElement('button');
  unmuteButton.setAttribute('type', 'button');
  unmuteButton.classList.add('banner-video-video-icon-volume', 'banner-icon-unmute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
  const iconUnmuteSrc = block.querySelector('[data-aue-prop="iconUnmute"]')?.textContent.trim();
  if (iconUnmuteSrc) {
    const unmuteImg = document.createElement('img');
    unmuteImg.src = iconUnmuteSrc;
    unmuteImg.alt = 'Unmute';
    unmuteButton.append(unmuteImg);
  }
  muteWrapper.append(unmuteButton);

  const noAudioButton = document.createElement('button');
  noAudioButton.setAttribute('type', 'button');
  noAudioButton.classList.add('banner-video-video-icon-volume', 'banner-no-audio-icon', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
  const iconNoAudioSrc = block.querySelector('[data-aue-prop="iconNoAudio"]')?.textContent.trim();
  if (iconNoAudioSrc) {
    const noAudioImg = document.createElement('img');
    noAudioImg.src = iconNoAudioSrc;
    noAudioImg.alt = 'No Audio';
    noAudioButton.append(noAudioImg);
  }
  muteWrapper.append(noAudioButton);
  videoWrapper.append(muteWrapper);

  wrapper.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('banner-boing__banner--cta', 'banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100');
  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('banner-cta');
  // Assuming CTA content is directly within the block's last div, or needs to be extracted from a specific data-aue-prop if defined.
  // For now, let's assume it's the last child of the block if it exists and is not one of the video/icon props.
  const authoredCtaContent = block.querySelector('.banner-cta');
  if (authoredCtaContent) {
    Array.from(authoredCtaContent.children).forEach((child) => {
      ctaDiv.append(child);
      moveInstrumentation(child, ctaDiv);
    });
    moveInstrumentation(authoredCtaContent, ctaDiv);
  }
  ctaWrapper.append(ctaDiv);
  wrapper.append(ctaWrapper);

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}