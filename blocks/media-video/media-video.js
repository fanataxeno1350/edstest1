import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mediaInnerVideo = document.createElement('div');
  mediaInnerVideo.className = 'media-inner-video';
  moveInstrumentation(block, mediaInnerVideo);

  const mediaCmpMedia = document.createElement('div');
  mediaCmpMedia.className = 'media-cmp-media';
  mediaInnerVideo.append(mediaCmpMedia);

  const mediaViewportVideoHidden = document.createElement('div');
  mediaViewportVideoHidden.className = 'media-viewport-video';
  mediaViewportVideoHidden.hidden = true;
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
  mediaVideo.className = 'media-video media-apps.qiddiya__002d__commons.components.content.commons.video__002d__v1.v1.video__002d__v1.video__002d__v1__002e__html@109cb924';
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
  playText.textContent = 'Watch Video';
  playButton.append(playText);

  const posterVideo = document.createElement('video');
  posterVideo.className = 'media-video-poster__video';
  posterVideo.muted = true;
  posterVideo.loop = true;
  posterVideo.playsInline = true;
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.autoplay = true;

  // Extract poster and videoSrc from the block's children
  const rows = [...block.children];
  if (rows.length > 0) {
    const firstRowCells = [...rows[0].children];
    const posterCell = firstRowCells[0];
    const videoSrcCell = firstRowCells[1];

    const posterImage = posterCell?.querySelector('img');
    const videoLink = videoSrcCell?.querySelector('a');

    if (posterImage) {
      const optimizedPoster = createOptimizedPicture(posterImage.src, posterImage.alt);
      moveInstrumentation(posterImage, optimizedPoster.querySelector('img'));
      posterVideo.poster = optimizedPoster.querySelector('img').src;
    } else if (posterCell.textContent.trim()) {
      // Fallback if it's just a URL text
      posterVideo.poster = posterCell.textContent.trim();
    }

    if (videoLink) {
      posterVideo.src = videoLink.href;
    } else if (videoSrcCell.textContent.trim()) {
      // Fallback if it's just a URL text
      posterVideo.src = videoSrcCell.textContent.trim();
    }
  }

  mediaVideoPoster.append(posterVideo);

  const mediaVideoContainer = document.createElement('div');
  mediaVideoContainer.className = 'media-video-container media-show-controls media-video-hide';
  mediaVideo.append(mediaVideoContainer);

  const mediaViewportVideoContainer = document.createElement('div');
  mediaViewportVideoContainer.className = 'media-viewport-video';
  mediaViewportVideoContainer.hidden = true;
  mediaViewportVideoContainer.setAttribute('aria-hidden', 'true');
  mediaVideoContainer.append(mediaViewportVideoContainer);

  const mediaVideoContainerControls = document.createElement('div');
  mediaVideoContainerControls.className = 'media-video-container__controls';
  mediaVideoContainer.append(mediaVideoContainerControls);

  const mediaVideoContainerTimer = document.createElement('div');
  mediaVideoContainerTimer.className = 'media-video-container__controls__timer';
  mediaVideoContainerControls.append(mediaVideoContainerTimer);

  const progressArea = document.createElement('div');
  progressArea.className = 'media-video-container__controls__timer__progress-area';
  mediaVideoContainerTimer.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.className = 'media-video-container__controls__timer__progress-area__progress-bar';
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.className = 'media-video-container__controls__timer__progress-area__pointer';
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.className = 'media-video-container__controls__timer__progress-area__progress-pending';
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.className = 'media-video-container__controls__timer__current-time';
  currentTime.textContent = '00:00';
  mediaVideoContainerTimer.append(currentTime);

  const duration = document.createElement('p');
  duration.className = 'media-video-container__controls__timer__duration';
  duration.textContent = '00:00';
  mediaVideoContainerTimer.append(duration);

  const mediaVideoContainerButtons = document.createElement('div');
  mediaVideoContainerButtons.className = 'media-video-container__controls__buttons';
  mediaVideoContainerControls.append(mediaVideoContainerButtons);

  const playButtonControls = document.createElement('button');
  playButtonControls.className = 'media-video-container__controls__buttons__play-button media-video-container__controls__buttons--button';
  mediaVideoContainerButtons.append(playButtonControls);

  const playIconControls = document.createElement('span');
  playIconControls.className = 'media-video-container__controls__buttons__icon media-qd-icon media-qd-icon--play';
  playButtonControls.append(playIconControls);

  const muteButtonControls = document.createElement('button');
  muteButtonControls.className = 'media-video-container__controls__buttons__mute-button media-video-container__controls__buttons--button';
  mediaVideoContainerButtons.append(muteButtonControls);

  const muteIconControls = document.createElement('span');
  muteIconControls.className = 'media-video-container__controls__buttons__icon media-qd-icon media-qd-icon--volume';
  muteButtonControls.append(muteIconControls);

  const fullscreenButtonControls = document.createElement('button');
  fullscreenButtonControls.className = 'media-video-container__controls__buttons__fullscreen-button media-video-container__controls__buttons--button';
  mediaVideoContainerButtons.append(fullscreenButtonControls);

  const fullscreenIconControls = document.createElement('span');
  fullscreenIconControls.className = 'media-video-container__controls__buttons__icon media-qd-icon media-qd-icon--fullscreen';
  fullscreenButtonControls.append(fullscreenIconControls);

  const mainVideo = document.createElement('video');
  mainVideo.className = 'media-video-container__video';
  mainVideo.playsInline = true;
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('x-webkit-airplay', 'allow');

  // Set data-video-src and src for the main video
  if (rows.length > 0) {
    const firstRowCells = [...rows[0].children];
    const videoSrcCell = firstRowCells[1]; // Assuming video source is the second cell
    const videoLink = videoSrcCell?.querySelector('a');

    if (videoLink) {
      mainVideo.setAttribute('data-video-src', videoLink.href);
      mainVideo.src = videoLink.href;
    } else if (videoSrcCell.textContent.trim()) {
      mainVideo.setAttribute('data-video-src', videoSrcCell.textContent.trim());
      mainVideo.src = videoSrcCell.textContent.trim();
    }
  }

  mediaVideoContainer.append(mainVideo);

  block.textContent = '';
  block.append(mediaInnerVideo);
}
