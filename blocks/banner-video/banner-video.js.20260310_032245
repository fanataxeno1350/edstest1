import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'banner-position-relative banner-boing banner-banner-section__wrapper';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const videoElement = document.createElement('video');
  videoElement.className = 'banner-w-100 banner-object-fit-cover banner-banner-media banner-banner-video';
  videoElement.title = 'Video';
  videoElement.ariaLabel = 'Video';
  videoElement.setAttribute('data-is-autoplay', 'true');
  videoElement.playsInline = true;
  videoElement.preload = 'metadata';
  videoElement.fetchPriority = 'high';
  videoElement.loop = false;
  videoElement.muted = true;
  videoElement.autoplay = true;

  const sourceElement = document.createElement('source');
  // Assuming the video source comes from the first cell of the first row
  const videoSrcCell = block.children[0]?.children[0];
  if (videoSrcCell) {
    const videoLink = videoSrcCell.querySelector('a');
    if (videoLink) {
      sourceElement.src = videoLink.href;
      sourceElement.type = 'video/mp4'; // Assuming mp4 for now based on example
      moveInstrumentation(videoLink, sourceElement);
    }
  }
  videoElement.append(sourceElement);
  videoWrapper.append(videoElement);

  // Play/Pause controls
  const playPauseContainer = document.createElement('div');
  playPauseContainer.className = 'banner-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  // Assuming play icon SVG content is directly in the cell after videoSrc
  const playIconCell = block.children[0]?.children[1];
  if (playIconCell) {
    playButton.innerHTML = playIconCell.innerHTML;
    moveInstrumentation(playIconCell, playButton);
  }

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  // Assuming pause icon SVG content is directly in the cell after playIcon
  const pauseIconCell = block.children[0]?.children[2];
  if (pauseIconCell) {
    pauseButton.innerHTML = pauseIconCell.innerHTML;
    moveInstrumentation(pauseIconCell, pauseButton);
  }
  playPauseContainer.append(playButton, pauseButton);
  videoWrapper.append(playPauseContainer);

  // Mute/Unmute controls
  const muteContainer = document.createElement('div');
  muteContainer.className = 'banner-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  // Assuming mute icon SVG content is directly in the cell after pauseIcon
  const muteIconCell = block.children[0]?.children[3];
  if (muteIconCell) {
    muteButton.innerHTML = muteIconCell.innerHTML;
    moveInstrumentation(muteIconCell, muteButton);
  }

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  // Assuming unmute icon SVG content is directly in the cell after muteIcon
  const unmuteIconCell = block.children[0]?.children[4];
  if (unmuteIconCell) {
    unmuteButton.innerHTML = unmuteIconCell.innerHTML;
    moveInstrumentation(unmuteIconCell, unmuteButton);
  }

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  // Assuming no-audio icon SVG content is directly in the cell after unmuteIcon
  const noAudioIconCell = block.children[0]?.children[5];
  if (noAudioIconCell) {
    noAudioButton.innerHTML = noAudioIconCell.innerHTML;
    moveInstrumentation(noAudioIconCell, noAudioButton);
  }
  muteContainer.append(muteButton, unmuteButton, noAudioButton);
  videoWrapper.append(muteContainer);

  wrapper.append(videoWrapper);

  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100 banner-boing__banner--cta';
  const ctaInner = document.createElement('div');
  ctaInner.className = 'banner-banner-cta';
  // Assuming CTA content is in the second row, first cell
  const ctaCell = block.children[1]?.children[0];
  if (ctaCell) {
    ctaInner.innerHTML = ctaCell.innerHTML;
    moveInstrumentation(ctaCell, ctaInner);
  }
  ctaContainer.append(ctaInner);
  wrapper.append(ctaContainer);

  block.textContent = '';
  block.append(wrapper);
}
