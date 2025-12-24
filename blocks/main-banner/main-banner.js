import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainBannerMainBanner = document.createElement('div');
  mainBannerMainBanner.className = 'mainbanner-main-banner mainbanner-listing-bn';

  const mainBannerContainerIn = document.createElement('div');
  mainBannerContainerIn.className = 'mainbanner-container-in mainbanner-mobile-image';

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    const h1 = document.createElement('h1');
    h1.append(...headingElement.childNodes);
    mainBannerContainerIn.append(h1);
    moveInstrumentation(headingElement, h1);
  }

  const imageElement = block.querySelector('[data-aue-prop="image"]');
  if (imageElement) {
    const figure = document.createElement('figure');
    figure.className = 'mainbanner-mobile-sub-image';
    const img = imageElement.querySelector('img');
    if (img) {
      figure.append(createOptimizedPicture(img.src, img.alt));
      mainBannerContainerIn.append(figure);
      moveInstrumentation(imageElement, figure);
    }
  }

  const disclaimerElement = block.querySelector('[data-aue-prop="disclaimer"]');
  if (disclaimerElement) {
    const p = document.createElement('p');
    p.className = 'mainbanner-disclaimer-bn mainbanner-sanitizer-disc';
    p.append(...disclaimerElement.childNodes);
    mainBannerContainerIn.append(p);
    moveInstrumentation(disclaimerElement, p);
  }

  mainBannerMainBanner.append(mainBannerContainerIn);

  block.textContent = '';
  block.append(mainBannerMainBanner);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
