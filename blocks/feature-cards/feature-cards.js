import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

  // Handle the initial heading if present
  const firstRow = block.children[0];
  if (firstRow && firstRow.children.length === 1 && firstRow.querySelector('h1')) {
    const headingDiv = document.createElement('div');
    headingDiv.classList.add('featurecards-featureCards-text');
    const h1 = firstRow.querySelector('h1');
    if (h1) {
      headingDiv.append(h1.cloneNode(true));
      moveInstrumentation(h1, headingDiv.querySelector('h1'));
      block.append(headingDiv);
    }
  }

  // Loop through each row in the block (each feature card)
  [...block.children].forEach((row, index) => {
    // Skip the first row if it was a heading and already processed
    if (index === 0 && row.children.length === 1 && row.querySelector('h1')) {
      return;
    }

    const linkElement = row.querySelector('a');
    if (!linkElement) return; // Skip if no link is found for the card

    const anchor = document.createElement('a');
    moveInstrumentation(linkElement, anchor); // Transfer instrumentation from the original link
    anchor.classList.add('featurecards-featureCards-bolteSitare_cardSection', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
    anchor.href = linkElement.href;
    if (linkElement.title) anchor.title = linkElement.title;
    if (linkElement.dataset.title) anchor.dataset.title = linkElement.dataset.title;
    if (linkElement.target) anchor.target = linkElement.target;

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
    const img = row.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('featurecards-featureCards-h-100', 'featurecards-featureCards-w-100', 'featurecards-featureCards-card-img');
      imgWrapper.append(optimizedPic);
    }
    anchor.append(imgWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

    const textContentDiv = document.createElement('div');
    const title = row.querySelector('h2');
    if (title) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
      h2.textContent = title.textContent.trim();
      moveInstrumentation(title, h2);
      textContentDiv.append(h2);
    }

    const description = row.querySelector('p');
    if (description) {
      const p = document.createElement('p');
      p.classList.add('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
      p.textContent = description.textContent.trim();
      moveInstrumentation(description, p);
      textContentDiv.append(p);
    }
    contentWrapper.append(textContentDiv);

    const buttonDiv = document.createElement('div');
    const button = row.querySelector('button');
    if (button) {
      const newButton = document.createElement('button');
      newButton.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
      newButton.textContent = button.textContent.trim();
      moveInstrumentation(button, newButton);
      buttonDiv.append(newButton);
    }
    contentWrapper.append(buttonDiv);

    anchor.append(contentWrapper);
    mainDiv.append(anchor);
  });

  block.textContent = '';
  block.append(mainDiv);

  // Handle the curve container and feature_card--Section if they exist in the original block
  const curveContainer = block.querySelector('.featurecards-featureCards-curve-container');
  if (curveContainer) {
    block.append(curveContainer.cloneNode(true));
    moveInstrumentation(curveContainer, block.lastElementChild);
  }

  const featureCardSection = block.querySelector('.featurecards-featureCards-feature_card--Section');
  if (featureCardSection) {
    const section = document.createElement('section');
    section.classList.add('featurecards-featureCards-d-block', 'featurecards-featureCards-feature_card--Section', 'featurecards-featureCards-feature_card', 'featurecards-featureCards-mx-auto');
    moveInstrumentation(featureCardSection, section);

    const link = featureCardSection.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.classList.add('featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      newLink.href = link.href;
      if (link.title) newLink.title = link.title;
      if (link.dataset.ctaLabel) newLink.dataset.ctaLabel = link.dataset.ctaLabel;
      moveInstrumentation(link, newLink);

      const imageDiv = document.createElement('div');
      imageDiv.classList.add('featurecards-featureCards-feature_card--image', 'featurecards-featureCards-w-100', 'featurecards-featureCards-pb-4');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('featurecards-featureCards-w-100', 'featurecards-featureCards-h-100');
        imageDiv.append(optimizedPic);
      }
      newLink.append(imageDiv);

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('featurecards-featureCards-text-center');

      const h2 = link.querySelector('h2');
      if (h2) {
        const newH2 = document.createElement('h2');
        newH2.classList.add('featurecards-featureCards-feature_card--title', 'featurecards-featureCards-boing--text__heading-1');
        newH2.textContent = h2.textContent.trim();
        moveInstrumentation(h2, newH2);
        textCenterDiv.append(newH2);
      }

      const pb5Div = document.createElement('div');
      pb5Div.classList.add('featurecards-featureCards-pb-5');
      const p = link.querySelector('p');
      if (p) {
        const newP = document.createElement('p');
        newP.classList.add('featurecards-featureCards-feature_card--desc', 'featurecards-featureCards-boing--text__body-2', 'featurecards-featureCards-text-boing-dark');
        newP.textContent = p.textContent.trim();
        moveInstrumentation(p, newP);
        pb5Div.append(newP);
      }
      textCenterDiv.append(pb5Div);

      const redirectedBtnDiv = link.querySelector('.featurecards-featureCards-redirected_btn');
      if (redirectedBtnDiv) {
        textCenterDiv.append(redirectedBtnDiv.cloneNode(true));
        moveInstrumentation(redirectedBtnDiv, textCenterDiv.lastElementChild);
      }
      newLink.append(textCenterDiv);
      section.append(newLink);
    }
    block.append(section);
  }
}
