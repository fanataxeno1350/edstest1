import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const wrapper = document.createElement('div');
  wrapper.classList.add('banner-position-relative', 'banner-section__wrapper');
  bannerSection.append(wrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('banner-position-absolute', 'banner-cta-wrapper');
  const cta = document.createElement('div');
  cta.classList.add('banner-cta');
  ctaWrapper.append(cta);

  [...block.children].forEach((row) => {
    moveInstrumentation(row, wrapper);

    const videoSrc = row.children[0]?.textContent.trim();
    const imageSrc = row.children[1]?.querySelector('img')?.src;
    const imageAlt = row.children[2]?.textContent.trim();
    const ctaHref = row.children[3]?.querySelector('a')?.href;
    const ctaLabel = row.children[4]?.textContent.trim();

    if (videoSrc) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('banner-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('data-is-autoplay', 'true');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.setAttribute('src', videoSrc);
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      videoWrapper.append(video);

      const videoControls = document.createElement('div');
      videoControls.classList.add('banner-position-absolute', 'banner-video-controls');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('banner-d-none', 'banner-video-icon-play', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
      playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772185485326.svg+xml';
      videoControls.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('banner-d-block', 'banner-video-icon-pause', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
      pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772185485369.svg+xml';
      videoControls.append(pauseButton);
      videoWrapper.append(videoControls);

      const muteIcon = document.createElement('div');
      muteIcon.classList.add('banner-position-absolute', 'banner-mute-icon');

      const volumeMuteButton = document.createElement('button');
      volumeMuteButton.setAttribute('type', 'button');
      volumeMuteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
      volumeMuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772185485418.svg+xml';
      muteIcon.append(volumeMuteButton);

      const volumeUnmuteButton = document.createElement('button');
      volumeUnmuteButton.setAttribute('type', 'button');
      volumeUnmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer', 'banner-d-none');
      volumeUnmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772185485479.svg+xml';
      muteIcon.append(volumeUnmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'banner-bg-transparent', 'banner-d-flex', 'banner-align-items-center', 'banner-justify-content-center', 'banner-cursor-pointer');
      noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1772185485535.svg+xml';
      muteIcon.append(noAudioButton);
      videoWrapper.append(muteIcon);

      wrapper.append(videoWrapper);
    } else if (imageSrc) {
      const img = document.createElement('img');
      img.setAttribute('src', imageSrc);
      img.setAttribute('alt', imageAlt || '');
      img.classList.add('banner-image');
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
      img.setAttribute('decoding', 'async');
      wrapper.append(img);
    }

    if (ctaHref && ctaLabel) {
      const textCenter = document.createElement('div');
      textCenter.classList.add('banner-text-center');

      const link = document.createElement('a');
      link.setAttribute('id', `cta-${Math.random().toString(36).substring(2, 11)}`); // Generate a unique ID
      link.classList.add('banner-button', 'banner-analytics_cta_click', 'banner-text-center');
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');
      link.setAttribute('href', ctaHref);
      link.setAttribute('target', '_blank');

      const span = document.createElement('span');
      span.classList.add('banner-button__text', 'banner-primary-btn', 'banner-w-75', 'banner-p-5', 'banner-rounded-pill', 'banner-d-inline-flex', 'banner-justify-content-center', 'banner-align-items-center');
      span.textContent = ctaLabel;
      link.append(span);
      textCenter.append(link);

      const popUp = document.createElement('div');
      popUp.classList.add('banner-pop-up', 'banner-d-none');
      popUp.innerHTML = `
        <input type="hidden" class="banner-popup-message"/>
        <input type="hidden" class="banner-proceed-button-label"/>
        <input type="hidden" class="banner-cancel-button-label"/>
        <input type="hidden" class="banner-background-color"/>
      `;
      textCenter.append(popUp);
      cta.append(textCenter);
    }
  });

  if (cta.children.length > 0) {
    wrapper.append(ctaWrapper);
  }

  block.textContent = '';
  block.append(bannerSection);
}
