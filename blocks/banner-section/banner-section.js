import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'banner-section__wrapper position-relative';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const videoElement = block.querySelector('video');
  if (videoElement) {
    const newVideo = document.createElement('video');
    newVideo.className = 'banner-video w-100 object-fit-cover banner-media';
    newVideo.title = videoElement.title || 'Video';
    newVideo.ariaLabel = videoElement.ariaLabel || 'Video';
    newVideo.playsInline = videoElement.playsInline;
    newVideo.preload = videoElement.preload;
    newVideo.fetchPriority = videoElement.fetchPriority;
    newVideo.loop = videoElement.loop;
    newVideo.muted = videoElement.muted;
    newVideo.autoplay = videoElement.autoplay;
    if (videoElement.dataset.isAutoplay) {
      newVideo.dataset.isAutoplay = videoElement.dataset.isAutoplay;
    }

    const sourceElement = videoElement.querySelector('source');
    if (sourceElement) {
      const newSource = document.createElement('source');
      newSource.src = sourceElement.src;
      newSource.type = sourceElement.type;
      newVideo.append(newSource);
    }
    moveInstrumentation(videoElement, newVideo);
    videoWrapper.append(newVideo);
  }

  const playPauseContainer = document.createElement('div');
  playPauseContainer.className = 'position-absolute w-100 h-100 start-0 top-0 d-flex justify-content-center align-items-center cursor-pointer';

  const playButton = block.querySelector('.video-icon.icon-play');
  if (playButton) {
    const newPlayButton = document.createElement('button');
    newPlayButton.type = 'button';
    newPlayButton.className = 'video-icon icon-play bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    if (playButton.classList.contains('d-none')) {
      newPlayButton.classList.add('d-none');
    } else {
      newPlayButton.classList.add('d-block');
    }
    const playIconSrc = playButton.textContent.trim();
    if (playIconSrc) {
      const playIconImg = document.createElement('img');
      playIconImg.src = playIconSrc;
      playIconImg.alt = 'Play';
      newPlayButton.append(playIconImg);
    }
    moveInstrumentation(playButton, newPlayButton);
    playPauseContainer.append(newPlayButton);
  }

  const pauseButton = block.querySelector('.video-icon.icon-pause');
  if (pauseButton) {
    const newPauseButton = document.createElement('button');
    newPauseButton.type = 'button';
    newPauseButton.className = 'video-icon icon-pause bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    if (pauseButton.classList.contains('d-none')) {
      newPauseButton.classList.add('d-none');
    } else {
      newPauseButton.classList.add('d-block');
    }
    const pauseIconSrc = pauseButton.textContent.trim();
    if (pauseIconSrc) {
      const pauseIconImg = document.createElement('img');
      pauseIconImg.src = pauseIconSrc;
      pauseIconImg.alt = 'Pause';
      newPauseButton.append(pauseIconImg);
    }
    moveInstrumentation(pauseButton, newPauseButton);
    playPauseContainer.append(newPauseButton);
  }
  videoWrapper.append(playPauseContainer);

  const muteIconContainer = document.createElement('div');
  muteIconContainer.className = 'mute-icon position-absolute z-2 d-flex justify-content-center align-items-center cursor-pointer';

  const muteButton = block.querySelector('.video-icon-volume.icon-mute');
  if (muteButton) {
    const newMuteButton = document.createElement('button');
    newMuteButton.type = 'button';
    newMuteButton.className = 'video-icon-volume icon-mute bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    if (muteButton.classList.contains('d-none')) {
      newMuteButton.classList.add('d-none');
    } else {
      newMuteButton.classList.add('d-block');
    }
    const muteIconSrc = muteButton.textContent.trim();
    if (muteIconSrc) {
      const muteIconImg = document.createElement('img');
      muteIconImg.src = muteIconSrc;
      muteIconImg.alt = 'Mute';
      newMuteButton.append(muteIconImg);
    }
    moveInstrumentation(muteButton, newMuteButton);
    muteIconContainer.append(newMuteButton);
  }

  const unmuteButton = block.querySelector('.video-icon-volume.icon-unmute');
  if (unmuteButton) {
    const newUnmuteButton = document.createElement('button');
    newUnmuteButton.type = 'button';
    newUnmuteButton.className = 'video-icon-volume icon-unmute bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    if (unmuteButton.classList.contains('d-none')) {
      newUnmuteButton.classList.add('d-none');
    } else {
      newUnmuteButton.classList.add('d-block');
    }
    const unmuteIconSrc = unmuteButton.textContent.trim();
    if (unmuteIconSrc) {
      const unmuteIconImg = document.createElement('img');
      unmuteIconImg.src = unmuteIconSrc;
      unmuteIconImg.alt = 'Unmute';
      newUnmuteButton.append(unmuteIconImg);
    }
    moveInstrumentation(unmuteButton, newUnmuteButton);
    muteIconContainer.append(newUnmuteButton);
  }

  const noAudioButton = block.querySelector('.video-icon-volume.no-audio-icon');
  if (noAudioButton) {
    const newNoAudioButton = document.createElement('button');
    newNoAudioButton.type = 'button';
    newNoAudioButton.className = 'video-icon-volume no-audio-icon bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
    if (noAudioButton.classList.contains('d-none')) {
      newNoAudioButton.classList.add('d-none');
    } else {
      newNoAudioButton.classList.add('d-block');
    }
    const noAudioIconSrc = noAudioButton.textContent.trim();
    if (noAudioIconSrc) {
      const noAudioIconImg = document.createElement('img');
      noAudioIconImg.src = noAudioIconSrc;
      noAudioIconImg.alt = 'No Audio';
      newNoAudioButton.append(noAudioIconImg);
    }
    moveInstrumentation(noAudioButton, newNoAudioButton);
    muteIconContainer.append(newNoAudioButton);
  }
  videoWrapper.append(muteIconContainer);
  wrapper.append(videoWrapper);

  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'boing__banner--cta position-absolute start-50 translate-middle-x w-100';

  const bannerCtaDiv = document.createElement('div');
  bannerCtaDiv.className = 'banner-cta';

  const ctaContent = block.querySelector('.banner-cta');
  if (ctaContent) {
    [...ctaContent.children].forEach((child) => {
      moveInstrumentation(child, bannerCtaDiv);
      bannerCtaDiv.append(child);
    });
  }
  ctaContainer.append(bannerCtaDiv);
  wrapper.append(ctaContainer);

  block.textContent = '';
  block.append(wrapper);
  block.className = `banner-section block ${block.dataset.blockName}`;
  block.dataset.blockStatus = 'loaded';
}
