import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const disclaimerText = block.querySelector('[data-aue-prop="disclaimer"]');

  const mainBannerMainBanner = document.createElement('div');
  mainBannerMainBanner.className = 'mainbanner-main-banner mainbanner-listing-bn';

  const mainBannerContainerIn = document.createElement('div');
  mainBannerContainerIn.className = 'mainbanner-container-in';

  if (disclaimerText) {
    const disclaimerP = document.createElement('p');
    disclaimerP.className = 'mainbanner-disclaimer-bn';
    disclaimerP.append(...disclaimerText.childNodes);
    moveInstrumentation(disclaimerText, disclaimerP);
    mainBannerContainerIn.append(disclaimerP);
  } else {
    const fallbackDisclaimer = block.querySelector('p');
    if (fallbackDisclaimer) {
      const disclaimerP = document.createElement('p');
      disclaimerP.className = 'mainbanner-disclaimer-bn';
      disclaimerP.textContent = fallbackDisclaimer.textContent;
      mainBannerContainerIn.append(disclaimerP);
    }
  }

  mainBannerMainBanner.append(mainBannerContainerIn);

  block.textContent = '';
  block.append(mainBannerMainBanner);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
