import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'banner-section__wrapper banner-position-relative banner-boing';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const video = document.createElement('video');
  video.className = 'banner-video banner-w-100 banner-object-fit-cover banner-media';
  video.title = 'Video';
  video.ariaLabel = 'Video';
  video.playsInline = true;
  video.preload = 'metadata';
  video.fetchPriority = 'high';

  // Extracting video source and attributes from the first row
  const firstRow = block.children[0];
  if (firstRow) {
    const videoCell = firstRow.children[0];
    if (videoCell) {
      const source = videoCell.querySelector('a');
      if (source) {
        const videoSource = document.createElement('source');
        videoSource.src = source.href;
        videoSource.type = 'video/mp4';
        video.append(videoSource);
      }
      // Transfer instrumentation for the video cell
      moveInstrumentation(videoCell, video);
    }

    const autoplayCell = firstRow.children[1];
    if (autoplayCell && autoplayCell.textContent.toLowerCase() === 'true') {
      video.setAttribute('data-is-autoplay', 'true');
      video.autoplay = true;
    } else {
      video.autoplay = false;
    }

    const mutedCell = firstRow.children[2];
    if (mutedCell && mutedCell.textContent.toLowerCase() === 'true') {
      video.muted = true;
    } else {
      video.muted = false;
    }

    const loopCell = firstRow.children[3];
    if (loopCell && loopCell.textContent.toLowerCase() === 'true') {
      video.loop = true;
    } else {
      video.loop = false;
    }
  }

  videoWrapper.append(video);

  // Play/Pause controls
  const playPauseDiv = document.createElement('div');
  playPauseDiv.className = 'banner-video-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-video-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  const playIconCell = block.children[1]?.children[0];
  if (playIconCell) {
    const playIcon = playIconCell.querySelector('a');
    if (playIcon) {
      playButton.innerHTML = playIcon.textContent;
    }
    moveInstrumentation(playIconCell, playButton);
  }
  playPauseDiv.append(playButton);

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-video-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  const pauseIconCell = block.children[1]?.children[1];
  if (pauseIconCell) {
    const pauseIcon = pauseIconCell.querySelector('a');
    if (pauseIcon) {
      pauseButton.innerHTML = pauseIcon.textContent;
    }
    moveInstrumentation(pauseIconCell, pauseButton);
  }
  playPauseDiv.append(pauseButton);
  videoWrapper.append(playPauseDiv);

  // Mute/Unmute controls
  const muteDiv = document.createElement('div');
  muteDiv.className = 'banner-video-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  const muteIconCell = block.children[2]?.children[0];
  if (muteIconCell) {
    const muteIcon = muteIconCell.querySelector('a');
    if (muteIcon) {
      muteButton.innerHTML = muteIcon.textContent;
    }
    moveInstrumentation(muteIconCell, muteButton);
  }
  muteDiv.append(muteButton);

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  const unmuteIconCell = block.children[2]?.children[1];
  if (unmuteIconCell) {
    const unmuteIcon = unmuteIconCell.querySelector('a');
    if (unmuteIcon) {
      unmuteButton.innerHTML = unmuteIcon.textContent;
    }
    moveInstrumentation(unmuteIconCell, unmuteButton);
  }
  muteDiv.append(unmuteButton);

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  const noAudioIconCell = block.children[2]?.children[2];
  if (noAudioIconCell) {
    const noAudioIcon = noAudioIconCell.querySelector('a');
    if (noAudioIcon) {
      noAudioButton.innerHTML = noAudioIcon.textContent;
    }
    moveInstrumentation(noAudioIconCell, noAudioButton);
  }
  muteDiv.append(noAudioButton);
  videoWrapper.append(muteDiv);

  wrapper.append(videoWrapper);

  // CTA section
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';
  const innerCtaDiv = document.createElement('div');
  innerCtaDiv.className = 'banner-cta';

  const ctaCell = block.children[3]?.children[0];
  if (ctaCell) {
    // Transfer all children of the CTA cell directly to innerCtaDiv
    [...ctaCell.children].forEach((child) => {
      innerCtaDiv.append(child);
    });
    // Transfer instrumentation from the CTA cell to the inner CTA div
    moveInstrumentation(ctaCell, innerCtaDiv);
  }

  ctaDiv.append(innerCtaDiv);
  wrapper.append(ctaDiv);

  block.textContent = '';
  block.append(wrapper);
}