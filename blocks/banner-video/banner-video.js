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

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.className = 'banner-video-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-video-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-video-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';

  const muteUnmuteWrapper = document.createElement('div');
  muteUnmuteWrapper.className = 'banner-video-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';

  const cta = document.createElement('div');
  cta.className = 'banner-cta';

  // Extract content from block children (CMS rows)
  [...block.children].forEach((row, rowIndex) => {
    moveInstrumentation(row, wrapper); // Transfer instrumentation to the main wrapper

    [...row.children].forEach((cell, cellIndex) => {
      // Assuming the first row contains video source and icons
      if (rowIndex === 0) {
        if (cellIndex === 0) {
          // Video Source
          const videoLink = cell.querySelector('a');
          if (videoLink) {
            source.src = videoLink.href;
            moveInstrumentation(videoLink, source);
          }
        } else if (cellIndex === 1) {
          // Play Icon
          const playIconLink = cell.querySelector('a');
          if (playIconLink) {
            playButton.textContent = playIconLink.href;
            moveInstrumentation(playIconLink, playButton);
          }
        } else if (cellIndex === 2) {
          // Pause Icon
          const pauseIconLink = cell.querySelector('a');
          if (pauseIconLink) {
            pauseButton.textContent = pauseIconLink.href;
            moveInstrumentation(pauseIconLink, pauseButton);
          }
        } else if (cellIndex === 3) {
          // Mute Icon
          const muteIconLink = cell.querySelector('a');
          if (muteIconLink) {
            muteButton.textContent = muteIconLink.href;
            moveInstrumentation(muteIconLink, muteButton);
          }
        } else if (cellIndex === 4) {
          // Unmute Icon
          const unmuteIconLink = cell.querySelector('a');
          if (unmuteIconLink) {
            unmuteButton.textContent = unmuteIconLink.href;
            moveInstrumentation(unmuteIconLink, unmuteButton);
          }
        } else if (cellIndex === 5) {
          // No Audio Icon
          const noAudioIconLink = cell.querySelector('a');
          if (noAudioIconLink) {
            noAudioButton.textContent = noAudioIconLink.href;
            moveInstrumentation(noAudioIconLink, noAudioButton);
          }
        }
      }
      // Assuming the second row contains the CTA content
      if (rowIndex === 1) {
        // Transfer all content from the cell to the CTA div
        while (cell.firstChild) {
          cta.append(cell.firstChild);
        }
        moveInstrumentation(cell, cta);
      }
    });
  });

  // Build the DOM structure
  video.append(source);
  videoWrapper.append(video);

  playPauseWrapper.append(playButton);
  playPauseWrapper.append(pauseButton);
  videoWrapper.append(playPauseWrapper);

  muteUnmuteWrapper.append(muteButton);
  muteUnmuteWrapper.append(unmuteButton);
  muteUnmuteWrapper.append(noAudioButton);
  videoWrapper.append(muteUnmuteWrapper);

  wrapper.append(videoWrapper);

  ctaWrapper.append(cta);
  wrapper.append(ctaWrapper);

  block.textContent = '';
  block.append(wrapper);
}