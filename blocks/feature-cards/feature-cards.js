import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main container for the feature cards
  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

  // Get the optional heading if it exists
  const headingDiv = block.querySelector('.featurecards-featureCards-text');
  if (headingDiv) {
    const newHeadingDiv = document.createElement('div');
    newHeadingDiv.classList.add('featurecards-featureCards-text');
    moveInstrumentation(headingDiv, newHeadingDiv);
    const h1 = headingDiv.querySelector('h1');
    if (h1) {
      const newH1 = document.createElement('h1');
      newH1.style.textAlign = h1.style.textAlign;
      newH1.innerHTML = h1.innerHTML;
      newHeadingDiv.append(newH1);
    }
    block.append(newHeadingDiv);
  }

  // Process each row (which represents a feature card)
  [...block.children].forEach((row) => {
    // Skip the heading div if it was processed already
    if (row.classList.contains('featurecards-featureCards-text')) {
      return;
    }
    
    // The row itself might be an anchor or contain an anchor
    const linkElement = row.querySelector('a') || row;
    if (linkElement.tagName === 'A' || linkElement.querySelector('a')) {
      const originalLink = linkElement.tagName === 'A' ? linkElement : linkElement.querySelector('a');

      const newLink = document.createElement('a');
      newLink.classList.add('featurecards-featureCards-bolteSitare_cardSection', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      newLink.href = originalLink.href;
      newLink.title = originalLink.title;
      if (originalLink.dataset.title) {
        newLink.dataset.title = originalLink.dataset.title;
      }
      if (originalLink.target) {
        newLink.target = originalLink.target;
      }

      moveInstrumentation(originalLink, newLink);

      // Image section
      const imgDiv = originalLink.querySelector('.featurecards-featureCards-bolteSitare_cardSection--img');
      if (imgDiv) {
        const newImgDiv = document.createElement('div');
        newImgDiv.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
        const img = imgDiv.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('featurecards-featureCards-h-100', 'featurecards-featureCards-w-100', 'featurecards-featureCards-card-img');
          newImgDiv.append(optimizedPic);
        }
        newLink.append(newImgDiv);
      }

      // Content wrapper
      const contentWrapper = originalLink.querySelector('.featurecards-featureCards-content-wrapper');
      if (contentWrapper) {
        const newContentWrapper = document.createElement('div');
        newContentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

        const textContentDiv = document.createElement('div');

        const title = contentWrapper.querySelector('.featurecards-featureCards-bolteSitare_cardSection--title');
        if (title) {
          const newTitle = document.createElement('h2');
          newTitle.classList.add('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
          newTitle.textContent = title.textContent.trim();
          textContentDiv.append(newTitle);
        }

        const description = contentWrapper.querySelector('.featurecards-featureCards-bolteSitare_cardSection--text');
        if (description) {
          const newDescription = document.createElement('p');
          newDescription.classList.add('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
          newDescription.textContent = description.textContent.trim();
          textContentDiv.append(newDescription);
        }
        newContentWrapper.append(textContentDiv);

        const buttonDiv = contentWrapper.querySelector('div:last-child'); // Assuming button is in the last div
        if (buttonDiv) {
          const newButtonDiv = document.createElement('div');
          const button = buttonDiv.querySelector('.featurecards-featureCards-bolteSitare_cardSection--btn');
          if (button) {
            const newButton = document.createElement('button');
            newButton.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
            newButton.textContent = button.textContent.trim();
            newButtonDiv.append(newButton);
          }
          newContentWrapper.append(newButtonDiv);
        }
        newLink.append(newContentWrapper);
      }
      featureCardsWrapper.append(newLink);
    }
  });

  // Clear the block and append the new structure
  block.textContent = '';
  // Re-append the heading if it existed
  const existingHeading = block.querySelector('.featurecards-featureCards-text');
  if (existingHeading) {
    block.append(existingHeading);
  }
  block.append(featureCardsWrapper);

  // Handle the section with class feature_card--Section separately if it exists
  const featureCardSection = block.querySelector('.featurecards-featureCards-feature_card--Section');
  if (featureCardSection) {
    const newFeatureCardSection = document.createElement('section');
    newFeatureCardSection.classList.add('featurecards-featureCards-d-block', 'featurecards-featureCards-feature_card--Section', 'featurecards-featureCards-feature_card', 'featurecards-featureCards-mx-auto');
    moveInstrumentation(featureCardSection, newFeatureCardSection);

    const originalLink = featureCardSection.querySelector('a');
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
        const newImageDiv = document.createElement('div');
        newImageDiv.classList.add('featurecards-featureCards-feature_card--image', 'featurecards-featureCards-w-100', 'featurecards-featureCards-pb-4');
        const img = imageDiv.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('featurecards-featureCards-w-100', 'featurecards-featureCards-h-100');
          newImageDiv.append(optimizedPic);
        }
        newLink.append(newImageDiv);
      }

      const textCenterDiv = originalLink.querySelector('.featurecards-featureCards-text-center');
      if (textCenterDiv) {
        const newTextCenterDiv = document.createElement('div');
        newTextCenterDiv.classList.add('featurecards-featureCards-text-center');

        const title = textCenterDiv.querySelector('.featurecards-featureCards-feature_card--title');
        if (title) {
          const newTitle = document.createElement('h2');
          newTitle.classList.add('featurecards-featureCards-feature_card--title', 'featurecards-featureCards-boing--text__heading-1');
          newTitle.textContent = title.textContent.trim();
          newTextCenterDiv.append(newTitle);
        }

        const pb5Div = textCenterDiv.querySelector('.featurecards-featureCards-pb-5');
        if (pb5Div) {
          const newPb5Div = document.createElement('div');
          newPb5Div.classList.add('featurecards-featureCards-pb-5');
          const description = pb5Div.querySelector('.featurecards-featureCards-feature_card--desc');
          if (description) {
            const newDescription = document.createElement('p');
            newDescription.classList.add('featurecards-featureCards-feature_card--desc', 'featurecards-featureCards-boing--text__body-2', 'featurecards-featureCards-text-boing-dark');
            newDescription.textContent = description.textContent.trim();
            newPb5Div.append(newDescription);
          }
          newTextCenterDiv.append(newPb5Div);
        }

        const redirectedBtnDiv = textCenterDiv.querySelector('.featurecards-featureCards-redirected_btn');
        if (redirectedBtnDiv) {
          const newRedirectedBtnDiv = document.createElement('div');
          newRedirectedBtnDiv.classList.add('featurecards-featureCards-redirected_btn', 'featurecards-featureCards-d-none');
          const button = redirectedBtnDiv.querySelector('button');
          if (button) {
            const newButton = document.createElement('button');
            newButton.type = 'button';
            newButton.role = 'button';
            newButton.classList.add('featurecards-featureCards-arrow-icon-btn');
            newButton.textContent = button.textContent.trim();
            newRedirectedBtnDiv.append(newButton);
          }
          newTextCenterDiv.append(newRedirectedBtnDiv);
        }
        newLink.append(newTextCenterDiv);
      }
      newFeatureCardSection.append(newLink);
    }
    block.append(newFeatureCardSection);
  }

  // Remove any remaining original elements that were not processed or moved
  const originalChildren = [...block.children];
  originalChildren.forEach(child => {
    if (!child.classList.contains('featurecards-featureCards-text') && !child.classList.contains('featurecards-featureCards-bolteSitare_cardSection--wrapper') && !child.classList.contains('featurecards-featureCards-feature_card--Section')) {
      child.remove();
    }
  });

  // Handle the curve-container if it exists
  const curveContainer = block.querySelector('.featurecards-featureCards-curve-container');
  if (curveContainer) {
    const newCurveContainer = document.createElement('div');
    newCurveContainer.classList.add('featurecards-featureCards-curve-container', 'featurecards-featureCards-d-none');
    moveInstrumentation(curveContainer, newCurveContainer);
    block.append(newCurveContainer);
  }
}
