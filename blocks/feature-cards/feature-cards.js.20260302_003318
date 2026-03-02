import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('feature-cards-container');

  // Process the title div if it exists
  const titleDiv = block.querySelector('.feature-cards-featureCards-text');
  if (titleDiv) {
    const newTitleDiv = document.createElement('div');
    moveInstrumentation(titleDiv, newTitleDiv);
    newTitleDiv.classList.add('feature-cards-featureCards-text');
    const h1 = titleDiv.querySelector('h1');
    if (h1) {
      const newH1 = document.createElement('h1');
      newH1.style.textAlign = h1.style.textAlign;
      newH1.innerHTML = h1.innerHTML;
      newTitleDiv.append(newH1);
    }
    featureCardsContainer.append(newTitleDiv);
  }

  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.classList.add('feature-cards-wrapper');

  // Process the main feature cards (sections)
  const sections = [...block.querySelectorAll('section.feature-cards-feature_card--Section')];
  sections.forEach((section) => {
    const newSection = document.createElement('section');
    moveInstrumentation(section, newSection);
    newSection.classList.add('feature-cards-d-block', 'feature-cards-feature_card--Section', 'feature-cards-feature_card', 'feature-cards-mx-auto');

    const link = section.querySelector('a.feature-cards-analytics_cta_click');
    if (link) {
      const newLink = document.createElement('a');
      moveInstrumentation(link, newLink);
      newLink.classList.add('feature-cards-d-flex', 'feature-cards-flex-column', 'feature-cards-analytics_cta_click', 'feature-cards-text-decoration-none');
      newLink.href = link.href;
      if (link.title) newLink.title = link.title;
      if (link.target) newLink.target = link.target;
      if (link.dataset.ctaLabel) newLink.dataset.ctaLabel = link.dataset.ctaLabel;

      const imageDiv = link.querySelector('.feature-cards-feature_card--image');
      if (imageDiv) {
        const newImageDiv = document.createElement('div');
        newImageDiv.classList.add('feature-cards-feature_card--image', 'feature-cards-w-100', 'feature-cards-pb-4');
        const img = imageDiv.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          newImageDiv.append(optimizedPic);
        }
        newLink.append(newImageDiv);
      }

      const textCenterDiv = link.querySelector('.feature-cards-text-center');
      if (textCenterDiv) {
        const newTextCenterDiv = document.createElement('div');
        newTextCenterDiv.classList.add('feature-cards-text-center');

        const title = textCenterDiv.querySelector('.feature-cards-feature_card--title');
        if (title) {
          const newTitle = document.createElement('h2');
          newTitle.classList.add('feature-cards-feature_card--title', 'feature-cards-boing--text__heading-1');
          newTitle.textContent = title.textContent.trim();
          newTextCenterDiv.append(newTitle);
        }

        const pb5Div = textCenterDiv.querySelector('.feature-cards-pb-5');
        if (pb5Div) {
          const newPb5Div = document.createElement('div');
          newPb5Div.classList.add('feature-cards-pb-5');
          const desc = pb5Div.querySelector('.feature-cards-feature_card--desc');
          if (desc) {
            const newDesc = document.createElement('p');
            newDesc.classList.add('feature-cards-feature_card--desc', 'feature-cards-boing--text__body-2', 'feature-cards-text-boing-dark');
            newDesc.textContent = desc.textContent.trim();
            newPb5Div.append(newDesc);
          }
          newTextCenterDiv.append(newPb5Div);
        }

        const redirectedBtnDiv = textCenterDiv.querySelector('.feature-cards-redirected_btn');
        if (redirectedBtnDiv) {
          const newRedirectedBtnDiv = document.createElement('div');
          newRedirectedBtnDiv.classList.add('feature-cards-redirected_btn', 'feature-cards-d-none');
          const button = redirectedBtnDiv.querySelector('button');
          if (button) {
            const newButton = document.createElement('button');
            newButton.type = 'button';
            newButton.role = 'button';
            newButton.classList.add('feature-cards-arrow-icon-btn');
            newButton.textContent = button.textContent.trim();
            newRedirectedBtnDiv.append(newButton);
          }
          newTextCenterDiv.append(newRedirectedBtnDiv);
        }
        newLink.append(newTextCenterDiv);
      }
      newSection.append(newLink);
    }
    featureCardsWrapper.append(newSection);
  });

  // Process the bolteSitare cards (d-none by default)
  const bolteSitareLinks = [...block.querySelectorAll('a.feature-cards-bolteSitare_cardSection')];
  bolteSitareLinks.forEach((link) => {
    const newLink = document.createElement('a');
    moveInstrumentation(link, newLink);
    newLink.classList.add('feature-cards-d-none', 'feature-cards-bolteSitare_cardSection', 'feature-cards-analytics_cta_click', 'feature-cards-text-decoration-none');
    newLink.href = link.href;
    if (link.title) newLink.title = link.title;
    if (link.target) newLink.target = link.target;
    if (link.dataset.title) newLink.dataset.title = link.dataset.title;

    const wrapperDiv = link.querySelector('.feature-cards-bolteSitare_cardSection--wrapper');
    if (wrapperDiv) {
      const newWrapperDiv = document.createElement('div');
      newWrapperDiv.classList.add('feature-cards-d-flex', 'feature-cards-bolteSitare_cardSection--wrapper');

      const imgDiv = wrapperDiv.querySelector('.feature-cards-bolteSitare_cardSection--img');
      if (imgDiv) {
        const newImgDiv = document.createElement('div');
        newImgDiv.classList.add('feature-cards-bolteSitare_cardSection--img');
        const img = imgDiv.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          newImgDiv.append(optimizedPic);
        }
        newWrapperDiv.append(newImgDiv);
      }

      const contentWrapperDiv = wrapperDiv.querySelector('.feature-cards-content-wrapper');
      if (contentWrapperDiv) {
        const newContentWrapperDiv = document.createElement('div');
        newContentWrapperDiv.classList.add('feature-cards-content-wrapper', 'feature-cards-d-flex', 'feature-cards-flex-column', 'feature-cards-justify-content-between');

        const textDiv = contentWrapperDiv.firstElementChild;
        if (textDiv) {
          const newTextDiv = document.createElement('div');
          const title = textDiv.querySelector('.feature-cards-bolteSitare_cardSection--title');
          if (title) {
            const newTitle = document.createElement('h2');
            newTitle.classList.add('feature-cards-bolteSitare_cardSection--title', 'feature-cards-boing--text__heading-3', 'feature-cards-text-boing-dark');
            newTitle.textContent = title.textContent.trim();
            newTextDiv.append(newTitle);
          }
          const desc = textDiv.querySelector('.feature-cards-bolteSitare_cardSection--text');
          if (desc) {
            const newDesc = document.createElement('p');
            newDesc.classList.add('feature-cards-bolteSitare_cardSection--text', 'feature-cards-boing--text__body-3', 'feature-cards-text-boing-dark');
            newDesc.textContent = desc.textContent.trim();
            newTextDiv.append(newDesc);
          }
          newContentWrapperDiv.append(newTextDiv);
        }

        const buttonDiv = contentWrapperDiv.lastElementChild;
        if (buttonDiv) {
          const newButtonDiv = document.createElement('div');
          const button = buttonDiv.querySelector('.feature-cards-bolteSitare_cardSection--btn');
          if (button) {
            const newButton = document.createElement('button');
            newButton.classList.add('feature-cards-bolteSitare_cardSection--btn', 'feature-cards-text-white', 'feature-cards-boing--text__body-4', 'feature-cards-d-inline-block');
            newButton.textContent = button.textContent.trim();
            newButtonDiv.append(newButton);
          }
          newContentWrapperDiv.append(newButtonDiv);
        }
        newWrapperDiv.append(newContentWrapperDiv);
      }
      newLink.append(newWrapperDiv);
    }
    featureCardsWrapper.append(newLink);
  });

  featureCardsContainer.append(featureCardsWrapper);

  // Process the curve container
  const curveContainer = block.querySelector('.feature-cards-curve-container');
  if (curveContainer) {
    const newCurveContainer = document.createElement('div');
    moveInstrumentation(curveContainer, newCurveContainer);
    newCurveContainer.classList.add('feature-cards-curve-container', 'feature-cards-d-none');
    featureCardsContainer.append(newCurveContainer);
  }

  block.textContent = '';
  block.append(featureCardsContainer);
}
