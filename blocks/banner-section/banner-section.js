import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('div');
  bannerSection.classList.add('banner-section');

  const bannerWrapper = document.createElement('div');
  bannerWrapper.classList.add('banner-position-relative', 'banner-boing-banner-section__wrapper');
  bannerSection.append(bannerWrapper);

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('banner-video-wrapper');
  bannerWrapper.append(videoWrapper);

  const videoElement = document.createElement('video');
  videoElement.classList.add('banner-w-100', 'banner-object-fit-cover', 'banner-media', 'banner-video');
  videoElement.setAttribute('title', 'Video');
  videoElement.setAttribute('aria-label', 'Video');
  videoElement.setAttribute('data-is-autoplay', 'true');
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('preload', 'metadata');
  videoElement.setAttribute('fetchpriority', 'high');
  videoElement.setAttribute('loop', 'false');
  videoElement.setAttribute('muted', 'true');
  videoElement.setAttribute('autoplay', 'true');

  const playPauseOverlay = document.createElement('div');
  playPauseOverlay.classList.add('banner-position-absolute', 'banner-w-100', 'banner-h-100', 'banner-start-0', 'banner-top-0', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer');

  const muteIconOverlay = document.createElement('div');
  muteIconOverlay.classList.add('banner-position-absolute', 'banner-z-2', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer', 'banner-mute-icon');

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100', 'banner-boing-banner--cta');
  const ctaInner = document.createElement('div');
  ctaInner.classList.add('banner-cta');
  ctaWrapper.append(ctaInner);

  // Assuming there's only one row for this block based on the JSON structure
  const row = block.children[0];
  if (row) {
    moveInstrumentation(row, bannerSection);
    const cells = row.children;

    // Cell 1: Video
    const videoCell = cells[0];
    if (videoCell) {
      const source = document.createElement('source');
      const videoLink = videoCell.querySelector('a');
      if (videoLink) {
        source.src = videoLink.href;
        source.type = 'video/mp4'; // Assuming mp4 based on example
        videoElement.append(source);
      }
      videoWrapper.append(videoElement);
    }

    // Cell 2: Icon Play
    const iconPlayCell = cells[1];
    if (iconPlayCell) {
      const iconPlayButton = document.createElement('button');
      iconPlayButton.setAttribute('type', 'button');
      iconPlayButton.classList.add('banner-d-none', 'banner-video-icon', 'banner-icon-play', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
      const iconPlayLink = iconPlayCell.querySelector('a');
      if (iconPlayLink) {
        iconPlayButton.textContent = iconPlayLink.href; // Assuming SVG content as text
      }
      playPauseOverlay.append(iconPlayButton);
    }

    // Cell 3: Icon Pause
    const iconPauseCell = cells[2];
    if (iconPauseCell) {
      const iconPauseButton = document.createElement('button');
      iconPauseButton.setAttribute('type', 'button');
      iconPauseButton.classList.add('banner-d-block', 'banner-video-icon', 'banner-icon-pause', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
      const iconPauseLink = iconPauseCell.querySelector('a');
      if (iconPauseLink) {
        iconPauseButton.textContent = iconPauseLink.href; // Assuming SVG content as text
      }
      playPauseOverlay.append(iconPauseButton);
    }
    videoWrapper.append(playPauseOverlay);

    // Cell 4: Icon Mute
    const iconMuteCell = cells[3];
    if (iconMuteCell) {
      const iconMuteButton = document.createElement('button');
      iconMuteButton.setAttribute('type', 'button');
      iconMuteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
      const iconMuteLink = iconMuteCell.querySelector('a');
      if (iconMuteLink) {
        iconMuteButton.textContent = iconMuteLink.href; // Assuming SVG content as text
      }
      muteIconOverlay.append(iconMuteButton);
    }

    // Cell 5: Icon Unmute
    const iconUnmuteCell = cells[4];
    if (iconUnmuteCell) {
      const iconUnmuteButton = document.createElement('button');
      iconUnmuteButton.setAttribute('type', 'button');
      iconUnmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
      const iconUnmuteLink = iconUnmuteCell.querySelector('a');
      if (iconUnmuteLink) {
        iconUnmuteButton.textContent = iconUnmuteLink.href; // Assuming SVG content as text
      }
      muteIconOverlay.append(iconUnmuteButton);
    }

    // Cell 6: Icon No Audio
    const iconNoAudioCell = cells[5];
    if (iconNoAudioCell) {
      const iconNoAudioButton = document.createElement('button');
      iconNoAudioButton.setAttribute('type', 'button');
      iconNoAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
      const iconNoAudioLink = iconNoAudioCell.querySelector('a');
      if (iconNoAudioLink) {
        iconNoAudioButton.textContent = iconNoAudioLink.href; // Assuming SVG content as text
      }
      muteIconOverlay.append(iconNoAudioButton);
    }
    videoWrapper.append(muteIconOverlay);
  }

  bannerWrapper.append(ctaWrapper);

  block.textContent = '';
  block.append(bannerSection);
}
