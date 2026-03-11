import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');
  moveInstrumentation(block, bannerSection);

  const bannerWrapper = document.createElement('div');
  bannerWrapper.classList.add('banner-section__wrapper', 'position-relative', 'boing');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('banner-video-wrapper');

  const videoElement = document.createElement('video');
  videoElement.classList.add('banner-video', 'w-100', 'object-fit-cover', 'banner-media');
  videoElement.setAttribute('title', 'Video');
  videoElement.setAttribute('aria-label', 'Video');
  videoElement.setAttribute('data-is-autoplay', 'true');
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('preload', 'metadata');
  videoElement.setAttribute('loop', 'false');
  videoElement.setAttribute('muted', 'true');
  videoElement.setAttribute('autoplay', 'true');

  const videoCell = block.children[0]?.children[0];
  let videoSrc = '';
  if (videoCell) {
    const videoLink = videoCell.querySelector('a');
    if (videoLink) {
      videoSrc = videoLink.href;
      moveInstrumentation(videoLink, videoElement);
    } else {
      // Fallback if video is directly in the cell, though less common for references
      videoSrc = videoCell.textContent.trim();
      moveInstrumentation(videoCell, videoElement);
    }
  }
  if (videoSrc) {
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', videoSrc);
    sourceElement.setAttribute('type', 'video/mp4');
    videoElement.append(sourceElement);
  }
  videoWrapper.append(videoElement);

  const videoControls = document.createElement('div');
  videoControls.classList.add('banner-video-controls', 'position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const createIconButton = (iconCell, className, defaultDisplayClass) => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('banner-video-icon', className, 'bg-transparent', defaultDisplayClass, 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    let iconSrc = '';
    if (iconCell) {
      const iconLink = iconCell.querySelector('a');
      if (iconLink) {
        iconSrc = iconLink.href;
        moveInstrumentation(iconLink, button);
      } else {
        iconSrc = iconCell.textContent.trim();
        moveInstrumentation(iconCell, button);
      }
    }
    if (iconSrc) {
      button.innerHTML = iconSrc;
    }
    return button;
  };

  const playIconCell = block.children[0]?.children[1];
  const playButton = createIconButton(playIconCell, 'icon-play', 'd-none');
  videoControls.append(playButton);

  const pauseIconCell = block.children[0]?.children[2];
  const pauseButton = createIconButton(pauseIconCell, 'icon-pause', 'd-block');
  videoControls.append(pauseButton);
  videoWrapper.append(videoControls);

  const muteIconWrapper = document.createElement('div');
  muteIconWrapper.classList.add('banner-mute-icon', 'position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const createVolumeIconButton = (iconCell, className, defaultDisplayClass) => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('banner-video-icon-volume', className, 'bg-transparent', defaultDisplayClass, 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    let iconSrc = '';
    if (iconCell) {
      const iconLink = iconCell.querySelector('a');
      if (iconLink) {
        iconSrc = iconLink.href;
        moveInstrumentation(iconLink, button);
      } else {
        iconSrc = iconCell.textContent.trim();
        moveInstrumentation(iconCell, button);
      }
    }
    if (iconSrc) {
      button.innerHTML = iconSrc;
    }
    return button;
  };

  const muteIconCell = block.children[0]?.children[3];
  const muteButton = createVolumeIconButton(muteIconCell, 'icon-mute', 'd-none');
  muteIconWrapper.append(muteButton);

  const unmuteIconCell = block.children[0]?.children[4];
  const unmuteButton = createVolumeIconButton(unmuteIconCell, 'icon-unmute', 'd-none');
  muteIconWrapper.append(unmuteButton);

  const noAudioIconCell = block.children[0]?.children[5];
  const noAudioButton = createVolumeIconButton(noAudioIconCell, 'no-audio-icon', 'd-flex');
  muteIconWrapper.append(noAudioButton);
  videoWrapper.append(muteIconWrapper);

  bannerWrapper.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('banner-cta-wrapper', 'position-absolute', 'start-50', 'translate-middle-x', 'w-100');

  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');

  // Assuming CTA content might be in subsequent rows or cells. For now, it's empty in the example.
  // If there's a specific cell for CTA, it would be extracted here.
  // For this example, the HTML shows an empty div, so we'll just create it.

  ctaWrapper.append(bannerCta);
  bannerWrapper.append(ctaWrapper);
  bannerSection.append(bannerWrapper);

  block.textContent = '';
  block.append(bannerSection);
}
