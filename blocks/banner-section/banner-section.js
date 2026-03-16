import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'banner-section__wrapper banner-position-relative banner-boing';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'banner-video-wrapper';

  const videoElement = block.querySelector('video');
  if (videoElement) {
    videoElement.className = 'banner-video banner-w-100 banner-object-fit-cover banner-media';
    videoWrapper.append(videoElement);
    moveInstrumentation(videoElement, videoWrapper);

    const playPauseOverlay = document.createElement('div');
    playPauseOverlay.className = 'banner-position-absolute banner-w-100 banner-h-100 banner-start-0 banner-top-0 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

    const playButton = block.querySelector('.banner-video-icon.banner-icon-play');
    if (playButton) {
      playPauseOverlay.append(playButton);
      moveInstrumentation(playButton, playPauseOverlay);
    }

    const pauseButton = block.querySelector('.banner-video-icon.banner-icon-pause');
    if (pauseButton) {
      playPauseOverlay.append(pauseButton);
      moveInstrumentation(pauseButton, playPauseOverlay);
    }
    videoWrapper.append(playPauseOverlay);

    const muteIconWrapper = document.createElement('div');
    muteIconWrapper.className = 'banner-mute-icon banner-position-absolute banner-z-2 banner-d-flex banner-justify-content-center banner-align-items-center banner-cursor-pointer';

    const muteButton = block.querySelector('.banner-video-icon-volume.banner-icon-mute');
    if (muteButton) {
      muteIconWrapper.append(muteButton);
      moveInstrumentation(muteButton, muteIconWrapper);
    }

    const unmuteButton = block.querySelector('.banner-video-icon-volume.banner-icon-unmute');
    if (unmuteButton) {
      muteIconWrapper.append(unmuteButton);
      moveInstrumentation(unmuteButton, muteIconWrapper);
    }

    const noAudioButton = block.querySelector('.banner-video-icon-volume.banner-no-audio-icon');
    if (noAudioButton) {
      muteIconWrapper.append(noAudioButton);
      moveInstrumentation(noAudioButton, muteIconWrapper);
    }
    videoWrapper.append(muteIconWrapper);
  }

  wrapper.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'banner-boing__banner--cta banner-position-absolute banner-start-50 banner-translate-middle-x banner-w-100';

  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'banner-cta';

  // Assuming the CTA content is within a div.banner-cta in the authored HTML
  const authoredCta = block.querySelector('.banner-boing__banner--cta .banner-cta');
  if (authoredCta) {
    // Move all children of the authored CTA container to the new one
    Array.from(authoredCta.children).forEach((child) => {
      ctaContainer.append(child);
      moveInstrumentation(child, ctaContainer);
    });
    moveInstrumentation(authoredCta, ctaContainer);
  }
  ctaWrapper.append(ctaContainer);
  wrapper.append(ctaWrapper);

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}