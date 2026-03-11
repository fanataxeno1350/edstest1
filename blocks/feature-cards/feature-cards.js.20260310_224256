import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('featurecards-featureCards-d-block', 'featurecards-featureCards-feature_card--Section', 'featurecards-featureCards-feature_card', 'featurecards-featureCards-mx-auto');

  let titleAdded = false;

  [...block.children].forEach((row, index) => {
    // Check if the first row contains the title
    if (index === 0 && row.children.length === 1 && row.querySelector('h1')) {
      const textDiv = document.createElement('div');
      textDiv.classList.add('featurecards-featureCards-text');
      const h1 = row.querySelector('h1');
      if (h1) {
        textDiv.append(h1);
        block.prepend(textDiv);
        moveInstrumentation(row, textDiv);
        titleAdded = true;
      }
      return; // Skip processing this row further as it's the title
    }

    const link = row.querySelector('a');
    if (!link) return; // Skip if no link is found in the row

    const cardLink = document.createElement('a');
    cardLink.classList.add('featurecards-featureCards-bolteSitare_cardSection', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
    cardLink.href = link.href;
    cardLink.title = link.title;
    if (link.dataset.title) {
      cardLink.dataset.title = link.dataset.title;
    }
    if (link.target) {
      cardLink.target = link.target;
    }

    moveInstrumentation(row, cardLink); // Transfer instrumentation from the original row to the new link

    const cells = [...row.children];

    // Extract content from the cells
    const imageCell = cells[0];
    const contentCell = cells[1];

    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imgWrapper.append(optimizedPic);
        cardLink.append(imgWrapper);
      }
    }

    if (contentCell) {
      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

      const textContentDiv = document.createElement('div');

      const h2 = contentCell.querySelector('h2');
      if (h2) {
        h2.classList.add('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
        textContentDiv.append(h2);
      }

      const p = contentCell.querySelector('p');
      if (p) {
        p.classList.add('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
        textContentDiv.append(p);
      }
      contentWrapper.append(textContentDiv);

      const buttonDiv = document.createElement('div');
      const button = contentCell.querySelector('button');
      if (button) {
        button.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
        buttonDiv.append(button);
      }
      contentWrapper.append(buttonDiv);
    }

    featureCardsContainer.append(cardLink);
  });

  // Handle the last section with a single feature card structure
  const lastRow = block.children[block.children.length - 1];
  if (lastRow && lastRow.querySelector('section.featurecards-featureCards-feature_card--Section')) {
    const originalSection = lastRow.querySelector('section.featurecards-featureCards-feature_card--Section');
    const originalLink = originalSection.querySelector('a');

    if (originalLink) {
      const newLink = document.createElement('a');
      newLink.classList.add('featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      newLink.href = originalLink.href;
      newLink.title = originalLink.title;
      if (originalLink.dataset.ctaLabel) {
        newLink.dataset.ctaLabel = originalLink.dataset.ctaLabel;
      }

      moveInstrumentation(originalLink, newLink);

      const imageDiv = originalLink.querySelector('.featurecards-featureCards-feature_card--image');
      if (imageDiv) {
        const img = imageDiv.querySelector('img');
        if (img) {
          const newImageDiv = document.createElement('div');
          newImageDiv.classList.add('featurecards-featureCards-feature_card--image', 'featurecards-featureCards-w-100', 'featurecards-featureCards-pb-4');
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          newImageDiv.append(optimizedPic);
          newLink.append(newImageDiv);
        }
      }

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('featurecards-featureCards-text-center');

      const h2 = originalLink.querySelector('.featurecards-featureCards-feature_card--title');
      if (h2) {
        h2.classList.add('featurecards-featureCards-feature_card--title', 'featurecards-featureCards-boing--text__heading-1');
        textCenterDiv.append(h2);
      }

      const pb5Div = document.createElement('div');
      pb5Div.classList.add('featurecards-featureCards-pb-5');
      const p = originalLink.querySelector('.featurecards-featureCards-feature_card--desc');
      if (p) {
        p.classList.add('featurecards-featureCards-feature_card--desc', 'featurecards-featureCards-boing--text__body-2', 'featurecards-featureCards-text-boing-dark');
        pb5Div.append(p);
      }
      textCenterDiv.append(pb5Div);

      const redirectedBtnDiv = originalLink.querySelector('.featurecards-featureCards-redirected_btn');
      if (redirectedBtnDiv) {
        textCenterDiv.append(redirectedBtnDiv);
      }
      newLink.append(textCenterDiv);
      sectionContainer.append(newLink);
    }
  }

  block.textContent = '';

  if (titleAdded) {
    // The title is already prepended to the block
  }

  block.append(featureCardsContainer);
  block.append(sectionContainer);

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-featureCards-curve-container', 'featurecards-featureCards-d-none');
  block.append(curveContainer);
}
