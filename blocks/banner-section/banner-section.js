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
  video.setAttribute('playsinline', '');
  video.setAttribute('preload', 'metadata');
  video.setAttribute('fetchpriority', 'high');

  // Extract values from the first row (the only row for this block type)
  const row = block.children[0];
  if (row) {
    moveInstrumentation(row, video);
    const cells = row.children;
    const videoSrcCell = cells[0]; // Assuming video source is in the first cell
    const videoTitleCell = cells[1]; // Assuming video title is in the second cell
    const autoplayCell = cells[2]; // Assuming autoplay is in the third cell
    const loopCell = cells[3]; // Assuming loop is in the fourth cell
    const mutedCell = cells[4]; // Assuming muted is in the fifth cell
    const playsInlineCell = cells[5]; // Assuming playsInline is in the sixth cell

    if (videoSrcCell) {
      const source = document.createElement('source');
      const videoLink = videoSrcCell.querySelector('a');
      if (videoLink) {
        source.src = videoLink.href;
      } else {
        source.src = videoSrcCell.textContent.trim();
      }
      source.type = 'video/mp4';
      video.append(source);
    }

    if (videoTitleCell) {
      video.setAttribute('title', videoTitleCell.textContent.trim());
      video.setAttribute('aria-label', videoTitleCell.textContent.trim());
    }

    if (autoplayCell && autoplayCell.textContent.trim().toLowerCase() === 'true') {
      video.setAttribute('autoplay', 'true');
      video.setAttribute('data-is-autoplay', 'true');
    }

    if (loopCell && loopCell.textContent.trim().toLowerCase() === 'true') {
      video.setAttribute('loop', 'true');
    } else {
      video.setAttribute('loop', 'false'); // Explicitly set to false if not true
    }

    if (mutedCell && mutedCell.textContent.trim().toLowerCase() === 'true') {
      video.setAttribute('muted', 'true');
    } else {
      video.setAttribute('muted', 'false'); // Explicitly set to false if not true
    }

    if (playsInlineCell && playsInlineCell.textContent.trim().toLowerCase() === 'true') {
      video.setAttribute('playsinline', '');
    }
  }

  videoWrapper.append(video);

  // Play/Pause controls
  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.className = 'banner-video-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-video-d-none banner-video-icon banner-icon-play banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  // Assuming the SVG content is provided as text in the cell, or we need to fetch it.
  // For now, let's assume it's directly within the cell or we'd fetch it.
  // If the SVG is in the block JSON, we'd extract it from the appropriate cell.
  // As per the example HTML, it's a path, so we'd need to load it or embed it.
  // For this exercise, we'll just put a placeholder.
  playButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773138350907.svg+xml" alt="Play">'; // Placeholder

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-video-d-block banner-video-icon banner-icon-pause banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  pauseButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773138350940.svg+xml" alt="Pause">'; // Placeholder

  playPauseWrapper.append(playButton, pauseButton);
  videoWrapper.append(playPauseWrapper);

  // Mute/Unmute controls
  const muteWrapper = document.createElement('div');
  muteWrapper.className = 'banner-video-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer banner-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-video-video-icon-volume banner-icon-mute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  muteButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773138350994.svg+xml" alt="Mute">'; // Placeholder

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-video-video-icon-volume banner-icon-unmute banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer banner-d-none';
  unmuteButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773138351066.svg+xml" alt="Unmute">'; // Placeholder

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-video-video-icon-volume banner-no-audio-icon banner-bg-transparent banner-d-flex banner-align-items-center banner-justify-content-center banner-cursor-pointer';
  noAudioButton.innerHTML = '<img src="/content/dam/aemigrate/uploaded-folder/image/1773138351139.svg+xml" alt="No Audio">'; // Placeholder

  muteWrapper.append(muteButton, unmuteButton, noAudioButton);
  videoWrapper.append(muteWrapper);

  wrapper.append(videoWrapper);

  // CTA section (assuming this is static or handled by another block)
  const ctaSection = document.createElement('div');
  ctaSection.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'banner-cta';
  // If the CTA content comes from a block child, it would be processed here.
  // For this example, assuming it's an empty container as per the HTML.
  ctaSection.append(ctaDiv);
  wrapper.append(ctaSection);

  block.textContent = '';
  block.append(wrapper);

  // Add event listeners for play/pause/mute functionality
  playButton.addEventListener('click', () => {
    video.play();
    playButton.classList.add('banner-video-d-none');
    pauseButton.classList.remove('banner-video-d-none');
    pauseButton.classList.add('banner-video-d-block');
  });

  pauseButton.addEventListener('click', () => {
    video.pause();
    pauseButton.classList.add('banner-video-d-none');
    playButton.classList.remove('banner-video-d-none');
    playButton.classList.add('banner-video-d-block');
  });

  muteButton.addEventListener('click', () => {
    video.muted = true;
    muteButton.classList.add('banner-d-none');
    unmuteButton.classList.add('banner-d-none');
    noAudioButton.classList.remove('banner-d-none');
  });

  unmuteButton.addEventListener('click', () => {
    video.muted = false;
    unmuteButton.classList.add('banner-d-none');
    muteButton.classList.remove('banner-d-none');
    noAudioButton.classList.add('banner-d-none');
  });

  noAudioButton.addEventListener('click', () => {
    video.muted = false;
    noAudioButton.classList.add('banner-d-none');
    muteButton.classList.remove('banner-d-none');
  });

  // Initial state based on video muted attribute
  if (video.muted) {
    muteButton.classList.add('banner-d-none');
    unmuteButton.classList.add('banner-d-none');
    noAudioButton.classList.remove('banner-d-none');
  } else {
    noAudioButton.classList.add('banner-d-none');
    muteButton.classList.remove('banner-d-none');
    unmuteButton.classList.add('banner-d-none');
  }

  // Update play/pause buttons based on video state
  video.addEventListener('play', () => {
    playButton.classList.add('banner-video-d-none');
    pauseButton.classList.remove('banner-video-d-none');
    pauseButton.classList.add('banner-video-d-block');
  });

  video.addEventListener('pause', () => {
    pauseButton.classList.add('banner-video-d-none');
    playButton.classList.remove('banner-video-d-none');
    playButton.classList.add('banner-video-d-block');
  });

  // Initial play/pause state
  if (video.autoplay) {
    playButton.classList.add('banner-video-d-none');
    pauseButton.classList.remove('banner-video-d-none');
    pauseButton.classList.add('banner-video-d-block');
  } else {
    pauseButton.classList.add('banner-video-d-none');
    playButton.classList.remove('banner-video-d-none');
    playButton.classList.add('banner-video-d-block');
  }
}
