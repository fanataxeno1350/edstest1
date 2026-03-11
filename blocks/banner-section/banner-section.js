import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'banner-section__wrapper banner-position-relative banner-boing';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const videoElement = document.createElement('video');
  videoElement.className = 'banner-video banner-w-100 banner-object-fit-cover banner-media';
  videoElement.title = 'Video';
  videoElement.ariaLabel = 'Video';
  videoElement.playsInline = true;
  videoElement.preload = 'metadata';
  videoElement.fetchPriority = 'high';
  videoElement.loop = false;
  videoElement.muted = true;
  videoElement.autoplay = true;

  const videoSource = document.createElement('source');
  const authoredVideo = block.querySelector('[data-aue-prop="video"]');
  if (authoredVideo) {
    videoSource.src = authoredVideo.src;
    videoSource.type = authoredVideo.type || 'video/mp4';
    moveInstrumentation(authoredVideo, videoSource);
  } else {
    // Fallback: search for an <a> tag with a video href
    const videoLink = block.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]');
    if (videoLink) {
      videoSource.src = videoLink.href;
      videoSource.type = `video/${videoLink.href.split('.').pop()}`;
      moveInstrumentation(videoLink, videoSource);
    }
  }
  videoElement.append(videoSource);
  videoWrapper.append(videoElement);

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.className = 'banner-video-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-video-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  const authoredPlayIcon = block.querySelector('[data-aue-prop="playIcon"]');
  if (authoredPlayIcon) {
    playButton.innerHTML = authoredPlayIcon.innerHTML;
    moveInstrumentation(authoredPlayIcon, playButton);
  } else {
    playButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773138350907.svg+xml'; // Fallback content
  }
  playPauseWrapper.append(playButton);

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-video-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  const authoredPauseIcon = block.querySelector('[data-aue-prop="pauseIcon"]');
  if (authoredPauseIcon) {
    pauseButton.innerHTML = authoredPauseIcon.innerHTML;
    moveInstrumentation(authoredPauseIcon, pauseButton);
  } else {
    pauseButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773138350940.svg+xml'; // Fallback content
  }
  playPauseWrapper.append(pauseButton);
  videoWrapper.append(playPauseWrapper);

  const muteUnmuteWrapper = document.createElement('div');
  muteUnmuteWrapper.className = 'banner-video-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  const authoredMuteIcon = block.querySelector('[data-aue-prop="muteIcon"]');
  if (authoredMuteIcon) {
    muteButton.innerHTML = authoredMuteIcon.innerHTML;
    moveInstrumentation(authoredMuteIcon, muteButton);
  } else {
    muteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773138350994.svg+xml'; // Fallback content
  }
  muteUnmuteWrapper.append(muteButton);

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  const authoredUnmuteIcon = block.querySelector('[data-aue-prop="unmuteIcon"]');
  if (authoredUnmuteIcon) {
    unmuteButton.innerHTML = authoredUnmuteIcon.innerHTML;
    moveInstrumentation(authoredUnmuteIcon, unmuteButton);
  } else {
    unmuteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773138351066.svg+xml'; // Fallback content
  }
  muteUnmuteWrapper.append(unmuteButton);

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  const authoredNoAudioIcon = block.querySelector('[data-aue-prop="noAudioIcon"]');
  if (authoredNoAudioIcon) {
    noAudioButton.innerHTML = authoredNoAudioIcon.innerHTML;
    moveInstrumentation(authoredNoAudioIcon, noAudioButton);
  } else {
    noAudioButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1773138351139.svg+xml'; // Fallback content
  }
  muteUnmuteWrapper.append(noAudioButton);
  videoWrapper.append(muteUnmuteWrapper);

  wrapper.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';

  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-cta';

  // Move any remaining content from the block into the CTA div
  // This assumes any content not explicitly mapped above should go here.
  // If there's specific authored content for CTA, it should be extracted using data-aue-prop
  Array.from(block.children).forEach((child) => {
    if (!child.hasAttribute('data-aue-prop') && !child.hasAttribute('data-aue-model')) {
      ctaDiv.append(child);
      moveInstrumentation(child, ctaDiv);
    }
  });

  ctaWrapper.append(ctaDiv);
  wrapper.append(ctaWrapper);

  block.textContent = '';
  block.append(wrapper);
  block.className = `banner-section block`;
  block.dataset.blockStatus = 'loaded';
}
