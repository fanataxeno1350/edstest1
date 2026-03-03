import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContent = document.createElement('div');
  mainContent.classList.add('card-list-cmp-card-list', 'card-list-parallax-child');

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('card-list-cmp-card-list__content');
  mainContent.append(contentWrapper);

  // Top section (heading and CTA)
  const topSectionWrapper = document.createElement('div');
  topSectionWrapper.classList.add('card-list-slide-wrap');
  const topSection = document.createElement('div');
  topSection.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
  topSection.setAttribute('data-slide-type', 'slide-up');
  topSectionWrapper.append(topSection);

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('card-list-cmp-card-list__content__heading', 'card-list-is-visible');
  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.classList.add('card-list-cmp-card-list__content__heading__title');
  headingTitle.setAttribute('tabindex', '0');
  headingWrapper.append(headingTitle);
  topSection.append(headingWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'card-list-is-visible');
  topSection.append(ctaWrapper);

  // Card items section
  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('card-list-cmp-card-list__content__items');
  contentWrapper.append(topSectionWrapper, itemsWrapper);

  // Process block children
  [...block.children].forEach((row, index) => {
    if (index === 0) {
      // First row contains heading and CTA
      const headingCell = row.children[0];
      const ctaLinkCell = row.children[1];
      const ctaLabelCell = row.children[2];

      if (headingCell) {
        const heading = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          headingTitle.append(heading);
          moveInstrumentation(headingCell, headingTitle);
        }
      }

      if (ctaLinkCell && ctaLabelCell) {
        const link = ctaLinkCell.querySelector('a');
        const label = ctaLabelCell.textContent.trim();

        if (link && label) {
          const cta = document.createElement('a');
          cta.href = link.href;
          cta.classList.add('card-list-cta', 'card-list-cta__primary');
          cta.setAttribute('target', '_self');
          cta.setAttribute('aria-label', label);
          cta.setAttribute('data-palette', 'palette-1');

          const ctaIcon = document.createElement('span');
          ctaIcon.classList.add('card-list-cta__icon', 'card-list-qd-icon', 'card-list-qd-icon--cheveron-right');
          ctaIcon.setAttribute('aria-hidden', 'true');
          cta.append(ctaIcon);

          const ctaLabelSpan = document.createElement('span');
          ctaLabelSpan.classList.add('card-list-cta__label');
          ctaLabelSpan.textContent = label;
          cta.append(ctaLabelSpan);

          ctaWrapper.append(cta);
          moveInstrumentation(row, cta);
        }
      }
    } else {
      // Subsequent rows are card items
      const cardItem = document.createElement('div');
      cardItem.classList.add('card-list-cmp-card-list__content__card-item', 'card-list-is-visible', 'card-list-slide-up');
      cardItem.setAttribute('data-animation', 'card');
      cardItem.setAttribute('data-slide-type', 'slide-up');
      cardItem.setAttribute('data-slide-no-wrap', '');
      cardItem.setAttribute('data-slide-delay', `${(index - 1) * 100}`.padStart(3, '0'));
      cardItem.style.transitionDelay = `${(index - 1) * 0.2}s`;

      moveInstrumentation(row, cardItem);

      const cells = [...row.children];
      const imageCell = cells[0];
      const titleCell = cells[1];
      const descriptionCell = cells[2];

      if (imageCell) {
        const img = imageCell.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          picture.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
          cardItem.append(picture);
          moveInstrumentation(img, picture.querySelector('img'));
        }
      }

      const cardContent = document.createElement('div');
      cardContent.classList.add('card-list-cmp-card-list__content__card-item-content');

      if (titleCell) {
        const headingWrapper = document.createElement('div');
        headingWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
        headingWrapper.setAttribute('tabindex', '0');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
        titleDiv.setAttribute('aria-hidden', 'false');
        titleDiv.textContent = titleCell.textContent.trim();
        headingWrapper.append(titleDiv);
        cardContent.append(headingWrapper);
        moveInstrumentation(titleCell, titleDiv);
      }

      if (descriptionCell) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
        descriptionDiv.setAttribute('tabindex', '0');
        descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML.trim());
        descriptionDiv.setAttribute('aria-hidden', 'false');
        descriptionDiv.innerHTML = descriptionCell.innerHTML.trim();
        cardContent.append(descriptionDiv);
        moveInstrumentation(descriptionCell, descriptionDiv);
      }

      cardItem.append(cardContent);
      itemsWrapper.append(cardItem);
    }
  });

  block.textContent = '';
  block.append(mainContent);
}