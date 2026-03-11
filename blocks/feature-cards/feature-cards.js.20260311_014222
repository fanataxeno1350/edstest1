import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('featurecards-featureCards-d-block', 'featurecards-featureCards-feature_card--Section', 'featurecards-featureCards-feature_card', 'featurecards-featureCards-mx-auto');

  let hasTitle = false;

  [...block.children].forEach((row, rowIndex) => {
    // Check for the title row first
    if (rowIndex === 0 && row.children.length === 1) {
      const titleCell = row.children[0];
      const titleDiv = titleCell.querySelector('div.featurecards-featureCards-text');
      if (titleDiv) {
        const h1 = titleDiv.querySelector('h1');
        if (h1) {
          const textDiv = document.createElement('div');
          textDiv.classList.add('featurecards-featureCards-text');
          const newH1 = document.createElement('h1');
          newH1.innerHTML = h1.innerHTML;
          if (h1.style.textAlign) {
            newH1.style.textAlign = h1.style.textAlign;
          }
          textDiv.append(newH1);
          block.append(textDiv);
          hasTitle = true;
        }
      }
      return; // Skip this row as it's the title
    }

    const cells = [...row.children];
    const link = cells[0].querySelector('a');

    if (link) {
      const newLink = document.createElement('a');
      moveInstrumentation(link, newLink);
      newLink.href = link.href;
      newLink.title = link.title;
      newLink.setAttribute('data-title', link.getAttribute('data-title'));
      newLink.classList.add('featurecards-featureCards-bolteSitare_cardSection', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      if (link.target) {
        newLink.target = link.target;
      }

      const imgDiv = document.createElement('div');
      imgDiv.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
      const img = cells[0].querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('featurecards-featureCards-h-100', 'featurecards-featureCards-w-100', 'featurecards-featureCards-card-img');
        imgDiv.append(optimizedPic);
      }
      newLink.append(imgDiv);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-featureCards-content-wrapper', 'featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-justify-content-between');

      const textContentDiv = document.createElement('div');
      const h2 = cells[0].querySelector('h2');
      if (h2) {
        const newH2 = document.createElement('h2');
        newH2.classList.add('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
        newH2.textContent = h2.textContent.trim();
        textContentDiv.append(newH2);
      }

      const p = cells[0].querySelector('p');
      if (p) {
        const newP = document.createElement('p');
        newP.classList.add('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
        newP.textContent = p.textContent.trim();
        textContentDiv.append(newP);
      }
      contentWrapper.append(textContentDiv);

      const buttonDiv = document.createElement('div');
      const button = cells[0].querySelector('button');
      if (button) {
        const newButton = document.createElement('button');
        newButton.classList.add('featurecards-featureCards-bolteSitare_cardSection--btn', 'featurecards-featureCards-text-white', 'featurecards-featureCards-boing--text__body-4', 'featurecards-featureCards-d-inline-block');
        newButton.textContent = button.textContent.trim();
        buttonDiv.append(newButton);
      }
      contentWrapper.append(buttonDiv);

      newLink.append(contentWrapper);
      featureCardsContainer.append(newLink);
    } else if (cells[0].querySelector('section.featurecards-featureCards-feature_card--Section')) {
      // This is the single feature card section
      const sectionLink = cells[0].querySelector('a.featurecards-featureCards-d-flex');
      if (sectionLink) {
        const newSectionLink = document.createElement('a');
        moveInstrumentation(sectionLink, newSectionLink);
        newSectionLink.href = sectionLink.href;
        newSectionLink.title = sectionLink.title;
        newSectionLink.setAttribute('data-cta-label', sectionLink.getAttribute('data-cta-label'));
        newSectionLink.classList.add('featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');

        const sectionImgDiv = document.createElement('div');
        sectionImgDiv.classList.add('featurecards-featureCards-feature_card--image', 'featurecards-featureCards-w-100', 'featurecards-featureCards-pb-4');
        const sectionImg = sectionLink.querySelector('img');
        if (sectionImg) {
          const optimizedPic = createOptimizedPicture(sectionImg.src, sectionImg.alt);
          moveInstrumentation(sectionImg, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('featurecards-featureCards-w-100', 'featurecards-featureCards-h-100');
          sectionImgDiv.append(optimizedPic);
        }
        newSectionLink.append(sectionImgDiv);

        const sectionTextCenterDiv = document.createElement('div');
        sectionTextCenterDiv.classList.add('featurecards-featureCards-text-center');

        const sectionH2 = sectionLink.querySelector('h2');
        if (sectionH2) {
          const newSectionH2 = document.createElement('h2');
          newSectionH2.classList.add('featurecards-featureCards-feature_card--title', 'featurecards-featureCards-boing--text__heading-1');
          newSectionH2.textContent = sectionH2.textContent.trim();
          sectionTextCenterDiv.append(newSectionH2);
        }

        const sectionPWrapper = document.createElement('div');
        sectionPWrapper.classList.add('featurecards-featureCards-pb-5');
        const sectionP = sectionLink.querySelector('p');
        if (sectionP) {
          const newSectionP = document.createElement('p');
          newSectionP.classList.add('featurecards-featureCards-feature_card--desc', 'featurecards-featureCards-boing--text__body-2', 'featurecards-featureCards-text-boing-dark');
          newSectionP.textContent = sectionP.textContent.trim();
          sectionPWrapper.append(newSectionP);
        }
        sectionTextCenterDiv.append(sectionPWrapper);

        const sectionButtonDiv = document.createElement('div');
        sectionButtonDiv.classList.add('featurecards-featureCards-redirected_btn', 'featurecards-featureCards-d-none');
        const sectionButton = sectionLink.querySelector('button');
        if (sectionButton) {
          const newSectionButton = document.createElement('button');
          newSectionButton.type = 'button';
          newSectionButton.role = 'button';
          newSectionButton.classList.add('featurecards-featureCards-arrow-icon-btn');
          newSectionButton.textContent = sectionButton.textContent.trim(); // Assuming text content is the SVG path
          sectionButtonDiv.append(newSectionButton);
        }
        sectionTextCenterDiv.append(sectionButtonDiv);

        newSectionLink.append(sectionTextCenterDiv);
        sectionContainer.append(newSectionLink);
      }
    }
  });

  block.textContent = '';
  if (featureCardsContainer.children.length > 0) {
    block.append(featureCardsContainer);
  }
  if (sectionContainer.children.length > 0) {
    block.append(sectionContainer);
  }

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-featureCards-curve-container', 'featurecards-featureCards-d-none');
  block.append(curveContainer);
}
