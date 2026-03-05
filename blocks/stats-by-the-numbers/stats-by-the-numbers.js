import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Main container for the block
  const mainContainer = document.createElement('div');
  mainContainer.className = 'stats-cmp-stats-by-the-number__container';

  // Get the title row (first row of the block)
  const titleRow = block.children[0];
  const titleCell = titleRow.children[0];
  const title = document.createElement('div');
  title.className = 'stats-cmp-stats-by-the-number__title';
  title.innerHTML = titleCell.innerHTML;
  moveInstrumentation(titleRow, title);
  mainContainer.append(title);

  // Create tabs and content sections
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'stats-cmp-stats-by-the-number__tabs';

  const mainContent = document.createElement('div');
  mainContent.className = 'stats-cmp-stats-by-the-number__main-content';

  const imageSection = document.createElement('div');
  imageSection.className = 'stats-cmp-stats-by-the-number__image-section';

  const contentSection = document.createElement('div');
  contentSection.className = 'stats-cmp-stats-by-the-number__content-section';

  // Loop through the remaining rows (each row represents a tab)
  [...block.children].slice(1).forEach((row, tabIndex) => {
    const cells = [...row.children];

    // Cell 0: Tab Label
    const tabLabelText = cells[0].textContent.trim();
    const tabButton = document.createElement('button');
    tabButton.className = `stats-cmp-stats-by-the-number__tab${tabIndex === 0 ? ' stats-cmp-stats-by-the-number__tab--active' : ''}`;
    tabButton.setAttribute('data-tab', tabLabelText);
    tabButton.setAttribute('data-tab-index', tabIndex);
    tabButton.textContent = tabLabelText;
    moveInstrumentation(cells[0], tabButton);
    tabsContainer.append(tabButton);

    // Cell 1: Image
    const imageContainer = document.createElement('div');
    imageContainer.className = `stats-cmp-stats-by-the-number__image-container${tabIndex === 0 ? ' stats-cmp-stats-by-the-number__image-container--active' : ''}`;
    imageContainer.setAttribute('data-tab-content', tabIndex);
    const imgElement = cells[1].querySelector('img');
    if (imgElement) {
      imageContainer.setAttribute('data-image-path', imgElement.src);
      const optimizedPic = createOptimizedPicture(imgElement.src, imgElement.alt);
      const mainImage = optimizedPic.querySelector('img');
      mainImage.className = 'stats-cmp-stats-by-the-number__main-image';
      mainImage.setAttribute('data-tab-image', tabIndex);
      if (tabIndex === 0) {
        mainImage.style.opacity = 1;
      }
      moveInstrumentation(imgElement, mainImage);
      imageContainer.append(optimizedPic);
    }
    moveInstrumentation(cells[1], imageContainer);
    imageSection.append(imageContainer);

    // Cell 2: Description
    const tabContent = document.createElement('div');
    tabContent.className = `stats-cmp-stats-by-the-number__tab-content${tabIndex === 0 ? ' stats-cmp-stats-by-the-number__tab-content--active' : ''}`;
    tabContent.setAttribute('data-tab-content', tabIndex);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'stats-cmp-stats-by-the-number__description';
    descriptionDiv.innerHTML = cells[2].innerHTML;
    moveInstrumentation(cells[2], descriptionDiv);
    tabContent.append(descriptionDiv);

    // Cell 3: Cards (nested block)
    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'stats-cmp-stats-by-the-number__cards';
    cardsWrapper.setAttribute('role', 'list');
    moveInstrumentation(cells[3], cardsWrapper);

    // Each child of the cards cell is a card
    [...cells[3].children].forEach((cardRow) => {
      const cardCells = [...cardRow.children];

      const cardDiv = document.createElement('div');
      cardDiv.className = 'stats-cmp-stats-by-the-number__card';
      cardDiv.setAttribute('role', 'img');
      cardDiv.setAttribute('tabindex', '0');

      // Extract data attributes and inner HTML for card
      const hoverImageLink = cardCells[0].querySelector('a');
      if (hoverImageLink) {
        cardDiv.setAttribute('data-hover-image', hoverImageLink.href);
      }
      const hoverDetailsDiv = cardCells[1];
      if (hoverDetailsDiv) {
        cardDiv.setAttribute('data-hover-details', hoverDetailsDiv.innerHTML.trim());
      }
      const numberDiv = cardCells[2];
      if (numberDiv) {
        const numberContent = numberDiv.innerHTML.trim();
        cardDiv.setAttribute('aria-label', `${numberContent.replace(/<[^>]*>?/gm, '')}: ${cardCells[3].textContent.trim()}`);
        const numberElement = document.createElement('div');
        numberElement.className = 'stats-cmp-stats-by-the-number__card__number';
        numberElement.setAttribute('data-count', numberContent);
        numberElement.innerHTML = numberContent;
        cardDiv.append(numberElement);
      }
      const descriptionDivCard = cardCells[3];
      if (descriptionDivCard) {
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'stats-cmp-stats-by-the-number__card__description';
        descriptionElement.innerHTML = descriptionDivCard.innerHTML;
        cardDiv.append(descriptionElement);
      }
      moveInstrumentation(cardRow, cardDiv);
      cardsWrapper.append(cardDiv);
    });
    tabContent.append(cardsWrapper);

    // Cell 4: CTA
    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'stats-cmp-stats-by-the-number__cta';
    const ctaLink = cells[4].querySelector('a');
    if (ctaLink) {
      const newCta = document.createElement('a');
      newCta.href = ctaLink.href;
      newCta.className = 'stats-cta stats-cta__primary';
      newCta.target = ctaLink.target;
      newCta.setAttribute('aria-label', ctaLink.textContent.trim());
      newCta.setAttribute('data-palette', 'palette-1');

      const iconSpan = document.createElement('span');
      iconSpan.className = 'stats-cta__icon stats-qd-icon stats-qd-icon--cheveron-right';
      iconSpan.setAttribute('aria-hidden', 'true');
      newCta.append(iconSpan);

      const labelSpan = document.createElement('span');
      labelSpan.className = 'stats-cta__label';
      labelSpan.textContent = ctaLink.textContent.trim();
      newCta.append(labelSpan);

      moveInstrumentation(ctaLink, newCta);
      ctaWrapper.append(newCta);
    }
    moveInstrumentation(cells[4], ctaWrapper);
    tabContent.append(ctaWrapper);

    contentSection.append(tabContent);
  });

  mainContent.append(imageSection, contentSection);
  mainContainer.append(tabsContainer, mainContent);

  // Clear the original block content and append the new structure
  block.textContent = '';
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Statistics by the numbers');
  block.classList.add('stats-cmp-stats-by-the-number', 'stats-animate-ready', 'stats-animate-in');
  block.append(mainContainer);

  // Add tab switching logic
  const tabButtons = block.querySelectorAll('.stats-cmp-stats-by-the-number__tab');
  const tabContents = block.querySelectorAll('.stats-cmp-stats-by-the-number__tab-content');
  const imageContainers = block.querySelectorAll('.stats-cmp-stats-by-the-number__image-container');
  const mainImages = block.querySelectorAll('.stats-cmp-stats-by-the-number__main-image');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabIndex = button.getAttribute('data-tab-index');

      // Deactivate all tabs and content
      tabButtons.forEach((btn) => btn.classList.remove('stats-cmp-stats-by-the-number__tab--active'));
      tabContents.forEach((content) => content.classList.remove('stats-cmp-stats-by-the-number__tab-content--active'));
      imageContainers.forEach((imgCont) => imgCont.classList.remove('stats-cmp-stats-by-the-number__image-container--active'));
      mainImages.forEach((img) => img.style.opacity = 0);

      // Activate selected tab and content
      button.classList.add('stats-cmp-stats-by-the-number__tab--active');
      block.querySelector(`.stats-cmp-stats-by-the-number__tab-content[data-tab-content="${tabIndex}"]`).classList.add('stats-cmp-stats-by-the-number__tab-content--active');
      block.querySelector(`.stats-cmp-stats-by-the-number__image-container[data-tab-content="${tabIndex}"]`).classList.add('stats-cmp-stats-by-the-number__image-container--active');
      block.querySelector(`.stats-cmp-stats-by-the-number__main-image[data-tab-image="${tabIndex}"]`).style.opacity = 1;
    });
  });

  // Add hover functionality for cards
  const statCards = block.querySelectorAll('.stats-cmp-stats-by-the-number__card');
  statCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      // Implement hover logic if needed, e.g., show details, change image
      // For now, the hover details are just data attributes.
      // A more complex implementation would involve creating and showing a tooltip/modal.
    });
    card.addEventListener('mouseleave', () => {
      // Implement mouse leave logic
    });
  });
}
