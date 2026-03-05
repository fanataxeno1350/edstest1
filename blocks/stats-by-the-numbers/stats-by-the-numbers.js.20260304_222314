import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('div');
  mainContainer.className = 'stats-cmp-stats-by-the-number__container';

  // Title Section
  const titleRow = block.children[0];
  const titleDiv = document.createElement('div');
  titleDiv.className = 'stats-cmp-stats-by-the-number__title';
  const h2 = titleRow.querySelector('h2');
  if (h2) {
    titleDiv.append(h2);
  }
  moveInstrumentation(titleRow, titleDiv);
  mainContainer.append(titleDiv);

  // Tabs and Content Section
  const tabsDiv = document.createElement('div');
  tabsDiv.className = 'stats-cmp-stats-by-the-number__tabs';

  const mainContentDiv = document.createElement('div');
  mainContentDiv.className = 'stats-cmp-stats-by-the-number__main-content';

  const imageSectionDiv = document.createElement('div');
  imageSectionDiv.className = 'stats-cmp-stats-by-the-number__image-section';

  const contentSectionDiv = document.createElement('div');
  contentSectionDiv.className = 'stats-cmp-stats-by-the-number__content-section';

  // Loop through tab rows
  [...block.children].slice(1).forEach((row, i) => {
    const cells = [...row.children];
    if (cells.length === 0) return;

    // Tab Button
    const tabLabel = cells[0].textContent.trim();
    const tabButton = document.createElement('button');
    tabButton.className = `stats-cmp-stats-by-the-number__tab${i === 0 ? ' stats-cmp-stats-by-the-number__tab--active' : ''}`;
    tabButton.setAttribute('data-tab', tabLabel);
    tabButton.setAttribute('data-tab-index', i);
    tabButton.textContent = tabLabel;
    moveInstrumentation(cells[0], tabButton);
    tabsDiv.append(tabButton);

    // Image Container
    const imageCell = cells[1];
    const imageContainer = document.createElement('div');
    imageContainer.className = `stats-cmp-stats-by-the-number__image-container${i === 0 ? ' stats-cmp-stats-by-the-number__image-container--active' : ''}`;
    imageContainer.setAttribute('data-tab-content', i);
    const img = imageCell.querySelector('img');
    if (img) {
      imageContainer.setAttribute('data-image-path', img.src);
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      optimizedPic.querySelector('img').className = 'stats-cmp-stats-by-the-number__main-image';
      optimizedPic.querySelector('img').setAttribute('data-tab-image', i);
      if (i === 0) {
        optimizedPic.querySelector('img').style.opacity = '1';
      }
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageContainer.append(optimizedPic);
    }
    moveInstrumentation(imageCell, imageContainer);
    imageSectionDiv.append(imageContainer);

    // Tab Content Container
    const tabContentDiv = document.createElement('div');
    tabContentDiv.className = `stats-cmp-stats-by-the-number__tab-content${i === 0 ? ' stats-cmp-stats-by-the-number__tab-content--active' : ''}`;
    tabContentDiv.setAttribute('data-tab-content', i);
    moveInstrumentation(row, tabContentDiv); // Transfer instrumentation for the whole tab content

    // Description
    const descriptionCell = cells[2];
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'stats-cmp-stats-by-the-number__description';
    const descriptionP = descriptionCell.querySelector('p');
    if (descriptionP) {
      descriptionDiv.append(descriptionP);
    }
    moveInstrumentation(descriptionCell, descriptionDiv);
    tabContentDiv.append(descriptionDiv);

    // Stats Cards Grid
    const statCardsDiv = document.createElement('div');
    statCardsDiv.className = 'stats-cmp-stats-by-the-number__cards';
    statCardsDiv.setAttribute('role', 'list');

    // Stat Cards
    const statCardCells = cells.slice(3, cells.length - 2); // Assuming CTA is the last two cells
    statCardCells.forEach((statCardCell) => {
      const statCardDiv = document.createElement('div');
      statCardDiv.className = 'stats-cmp-stats-by-the-number__card';
      statCardDiv.setAttribute('role', 'img');
      statCardDiv.setAttribute('tabindex', '0');

      const numberP = statCardCell.querySelector('.stats-cmp-stats-by-the-number__card__number p');
      const descriptionP = statCardCell.querySelector('.stats-cmp-stats-by-the-number__card__description p');

      if (numberP && descriptionP) {
        statCardDiv.setAttribute('aria-label', `${numberP.textContent.trim()}: ${descriptionP.textContent.trim()}`);
      }

      const hoverImage = statCardCell.querySelector('[data-hover-image]');
      if (hoverImage) {
        statCardDiv.setAttribute('data-hover-image', hoverImage.dataset.hoverImage);
      }
      const hoverDetails = statCardCell.querySelector('[data-hover-details]');
      if (hoverDetails) {
        statCardDiv.setAttribute('data-hover-details', hoverDetails.dataset.hoverDetails);
      }

      const numberDiv = statCardCell.querySelector('.stats-cmp-stats-by-the-number__card__number');
      if (numberDiv) {
        statCardDiv.append(numberDiv);
      }
      const descriptionCardDiv = statCardCell.querySelector('.stats-cmp-stats-by-the-number__card__description');
      if (descriptionCardDiv) {
        statCardDiv.append(descriptionCardDiv);
      }
      moveInstrumentation(statCardCell, statCardDiv);
      statCardsDiv.append(statCardDiv);
    });
    tabContentDiv.append(statCardsDiv);

    // Call to Action Button
    const ctaCell = cells[cells.length - 1];
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'stats-cmp-stats-by-the-number__cta';
    const ctaLink = ctaCell.querySelector('a');
    if (ctaLink) {
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

      moveInstrumentation(ctaLink, newCtaLink);
      ctaDiv.append(newCtaLink);
    }
    moveInstrumentation(ctaCell, ctaDiv);
    tabContentDiv.append(ctaDiv);

    contentSectionDiv.append(tabContentDiv);
  });

  mainContentDiv.append(imageSectionDiv);
  mainContentDiv.append(contentSectionDiv);

  mainContainer.append(tabsDiv);
  mainContainer.append(mainContentDiv);

  block.textContent = '';
  block.append(mainContainer);

  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Statistics by the numbers');
  block.classList.add('stats-cmp-stats-by-the-number', 'stats-animate-ready', 'stats-animate-in');

  // Add event listeners for tab switching
  const tabButtons = block.querySelectorAll('.stats-cmp-stats-by-the-number__tab');
  const tabContents = block.querySelectorAll('.stats-cmp-stats-by-the-number__tab-content');
  const tabImages = block.querySelectorAll('.stats-cmp-stats-by-the-number__image-container');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabIndex = button.dataset.tabIndex;

      // Deactivate all tabs and content
      tabButtons.forEach((btn) => btn.classList.remove('stats-cmp-stats-by-the-number__tab--active'));
      tabContents.forEach((content) => content.classList.remove('stats-cmp-stats-by-the-number__tab-content--active'));
      tabImages.forEach((image) => {
        image.classList.remove('stats-cmp-stats-by-the-number__image-container--active');
        image.querySelector('img').style.opacity = '0';
      });

      // Activate selected tab and content
      button.classList.add('stats-cmp-stats-by-the-number__tab--active');
      block.querySelector(`.stats-cmp-stats-by-the-number__tab-content[data-tab-content="${tabIndex}"]`).classList.add('stats-cmp-stats-by-the-number__tab-content--active');
      const activeImageContainer = block.querySelector(`.stats-cmp-stats-by-the-number__image-container[data-tab-content="${tabIndex}"]`);
      activeImageContainer.classList.add('stats-cmp-stats-by-the-number__image-container--active');
      activeImageContainer.querySelector('img').style.opacity = '1';
    });
  });
}
