import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainBannerContainer = document.createElement('div');
  mainBannerContainer.className = 'main-banner-container';

  const mainBannerHeaderBanner = document.createElement('div');
  mainBannerHeaderBanner.className = 'main-banner-header-banner';

  const headerImageElement = block.querySelector('[data-aue-prop="headerImage"]');
  if (headerImageElement) {
    const img = headerImageElement.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      const imgElement = picture.querySelector('img');
      if (imgElement) {
        imgElement.className = 'main-banner-m-header-banner';
      }
      mainBannerHeaderBanner.append(picture);
      moveInstrumentation(headerImageElement, picture);
    }
  }

  const mainBannerHeaderContent = document.createElement('div');
  mainBannerHeaderContent.className = 'main-banner-header-content';

  const logoImageElement = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImageElement) {
    const img = logoImageElement.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      const imgElement = picture.querySelector('img');
      if (imgElement) {
        imgElement.className = 'main-banner-banner-logo';
      }
      mainBannerHeaderContent.append(picture);
      moveInstrumentation(logoImageElement, picture);
    }
  }

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'main-banner-title';
    h2.textContent = titleElement.textContent;
    mainBannerHeaderContent.append(h2);
    moveInstrumentation(titleElement, h2);
  }

  const mainBannerHomeBanner = document.createElement('div');
  mainBannerHomeBanner.className = 'main-banner-home-banner';

  const mainBannerBxWrapper = document.createElement('div');
  mainBannerBxWrapper.className = 'main-banner-bx-wrapper';
  mainBannerBxWrapper.style.maxWidth = '100%';

  const mainBannerBxViewport = document.createElement('div');
  mainBannerBxViewport.className = 'main-banner-bx-viewport';
  mainBannerBxViewport.style.width = '100%';
  mainBannerBxViewport.style.overflow = 'hidden';
  mainBannerBxViewport.style.position = 'relative';
  mainBannerBxViewport.style.height = '210.219px'; // This height is hardcoded from the example, might need dynamic calculation if it varies

  const mainBannerBxSlider = document.createElement('ul');
  mainBannerBxSlider.className = 'main-banner-bxslider-2';
  mainBannerBxSlider.style.width = '415%'; // Hardcoded from example
  mainBannerBxSlider.style.position = 'relative';
  mainBannerBxSlider.style.transitionTimingFunction = 'ease-out';
  mainBannerBxSlider.style.transitionDuration = '0s';
  mainBannerBxSlider.style.transform = 'translate3d(-565.266px, 0px, 0px)'; // Hardcoded from example

  const slideItems = block.querySelectorAll('[data-aue-model="bannerSlide"]');
  slideItems.forEach((slideNode) => {
    const li = document.createElement('li');
    li.className = 'main-banner-slide-item';

    const slideImageElement = slideNode.querySelector('[data-aue-prop="slideImage"]');
    const slideTextElement = slideNode.querySelector('[data-aue-prop="slideText"]');

    if (slideImageElement) {
      const mainBannerVideo = document.createElement('div');
      mainBannerVideo.className = 'main-banner-video';
      const img = slideImageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        mainBannerVideo.append(picture);
        moveInstrumentation(slideImageElement, picture);
      }
      li.append(mainBannerVideo);
    } else if (slideTextElement) {
      const mainBannerBannerCopy = document.createElement('div');
      mainBannerBannerCopy.className = 'main-banner-banner-copy';
      const h5 = document.createElement('h5');
      h5.className = 'main-banner-copy-text';
      h5.innerHTML = slideTextElement.innerHTML; // Use innerHTML to preserve span/hashtag
      mainBannerBannerCopy.append(h5);
      li.append(mainBannerBannerCopy);
      moveInstrumentation(slideTextElement, h5);
    }
    mainBannerBxSlider.append(li);
    moveInstrumentation(slideNode, li);
  });

  // Add bx-clone elements (assuming they mirror the first/last items for infinite loop)
  if (slideItems.length > 0) {
    const firstSlide = slideItems[0];
    const lastSlide = slideItems[slideItems.length - 1];

    const firstCloneLi = document.createElement('li');
    firstCloneLi.className = 'main-banner-bx-clone';
    const firstSlideImageElement = firstSlide.querySelector('[data-aue-prop="slideImage"]');
    const firstSlideTextElement = firstSlide.querySelector('[data-aue-prop="slideText"]');

    if (firstSlideImageElement) {
      const mainBannerVideo = document.createElement('div');
      mainBannerVideo.className = 'main-banner-video';
      const img = firstSlideImageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        mainBannerVideo.append(picture);
      }
      firstCloneLi.append(mainBannerVideo);
    } else if (firstSlideTextElement) {
      const mainBannerBannerCopy = document.createElement('div');
      mainBannerBannerCopy.className = 'main-banner-banner-copy';
      const h5 = document.createElement('h5');
      h5.className = 'main-banner-copy-text';
      h5.innerHTML = firstSlideTextElement.innerHTML;
      mainBannerBannerCopy.append(h5);
      firstCloneLi.append(mainBannerBannerCopy);
    }
    mainBannerBxSlider.prepend(firstCloneLi);

    const lastCloneLi = document.createElement('li');
    lastCloneLi.className = 'main-banner-bx-clone';
    const lastSlideImageElement = lastSlide.querySelector('[data-aue-prop="slideImage"]');
    const lastSlideTextElement = lastSlide.querySelector('[data-aue-prop="slideText"]');

    if (lastSlideImageElement) {
      const mainBannerVideo = document.createElement('div');
      mainBannerVideo.className = 'main-banner-video';
      const img = lastSlideImageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        mainBannerVideo.append(picture);
      }
      lastCloneLi.append(mainBannerVideo);
    } else if (lastSlideTextElement) {
      const mainBannerBannerCopy = document.createElement('div');
      mainBannerBannerCopy.className = 'main-banner-banner-copy';
      const h5 = document.createElement('h5');
      h5.className = 'main-banner-copy-text';
      h5.innerHTML = lastSlideTextElement.innerHTML;
      mainBannerBannerCopy.append(h5);
      lastCloneLi.append(mainBannerBannerCopy);
    }
    mainBannerBxSlider.append(lastCloneLi);
  }

  mainBannerBxViewport.append(mainBannerBxSlider);

  const mainBannerBxControls = document.createElement('div');
  mainBannerBxControls.className = 'main-banner-bx-controls';

  mainBannerBxWrapper.append(mainBannerBxViewport, mainBannerBxControls);
  mainBannerHomeBanner.append(mainBannerBxWrapper);
  mainBannerHeaderContent.append(mainBannerHomeBanner);
  mainBannerHeaderBanner.append(mainBannerHeaderContent);
  mainBannerContainer.append(mainBannerHeaderBanner);

  block.textContent = '';
  block.append(mainBannerContainer);
  block.className = `main-banner block`;
  block.dataset.blockStatus = 'loaded';
}
