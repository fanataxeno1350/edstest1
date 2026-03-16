import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoSource = block.querySelector('[data-aue-prop="videoSource"]');
  const iconPlay = block.querySelector('[data-aue-prop="iconPlay"]');
  const iconPause = block.querySelector('[data-aue-prop="iconPause"]');
  const iconMute = block.querySelector('[data-aue-prop="iconMute"]');
  const iconUnmute = block.querySelector('[data-aue-prop="iconUnmute"]');
  const iconNoAudio = block.querySelector('[data-aue-prop="iconNoAudio"]');

  const bannerWrapper = document.createElement('div');
  bannerWrapper.className = 'banner-section__wrapper position-relative boing';

  const bannerVideoWrapper = document.createElement('div');
  bannerVideoWrapper.className = 'banner-video-wrapper';

  const videoElement = document.createElement('video');
  videoElement.className = 'banner-video w-100 object-fit-cover banner-media';
  videoElement.title = 'Video';
  videoElement.ariaLabel = 'Video';
  videoElement.playsInline = true;
  videoElement.preload = 'metadata';
  videoElement.fetchPriority = 'high';
  videoElement.loop = false;
  videoElement.muted = true;
  videoElement.autoplay = true;
  videoElement.dataset.isAutoplay = 'true';

  if (videoSource) {
    const sourceElement = document.createElement('source');
    sourceElement.src = videoSource.textContent.trim();
    sourceElement.type = 'video/mp4';
    videoElement.append(sourceElement);
    moveInstrumentation(videoSource, sourceElement);
  }

  const playPauseContainer = document.createElement('div');
  playPauseContainer.className = 'position-absolute w-100 h-100 start-0 top-0 d-flex justify-content-center align-items-center cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'video-icon icon-play bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
  if (iconPlay) {
    playButton.textContent = iconPlay.textContent.trim();
    moveInstrumentation(iconPlay, playButton);
  }

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'video-icon icon-pause bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-block';
  if (iconPause) {
    pauseButton.textContent = iconPause.textContent.trim();
    moveInstrumentation(iconPause, pauseButton);
  }

  playPauseContainer.append(playButton, pauseButton);

  const muteIconContainer = document.createElement('div');
  muteIconContainer.className = 'mute-icon position-absolute z-2 d-flex justify-content-center align-items-center cursor-pointer';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'video-icon-volume icon-mute bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
  if (iconMute) {
    muteButton.textContent = iconMute.textContent.trim();
    moveInstrumentation(iconMute, muteButton);
  }

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'video-icon-volume icon-unmute bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
  if (iconUnmute) {
    unmuteButton.textContent = iconUnmute.textContent.trim();
    moveInstrumentation(iconUnmute, unmuteButton);
  }

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'video-icon-volume no-audio-icon bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
  if (iconNoAudio) {
    noAudioButton.textContent = iconNoAudio.textContent.trim();
    moveInstrumentation(iconNoAudio, noAudioButton);
  }

  muteIconContainer.append(muteButton, unmuteButton, noAudioButton);

  bannerVideoWrapper.append(videoElement, playPauseContainer, muteIconContainer);

  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'boing__banner--cta position-absolute start-50 translate-middle-x w-100';
  const bannerCtaDiv = document.createElement('div');
  bannerCtaDiv.className = 'banner-cta';
  ctaContainer.append(bannerCtaDiv);

  // Move any remaining content into the bannerCtaDiv if it exists
  const authoredCtaContent = block.querySelector(':scope > div:last-child');
  if (authoredCtaContent && authoredCtaContent.children.length > 0) {
    Array.from(authoredCtaContent.children).forEach((child) => {
      bannerCtaDiv.append(child);
      moveInstrumentation(child, bannerCtaDiv);
    });
    moveInstrumentation(authoredCtaContent, ctaContainer);
  }

  bannerWrapper.append(bannerVideoWrapper, ctaContainer);

  block.textContent = '';
  block.append(bannerWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
