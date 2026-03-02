import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'banner-banner-section';

  const wrapper = document.createElement('div');
  wrapper.className = 'banner-position-relative banner-boing banner-section__wrapper';
  moveInstrumentation(block.firstElementChild, wrapper);

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const video = document.createElement('video');
  video.className = 'banner-w-100 banner-object-fit-cover banner-media banner-video';
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
  // Assuming the videoSrc is in the first cell of the first row
  const videoSrcCell = block.children[0]?.children[0];
  if (videoSrcCell) {
    const videoLink = videoSrcCell.querySelector('a');
    if (videoLink) {
      source.src = videoLink.href;
      source.type = 'video/mp4';
      moveInstrumentation(videoLink, source);
    }
  }
  video.append(source);
  videoWrapper.append(video);

  const controlsOverlay = document.createElement('div');
  controlsOverlay.className = 'banner-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  // Assuming iconPlay is in the second cell of the first row
  const iconPlayCell = block.children[0]?.children[1];
  if (iconPlayCell) {
    const playIconLink = iconPlayCell.querySelector('a');
    if (playIconLink) {
      playButton.textContent = playIconLink.href;
      moveInstrumentation(playIconLink, playButton);
    }
  }
  controlsOverlay.append(playButton);

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  // Assuming iconPause is in the third cell of the first row
  const iconPauseCell = block.children[0]?.children[2];
  if (iconPauseCell) {
    const pauseIconLink = iconPauseCell.querySelector('a');
    if (pauseIconLink) {
      pauseButton.textContent = pauseIconLink.href;
      moveInstrumentation(pauseIconLink, pauseButton);
    }
  }
  controlsOverlay.append(pauseButton);
  videoWrapper.append(controlsOverlay);

  const muteOverlay = document.createElement('div');
  muteOverlay.className = 'banner-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  // Assuming iconMute is in the fourth cell of the first row
  const iconMuteCell = block.children[0]?.children[3];
  if (iconMuteCell) {
    const muteIconLink = iconMuteCell.querySelector('a');
    if (muteIconLink) {
      muteButton.textContent = muteIconLink.href;
      moveInstrumentation(muteIconLink, muteButton);
    }
  }
  muteOverlay.append(muteButton);

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  // Assuming iconUnmute is in the fifth cell of the first row
  const iconUnmuteCell = block.children[0]?.children[4];
  if (iconUnmuteCell) {
    const unmuteIconLink = unmuteIconCell.querySelector('a');
    if (unmuteIconLink) {
      unmuteButton.textContent = unmuteIconLink.href;
      moveInstrumentation(unmuteIconLink, unmuteButton);
    }
  }
  muteOverlay.append(unmuteButton);

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  // Assuming iconNoAudio is in the sixth cell of the first row
  const iconNoAudioCell = block.children[0]?.children[5];
  if (iconNoAudioCell) {
    const noAudioIconLink = iconNoAudioCell.querySelector('a');
    if (noAudioIconLink) {
      noAudioButton.textContent = noAudioIconLink.href;
      moveInstrumentation(noAudioIconLink, noAudioButton);
    }
  }
  muteOverlay.append(noAudioButton);
  videoWrapper.append(muteOverlay);

  wrapper.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100 banner-boing__banner--cta';
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-cta';
  // Assuming CTA content might be in a separate row or cell, for now, it's empty as per HTML
  // If there was a cell for CTA, you would extract and append it here.
  ctaWrapper.append(ctaDiv);
  wrapper.append(ctaWrapper);

  section.append(wrapper);

  block.textContent = '';
  block.append(section);
}
