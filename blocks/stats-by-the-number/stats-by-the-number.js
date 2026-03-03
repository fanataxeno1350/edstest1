import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('div');
  mainContainer.className = 'stats-cmp-stats-by-the-number__container';

  // Title Section
  const titleRow = block.children[0];
  const titleDiv = document.createElement('div');
  titleDiv.className = 'stats-cmp-stats-by-the-number__title';
  const title = titleRow.children[0].querySelector('h1, h2, h3, h4, h5, h6');
  if (title) {
    titleDiv.append(title);
    moveInstrumentation(titleRow.children[0], title);
  }
  mainContainer.append(titleDiv);

  // Tabs Section
  const tabsDiv = document.createElement('div');
  tabsDiv.className = 'stats-cmp-stats-by-the-number__tabs';

  // Main Content Layout
  const mainContentDiv = document.createElement('div');
  mainContentDiv.className = 'stats-cmp-stats-by-the-number__main-content';

  // Left Side - Dynamic Image
  const imageSectionDiv = document.createElement('div');
  imageSectionDiv.className = 'stats-cmp-stats-by-the-number__image-section';

  // Right Side - Content and Stats
  const contentSectionDiv = document.createElement('div');
  contentSectionDiv.className = 'stats-cmp-stats-by-the-number__content-section';

  // Loop through tab rows
  const tabRows = [...block.children].slice(1);
  tabRows.forEach((tabRow, tabIndex) => {
    const cells = [...tabRow.children];
    const tabLabel = cells[0].textContent.trim();
    const imageLink = cells[1].querySelector('a');
    const description = cells[2].querySelector('div');
    const statsCardsContainer = cells[3];
    const ctaLink = cells[4].querySelector('a');

    // Tab Button
    const tabButton = document.createElement('button');
    tabButton.className = `stats-cmp-stats-by-the-number__tab${tabIndex === 0 ? ' stats-cmp-stats-by-the-number__tab--active' : ''}`;
    tabButton.setAttribute('data-tab', tabLabel);
    tabButton.setAttribute('data-tab-index', tabIndex);
    tabButton.textContent = tabLabel;
    tabsDiv.append(tabButton);
    moveInstrumentation(cells[0], tabButton);

    // Image Container
    const imageContainerDiv = document.createElement('div');
    imageContainerDiv.className = `stats-cmp-stats-by-the-number__image-container${tabIndex === 0 ? ' stats-cmp-stats-by-the-number__image-container--active' : ''}`;
    imageContainerDiv.setAttribute('data-tab-content', tabIndex);
    if (imageLink) {
      imageContainerDiv.setAttribute('data-image-path', imageLink.href);
      const img = imageLink.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.classList.add('stats-cmp-stats-by-the-number__main-image');
        optimizedPic.setAttribute('data-tab-image', tabIndex);
        if (tabIndex === 0) {
          optimizedPic.querySelector('img').style.opacity = '1';
        }
        imageContainerDiv.append(optimizedPic);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
      }
    }
    imageSectionDiv.append(imageContainerDiv);

    // Tab Content Container
    const tabContentDiv = document.createElement('div');
    tabContentDiv.className = `stats-cmp-stats-by-the-number__tab-content${tabIndex === 0 ? ' stats-cmp-stats-by-the-number__tab-content--active' : ''}`;
    tabContentDiv.setAttribute('data-tab-content', tabIndex);

    // Description
    if (description) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'stats-cmp-stats-by-the-number__description';
      descriptionDiv.append(...description.children);
      tabContentDiv.append(descriptionDiv);
      moveInstrumentation(cells[2], descriptionDiv);
    }

    // Stats Cards Grid
    const cardsDiv = document.createElement('div');
    cardsDiv.className = 'stats-cmp-stats-by-the-number__cards';
    cardsDiv.setAttribute('role', 'list');
    moveInstrumentation(statsCardsContainer, cardsDiv);

    [...statsCardsContainer.children].forEach((statCardRow) => {
      const statCardCells = [...statCardRow.children];
      const hoverImageLink = statCardCells[0].querySelector('a');
      const numberContent = statCardCells[1].querySelector('div');
      const descriptionContent = statCardCells[2].querySelector('div');
      const hoverDetailsContent = statCardCells[3].querySelector('div');

      const cardDiv = document.createElement('div');
      cardDiv.className = 'stats-cmp-stats-by-the-number__card';
      cardDiv.setAttribute('role', 'img');
      cardDiv.setAttribute('tabindex', '0');
      moveInstrumentation(statCardRow, cardDiv);

      if (hoverImageLink) {
        cardDiv.setAttribute('data-hover-image', hoverImageLink.href);
      }
      if (hoverDetailsContent) {
        cardDiv.setAttribute('data-hover-details', hoverDetailsContent.innerHTML);
      }

      // Construct aria-label for the card
      let ariaLabelText = '';
      if (numberContent) {
        ariaLabelText += numberContent.textContent.trim();
      }
      if (descriptionContent) {
        ariaLabelText += `: ${descriptionContent.textContent.trim()}`;
      }
      cardDiv.setAttribute('aria-label', ariaLabelText);

      if (numberContent) {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'stats-cmp-stats-by-the-number__card__number';
        numberDiv.setAttribute('data-count', numberContent.innerHTML);
        numberDiv.innerHTML = numberContent.innerHTML;
        cardDiv.append(numberDiv);
      }

      if (descriptionContent) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'stats-cmp-stats-by-the-number__card__description';
        descriptionDiv.innerHTML = descriptionContent.innerHTML;
        cardDiv.append(descriptionDiv);
      }
      cardsDiv.append(cardDiv);
    });
    tabContentDiv.append(cardsDiv);

    // Call to Action Button
    if (ctaLink) {
      const ctaDiv = document.createElement('div');
      ctaDiv.className = 'stats-cmp-stats-by-the-number__cta';
      const newCtaLink = document.createElement('a');
      newCtaLink.href = ctaLink.href;
      newCtaLink.className = 'stats-cta stats-cta__primary';
      newCtaLink.target = ctaLink.target;
      newCtaLink.setAttribute('aria-label', ctaLink.getAttribute('aria-label'));
      newCtaLink.setAttribute('data-palette', 'palette-1');

      const iconSpan = document.createElement('span');
      iconSpan.className = 'stats-cta__icon stats-qd-icon stats-qd-icon--cheveron-right';
      iconSpan.setAttribute('aria-hidden', 'true');
      newCtaLink.append(iconSpan);

      const labelSpan = document.createElement('span');
      labelSpan.className = 'stats-cta__label';
      labelSpan.textContent = ctaLink.textContent.trim();
      newCtaLink.append(labelSpan);

      ctaDiv.append(newCtaLink);
      tabContentDiv.append(ctaDiv);
      moveInstrumentation(cells[4], ctaDiv);
    }

    contentSectionDiv.append(tabContentDiv);
  });

  mainContentDiv.append(imageSectionDiv, contentSectionDiv);
  mainContainer.append(tabsDiv, mainContentDiv);

  block.textContent = '';
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Statistics by the numbers');
  block.classList.add('stats-cmp-stats-by-the-number', 'stats-animate-ready', 'stats-animate-in');
  block.append(mainContainer);

  // Add event listeners for tab functionality
  const tabButtons = block.querySelectorAll('.stats-cmp-stats-by-the-number__tab');
  const tabContents = block.querySelectorAll('.stats-cmp-stats-by-the-number__tab-content');
  const tabImages = block.querySelectorAll('.stats-cmp-stats-by-the-number__image-container');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabIndex = button.getAttribute('data-tab-index');

      // Deactivate all tabs and content
      tabButtons.forEach((btn) => btn.classList.remove('stats-cmp-stats-by-the-number__tab--active'));
      tabContents.forEach((content) => content.classList.remove('stats-cmp-stats-by-the-number__tab-content--active'));
      tabImages.forEach((image) => {
        image.classList.remove('stats-cmp-stats-by-the-number__image-container--active');
        const imgElement = image.querySelector('img');
        if (imgElement) {
          imgElement.style.opacity = '0';
        }
      });

      // Activate clicked tab and corresponding content/image
      button.classList.add('stats-cmp-stats-by-the-number__tab--active');
      block.querySelector(`.stats-cmp-stats-by-the-number__tab-content[data-tab-content="${tabIndex}"]`).classList.add('stats-cmp-stats-by-the-number__tab-content--active');
      const activeImageContainer = block.querySelector(`.stats-cmp-stats-by-the-number__image-container[data-tab-content="${tabIndex}"]`);
      activeImageContainer.classList.add('stats-cmp-stats-by-the-number__image-container--active');
      const activeImage = activeImageContainer.querySelector('img');
      if (activeImage) {
        activeImage.style.opacity = '1';
      }
    });
  });
}