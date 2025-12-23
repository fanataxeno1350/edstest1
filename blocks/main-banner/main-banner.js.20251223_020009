import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainBannerContainer = document.createElement('div');
  mainBannerContainer.className = 'main-banner-container';

  const mainBannerHeaderBanner = document.createElement('div');
  mainBannerHeaderBanner.className = 'main-banner-header-banner';

  const headerImageElement = block.querySelector('[data-aue-prop="headerImage"]');
  if (headerImageElement) {
    const picture = createOptimizedPicture(headerImageElement.src, headerImageElement.alt);
    const imgElement = picture.querySelector('img');
    imgElement.className = 'main-banner-m-header-banner';
    mainBannerHeaderBanner.append(picture);
    moveInstrumentation(headerImageElement, picture);
  }

  const mainBannerHeaderContent = document.createElement('div');
  mainBannerHeaderContent.className = 'main-banner-header-content';

  const logoImageElement = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImageElement) {
    const picture = createOptimizedPicture(logoImageElement.src, logoImageElement.alt);
    const imgElement = picture.querySelector('img');
    imgElement.className = 'main-banner-banner-logo';
    mainBannerHeaderContent.append(picture);
    moveInstrumentation(logoImageElement, picture);
  }

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const titleH2 = document.createElement('h2');
    titleH2.className = 'main-banner-title';
    titleH2.textContent = titleElement.textContent;
    mainBannerHeaderContent.append(titleH2);
    moveInstrumentation(titleElement, titleH2);
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

  const mainBannerBxslider2 = document.createElement('ul');
  mainBannerBxslider2.className = 'main-banner-bxslider-2';
  mainBannerBxslider2.style.width = '415%';
  mainBannerBxslider2.style.position = 'relative';
  mainBannerBxslider2.style.transitionTimingFunction = 'ease-out';
  mainBannerBxslider2.style.transitionDuration = '0s';

  const slideItems = block.querySelectorAll('[data-aue-model="mainBannerSlide"]');
  slideItems.forEach((slideNode) => {
    const li = document.createElement('li');
    li.className = 'main-banner-slide-item';

    const slideImageElement = slideNode.querySelector('[data-aue-prop="slideImage"]');
    const slideTextElement = slideNode.querySelector('[data-aue-prop="slideText"]');
    
    if (slideImageElement) {
      const mainBannerVideo = document.createElement('div');
      mainBannerVideo.className = 'main-banner-video';
      mainBannerVideo.append(createOptimizedPicture(slideImageElement.src, slideImageElement.alt));
      li.append(mainBannerVideo);
      moveInstrumentation(slideImageElement, mainBannerVideo);
    } else if (slideTextElement) {
      const mainBannerBannerCopy = document.createElement('div');
      mainBannerBannerCopy.className = 'main-banner-banner-copy';
      const h5 = document.createElement('h5');
      h5.className = 'main-banner-copy-text';
      h5.innerHTML = slideTextElement.innerHTML;
      mainBannerBannerCopy.append(h5);
      li.append(mainBannerBannerCopy);
      moveInstrumentation(slideTextElement, mainBannerBannerCopy);
    }
    mainBannerBxslider2.append(li);
    moveInstrumentation(slideNode, li);
  });

  mainBannerBxViewport.append(mainBannerBxslider2);

  const mainBannerBxControls = document.createElement('div');
  mainBannerBxControls.className = 'main-banner-bx-controls';

  mainBannerBxWrapper.append(mainBannerBxViewport, mainBannerBxControls);
  mainBannerHomeBanner.append(mainBannerBxWrapper);
  mainBannerHeaderContent.append(mainBannerHomeBanner);
  mainBannerHeaderBanner.append(mainBannerHeaderContent);
  mainBannerContainer.append(mainBannerHeaderBanner);

  block.textContent = '';
  block.append(mainBannerContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
