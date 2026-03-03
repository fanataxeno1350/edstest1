import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main wrapper div
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('text-and-media-cmp-text-and-media-wrapper');

  // Assuming the block has only one row for all content based on the JSON structure
  const row = block.children[0];
  if (!row) return; // Exit if no row is found

  // Extract content from cells based on the JSON fields order
  const cells = [...row.children];

  const imageCell = cells[0];
  const titleCell = cells[1];
  const descriptionCell = cells[2];
  const ctaLabelCell = cells[3];
  const ctaUrlCell = cells[4];

  // Create the image element
  if (imageCell) {
    const img = imageCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));

      const pictureContainer = document.createElement('div');
      pictureContainer.classList.add('text-and-media-cmp-text-and-media--image-container');
      pictureContainer.setAttribute('data-slide-type', 'slide-up');
      pictureContainer.setAttribute('data-slide-no-wrap', '');

      const pictureElement = optimizedPic.querySelector('picture');
      if (pictureElement) {
        pictureElement.classList.add('text-and-media-cmp-text-and-media--image-container__picture');
        const imgInPicture = pictureElement.querySelector('img');
        if (imgInPicture) {
          imgInPicture.classList.add('text-and-media-cmp-text-and-media--image-container__image');
          imgInPicture.setAttribute('role', 'img');
        }
      }
      pictureContainer.append(optimizedPic);
      wrapperDiv.append(pictureContainer);
    }
  }

  // Create the content container
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-and-media-cmp-text-and-media--content');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('text-and-media-slide-wrap');
  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.classList.add('text-and-media-slide-up');

  // Create title
  if (titleCell) {
    const titleElement = document.createElement('div');
    titleElement.id = 'text-and-media-title';
    titleElement.classList.add('text-and-media-cmp-text-and-media--content__title');
    titleElement.setAttribute('tabindex', '0');
    titleElement.innerHTML = titleCell.innerHTML;
    moveInstrumentation(titleCell, titleElement);
    slideUpDiv.append(titleElement);
  }

  // Create description
  if (descriptionCell) {
    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('text-and-media-cmp-text-and-media--content__description');
    descriptionElement.setAttribute('tabindex', '0');
    descriptionElement.innerHTML = descriptionCell.innerHTML;
    moveInstrumentation(descriptionCell, descriptionElement);
    slideUpDiv.append(descriptionElement);
  }

  // Create CTA
  if (ctaLabelCell && ctaUrlCell) {
    const ctaLink = ctaUrlCell.querySelector('a');
    if (ctaLink) {
      const newCta = document.createElement('a');
      newCta.href = ctaLink.href;
      newCta.classList.add('text-and-media-cta', 'text-and-media-cta__primary', 'text-and-media-cmp-text-and-media--content__cta');
      newCta.setAttribute('target', '_self');
      newCta.setAttribute('aria-label', ctaLabelCell.textContent.trim());

      const iconSpan = document.createElement('span');
      iconSpan.classList.add('text-and-media-cta__icon', 'text-and-media-qd-icon', 'text-and-media-qd-icon--cheveron-right');
      iconSpan.setAttribute('aria-hidden', 'true');

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('text-and-media-cta__label');
      labelSpan.textContent = ctaLabelCell.textContent.trim();
      moveInstrumentation(ctaLabelCell, labelSpan);

      newCta.append(iconSpan, labelSpan);
      slideUpDiv.append(newCta);
    }
  }

  slideWrap.append(slideUpDiv);
  contentDiv.append(slideWrap);
  wrapperDiv.append(contentDiv);

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(wrapperDiv);

  // Transfer instrumentation for the main block element
  // The original block element itself doesn't have direct content from the JSON to transfer,
  // but if there were attributes on the block's row, they would be moved here.
  // For this specific block, the main wrapper is built from scratch, so direct row instrumentation
  // is applied to the individual elements created.
}
