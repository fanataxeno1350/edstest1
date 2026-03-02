import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'feature-cards-wrapper';

  // Handle the intro text (h1) if it exists
  const introDiv = block.querySelector('.featurecards-featureCards-cmp-text');
  if (introDiv) {
    const introTextWrapper = document.createElement('div');
    moveInstrumentation(introDiv, introTextWrapper);
    introTextWrapper.className = 'feature-cards-intro-text';
    introTextWrapper.innerHTML = introDiv.innerHTML;
    mainDiv.append(introTextWrapper);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'feature-cards-container';

  // Process the anchor tags which represent individual cards
  [...block.querySelectorAll('a.featurecards-featureCards-bolteSitare_cardSection')].forEach((anchor) => {
    const cardLink = document.createElement('a');
    moveInstrumentation(anchor, cardLink);
    cardLink.className = 'feature-card-item';
    cardLink.href = anchor.href;
    cardLink.title = anchor.title;
    if (anchor.target) {
      cardLink.target = anchor.target;
    }
    if (anchor.getAttribute('data-title')) {
      cardLink.setAttribute('data-title', anchor.getAttribute('data-title'));
    }

    const cardContentWrapper = document.createElement('div');
    cardContentWrapper.className = 'feature-card-content-wrapper';

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'feature-card-image';
    const img = anchor.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imgWrapper.append(optimizedPic);
    }
    cardContentWrapper.append(imgWrapper);

    const textContentWrapper = document.createElement('div');
    textContentWrapper.className = 'feature-card-text-content';

    const title = anchor.querySelector('.featurecards-featureCards-bolteSitare_cardSection--title');
    if (title) {
      const h2 = document.createElement('h2');
      moveInstrumentation(title, h2);
      h2.className = 'feature-card-title';
      h2.textContent = title.textContent;
      textContentWrapper.append(h2);
    }

    const description = anchor.querySelector('.featurecards-featureCards-bolteSitare_cardSection--text');
    if (description) {
      const p = document.createElement('p');
      moveInstrumentation(description, p);
      p.className = 'feature-card-description';
      p.textContent = description.textContent;
      textContentWrapper.append(p);
    }

    const button = anchor.querySelector('.featurecards-featureCards-bolteSitare_cardSection--btn');
    if (button) {
      const btn = document.createElement('button');
      moveInstrumentation(button, btn);
      btn.className = 'feature-card-button';
      btn.textContent = button.textContent;
      textContentWrapper.append(btn);
    }

    cardContentWrapper.append(textContentWrapper);
    cardLink.append(cardContentWrapper);
    cardsWrapper.append(cardLink);
  });

  mainDiv.append(cardsWrapper);

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(mainDiv);

  // Handle the section at the end if it exists, but only if it's the last element
  const lastSection = block.querySelector('section.featurecards-featureCards-feature_card--Section');
  if (lastSection) {
    const sectionWrapper = document.createElement('div');
    moveInstrumentation(lastSection, sectionWrapper);
    sectionWrapper.className = 'feature-card-final-section';

    const sectionLink = lastSection.querySelector('a');
    if (sectionLink) {
      const newLink = document.createElement('a');
      moveInstrumentation(sectionLink, newLink);
      newLink.className = 'feature-card-final-link';
      newLink.href = sectionLink.href;
      newLink.title = sectionLink.title;
      if (sectionLink.getAttribute('data-cta-label')) {
        newLink.setAttribute('data-cta-label', sectionLink.getAttribute('data-cta-label'));
      }

      const sectionImgWrapper = document.createElement('div');
      sectionImgWrapper.className = 'feature-card-final-image';
      const sectionImg = sectionLink.querySelector('img');
      if (sectionImg) {
        const optimizedPic = createOptimizedPicture(sectionImg.src, sectionImg.alt);
        moveInstrumentation(sectionImg, optimizedPic.querySelector('img'));
        sectionImgWrapper.append(optimizedPic);
      }
      newLink.append(sectionImgWrapper);

      const sectionTextWrapper = document.createElement('div');
      sectionTextWrapper.className = 'feature-card-final-text-content';

      const sectionTitle = sectionLink.querySelector('.featurecards-featureCards-feature_card--title');
      if (sectionTitle) {
        const h2 = document.createElement('h2');
        moveInstrumentation(sectionTitle, h2);
        h2.className = 'feature-card-final-title';
        h2.textContent = sectionTitle.textContent;
        sectionTextWrapper.append(h2);
      }

      const sectionDesc = sectionLink.querySelector('.featurecards-featureCards-feature_card--desc');
      if (sectionDesc) {
        const p = document.createElement('p');
        moveInstrumentation(sectionDesc, p);
        p.className = 'feature-card-final-description';
        p.textContent = sectionDesc.textContent;
        sectionTextWrapper.append(p);
      }

      const sectionButtonDiv = sectionLink.querySelector('.featurecards-featureCards-redirected_btn');
      if (sectionButtonDiv) {
        const button = sectionButtonDiv.querySelector('button');
        if (button) {
          const newButton = document.createElement('button');
          moveInstrumentation(button, newButton);
          newButton.className = 'feature-card-final-button';
          // Assuming the button text/icon is in the innerHTML or needs to be reconstructed
          // For this example, we'll just add a placeholder or try to get text if available
          newButton.innerHTML = button.innerHTML;
          sectionTextWrapper.append(newButton);
        }
      }

      newLink.append(sectionTextWrapper);
      sectionWrapper.append(newLink);
    }
    block.append(sectionWrapper);
  }
}
