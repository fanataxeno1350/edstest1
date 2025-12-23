import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const youtubeSliderWrapper = document.createElement('div');
  youtubeSliderWrapper.classList.add('youtube-slider-wrapper');

  const titleElement = block.querySelector('h2');
  if (titleElement) {
    titleElement.classList.add('youtube-slider-video-title');
    youtubeSliderWrapper.append(titleElement);
    moveInstrumentation(titleElement, titleElement);
  }

  const section = document.createElement('section');
  section.classList.add('youtube-slider-demo');
  const youtubeSliderContainer = document.createElement('div');
  youtubeSliderContainer.classList.add('youtube-slider-container');

  const youtubeSliderItems = block.querySelectorAll('[data-aue-model="youtubeSliderItem"]');
  youtubeSliderItems.forEach((itemNode) => {
    const youtubeSliderItem = document.createElement('div');
    youtubeSliderItem.classList.add('youtube-slider-item');

    const linkElement = itemNode.querySelector('a');
    if (linkElement) {
      linkElement.classList.add('youtube-slider-clickhere');
      const videoUrl = itemNode.querySelector('[data-aue-prop="videoUrl"]')?.textContent.trim();
      if (videoUrl) {
        linkElement.setAttribute('title', videoUrl);
      }
      linkElement.removeAttribute('href');

      const thumbnailImg = itemNode.querySelector('[data-aue-prop="thumbnail"]');
      if (thumbnailImg) {
        const picture = createOptimizedPicture(thumbnailImg.src, thumbnailImg.alt);
        linkElement.append(picture);
        moveInstrumentation(thumbnailImg, picture);
      }

      const youtubeIconP = document.createElement('p');
      youtubeIconP.classList.add('youtube-slider-youtube-icon');
      const youtubeIconImg = itemNode.querySelector('[data-aue-prop="youtubeIcon"]');
      if (youtubeIconImg) {
        youtubeIconP.append(youtubeIconImg);
        moveInstrumentation(youtubeIconImg, youtubeIconImg);
      }
      linkElement.append(youtubeIconP);
      youtubeSliderItem.append(linkElement);
      moveInstrumentation(linkElement, linkElement);
    }

    const titleH4 = itemNode.querySelector('[data-aue-prop="title"]');
    if (titleH4) {
      const h4 = document.createElement('h4');
      h4.textContent = titleH4.textContent;
      youtubeSliderItem.append(h4);
      moveInstrumentation(titleH4, h4);
    }

    youtubeSliderContainer.append(youtubeSliderItem);
    moveInstrumentation(itemNode, youtubeSliderItem);
  });

  const nextButton = document.createElement('button');
  nextButton.classList.add('youtube-slider-next');
  const nextButtonImg = block.querySelector('.youtube-slider-next img');
  if (nextButtonImg) {
    nextButton.append(nextButtonImg);
    moveInstrumentation(nextButtonImg, nextButtonImg);
  }
  youtubeSliderContainer.append(nextButton);

  const prevButton = document.createElement('button');
  prevButton.classList.add('youtube-slider-prev');
  const prevButtonImg = block.querySelector('.youtube-slider-prev img');
  if (prevButtonImg) {
    prevButton.append(prevButtonImg);
    moveInstrumentation(prevButtonImg, prevButtonImg);
  }
  youtubeSliderContainer.append(prevButton);

  section.append(youtubeSliderContainer);
  youtubeSliderWrapper.append(section);

  const overlay = document.createElement('div');
  overlay.classList.add('youtube-slider-overlay');
  const youtubePlay = document.createElement('div');
  youtubePlay.classList.add('youtube-slider-youtube-play');

  const closeVideo = block.querySelector('.youtube-slider-overlay .youtube-slider-close-video');
  if (closeVideo) {
    youtubePlay.append(closeVideo);
    moveInstrumentation(closeVideo, closeVideo);
  }

  const iframe = document.createElement('iframe');
  iframe.id = 'youtubeVd';
  iframe.setAttribute('src', '');
  iframe.setAttribute('style', 'border:none;');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('allowfullscreen', '');
  youtubePlay.append(iframe);

  overlay.append(youtubePlay);
  youtubeSliderWrapper.append(overlay);

  block.textContent = '';
  block.append(youtubeSliderWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}