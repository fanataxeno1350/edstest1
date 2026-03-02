import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'banner-section__wrapper banner-position-relative banner-boing';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const video = document.createElement('video');
  video.className = 'banner-video banner-w-100 banner-object-fit-cover banner-media';
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

  const playPauseContainer = document.createElement('div');
  playPauseContainer.className = 'banner-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.setAttribute('type', 'button');
  playButton.className = 'banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';

  const pauseButton = document.createElement('button');
  pauseButton.setAttribute('type', 'button');
  pauseButton.className = 'banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-block';

  const muteContainer = document.createElement('div');
  muteContainer.className = 'banner-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.setAttribute('type', 'button');
  muteButton.className = 'banner-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';

  const unmuteButton = document.createElement('button');
  unmuteButton.setAttribute('type', 'button');
  unmuteButton.className = 'banner-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';

  const noAudioButton = document.createElement('button');
  noAudioButton.setAttribute('type', 'button');
  noAudioButton.className = 'banner-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';

  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';
  const bannerCta = document.createElement('div');
  bannerCta.className = 'banner-banner-cta';

  // Assuming the block has one row with cells corresponding to the fields
  const row = block.children[0];
  if (row) {
    const cells = row.children;
    // Transfer instrumentation from the original row to the main wrapper
    moveInstrumentation(row, wrapper);

    // Extract content based on the order in the JSON model
    // videoSrc
    const videoSrcCell = cells[0];
    if (videoSrcCell) {
      const videoLink = videoSrcCell.querySelector('a');
      if (videoLink) {
        source.setAttribute('src', videoLink.href);
        source.setAttribute('type', 'video/mp4');
        video.append(source);
      }
    }

    // videoTitle
    const videoTitleCell = cells[1];
    if (videoTitleCell) {
      const titleText = videoTitleCell.textContent.trim();
      if (titleText) {
        video.setAttribute('title', titleText);
        video.setAttribute('aria-label', titleText);
      }
    }

    // playIcon
    const playIconCell = cells[2];
    if (playIconCell) {
      const playIconImg = playIconCell.querySelector('img');
      if (playIconImg) {
        playButton.innerHTML = playIconImg.outerHTML;
      } else {
        playButton.textContent = playIconCell.textContent.trim();
      }
    }

    // pauseIcon
    const pauseIconCell = cells[3];
    if (pauseIconCell) {
      const pauseIconImg = pauseIconCell.querySelector('img');
      if (pauseIconImg) {
        pauseButton.innerHTML = pauseIconImg.outerHTML;
      } else {
        pauseButton.textContent = pauseIconCell.textContent.trim();
      }
    }

    // muteIcon
    const muteIconCell = cells[4];
    if (muteIconCell) {
      const muteIconImg = muteIconCell.querySelector('img');
      if (muteIconImg) {
        muteButton.innerHTML = muteIconImg.outerHTML;
      } else {
        muteButton.textContent = muteIconCell.textContent.trim();
      }
    }

    // unmuteIcon
    const unmuteIconCell = cells[5];
    if (unmuteIconCell) {
      const unmuteIconImg = unmuteIconCell.querySelector('img');
      if (unmuteIconImg) {
        unmuteButton.innerHTML = unmuteIconImg.outerHTML;
      } else {
        unmuteButton.textContent = unmuteIconCell.textContent.trim();
      }
    }

    // noAudioIcon
    const noAudioIconCell = cells[6];
    if (noAudioIconCell) {
      const noAudioIconImg = noAudioIconCell.querySelector('img');
      if (noAudioIconImg) {
        noAudioButton.innerHTML = noAudioIconImg.outerHTML;
      } else {
        noAudioButton.textContent = noAudioIconCell.textContent.trim();
      }
    }
  }

  // Assemble the DOM structure
  videoWrapper.append(video);

  playPauseContainer.append(playButton, pauseButton);
  videoWrapper.append(playPauseContainer);

  muteContainer.append(muteButton, unmuteButton, noAudioButton);
  videoWrapper.append(muteContainer);

  wrapper.append(videoWrapper);

  ctaContainer.append(bannerCta);
  wrapper.append(ctaContainer);

  block.textContent = '';
  block.append(wrapper);
}