import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainBannerContainer = document.createElement('div');
  mainBannerContainer.className = 'main-banner-container';

  const mainBannerHeaderBanner = document.createElement('div');
  mainBannerHeaderBanner.className = 'main-banner-header-banner';
  mainBannerContainer.append(mainBannerHeaderBanner);

  const headerImage = block.querySelector('[data-aue-prop="headerImage"]');
  if (headerImage) {
    const picture = createOptimizedPicture(headerImage.src, headerImage.alt);
    picture.querySelector('img').className = 'main-banner-m-header-banner';
    mainBannerHeaderBanner.append(picture);
    moveInstrumentation(headerImage, picture);
  }

  const mainBannerHeaderContent = document.createElement('div');
  mainBannerHeaderContent.className = 'main-banner-header-content';
  mainBannerHeaderBanner.append(mainBannerHeaderContent);

  const logo = block.querySelector('[data-aue-prop="logo"]');
  if (logo) {
    const picture = createOptimizedPicture(logo.src, logo.alt);
    picture.querySelector('img').className = 'main-banner-banner-logo';
    mainBannerHeaderContent.append(picture);
    moveInstrumentation(logo, picture);
  }

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.className = 'main-banner-title';
    h2.textContent = title.textContent;
    mainBannerHeaderContent.append(h2);
    moveInstrumentation(title, h2);
  }

  const mainBannerHomeBanner = document.createElement('div');
  mainBannerHomeBanner.className = 'main-banner-home-banner';
  mainBannerHeaderContent.append(mainBannerHomeBanner);

  const bxWrapper = document.createElement('div');
  bxWrapper.className = 'main-banner-bx-wrapper';
  bxWrapper.style.maxWidth = '100%';
  mainBannerHomeBanner.append(bxWrapper);

  const bxViewport = document.createElement('div');
  bxViewport.className = 'main-banner-bx-viewport';
  bxViewport.style.width = '100%';
  bxViewport.style.overflow = 'hidden';
  bxViewport.style.position = 'relative';
  bxViewport.style.height = '210.219px'; // Hardcoded from sample, consider dynamic if needed
  bxWrapper.append(bxViewport);

  const bxslider = document.createElement('ul');
  bxslider.className = 'main-banner-bxslider-2';
  bxslider.style.width = '415%'; // Hardcoded from sample, consider dynamic if needed
  bxslider.style.position = 'relative';
  bxslider.style.transitionTimingFunction = 'ease-out';
  bxslider.style.transitionDuration = '0s';
  bxslider.style.transform = 'translate3d(-565.266px, 0px, 0px)'; // Hardcoded from sample, consider dynamic if needed
  bxViewport.append(bxslider);

  const slides = block.querySelectorAll('[data-aue-model="bannerSlide"]');
  slides.forEach((slide) => {
    const li = document.createElement('li');
    li.className = 'main-banner-slide-item';

    const image = slide.querySelector('[data-aue-prop="image"]');
    const text = slide.querySelector('[data-aue-prop="text"]');

    if (image) {
      const videoDiv = document.createElement('div');
      videoDiv.className = 'main-banner-video';
      const picture = createOptimizedPicture(image.src, image.alt);
      videoDiv.append(picture);
      li.append(videoDiv);
      moveInstrumentation(image, picture);
    } else if (text) {
      const bannerCopyDiv = document.createElement('div');
      bannerCopyDiv.className = 'main-banner-banner-copy';
      const h5 = document.createElement('h5');
      h5.className = 'main-banner-copy-text';

      // Reconstruct text with span for hashtag if present
      const textContent = text.innerHTML;
      const hashtagRegex = /#(\w+)/g;
      const parts = textContent.split(hashtagRegex);
      parts.forEach((part, index) => {
        if (index % 2 !== 0) { // It's a hashtag group
          const span = document.createElement('span');
          span.className = 'main-banner-hashtag';
          span.textContent = `#${part}`;
          h5.append(span);
        } else if (part) {
          h5.append(document.createTextNode(part));
        }
      });

      bannerCopyDiv.append(h5);
      li.append(bannerCopyDiv);
      moveInstrumentation(text, h5);
    }
    bxslider.append(li);
    moveInstrumentation(slide, li);
  });

  const bxControls = document.createElement('div');
  bxControls.className = 'main-banner-bx-controls';
  bxWrapper.append(bxControls);

  block.textContent = '';
  block.append(mainBannerContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
