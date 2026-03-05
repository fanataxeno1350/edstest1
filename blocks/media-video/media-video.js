import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mediaCmpMedia = document.createElement('div');
  mediaCmpMedia.className = 'media-cmp-media';
  moveInstrumentation(block, mediaCmpMedia);

  const mediaViewportVideoHidden = document.createElement('div');
  mediaViewportVideoHidden.className = 'media-viewport-video';
  mediaViewportVideoHidden.setAttribute('hidden', '');
  mediaViewportVideoHidden.setAttribute('aria-hidden', 'true');
  mediaCmpMedia.append(mediaViewportVideoHidden);

  const mediaCmpMediaBackground = document.createElement('div');
  mediaCmpMediaBackground.className = 'media-cmp-media__background';
  mediaCmpMedia.append(mediaCmpMediaBackground);

  const mediaCmpMediaWrapper = document.createElement('div');
  mediaCmpMediaWrapper.className = 'media-cmp-media__wrapper media-cmp-media__wrapper--no-title';
  mediaCmpMedia.append(mediaCmpMediaWrapper);

  const mediaCmpMediaHeader = document.createElement('div');
  mediaCmpMediaHeader.className = 'media-cmp-media__header';
  mediaCmpMediaWrapper.append(mediaCmpMediaHeader);

  const mediaCmpMediaHeading = document.createElement('div');
  mediaCmpMediaHeading.className = 'media-cmp-media__heading';
  mediaCmpMediaHeader.append(mediaCmpMediaHeading);

  const mediaCmpMediaTitle = document.createElement('div');
  mediaCmpMediaTitle.className = 'media-cmp-media__title';
  mediaCmpMediaHeading.append(mediaCmpMediaTitle);

  const mediaVideo = document.createElement('div');
  mediaVideo.className = 'media-video media-apps.qiddiya__002d__commons.components.content.commons.video__002d__v1.v1.video__002d__v1.video__002d__v1__002e__html@238fd174';
  mediaCmpMediaWrapper.append(mediaVideo);

  const mediaVideoPoster = document.createElement('div');
  mediaVideoPoster.className = 'media-video-poster';
  mediaVideo.append(mediaVideoPoster);

  const playButton = document.createElement('button');
  playButton.className = 'media-video-poster__play-button';
  mediaVideoPoster.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.className = 'media-qd-icon media-qd-icon--play media-video-poster__play-button__icon';
  playButton.append(playIcon);

  const playText = document.createElement('span');
  playText.className = 'media-video-poster__play-button__text';
  playText.setAttribute('visually-hidden', '');
  playText.textContent = ' Watch Video ';
  playButton.append(playText);

  const posterVideo = document.createElement('video');
  posterVideo.className = 'media-video-poster__video';
  posterVideo.setAttribute('muted', '');
  posterVideo.setAttribute('loop', '');
  posterVideo.setAttribute('playsinline', '');
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.setAttribute('autoplay', '');

  // Extract poster and src from the block's children
  let posterSrc = '';
  let videoSrc = '';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const posterCell = cells[0];
      const srcCell = cells[1];

      const posterLink = posterCell.querySelector('a');
      if (posterLink) {
        posterSrc = posterLink.href;
      } else {
        posterSrc = posterCell.textContent.trim();
      }

      const srcLink = srcCell.querySelector('a');
      if (srcLink) {
        videoSrc = srcLink.href;
      } else {
        videoSrc = srcCell.textContent.trim();
      }
    }
  });

  if (posterSrc) {
    posterVideo.setAttribute('poster', posterSrc);
    posterVideo.setAttribute('src', posterSrc);
  }
  mediaVideoPoster.append(posterVideo);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'media-video-container media-show-controls media-video-hide';
  mediaVideo.append(videoContainer);

  const viewportVideoHidden = document.createElement('div');
  viewportVideoHidden.className = 'media-viewport-video';
  viewportVideoHidden.setAttribute('hidden', '');
  viewportVideoHidden.setAttribute('aria-hidden', 'true');
  videoContainer.append(viewportVideoHidden);

  const controls = document.createElement('div');
  controls.className = 'media-video-container__controls';
  videoContainer.append(controls);

  const timer = document.createElement('div');
  timer.className = 'media-video-container__controls__timer';
  controls.append(timer);

  const progressArea = document.createElement('div');
  progressArea.className = 'media-video-container__controls__timer__progress-area';
  timer.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.className = 'media-video-container__controls__timer__progress-area__progress-bar';
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.className = 'media-video-container__controls__timer__progress-area__pointer';
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.className = 'media-container__controls__timer__progress-area__progress-pending';
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.className = 'media-video-container__controls__timer__current-time';
  currentTime.textContent = '00:00';
  timer.append(currentTime);

  const duration = document.createElement('p');
  duration.className = 'media-video-container__controls__timer__duration';
  duration.textContent = '00:00';
  timer.append(duration);

  const buttons = document.createElement('div');
  buttons.className = 'media-video-container__controls__buttons';
  controls.append(buttons);

  const playButtonControls = document.createElement('button');
  playButtonControls.className = 'media-video-container__controls__buttons__play-button media-video-container__controls__buttons--button';
  buttons.append(playButtonControls);

  const playIconControls = document.createElement('span');
  playIconControls.className = 'media-video-container__controls__buttons__icon media-qd-icon media-qd-icon--play';
  playButtonControls.append(playIconControls);

  const muteButton = document.createElement('button');
  muteButton.className = 'media-video-container__controls__buttons__mute-button media-video-container__controls__buttons--button';
  buttons.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.className = 'media-video-container__controls__buttons__icon media-qd-icon media-qd-icon--volume';
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'media-video-container__controls__buttons__fullscreen-button media-video-container__controls__buttons--button';
  buttons.append(fullscreenButton);

  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'media-video-container__controls__buttons__icon media-qd-icon media-qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);

  const mainVideo = document.createElement('video');
  mainVideo.className = 'media-video-container__video';
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('x-webkit-airplay', 'allow');
  if (videoSrc) {
    mainVideo.setAttribute('data-video-src', videoSrc);
    mainVideo.setAttribute('src', videoSrc);
  }
  videoContainer.append(mainVideo);

  block.textContent = '';
  block.append(mediaCmpMedia);
}
