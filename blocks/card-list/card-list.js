import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContent = document.createElement('div');
  mainContent.classList.add('card-list-cmp-card-list', 'card-list-parallax-child');

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('card-list-cmp-card-list__content');
  mainContent.append(contentWrapper);

  // Extract heading and CTA from the first row (cardList model)
  const firstRow = block.children[0];
  if (firstRow) {
    const slideWrap = document.createElement('div');
    slideWrap.classList.add('card-list-slide-wrap');
    const contentTop = document.createElement('div');
    contentTop.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
    contentTop.setAttribute('data-slide-type', 'slide-up');
    slideWrap.append(contentTop);

    // Heading
    const headingCell = firstRow.children[0];
    if (headingCell) {
      const headingDiv = document.createElement('div');
      headingDiv.classList.add('card-list-cmp-card-list__content__heading', 'card-list-is-visible');
      const titleDiv = document.createElement('div');
      titleDiv.id = 'card-list-heading';
      titleDiv.classList.add('card-list-cmp-card-list__content__heading__title');
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.innerHTML = headingCell.innerHTML;
      headingDiv.append(titleDiv);
      contentTop.append(headingDiv);
      moveInstrumentation(headingCell, titleDiv);
    }

    // CTA
    const ctaCell = firstRow.children[1];
    if (ctaCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'card-list-is-visible');
      const ctaLink = ctaCell.querySelector('a');
      if (ctaLink) {
        const newCtaLink = document.createElement('a');
        newCtaLink.href = ctaLink.href;
        newCtaLink.classList.add('card-list-cta', 'card-list-cta__primary');
        newCtaLink.setAttribute('target', ctaLink.target);
        newCtaLink.setAttribute('aria-label', ctaLink.getAttribute('aria-label'));
        newCtaLink.setAttribute('data-palette', 'palette-1');

        const iconSpan = document.createElement('span');
        iconSpan.classList.add('card-list-cta__icon', 'card-list-qd-icon', 'card-list-qd-icon--cheveron-right');
        iconSpan.setAttribute('aria-hidden', 'true');
        newCtaLink.append(iconSpan);

        const labelSpan = document.createElement('span');
        labelSpan.classList.add('card-list-cta__label');
        labelSpan.textContent = ctaLink.textContent;
        newCtaLink.append(labelSpan);

        ctaWrapper.append(newCtaLink);
        moveInstrumentation(ctaLink, newCtaLink);
      }
      contentTop.append(ctaWrapper);
    }
    contentWrapper.append(slideWrap);
  }

  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('card-list-cmp-card-list__content__items');
  contentWrapper.append(itemsWrapper);

  // Loop through the rest of the rows (card model)
  [...block.children].slice(1).forEach((row, index) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-list-cmp-card-list__content__card-item', 'card-list-is-visible', 'card-list-slide-up');
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardItem.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(row, cardItem);

    const cells = [...row.children];

    // Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
        cardItem.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.classList.add('card-list-cmp-card-list__content__card-item-content');

    // Title
    const titleCell = cells[1];
    if (titleCell) {
      const headingWrapper = document.createElement('div');
      headingWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
      headingWrapper.setAttribute('tabindex', '0');

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
      titleDiv.setAttribute('aria-hidden', 'false');
      titleDiv.innerHTML = titleCell.innerHTML;
      headingWrapper.append(titleDiv);
      cardItemContent.append(headingWrapper);
      moveInstrumentation(titleCell, titleDiv);
    }

    // Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML.replace(/\s+/g, ' ').trim().replaceAll('"', '&quot;')); // Clean up for aria-label
      descriptionDiv.setAttribute('aria-hidden', 'false');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      cardItemContent.append(descriptionDiv);
      moveInstrumentation(descriptionCell, descriptionDiv);
    }

    cardItem.append(cardItemContent);
    itemsWrapper.append(cardItem);
  });

  block.textContent = '';
  block.append(mainContent);
}