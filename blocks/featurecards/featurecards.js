import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

  let headingAdded = false;

  [...block.children].forEach((row) => {
    // Check if the first row contains the heading
    if (!headingAdded && row.children.length === 1 && row.querySelector('h1')) {
      const textDiv = document.createElement('div');
      textDiv.classList.add('featurecards-featureCards-text');
      const h1 = row.querySelector('h1');
      if (h1) {
        textDiv.append(h1.cloneNode(true));
        block.before(textDiv);
        moveInstrumentation(row, textDiv);
        headingAdded = true;
      }
      return; // Skip this row as it's the heading
    }

    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.title = link.title;
      if (link.target) {
        newLink.target = link.target;
      }
      if (link.dataset.title) {
        newLink.setAttribute('data-title', link.dataset.title);
      }
      newLink.classList.add('featurecards-featureCards-bolteSitare_cardSection', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      moveInstrumentation(row, newLink);

      const imgDiv = document.createElement('div');
      imgDiv.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');

      const img = row.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('featurecards-featureCards-h-100', 'featurecards-featureCards-w-100', 'featurecards-featureCards-card-img');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imgDiv.append(optimizedPic);
      }
      newLink.append(imgDiv);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

      const textContentDiv = document.createElement('div');
      const title = row.querySelector('h2');
      if (title) {
        const newTitle = document.createElement('h2');
        newTitle.classList.add('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
        newTitle.textContent = title.textContent.trim();
        textContentDiv.append(newTitle);
        moveInstrumentation(title, newTitle);
      }

      const description = row.querySelector('p');
      if (description) {
        const newDescription = document.createElement('p');
        newDescription.classList.add('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
        newDescription.textContent = description.textContent.trim();
        textContentDiv.append(newDescription);
        moveInstrumentation(description, newDescription);
      }
      contentWrapper.append(textContentDiv);

      const buttonDiv = document.createElement('div');
      const button = row.querySelector('button');
      if (button) {
        const newButton = document.createElement('button');
        newButton.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
        newButton.textContent = button.textContent.trim();
        buttonDiv.append(newButton);
        moveInstrumentation(button, newButton);
      }
      contentWrapper.append(buttonDiv);
      newLink.append(contentWrapper);
      featureCardsContainer.append(newLink);
    }
  });

  block.textContent = '';
  block.append(featureCardsContainer);

  // Handle the last section with a single feature card
  const lastSection = block.querySelector('section.featurecards-featureCards-feature_card--Section');
  if (lastSection) {
    const newSection = document.createElement('section');
    newSection.classList.add('featurecards-featureCards-d-block', 'featurecards-featureCards-feature_card--Section', 'featurecards-featureCards-feature_card', 'featurecards-featureCards-mx-auto');
    moveInstrumentation(lastSection, newSection);

    const sectionLink = lastSection.querySelector('a');
    if (sectionLink) {
      const newSectionLink = document.createElement('a');
      newSectionLink.classList.add('featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      newSectionLink.href = sectionLink.href;
      newSectionLink.title = sectionLink.title;
      if (sectionLink.dataset.ctaLabel) {
        newSectionLink.setAttribute('data-cta-label', sectionLink.dataset.ctaLabel);
      }
      moveInstrumentation(sectionLink, newSectionLink);

      const sectionImgDiv = document.createElement('div');
      sectionImgDiv.classList.add('featurecards-featureCards-feature_card--image', 'featurecards-featureCards-w-100', 'featurecards-featureCards-pb-4');
      const sectionImg = sectionLink.querySelector('img');
      if (sectionImg) {
        const optimizedPic = createOptimizedPicture(sectionImg.src, sectionImg.alt);
        optimizedPic.querySelector('img').classList.add('featurecards-featureCards-w-100', 'featurecards-featureCards-h-100');
        moveInstrumentation(sectionImg, optimizedPic.querySelector('img'));
        sectionImgDiv.append(optimizedPic);
      }
      newSectionLink.append(sectionImgDiv);

      const sectionTextCenterDiv = document.createElement('div');
      sectionTextCenterDiv.classList.add('featurecards-featureCards-text-center');

      const sectionTitle = sectionLink.querySelector('h2');
      if (sectionTitle) {
        const newSectionTitle = document.createElement('h2');
        newSectionTitle.classList.add('featurecards-featureCards-feature_card--title', 'featurecards-featureCards-boing--text__heading-1');
        newSectionTitle.textContent = sectionTitle.textContent.trim();
        sectionTextCenterDiv.append(newSectionTitle);
        moveInstrumentation(sectionTitle, newSectionTitle);
      }

      const sectionPbDiv = document.createElement('div');
      sectionPbDiv.classList.add('featurecards-featureCards-pb-5');
      const sectionDesc = sectionLink.querySelector('p');
      if (sectionDesc) {
        const newSectionDesc = document.createElement('p');
        newSectionDesc.classList.add('featurecards-featureCards-feature_card--desc', 'featurecards-featureCards-boing--text__body-2', 'featurecards-featureCards-text-boing-dark');
        newSectionDesc.textContent = sectionDesc.textContent.trim();
        sectionPbDiv.append(newSectionDesc);
        moveInstrumentation(sectionDesc, newSectionDesc);
      }
      sectionTextCenterDiv.append(sectionPbDiv);

      const redirectedBtnDiv = document.createElement('div');
      redirectedBtnDiv.classList.add('featurecards-featureCards-redirected_btn', 'featurecards-featureCards-d-none');
      const sectionButton = sectionLink.querySelector('button');
      if (sectionButton) {
        const newSectionButton = document.createElement('button');
        newSectionButton.type = 'button';
        newSectionButton.role = 'button';
        newSectionButton.classList.add('featurecards-featureCards-arrow-icon-btn');
        newSectionButton.textContent = sectionButton.textContent.trim();
        redirectedBtnDiv.append(newSectionButton);
        moveInstrumentation(sectionButton, newSectionButton);
      }
      sectionTextCenterDiv.append(redirectedBtnDiv);
      newSectionLink.append(sectionTextCenterDiv);
      newSection.append(newSectionLink);
      block.append(newSection);
    }
    lastSection.remove(); // Remove the original section after processing
  }

  // Remove any remaining empty divs or unwanted elements from the original block
  block.querySelectorAll('div:empty').forEach(div => {
    if (div.children.length === 0 && div.textContent.trim() === '') {
      div.remove();
    }
  });

  // Handle the curve container if it exists
  const curveContainer = block.querySelector('.featurecards-featureCards-curve-container');
  if (curveContainer) {
    const newCurveContainer = document.createElement('div');
    newCurveContainer.classList.add('featurecards-featureCards-curve-container', 'featurecards-featureCards-d-none');
    block.append(newCurveContainer);
    moveInstrumentation(curveContainer, newCurveContainer);
    curveContainer.remove();
  }
}