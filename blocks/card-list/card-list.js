import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListCmp = document.createElement('div');
  cardListCmp.className = 'card-list-cmp-card-list card-list-parallax-child';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'card-list-cmp-card-list__content';
  cardListCmp.append(contentDiv);

  // Top section (heading and CTA)
  const topSectionWrapper = document.createElement('div');
  topSectionWrapper.className = 'card-list-slide-wrap';
  contentDiv.append(topSectionWrapper);

  const topSection = document.createElement('div');
  topSection.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  topSection.setAttribute('data-slide-type', 'slide-up');
  topSectionWrapper.append(topSection);

  const headingDiv = document.createElement('div');
  headingDiv.className = 'card-list-cmp-card-list__content__heading card-list-is-visible';
  topSection.append(headingDiv);

  const headingTitleDiv = document.createElement('div');
  headingTitleDiv.id = 'card-list-heading';
  headingTitleDiv.className = 'card-list-cmp-card-list__content__heading__title';
  headingTitleDiv.setAttribute('tabindex', '0');
  headingDiv.append(headingTitleDiv);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper card-list-is-visible';
  topSection.append(ctaWrapper);

  // Items section
  const itemsDiv = document.createElement('div');
  itemsDiv.className = 'card-list-cmp-card-list__content__items';
  contentDiv.append(itemsDiv);

  // Process block children
  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 0) {
      // First row for heading and CTA
      const headingCell = row.children[0];
      const ctaCell = row.children[1];

      if (headingCell) {
        const heading = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          headingTitleDiv.append(heading);
          moveInstrumentation(headingCell, headingTitleDiv);
        }
      }

      if (ctaCell) {
        const ctaLink = ctaCell.querySelector('a');
        if (ctaLink) {
          const newCta = document.createElement('a');
          newCta.href = ctaLink.href;
          newCta.className = 'card-list-cta card-list-cta__primary';
          newCta.target = ctaLink.target || '_self';
          newCta.setAttribute('aria-label', ctaLink.getAttribute('aria-label') || ctaLink.textContent);
          newCta.setAttribute('data-palette', 'palette-1');

          const iconSpan = document.createElement('span');
          iconSpan.className = 'card-list-cta__icon card-list-qd-icon card-list-qd-icon--cheveron-right';
          iconSpan.setAttribute('aria-hidden', 'true');
          newCta.append(iconSpan);

          const labelSpan = document.createElement('span');
          labelSpan.className = 'card-list-cta__label';
          labelSpan.textContent = ctaLink.textContent;
          newCta.append(labelSpan);

          ctaWrapper.append(newCta);
          moveInstrumentation(ctaCell, newCta);
        }
      }
    } else {
      // Subsequent rows for card items
      const cardItemDiv = document.createElement('div');
      cardItemDiv.className = 'card-list-cmp-card-list__content__card-item card-list-is-visible card-list-slide-up';
      cardItemDiv.setAttribute('data-animation', 'card');
      cardItemDiv.setAttribute('data-slide-type', 'slide-up');
      cardItemDiv.setAttribute('data-slide-no-wrap', '');
      cardItemDiv.setAttribute('data-slide-delay', `${(rowIndex - 1) * 100}`.padStart(3, '0'));
      cardItemDiv.style.transitionDelay = `${(rowIndex - 1) * 0.2}s`;
      moveInstrumentation(row, cardItemDiv);

      const cells = [...row.children];

      // Image
      const imageCell = cells[0];
      if (imageCell) {
        const img = imageCell.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          picture.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
          cardItemDiv.append(picture);
          moveInstrumentation(img, picture.querySelector('img'));
        }
      }

      const cardItemContentDiv = document.createElement('div');
      cardItemContentDiv.className = 'card-list-cmp-card-list__content__card-item-content';
      cardItemDiv.append(cardItemContentDiv);

      // Title
      const titleCell = cells[1];
      if (titleCell) {
        const headingWrapper = document.createElement('div');
        headingWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
        headingWrapper.setAttribute('tabindex', '0');
        cardItemContentDiv.append(headingWrapper);

        const titleDiv = document.createElement('div');
        titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
        titleDiv.setAttribute('aria-hidden', 'false');
        titleDiv.textContent = titleCell.textContent.trim();
        headingWrapper.append(titleDiv);
        moveInstrumentation(titleCell, titleDiv);
      }

      // Description
      const descriptionCell = cells[2];
      if (descriptionCell) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
        descriptionDiv.setAttribute('tabindex', '0');
        descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML.trim());
        descriptionDiv.setAttribute('aria-hidden', 'false');
        descriptionDiv.innerHTML = descriptionCell.innerHTML.trim();
        cardItemContentDiv.append(descriptionDiv);
        moveInstrumentation(descriptionCell, descriptionDiv);
      }

      itemsDiv.append(cardItemDiv);
    }
  });

  block.textContent = '';
  block.append(cardListCmp);
}
