import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.className = 'banner-section';

  const bannerSectionWrapper = document.createElement('div');
  bannerSectionWrapper.className = 'banner-section__wrapper';

  const videoElement = document.createElement('video');
  videoElement.className = 'banner-section__video';
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('preload', 'metadata');

  const videoSrc = block.querySelector('[data-aue-prop="videoSrc"]');
  if (videoSrc) {
    const sourceElement = document.createElement('source');
    sourceElement.src = videoSrc.textContent.trim();
    sourceElement.type = 'video/mp4';
    videoElement.append(sourceElement);
    moveInstrumentation(videoSrc, sourceElement);
  } else {
    const fallbackVideo = block.querySelector('a[href$=".mp4"]');
    if (fallbackVideo) {
      const sourceElement = document.createElement('source');
      sourceElement.src = fallbackVideo.href;
      sourceElement.type = 'video/mp4';
      videoElement.append(sourceElement);
      moveInstrumentation(fallbackVideo, sourceElement);
    }
  }

  const videoTitle = block.querySelector('[data-aue-prop="videoTitle"]');
  if (videoTitle) {
    videoElement.setAttribute('title', videoTitle.textContent.trim());
    videoElement.setAttribute('aria-label', videoTitle.textContent.trim());
    moveInstrumentation(videoTitle, videoElement);
  }

  const isAutoplay = block.querySelector('[data-aue-prop="isAutoplay"]');
  if (isAutoplay && isAutoplay.textContent.trim().toLowerCase() === 'true') {
    videoElement.setAttribute('autoplay', 'true');
    videoElement.setAttribute('data-is-autoplay', 'true');
    videoElement.setAttribute('loop', 'false');
    moveInstrumentation(isAutoplay, videoElement);
  } else {
    videoElement.setAttribute('autoplay', 'false');
    videoElement.setAttribute('data-is-autoplay', 'false');
    videoElement.setAttribute('loop', 'false');
  }

  const isMuted = block.querySelector('[data-aue-prop="isMuted"]');
  if (isMuted && isMuted.textContent.trim().toLowerCase() === 'true') {
    videoElement.setAttribute('muted', 'true');
    moveInstrumentation(isMuted, videoElement);
  } else {
    videoElement.setAttribute('muted', 'false');
  }

  bannerSectionWrapper.append(videoElement);

  const videoControls = document.createElement('div');
  videoControls.className = 'banner-section__video-controls';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'banner-section__video-icon banner-section__icon-play';
  playButton.style.display = 'none';
  const playIcon = block.querySelector('[data-aue-prop="playIcon"]');
  if (playIcon) {
    playButton.innerHTML = playIcon.textContent.trim();
    moveInstrumentation(playIcon, playButton);
  } else {
    const fallbackPlayIcon = block.querySelector('a[href$=".svg"]');
    if (fallbackPlayIcon) {
      playButton.innerHTML = `<img src="${fallbackPlayIcon.href}" alt="Play Icon"/>`;
      moveInstrumentation(fallbackPlayIcon, playButton);
    }
  }
  videoControls.append(playButton);

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'banner-section__video-icon banner-section__icon-pause';
  const pauseIcon = block.querySelector('[data-aue-prop="pauseIcon"]');
  if (pauseIcon) {
    pauseButton.innerHTML = pauseIcon.textContent.trim();
    moveInstrumentation(pauseIcon, pauseButton);
  } else {
    const fallbackPauseIcon = block.querySelectorAll('a[href$=".svg"]')[1];
    if (fallbackPauseIcon) {
      pauseButton.innerHTML = `<img src="${fallbackPauseIcon.href}" alt="Pause Icon"/>`;
      moveInstrumentation(fallbackPauseIcon, pauseButton);
    }
  }
  videoControls.append(pauseButton);
  bannerSectionWrapper.append(videoControls);

  const muteControls = document.createElement('div');
  muteControls.className = 'banner-section__mute-controls';

  const muteButton = document.createElement('button');
  muteButton.type = 'button';
  muteButton.className = 'banner-section__volume-icon banner-section__icon-mute';
  muteButton.style.display = 'none';
  const muteIcon = block.querySelector('[data-aue-prop="muteIcon"]');
  if (muteIcon) {
    muteButton.innerHTML = muteIcon.textContent.trim();
    moveInstrumentation(muteIcon, muteButton);
  } else {
    const fallbackMuteIcon = block.querySelectorAll('a[href$=".svg"]')[2];
    if (fallbackMuteIcon) {
      muteButton.innerHTML = `<img src="${fallbackMuteIcon.href}" alt="Mute Icon"/>`;
      moveInstrumentation(fallbackMuteIcon, muteButton);
    }
  }
  muteControls.append(muteButton);

  const unmuteButton = document.createElement('button');
  unmuteButton.type = 'button';
  unmuteButton.className = 'banner-section__volume-icon banner-section__icon-unmute';
  unmuteButton.style.display = 'none';
  const unmuteIcon = block.querySelector('[data-aue-prop="unmuteIcon"]');
  if (unmuteIcon) {
    unmuteButton.innerHTML = unmuteIcon.textContent.trim();
    moveInstrumentation(unmuteIcon, unmuteButton);
  } else {
    const fallbackUnmuteIcon = block.querySelectorAll('a[href$=".svg"]')[3];
    if (fallbackUnmuteIcon) {
      unmuteButton.innerHTML = `<img src="${fallbackUnmuteIcon.href}" alt="Unmute Icon"/>`;
      moveInstrumentation(fallbackUnmuteIcon, unmuteButton);
    }
  }
  muteControls.append(unmuteButton);

  const noAudioButton = document.createElement('button');
  noAudioButton.type = 'button';
  noAudioButton.className = 'banner-section__volume-icon banner-section__no-audio-icon';
  const noAudioIcon = block.querySelector('[data-aue-prop="noAudioIcon"]');
  if (noAudioIcon) {
    noAudioButton.innerHTML = noAudioIcon.textContent.trim();
    moveInstrumentation(noAudioIcon, noAudioButton);
  } else {
    const fallbackNoAudioIcon = block.querySelectorAll('a[href$=".svg"]')[4];
    if (fallbackNoAudioIcon) {
      noAudioButton.innerHTML = `<img src="${fallbackNoAudioIcon.href}" alt="No Audio Icon"/>`;
      moveInstrumentation(fallbackNoAudioIcon, noAudioButton);
    }
  }
  muteControls.append(noAudioButton);
  bannerSectionWrapper.append(muteControls);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-section__cta-wrapper';

  const bannerCta = document.createElement('div');
  bannerCta.className = 'banner-cta';

  const textCenterDiv = document.createElement('div');
  textCenterDiv.className = 'text-center ';

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaText = block.querySelector('[data-aue-prop="ctaText"]');

  if (ctaLink || ctaText) {
    const anchor = document.createElement('a');
    anchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`;
    anchor.className = 'cmp-button analytics_cta_click text-center cta-layout';
    anchor.setAttribute('data-link-region', 'CTA');
    anchor.setAttribute('data-is-internal', 'true');
    anchor.setAttribute('data-enable-gating', 'false');
    anchor.setAttribute('target', '_blank');

    if (ctaLink) {
      anchor.href = ctaLink.textContent.trim();
      moveInstrumentation(ctaLink, anchor);
    } else {
      anchor.href = '#';
    }

    const span = document.createElement('span');
    span.className = 'cmp-button__text primary-btn w-75 p-5 rounded-pill d-inline-flex justify-content-center align-items-center famlf-cta-btn';

    if (ctaText) {
      span.textContent = ctaText.textContent.trim();
      moveInstrumentation(ctaText, span);
    } else {
      span.textContent = 'Learn More';
    }

    anchor.append(span);
    textCenterDiv.append(anchor);
  }

  const popUpDiv = document.createElement('div');
  popUpDiv.className = 'pop-up d-none';
  popUpDiv.innerHTML = `
    <input type="hidden" class="popup-message">
    <input type="hidden" class="proceed-button-label">
    <input type="hidden" class="cancel-button-label">
    <input type="hidden" class="background-color">
  `;
  textCenterDiv.append(popUpDiv);

  bannerCta.append(textCenterDiv);
  ctaWrapper.append(bannerCta);
  bannerSectionWrapper.append(ctaWrapper);
  bannerSection.append(bannerSectionWrapper);

  block.textContent = '';
  block.append(bannerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
