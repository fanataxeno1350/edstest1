import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('banner-banner-section');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('banner-position-relative', 'banner-boing', 'banner-banner-section__wrapper');

  const videoWrapperDiv = document.createElement('div');
  videoWrapperDiv.classList.add('banner-video-wrapper');

  const video = document.createElement('video');
  video.classList.add('banner-w-100', 'banner-object-fit-cover', 'banner-banner-media', 'banner-banner-video');
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

  const playPauseControlDiv = document.createElement('div');
  playPauseControlDiv.classList.add('banner-position-absolute', 'banner-w-100', 'banner-h-100', 'banner-start-0', 'banner-top-0', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer');

  const playButton = document.createElement('button');
  playButton.setAttribute('type', 'button');
  playButton.classList.add('banner-d-none', 'banner-video-icon', 'banner-icon-play', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');

  const pauseButton = document.createElement('button');
  pauseButton.setAttribute('type', 'button');
  pauseButton.classList.add('banner-d-block', 'banner-video-icon', 'banner-icon-pause', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');

  const muteControlDiv = document.createElement('div');
  muteControlDiv.classList.add('banner-position-absolute', 'banner-z-2', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer', 'banner-mute-icon');

  const muteButton = document.createElement('button');
  muteButton.setAttribute('type', 'button');
  muteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');

  const unmuteButton = document.createElement('button');
  unmuteButton.setAttribute('type', 'button');
  unmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');

  const noAudioButton = document.createElement('button');
  noAudioButton.setAttribute('type', 'button');
  noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');

  const ctaWrapperDiv = document.createElement('div');
  ctaWrapperDiv.classList.add('banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100', 'banner-boing__banner--cta');

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('banner-banner-cta');

  [...block.children].forEach((row) => {
    moveInstrumentation(row, section);
    const cells = [...row.children];

    // Assuming the order of cells matches the model: video, playIcon, pauseIcon, muteIcon, unmuteIcon, noAudioIcon
    const videoCell = cells[0];
    const playIconCell = cells[1];
    const pauseIconCell = cells[2];
    const muteIconCell = cells[3];
    const unmuteIconCell = cells[4];
    const noAudioIconCell = cells[5];

    if (videoCell) {
      const videoLink = videoCell.querySelector('a');
      if (videoLink) {
        source.setAttribute('src', videoLink.href);
        source.setAttribute('type', 'video/mp4');
        video.append(source);
        moveInstrumentation(videoLink, source);
      }
    }

    if (playIconCell) {
      const playIconLink = playIconCell.querySelector('a');
      if (playIconLink) {
        playButton.innerHTML = playIconLink.innerHTML;
        moveInstrumentation(playIconLink, playButton);
      }
    }

    if (pauseIconCell) {
      const pauseIconLink = pauseIconCell.querySelector('a');
      if (pauseIconLink) {
        pauseButton.innerHTML = pauseIconLink.innerHTML;
        moveInstrumentation(pauseIconLink, pauseButton);
      }
    }

    if (muteIconCell) {
      const muteIconLink = muteIconCell.querySelector('a');
      if (muteIconLink) {
        muteButton.innerHTML = muteIconLink.innerHTML;
        moveInstrumentation(muteIconLink, muteButton);
      }
    }

    if (unmuteIconCell) {
      const unmuteIconLink = unmuteIconCell.querySelector('a');
      if (unmuteIconLink) {
        unmuteButton.innerHTML = unmuteIconLink.innerHTML;
        moveInstrumentation(unmuteIconLink, unmuteButton);
      }
    }

    if (noAudioIconCell) {
      const noAudioIconLink = noAudioIconCell.querySelector('a');
      if (noAudioIconLink) {
        noAudioButton.innerHTML = noAudioIconLink.innerHTML;
        moveInstrumentation(noAudioIconLink, noAudioButton);
      }
    }
  });

  videoWrapperDiv.append(video);
  playPauseControlDiv.append(playButton, pauseButton);
  videoWrapperDiv.append(playPauseControlDiv);
  muteControlDiv.append(muteButton, unmuteButton, noAudioButton);
  videoWrapperDiv.append(muteControlDiv);

  wrapperDiv.append(videoWrapperDiv);
  ctaWrapperDiv.append(ctaDiv);
  wrapperDiv.append(ctaWrapperDiv);
  section.append(wrapperDiv);

  block.textContent = '';
  block.append(section);
}
