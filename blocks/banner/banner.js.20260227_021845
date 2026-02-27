import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-banner-section');
  moveInstrumentation(block.firstElementChild, bannerSection);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('banner-position-relative', 'banner-boing', 'banner-banner-section__wrapper');
  bannerSection.append(wrapperDiv);

  // Assuming there's only one row in the block for the video
  const row = block.children[0];
  if (row) {
    const cell = row.children[0]; // Assuming video is in the first cell
    if (cell) {
      const videoLink = cell.querySelector('a'); // Assuming video source is an <a> tag
      if (videoLink && videoLink.href) {
        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('banner-video-wrapper');
        wrapperDiv.append(videoWrapper);

        const videoElement = document.createElement('video');
        videoElement.classList.add('banner-w-100', 'banner-object-fit-cover', 'banner-banner-media', 'banner-banner-video');
        videoElement.setAttribute('title', 'Video');
        videoElement.setAttribute('aria-label', 'Video');
        videoElement.setAttribute('data-is-autoplay', 'true');
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('preload', 'metadata');
        videoElement.setAttribute('fetchpriority', 'high');
        videoElement.setAttribute('loop', 'false');
        videoElement.setAttribute('muted', 'true');
        videoElement.setAttribute('autoplay', 'true');

        const sourceElement = document.createElement('source');
        sourceElement.setAttribute('src', videoLink.href);
        sourceElement.setAttribute('type', 'video/mp4');
        videoElement.append(sourceElement);
        videoWrapper.append(videoElement);

        // Add play/pause controls
        const playPauseDiv = document.createElement('div');
        playPauseDiv.classList.add('banner-position-absolute', 'banner-w-100', 'banner-h-100', 'banner-start-0', 'banner-top-0', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer');
        videoWrapper.append(playPauseDiv);

        const playButton = document.createElement('button');
        playButton.setAttribute('type', 'button');
        playButton.classList.add('banner-d-none', 'banner-video-icon', 'banner-icon-play', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
        // Assuming SVG content might be directly in the cell or a sibling. For now, just placeholder.
        // If SVG is an <img> or <a>, it needs to be extracted.
        playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772184457720.svg+xml'; // Placeholder
        playPauseDiv.append(playButton);

        const pauseButton = document.createElement('button');
        pauseButton.setAttribute('type', 'button');
        pauseButton.classList.add('banner-d-block', 'banner-video-icon', 'banner-icon-pause', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
        pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772184457753.svg+xml'; // Placeholder
        playPauseDiv.append(pauseButton);

        // Add mute/unmute controls
        const muteIconDiv = document.createElement('div');
        muteIconDiv.classList.add('banner-position-absolute', 'banner-z-2', 'banner-d-flex', 'banner-justify-content-center', 'banner-align-items-center', 'banner-cursor-pointer', 'banner-mute-icon');
        videoWrapper.append(muteIconDiv);

        const muteButton = document.createElement('button');
        muteButton.setAttribute('type', 'button');
        muteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
        muteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772184457787.svg+xml'; // Placeholder
        muteIconDiv.append(muteButton);

        const unmuteButton = document.createElement('button');
        unmuteButton.setAttribute('type', 'button');
        unmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
        unmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772184457865.svg+xml'; // Placeholder
        muteIconDiv.append(unmuteButton);

        const noAudioButton = document.createElement('button');
        noAudioButton.setAttribute('type', 'button');
        noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
        noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772184457897.svg+xml'; // Placeholder
        muteIconDiv.append(noAudioButton);
      }
    }
  }

  // Add the CTA div (assuming it's a fixed part of the banner structure)
  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100', 'banner-boing__banner-banner--cta');
  const innerCtaDiv = document.createElement('div');
  innerCtaDiv.classList.add('banner-banner-cta');
  ctaDiv.append(innerCtaDiv);
  wrapperDiv.append(ctaDiv);

  block.textContent = '';
  block.append(bannerSection);

  // Add event listeners for video controls
  const video = block.querySelector('.banner-banner-video');
  const playButton = block.querySelector('.banner-icon-play');
  const pauseButton = block.querySelector('.banner-icon-pause');
  const muteButton = block.querySelector('.banner-icon-mute');
  const unmuteButton = block.querySelector('.banner-icon-unmute');
  const noAudioButton = block.querySelector('.banner-no-audio-icon');

  if (video) {
    if (playButton) {
      playButton.addEventListener('click', () => {
        video.play();
        playButton.classList.add('banner-d-none');
        pauseButton.classList.remove('banner-d-none');
      });
    }

    if (pauseButton) {
      pauseButton.addEventListener('click', () => {
        video.pause();
        pauseButton.classList.add('banner-d-none');
        playButton.classList.remove('banner-d-none');
      });
    }

    if (muteButton) {
      muteButton.addEventListener('click', () => {
        video.muted = true;
        muteButton.classList.add('banner-d-none');
        unmuteButton.classList.add('banner-d-none');
        noAudioButton.classList.remove('banner-d-none');
      });
    }

    if (unmuteButton) {
      unmuteButton.addEventListener('click', () => {
        video.muted = false;
        unmuteButton.classList.add('banner-d-none');
        muteButton.classList.remove('banner-d-none');
        noAudioButton.classList.add('banner-d-none');
      });
    }

    if (noAudioButton) {
      noAudioButton.addEventListener('click', () => {
        video.muted = false;
        noAudioButton.classList.add('banner-d-none');
        muteButton.classList.remove('banner-d-none');
      });
    }

    // Initial state based on video muted attribute
    if (video.muted) {
      if (noAudioButton) noAudioButton.classList.remove('banner-d-none');
      if (muteButton) muteButton.classList.add('banner-d-none');
      if (unmuteButton) unmuteButton.classList.add('banner-d-none');
    } else {
      if (noAudioButton) noAudioButton.classList.add('banner-d-none');
      if (muteButton) muteButton.classList.remove('banner-d-none');
      if (unmuteButton) unmuteButton.classList.add('banner-d-none');
    }

    // Initial state for play/pause
    if (video.autoplay) {
      if (playButton) playButton.classList.add('banner-d-none');
      if (pauseButton) pauseButton.classList.remove('banner-d-none');
    } else {
      if (playButton) playButton.classList.remove('banner-d-none');
      if (pauseButton) pauseButton.classList.add('banner-d-none');
    }
  }
}
