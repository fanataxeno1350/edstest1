import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mediaCmpMedia = document.createElement('div');
  mediaCmpMedia.classList.add('media-cmp-media');

  const mediaViewportVideo = document.createElement('div');
  mediaViewportVideo.classList.add('media-viewport-video');
  mediaViewportVideo.setAttribute('hidden', '');
  mediaViewportVideo.setAttribute('aria-hidden', 'true');
  mediaCmpMedia.append(mediaViewportVideo);

  const mediaCmpMediaBackground = document.createElement('div');
  mediaCmpMediaBackground.classList.add('media-cmp-media__background');
  mediaCmpMedia.append(mediaCmpMediaBackground);

  const mediaCmpMediaWrapper = document.createElement('div');
  mediaCmpMediaWrapper.classList.add('media-cmp-media__wrapper', 'media-cmp-media__wrapper--no-title');
  mediaCmpMedia.append(mediaCmpMediaWrapper);

  const mediaCmpMediaHeader = document.createElement('div');
  mediaCmpMediaHeader.classList.add('media-cmp-media__header');
  mediaCmpMediaWrapper.append(mediaCmpMediaHeader);

  const mediaCmpMediaHeading = document.createElement('div');
  mediaCmpMediaHeading.classList.add('media-cmp-media__heading');
  mediaCmpMediaHeader.append(mediaCmpMediaHeading);

  const mediaCmpMediaTitle = document.createElement('div');
  mediaCmpMediaTitle.classList.add('media-cmp-media__title');
  mediaCmpMediaHeading.append(mediaCmpMediaTitle);

  const mediaVideo = document.createElement('div');
  mediaVideo.classList.add('media-video');
  mediaCmpMediaWrapper.append(mediaVideo);

  const mediaVideoPoster = document.createElement('div');
  mediaVideoPoster.classList.add('media-video-poster');
  mediaVideo.append(mediaVideoPoster);

  const playButton = document.createElement('button');
  playButton.classList.add('media-video-poster__play-button');
  mediaVideoPoster.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.classList.add('media-qd-icon', 'media-qd-icon--play', 'media-video-poster__play-button__icon');
  playButton.append(playIcon);

  const playText = document.createElement('span');
  playText.classList.add('media-video-poster__play-button__text');
  playText.setAttribute('visually-hidden', '');
  playText.textContent = 'Watch Video';
  playButton.append(playText);

  const posterVideo = document.createElement('video');
  posterVideo.classList.add('media-video-poster__video');
  posterVideo.setAttribute('muted', '');
  posterVideo.setAttribute('loop', '');
  posterVideo.setAttribute('playsinline', '');
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.setAttribute('autoplay', '');

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('media-video-container', 'media-show-controls', 'media-video-hide');
  mediaVideo.append(videoContainer);

  const viewportVideoContainer = document.createElement('div');
  viewportVideoContainer.classList.add('media-viewport-video');
  viewportVideoContainer.setAttribute('hidden', '');
  viewportVideoContainer.setAttribute('aria-hidden', 'true');
  videoContainer.append(viewportVideoContainer);

  const controls = document.createElement('div');
  controls.classList.add('media-video-container__controls');
  videoContainer.append(controls);

  const timer = document.createElement('div');
  timer.classList.add('media-video-container__controls__timer');
  controls.append(timer);

  const progressArea = document.createElement('div');
  progressArea.classList.add('media-video-container__controls__timer__progress-area');
  timer.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.classList.add('media-video-container__controls__timer__progress-area__progress-bar');
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.classList.add('media-video-container__controls__timer__progress-area__pointer');
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.classList.add('media-video-container__controls__timer__progress-area__progress-pending');
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.classList.add('media-video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';
  timer.append(currentTime);

  const duration = document.createElement('p');
  duration.classList.add('media-video-container__controls__timer__duration');
  duration.textContent = '00:00';
  timer.append(duration);

  const buttons = document.createElement('div');
  buttons.classList.add('media-video-container__controls__buttons');
  controls.append(buttons);

  const playButtonControls = document.createElement('button');
  playButtonControls.classList.add('media-video-container__controls__buttons__play-button', 'media-video-container__controls__buttons--button');
  buttons.append(playButtonControls);

  const playIconControls = document.createElement('span');
  playIconControls.classList.add('media-video-container__controls__buttons__icon', 'media-qd-icon', 'media-qd-icon--play');
  playButtonControls.append(playIconControls);

  const muteButton = document.createElement('button');
  muteButton.classList.add('media-video-container__controls__buttons__mute-button', 'media-video-container__controls__buttons--button');
  buttons.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.classList.add('media-video-container__controls__buttons__icon', 'media-qd-icon', 'media-qd-icon--volume');
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('media-video-container__controls__buttons__fullscreen-button', 'media-video-container__controls__buttons--button');
  buttons.append(fullscreenButton);

  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.classList.add('media-video-container__controls__buttons__icon', 'media-qd-icon', 'media-qd-icon--fullscreen');
  fullscreenButton.append(fullscreenIcon);

  const mainVideo = document.createElement('video');
  mainVideo.classList.add('media-video-container__video');
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('x-webkit-airplay', 'allow');
  videoContainer.append(mainVideo);

  [...block.children].forEach((row) => {
    moveInstrumentation(row, mediaCmpMedia);
    [...row.children].forEach((cell) => {
      const poster = cell.querySelector('a[href$="mp4"], a[href$="mpegurl"]');
      const videoSrc = cell.querySelector('a[href$="mp4"], a[href$="mpegurl"]');

      if (poster) {
        posterVideo.setAttribute('poster', poster.href);
        posterVideo.setAttribute('src', poster.href);
        mediaVideoPoster.append(posterVideo);
      }

      if (videoSrc) {
        mainVideo.setAttribute('data-video-src', videoSrc.href);
        mainVideo.setAttribute('src', videoSrc.href);
      }
    });
  });

  block.textContent = '';
  block.append(mediaCmpMedia);
}
