import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textAndMediaWrapper = document.createElement('div');
  textAndMediaWrapper.classList.add('text-and-media-wrapper');

  const textAndMediaScarp = document.createElement('img');
  textAndMediaScarp.classList.add('text-and-media-scarp', 'text-and-media-fade-in');
  textAndMediaScarp.setAttribute('data-fade-in', '');
  textAndMediaScarp.setAttribute('is-animated', 'true');
  textAndMediaScarp.setAttribute('data-is-reverse', 'true');

  const textAndMediaMain = document.createElement('div');
  textAndMediaMain.classList.add('text-and-media-text-and-media');
  textAndMediaMain.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaMain.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaMain.style.overflow = 'hidden';
  textAndMediaMain.setAttribute('is-animated', 'true');
  textAndMediaMain.setAttribute('data-is-reverse', 'true');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('text-and-media--image-container', 'text-and-media-animate-image-container-up-fade', 'text-and-media-in-viewport', 'text-and-media-slide-up');
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-and-media--content', 'text-and-media-in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('text-and-media-slide-wrap');

  const slideUpContent = document.createElement('div');
  slideUpContent.setAttribute('data-slide-type', 'slide-up');
  slideUpContent.classList.add('text-and-media-slide-up');

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('text-and-media-overflow-fix');

  // Assuming the block has only one row for this structure
  const row = block.children[0];
  if (row) {
    moveInstrumentation(row, textAndMediaMain);
    const cells = [...row.children];

    // Cell 1: Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        // Optimized picture for the main image
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '500' }]);
        optimizedPic.querySelector('img').classList.add('text-and-media--image-container__image', 'text-and-media-layout-portrait', 'text-and-media-animate-image-zoom-out', 'text-and-media-in-viewport');
        optimizedPic.querySelector('img').setAttribute('role', 'img');
        moveInstrumentation(img, optimizedPic.querySelector('img'));

        const pictureElement = document.createElement('picture');
        pictureElement.classList.add('text-and-media--image-container__picture');
        pictureElement.append(...optimizedPic.children);
        imageContainer.append(pictureElement);

        // Scarp image (assuming it's the same image or derived from the first cell)
        textAndMediaScarp.src = img.src;
        textAndMediaScarp.alt = img.alt;
        textAndMediaScarp.setAttribute('aria-label', img.alt);
        textAndMediaScarp.setAttribute('loading', 'lazy');
        moveInstrumentation(img, textAndMediaScarp);
      }
    }

    // Cell 2: Title
    const titleCell = cells[1];
    if (titleCell) {
      const titleDiv = document.createElement('div');
      titleDiv.id = 'text-and-media-title';
      titleDiv.classList.add('text-and-media--content__title');
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.innerHTML = titleCell.innerHTML;
      moveInstrumentation(titleCell, titleDiv);
      slideUpContent.append(titleDiv);
    }

    // Cell 3: Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('text-and-media--content__description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      moveInstrumentation(descriptionCell, descriptionDiv);
      slideUpContent.append(descriptionDiv);
    }

    // Cell 4: CTA Label
    const ctaLabelCell = cells[3];
    // Cell 5: CTA URL
    const ctaUrlCell = cells[4];

    if (ctaLabelCell && ctaUrlCell) {
      const ctaLink = document.createElement('a');
      ctaLink.classList.add('text-and-media-cta', 'text-and-media-cta__primary', 'text-and-media--content__cta');
      ctaLink.target = '_self';
      ctaLink.href = ctaUrlCell.textContent.trim();
      ctaLink.setAttribute('aria-label', ctaLabelCell.textContent.trim());

      const ctaIcon = document.createElement('span');
      ctaIcon.classList.add('text-and-media-cta__icon', 'text-and-media-qd-icon', 'text-and-media-qd-icon--cheveron-right');
      ctaIcon.setAttribute('aria-hidden', 'true');

      const ctaLabel = document.createElement('span');
      ctaLabel.classList.add('text-and-media-cta__label');
      ctaLabel.textContent = ctaLabelCell.textContent.trim();

      ctaLink.append(ctaIcon, ctaLabel);
      moveInstrumentation(ctaLabelCell, ctaLink);
      moveInstrumentation(ctaUrlCell, ctaLink);
      slideUpContent.append(ctaLink);
    }
  }

  slideWrap.append(slideUpContent);
  contentDiv.append(slideWrap);
  textAndMediaMain.append(imageContainer, contentDiv, overflowFix);
  textAndMediaWrapper.append(textAndMediaScarp, textAndMediaMain);

  block.textContent = '';
  block.append(textAndMediaWrapper);
}
