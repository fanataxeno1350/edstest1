import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerWrapper = document.createElement('div');
  bannerWrapper.className = 'position-relative boing banner-section__wrapper';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const videoElement = document.createElement('video');
  videoElement.className = 'w-100 object-fit-cover banner-section-media banner-section-video';
  videoElement.title = 'Video';
  videoElement.ariaLabel = 'Video';
  videoElement.setAttribute('data-is-autoplay', 'true');
  videoElement.playsInline = true;
  videoElement.preload = 'metadata';
  videoElement.fetchPriority = 'high';
  videoElement.loop = false;
  videoElement.muted = true;
  videoElement.autoplay = true;

  const videoSource = document.createElement('source');
  const videoLink = block.querySelector('[data-aue-prop="video"]');
  if (videoLink) {
    videoSource.src = videoLink.textContent.trim();
    videoSource.type = 'video/mp4';
    videoElement.append(videoSource);
    moveInstrumentation(videoLink, videoElement);
  }

  const playPauseWrapper = document.createElement('div');
  playPauseWrapper.className = 'position-absolute w-100 h-100 start-0 top-0 d-flex justify-content-center align-items-center cursor-pointer';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'd-none banner-section-video-icon icon-play bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
  const iconPlay = block.querySelector('[data-aue-prop="iconPlay"]');
  if (iconPlay) {
    playButton.innerHTML = iconPlay.innerHTML;
    moveInstrumentation(iconPlay, playButton);
  }

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'd-block banner-section-video-icon icon-pause bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
  const iconPause = block.querySelector('[data-aue-prop="iconPause"]');
  if (iconPause) {
    pauseButton.innerHTML = iconPause.innerHTML;
    moveInstrumentation(iconPause, pauseButton);
  }

  playPauseWrapper.append(playButton, pauseButton);

  const muteUnmuteWrapper = document.createElement('div');
  muteUnmuteWrapper.className = 'position-absolute z-2 d-flex justify-content-center align-items-center cursor-pointer banner-section-mute-icon';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-section-video-icon-volume icon-mute bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
  const iconMute = block.querySelector('[data-aue-prop="iconMute"]');
  if (iconMute) {
    muteButton.innerHTML = iconMute.innerHTML;
    moveInstrumentation(iconMute, muteButton);
  }

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-section-video-icon-volume icon-unmute bg-transparent d-flex align-items-center justify-content-center cursor-pointer d-none';
  const iconUnmute = block.querySelector('[data-aue-prop="iconUnmute"]');
  if (iconUnmute) {
    unmuteButton.innerHTML = iconUnmute.innerHTML;
    moveInstrumentation(iconUnmute, unmuteButton);
  }

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-section-video-icon-volume no-audio-icon bg-transparent d-flex align-items-center justify-content-center cursor-pointer';
  const iconNoAudio = block.querySelector('[data-aue-prop="iconNoAudio"]');
  if (iconNoAudio) {
    noAudioButton.innerHTML = iconNoAudio.innerHTML;
    moveInstrumentation(iconNoAudio, noAudioButton);
  }

  muteUnmuteWrapper.append(muteButton, unmuteButton, noAudioButton);

  videoWrapper.append(videoElement, playPauseWrapper, muteUnmuteWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'position-absolute start-50 translate-middle-x w-100 boing__banner--cta';

  const bannerCta = document.createElement('div');
  bannerCta.className = 'banner-cta';
  // Assuming the CTA content is already within a div.banner-cta in the authored HTML
  const authoredCta = block.querySelector('.banner-cta');
  if (authoredCta) {
    // Move all children from the authored .banner-cta to the new one
    while (authoredCta.firstChild) {
      moveInstrumentation(authoredCta.firstChild, bannerCta);
      bannerCta.append(authoredCta.firstChild);
    }
  }
  ctaWrapper.append(bannerCta);

  bannerWrapper.append(videoWrapper, ctaWrapper);

  block.textContent = '';
  block.append(bannerWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';

  // Add event listeners for video controls
  const video = block.querySelector('.banner-section-video');
  const playBtn = block.querySelector('.icon-play');
  const pauseBtn = block.querySelector('.icon-pause');
  const muteBtn = block.querySelector('.icon-mute');
  const unmuteBtn = block.querySelector('.icon-unmute');
  const noAudioBtn = block.querySelector('.no-audio-icon');

  if (video && playBtn && pauseBtn && muteBtn && unmuteBtn && noAudioBtn) {
    playPauseWrapper.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playBtn.classList.add('d-none');
        pauseBtn.classList.remove('d-none');
      } else {
        video.pause();
        playBtn.classList.remove('d-none');
        pauseBtn.classList.add('d-none');
      }
    });

    muteUnmuteWrapper.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        muteBtn.classList.remove('d-none');
        unmuteBtn.classList.add('d-none');
        noAudioBtn.classList.add('d-none');
      } else {
        video.muted = true;
        muteBtn.classList.add('d-none');
        unmuteBtn.classList.add('d-none');
        noAudioBtn.classList.remove('d-none');
      }
    });

    video.addEventListener('play', () => {
      playBtn.classList.add('d-none');
      pauseBtn.classList.remove('d-none');
    });

    video.addEventListener('pause', () => {
      playBtn.classList.remove('d-none');
      pauseBtn.classList.add('d-none');
    });

    video.addEventListener('volumechange', () => {
      if (video.muted || video.volume === 0) {
        muteBtn.classList.add('d-none');
        unmuteBtn.classList.add('d-none');
        noAudioBtn.classList.remove('d-none');
      } else if (video.volume > 0) {
        muteBtn.classList.remove('d-none');
        unmuteBtn.classList.add('d-none');
        noAudioBtn.classList.add('d-none');
      }
    });

    // Initial state setup
    if (video.paused) {
      playBtn.classList.remove('d-none');
      pauseBtn.classList.add('d-none');
    } else {
      playBtn.classList.add('d-none');
      pauseBtn.classList.remove('d-none');
    }

    if (video.muted || video.volume === 0) {
      muteBtn.classList.add('d-none');
      unmuteBtn.classList.add('d-none');
      noAudioBtn.classList.remove('d-none');
    } else {
      muteBtn.classList.remove('d-none');
      unmuteBtn.classList.add('d-none');
      noAudioBtn.classList.add('d-none');
    }
  }
}
