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
      picture.className = 'main-banner-m-header-banner';
      mainBannerHeaderBanner.append(picture);
      moveInstrumentation(headerImageElement, picture);
    }
  }

  const mainBannerHeaderContent = document.createElement('div');
  mainBannerHeaderContent.className = 'main-banner-header-content';

  const logoElement = block.querySelector('[data-aue-prop="logo"]');
  if (logoElement) {
    const img = logoElement.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.className = 'main-banner-banner-logo';
      mainBannerHeaderContent.append(picture);
      moveInstrumentation(logoElement, picture);
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

  const bxWrapper = document.createElement('div');
  bxWrapper.className = 'main-banner-bx-wrapper';
  bxWrapper.style.maxWidth = '100%';

  const bxViewport = document.createElement('div');
  bxViewport.className = 'main-banner-bx-viewport';
  Object.assign(bxViewport.style, {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    height: '210.219px', // This height is hardcoded from the example, consider dynamic if needed
  });

  const bxSlider = document.createElement('ul');
  bxSlider.className = 'main-banner-bxslider-2';
  Object.assign(bxSlider.style, {
    width: '415%', // This width is hardcoded from the example, consider dynamic if needed
    position: 'relative',
    transitionTimingFunction: 'ease-out',
    transitionDuration: '0s',
    transform: 'translate3d(-565.266px, 0px, 0px)', // This transform is hardcoded from the example, consider dynamic if needed
  });

  const sliderItems = block.querySelectorAll('[data-aue-model="sliderItem"]');
  sliderItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'main-banner-slide-item';

    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const textElement = itemNode.querySelector('[data-aue-prop="text"]');

    if (imageElement) {
      const videoDiv = document.createElement('div');
      videoDiv.className = 'main-banner-video';
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        videoDiv.append(picture);
        moveInstrumentation(imageElement, picture);
      }
      li.append(videoDiv);
    } else if (textElement) {
      const bannerCopyDiv = document.createElement('div');
      bannerCopyDiv.className = 'main-banner-banner-copy';
      const h5 = document.createElement('h5');
      h5.className = 'main-banner-copy-text';
      // Move child nodes of textElement to h5, preserving spans
      while (textElement.firstChild) {
        h5.append(textElement.firstChild);
      }
      bannerCopyDiv.append(h5);
      li.append(bannerCopyDiv);
      moveInstrumentation(textElement, h5);
    }
    bxSlider.append(li);
    moveInstrumentation(itemNode, li);
  });

  bxViewport.append(bxSlider);
  bxWrapper.append(bxViewport);

  const bxControls = document.createElement('div');
  bxControls.className = 'main-banner-bx-controls';
  bxWrapper.append(bxControls);

  mainBannerHomeBanner.append(bxWrapper);
  mainBannerHeaderContent.append(mainBannerHomeBanner);
  mainBannerHeaderBanner.append(mainBannerHeaderContent);
  mainBannerContainer.append(mainBannerHeaderBanner);

  block.textContent = '';
  block.append(mainBannerContainer);
  block.className = `main-banner block`;
  block.dataset.blockStatus = 'loaded';
}
