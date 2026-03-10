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
  video.setAttribute('data-is-autoplay', 'true');
  video.playsInline = true;
  video.preload = 'metadata';
  video.fetchPriority = 'high';
  video.loop = false;
  video.muted = true;
  video.autoplay = true;

  const source = document.createElement('source');
  source.type = 'video/mp4';
  video.append(source);
  videoWrapper.append(video);

  const videoControlsWrapper = document.createElement('div');
  videoControlsWrapper.className = 'banner-video-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-video-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  videoControlsWrapper.append(playButton);

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-video-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  videoControlsWrapper.append(pauseButton);
  videoWrapper.append(videoControlsWrapper);

  const muteControlsWrapper = document.createElement('div');
  muteControlsWrapper.className = 'banner-video-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  muteControlsWrapper.append(muteButton);

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  muteControlsWrapper.append(unmuteButton);

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  muteControlsWrapper.append(noAudioButton);
  videoWrapper.append(muteControlsWrapper);

  wrapper.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-cta';
  ctaWrapper.append(ctaDiv);
  wrapper.append(ctaWrapper);

  // Assuming the block children are in order: videoSrc, playIcon, pauseIcon, muteIcon, unmuteIcon, noAudioIcon
  [...block.children].forEach((row, index) => {
    moveInstrumentation(row, wrapper); // Transfer instrumentation to the main wrapper
    const cell = row.children[0]; // Each row should have one cell with the content

    if (index === 0) {
      // videoSrc
      const videoLink = cell.querySelector('a');
      if (videoLink) {
        source.src = videoLink.href;
        moveInstrumentation(videoLink, source);
      }
    } else if (index === 1) {
      // playIcon
      const playIconLink = cell.querySelector('a');
      if (playIconLink) {
        playButton.innerHTML = `<img src="${playIconLink.href}" alt="Play Icon">`;
        moveInstrumentation(playIconLink, playButton.querySelector('img'));
      }
    } else if (index === 2) {
      // pauseIcon
      const pauseIconLink = cell.querySelector('a');
      if (pauseIconLink) {
        pauseButton.innerHTML = `<img src="${pauseIconLink.href}" alt="Pause Icon">`;
        moveInstrumentation(pauseIconLink, pauseButton.querySelector('img'));
      }
    } else if (index === 3) {
      // muteIcon
      const muteIconLink = cell.querySelector('a');
      if (muteIconLink) {
        muteButton.innerHTML = `<img src="${muteIconLink.href}" alt="Mute Icon">`;
        moveInstrumentation(muteIconLink, muteButton.querySelector('img'));
      }
    } else if (index === 4) {
      // unmuteIcon
      const unmuteIconLink = cell.querySelector('a');
      if (unmuteIconLink) {
        unmuteButton.innerHTML = `<img src="${unmuteIconLink.href}" alt="Unmute Icon">`;
        moveInstrumentation(unmuteIconLink, unmuteButton.querySelector('img'));
      }
    } else if (index === 5) {
      // noAudioIcon
      const noAudioIconLink = cell.querySelector('a');
      if (noAudioIconLink) {
        noAudioButton.innerHTML = `<img src="${noAudioIconLink.href}" alt="No Audio Icon">`;
        moveInstrumentation(noAudioIconLink, noAudioButton.querySelector('img'));
      }
    }
  });

  block.textContent = '';
  block.append(wrapper);
}