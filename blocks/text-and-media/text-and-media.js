import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('text-and-media-cmp-text-and-media-wrapper');

  const mediaCmp = document.createElement('div');
  mediaCmp.classList.add('text-and-media-cmp-text-and-media');
  mediaCmp.setAttribute('data-cmp-is', 'text-and-media');
  mediaCmp.setAttribute('aria-labelledby', 'text-and-media-title');
  mediaCmp.style.overflow = 'hidden';
  mediaCmp.setAttribute('is-animated', 'true');
  mediaCmp.setAttribute('data-is-reverse', 'true');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('text-and-media-cmp-text-and-media--image-container', 'text-and-media-animate-image-container-up-fade', 'text-and-media-in-viewport', 'text-and-media-slide-up');
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-and-media-cmp-text-and-media--content', 'text-and-media-in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('text-and-media-slide-wrap');
  const slideUp = document.createElement('div');
  slideUp.setAttribute('data-slide-type', 'slide-up');
  slideUp.classList.add('text-and-media-slide-up');

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('text-and-media-cmp-text-and-media-overflow-fix');

  // Assuming the block has only one row for all content
  const row = block.children[0];
  if (row) {
    moveInstrumentation(row, wrapper);
    const cells = [...row.children];

    // Cell 1: Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('text-and-media-cmp-text-and-media--image-container__image', 'text-and-media-layout-portrait', 'text-and-media-animate-image-zoom-out', 'text-and-media-in-viewport');
        optimizedPic.querySelector('img').setAttribute('role', 'img');
        optimizedPic.classList.add('text-and-media-cmp-text-and-media--image-container__picture');
        imageContainer.append(optimizedPic);
      }
    }

    // Cell 2: Title
    const titleCell = cells[1];
    if (titleCell) {
      const titleDiv = document.createElement('div');
      titleDiv.id = 'text-and-media-title';
      titleDiv.classList.add('text-and-media-cmp-text-and-media--content__title');
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.innerHTML = titleCell.innerHTML;
      slideUp.append(titleDiv);
    }

    // Cell 3: Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('text-and-media-cmp-text-and-media--content__description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      slideUp.append(descriptionDiv);
    }

    // Cell 4: CTA (Label and URL)
    const ctaLabelCell = cells[3];
    const ctaUrlCell = cells[4];
    if (ctaLabelCell && ctaUrlCell) {
      const ctaLink = document.createElement('a');
      ctaLink.href = ctaUrlCell.textContent.trim();
      ctaLink.classList.add('text-and-media-cta', 'text-and-media-cta__primary', 'text-and-media-cmp-text-and-media--content__cta');
      ctaLink.setAttribute('target', '_self');
      ctaLink.setAttribute('aria-label', ctaLabelCell.textContent.trim());

      const ctaIcon = document.createElement('span');
      ctaIcon.classList.add('text-and-media-cta__icon', 'text-and-media-qd-icon', 'text-and-media-qd-icon--cheveron-right');
      ctaIcon.setAttribute('aria-hidden', 'true');

      const ctaLabel = document.createElement('span');
      ctaLabel.classList.add('text-and-media-cta__label');
      ctaLabel.textContent = ctaLabelCell.textContent.trim();

      ctaLink.append(ctaIcon, ctaLabel);
      slideUp.append(ctaLink);
    }
  }

  slideWrap.append(slideUp);
  contentDiv.append(slideWrap);
  mediaCmp.append(imageContainer, contentDiv, overflowFix);
  wrapper.append(mediaCmp);

  block.textContent = '';
  block.append(wrapper);
  block.classList.add('text-and-media-true');

  // Add the initial scarp image from the first cell's img alt/aria-label if present
  const firstRow = block.children[0];
  if (firstRow) {
    const firstCell = firstRow.children[0];
    const img = firstCell.querySelector('img');
    if (img) {
      const scarpImg = document.createElement('img');
      scarpImg.classList.add('text-and-media-cmp-text-and-media__scarp', 'text-and-media-fade-in');
      scarpImg.setAttribute('data-fade-in', '');
      scarpImg.src = img.src;
      scarpImg.alt = img.alt;
      scarpImg.setAttribute('loading', 'lazy');
      scarpImg.setAttribute('aria-label', img.alt);
      scarpImg.setAttribute('is-animated', 'true');
      scarpImg.setAttribute('data-is-reverse', 'true');
      wrapper.prepend(scarpImg);
    }
  }
}
