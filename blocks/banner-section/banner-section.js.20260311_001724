import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'banner-section__wrapper banner-position-relative banner-boing';
  moveInstrumentation(block, wrapper);

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const video = document.createElement('video');
  video.className = 'banner-video banner-w-100 banner-object-fit-cover banner-media';
  video.title = 'Video';
  video.ariaLabel = 'Video';
  video.setAttribute('data-is-autoplay', 'true');
  video.playsInline = true;
  video.preload = 'metadata';
  video.fetchPriority = 'high';
  video.loop = false;
  video.muted = true;
  video.autoplay = true;

  const source = document.createElement('source');
  // Assuming the video source is in the first cell of the first row
  const videoSrcCell = block.children[0]?.children[0];
  if (videoSrcCell) {
    const videoLink = videoSrcCell.querySelector('a');
    if (videoLink) {
      source.src = videoLink.href;
      source.type = 'video/mp4';
      video.append(source);
      moveInstrumentation(videoLink, source);
    }
  }
  videoWrapper.append(video);

  const playPauseOverlay = document.createElement('div');
  playPauseOverlay.className = 'banner-video-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-video-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  // Assuming play icon is in the second cell of the first row
  const playIconCell = block.children[0]?.children[1];
  if (playIconCell) {
    playButton.innerHTML = playIconCell.innerHTML;
    moveInstrumentation(playIconCell, playButton);
  }
  playPauseOverlay.append(playButton);

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-video-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  // Assuming pause icon is in the third cell of the first row
  const pauseIconCell = block.children[0]?.children[2];
  if (pauseIconCell) {
    pauseButton.innerHTML = pauseIconCell.innerHTML;
    moveInstrumentation(pauseIconCell, pauseButton);
  }
  playPauseOverlay.append(pauseButton);
  videoWrapper.append(playPauseOverlay);

  const muteOverlay = document.createElement('div');
  muteOverlay.className = 'banner-video-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  // Assuming mute icon is in the fourth cell of the first row
  const muteIconCell = block.children[0]?.children[3];
  if (muteIconCell) {
    muteButton.innerHTML = muteIconCell.innerHTML;
    moveInstrumentation(muteIconCell, muteButton);
  }
  muteOverlay.append(muteButton);

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  // Assuming unmute icon is in the fifth cell of the first row
  const unmuteIconCell = block.children[0]?.children[4];
  if (unmuteIconCell) {
    unmuteButton.innerHTML = unmuteIconCell.innerHTML;
    moveInstrumentation(unmuteIconCell, unmuteButton);
  }
  muteOverlay.append(unmuteButton);

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  // Assuming no audio icon is in the sixth cell of the first row
  const noAudioIconCell = block.children[0]?.children[5];
  if (noAudioIconCell) {
    noAudioButton.innerHTML = noAudioIconCell.innerHTML;
    moveInstrumentation(noAudioIconCell, noAudioButton);
  }
  muteOverlay.append(noAudioButton);
  videoWrapper.append(muteOverlay);

  wrapper.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-cta';
  // Assuming CTA content is in the second row, first cell
  const ctaCell = block.children[1]?.children[0];
  if (ctaCell) {
    ctaDiv.innerHTML = ctaCell.innerHTML;
    moveInstrumentation(ctaCell, ctaDiv);
  }
  ctaWrapper.append(ctaDiv);
  wrapper.append(ctaWrapper);

  block.textContent = '';
  block.append(wrapper);
}
