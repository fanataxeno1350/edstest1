import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'banner-section__wrapper banner-position-relative banner-boing';
  moveInstrumentation(block, wrapper);

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const video = document.createElement('video');
  video.className = 'banner-video banner-w-100 banner-object-fit-cover banner-media';
  video.setAttribute('playsinline', '');
  video.setAttribute('preload', 'metadata');
  video.setAttribute('fetchpriority', 'high');

  const source = document.createElement('source');

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.className = 'banner-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-block';

  const muteIconWrapper = document.createElement('div');
  muteIconWrapper.className = 'banner-mute-icon banner-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';

  // Assuming the block children are in the order of the fields in the JSON
  // videoSrc, videoTitle, autoplay, muted, loop, playIcon, pauseIcon, muteIcon, unmuteIcon, noAudioIcon
  const children = [...block.children];

  // Extract content from rows
  const videoSrcCell = children[0]?.children[1];
  const videoTitleCell = children[1]?.children[1];
  const autoplayCell = children[2]?.children[1];
  const mutedCell = children[3]?.children[1];
  const loopCell = children[4]?.children[1];
  const playIconCell = children[5]?.children[1];
  const pauseIconCell = children[6]?.children[1];
  const muteIconCell = children[7]?.children[1];
  const unmuteIconCell = children[8]?.children[1];
  const noAudioIconCell = children[9]?.children[1];

  if (videoSrcCell) {
    const videoLink = videoSrcCell.querySelector('a');
    if (videoLink) {
      source.src = videoLink.href;
      source.type = 'video/mp4'; // Assuming mp4 based on example
      video.append(source);
      moveInstrumentation(videoLink, source);
    }
  }

  if (videoTitleCell) {
    const titleText = videoTitleCell.textContent.trim();
    video.title = titleText;
    video.setAttribute('aria-label', titleText);
    moveInstrumentation(videoTitleCell, video);
  }

  if (autoplayCell && autoplayCell.textContent.trim().toLowerCase() === 'true') {
    video.setAttribute('autoplay', 'true');
    video.setAttribute('data-is-autoplay', 'true');
  } else {
    video.removeAttribute('autoplay');
    video.setAttribute('data-is-autoplay', 'false');
  }

  if (mutedCell && mutedCell.textContent.trim().toLowerCase() === 'true') {
    video.setAttribute('muted', 'true');
  } else {
    video.removeAttribute('muted');
  }

  if (loopCell && loopCell.textContent.trim().toLowerCase() === 'true') {
    video.setAttribute('loop', 'true');
  } else {
    video.setAttribute('loop', 'false');
  }

  if (playIconCell) {
    const playIconLink = playIconCell.querySelector('a');
    if (playIconLink) {
      playButton.innerHTML = playIconLink.href; // Assuming SVG content is the href
      moveInstrumentation(playIconLink, playButton);
    }
  }

  if (pauseIconCell) {
    const pauseIconLink = pauseIconCell.querySelector('a');
    if (pauseIconLink) {
      pauseButton.innerHTML = pauseIconLink.href; // Assuming SVG content is the href
      moveInstrumentation(pauseIconLink, pauseButton);
    }
  }

  if (muteIconCell) {
    const muteIconLink = muteIconCell.querySelector('a');
    if (muteIconLink) {
      muteButton.innerHTML = muteIconLink.href; // Assuming SVG content is the href
      moveInstrumentation(muteIconLink, muteButton);
    }
  }

  if (unmuteIconCell) {
    const unmuteIconLink = unmuteIconCell.querySelector('a');
    if (unmuteIconLink) {
      unmuteButton.innerHTML = unmuteIconLink.href; // Assuming SVG content is the href
      moveInstrumentation(unmuteIconLink, unmuteButton);
    }
  }

  if (noAudioIconCell) {
    const noAudioIconLink = noAudioIconCell.querySelector('a');
    if (noAudioIconLink) {
      noAudioButton.innerHTML = noAudioIconLink.href; // Assuming SVG content is the href
      moveInstrumentation(noAudioIconLink, noAudioButton);
    }
  }

  videoWrapper.append(video);
  playPauseWrapper.append(playButton, pauseButton);
  videoWrapper.append(playPauseWrapper);
  muteIconWrapper.append(muteButton, unmuteButton, noAudioButton);
  videoWrapper.append(muteIconWrapper);

  wrapper.append(videoWrapper);

  // Create the CTA section - assuming it's a separate block or static content
  const ctaSection = document.createElement('div');
  ctaSection.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-cta';
  // No specific content for CTA is provided in the block JSON, so it remains empty or can be populated from other block children if available.
  ctaSection.append(ctaDiv);
  wrapper.append(ctaSection);

  block.textContent = '';
  block.append(wrapper);
}
