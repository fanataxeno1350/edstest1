import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainBannerContainer = document.createElement('div');
  mainBannerContainer.classList.add('main-banner-container');

  const mainBannerHeaderBanner = document.createElement('div');
  mainBannerHeaderBanner.classList.add('main-banner-header-banner');

  const headerBannerImage = block.querySelector('[data-aue-prop="headerBannerImage"]');
  if (headerBannerImage) {
    const img = headerBannerImage.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('main-banner-m-header-banner');
      mainBannerHeaderBanner.append(picture);
      moveInstrumentation(headerBannerImage, picture);
    }
  }

  const mainBannerHeaderContent = document.createElement('div');
  mainBannerHeaderContent.classList.add('main-banner-header-content');

  const bannerLogo = block.querySelector('[data-aue-prop="bannerLogo"]');
  if (bannerLogo) {
    const img = bannerLogo.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
      picture.querySelector('img').classList.add('main-banner-banner-logo');
      mainBannerHeaderContent.append(picture);
      moveInstrumentation(bannerLogo, picture);
    }
  }

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.classList.add('main-banner-title');
    h2.textContent = title.textContent;
    mainBannerHeaderContent.append(h2);
    moveInstrumentation(title, h2);
  }

  const mainBannerHomeBanner = document.createElement('div');
  mainBannerHomeBanner.classList.add('main-banner-home-banner');

  const mainBannerBxWrapper = document.createElement('div');
  mainBannerBxWrapper.classList.add('main-banner-bx-wrapper');
  mainBannerBxWrapper.style.maxWidth = '100%';

  const mainBannerBxViewport = document.createElement('div');
  mainBannerBxViewport.classList.add('main-banner-bx-viewport');
  Object.assign(mainBannerBxViewport.style, {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    height: '210.219px',
  });

  const mainBannerBxslider = document.createElement('ul');
  mainBannerBxslider.classList.add('main-banner-bxslider-2');
  Object.assign(mainBannerBxslider.style, {
    width: '415%',
    position: 'relative',
    transitionTimingFunction: 'ease-out',
    transitionDuration: '0s',
    transform: 'translate3d(-565.266px, 0px, 0px)',
  });

  const slides = block.querySelectorAll('[data-aue-model="mainBannerSlide"]');
  slides.forEach((slide) => {
    const li = document.createElement('li');
    li.classList.add('main-banner-slide-item');

    const slideImage = slide.querySelector('[data-aue-prop="slideImage"]');
    const slideText = slide.querySelector('[data-aue-prop="slideText"]');

    if (slideImage) {
      const mainBannerVideo = document.createElement('div');
      mainBannerVideo.classList.add('main-banner-video');
      const img = slideImage.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        mainBannerVideo.append(picture);
        li.append(mainBannerVideo);
        moveInstrumentation(slideImage, mainBannerVideo);
      }
    } else if (slideText) {
      const mainBannerBannerCopy = document.createElement('div');
      mainBannerBannerCopy.classList.add('main-banner-banner-copy');

      const h5 = document.createElement('h5');
      h5.classList.add('main-banner-copy-text');
      h5.innerHTML = slideText.innerHTML;
      mainBannerBannerCopy.append(h5);
      li.append(mainBannerBannerCopy);
      moveInstrumentation(slideText, mainBannerBannerCopy);
    }
    mainBannerBxslider.append(li);
    moveInstrumentation(slide, li);
  });

  mainBannerBxViewport.append(mainBannerBxslider);
  mainBannerBxWrapper.append(mainBannerBxViewport);

  const mainBannerBxControls = document.createElement('div');
  mainBannerBxControls.classList.add('main-banner-bx-controls');
  mainBannerBxWrapper.append(mainBannerBxControls);

  mainBannerHomeBanner.append(mainBannerBxWrapper);
  mainBannerHeaderContent.append(mainBannerHomeBanner);
  mainBannerHeaderBanner.append(mainBannerHeaderContent);
  mainBannerContainer.append(mainBannerHeaderBanner);

  block.textContent = '';
  block.append(mainBannerContainer);
  block.className = `main-banner block`;
  block.dataset.blockStatus = 'loaded';
}