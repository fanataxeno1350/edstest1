import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headingWrapper = block.querySelector('.featurecards-featureCards-text');
  const cards = block.querySelectorAll('a.featurecards-featureCards-bolteSitare_cardSection');
  const featureCardSection = block.querySelector('section.featurecards-featureCards-feature_card--Section');

  const section = document.createElement('section');
  section.classList.add('feature-cards-section');

  if (headingWrapper) {
    const headingDiv = document.createElement('div');
    headingDiv.classList.add('feature-cards-heading');
    moveInstrumentation(headingWrapper, headingDiv);
    headingDiv.append(headingWrapper.querySelector('h1'));
    section.append(headingDiv);
  }

  if (cards.length > 0) {
    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('feature-cards-wrapper');

    cards.forEach((card) => {
      const cardLink = document.createElement('a');
      cardLink.classList.add('feature-card');
      cardLink.href = card.href;
      cardLink.title = card.title;
      if (card.target) {
        cardLink.target = card.target;
      }

      const cardImageWrapper = card.querySelector('.featurecards-featureCards-bolteSitare_cardSection--img');
      const cardContentWrapper = card.querySelector('.featurecards-featureCards-content-wrapper');

      if (cardImageWrapper) {
        const img = cardImageWrapper.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          picture.querySelector('img').classList.add('feature-card-image');
          cardLink.append(picture);
          moveInstrumentation(img, picture);
        }
      }

      if (cardContentWrapper) {
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('feature-card-content');

        const heading = cardContentWrapper.querySelector('h2');
        if (heading) {
          contentDiv.append(heading);
          moveInstrumentation(heading, contentDiv);
        }

        const description = cardContentWrapper.querySelector('p');
        if (description) {
          contentDiv.append(description);
          moveInstrumentation(description, contentDiv);
        }

        const button = cardContentWrapper.querySelector('button');
        if (button) {
          const buttonWrapper = document.createElement('div');
          buttonWrapper.classList.add('feature-card-button');
          buttonWrapper.append(button);
          moveInstrumentation(button, buttonWrapper);
          contentDiv.append(buttonWrapper);
        }
        cardLink.append(contentDiv);
        moveInstrumentation(cardContentWrapper, contentDiv);
      }
      cardsWrapper.append(cardLink);
      moveInstrumentation(card, cardLink);
    });
    section.append(cardsWrapper);
  }

  if (featureCardSection) {
    const featureCardLink = featureCardSection.querySelector('a.featurecards-featureCards-d-flex');
    if (featureCardLink) {
      const singleFeatureCard = document.createElement('a');
      singleFeatureCard.classList.add('single-feature-card');
      singleFeatureCard.href = featureCardLink.href;
      singleFeatureCard.title = featureCardLink.title;
      if (featureCardLink.dataset.ctaLabel) {
        singleFeatureCard.dataset.ctaLabel = featureCardLink.dataset.ctaLabel;
      }

      const imageWrapper = featureCardLink.querySelector('.featurecards-featureCards-feature_card--image');
      if (imageWrapper) {
        const img = imageWrapper.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          picture.querySelector('img').classList.add('single-feature-card-image');
          singleFeatureCard.append(picture);
          moveInstrumentation(img, picture);
        }
      }

      const textCenterDiv = featureCardLink.querySelector('.featurecards-featureCards-text-center');
      if (textCenterDiv) {
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('single-feature-card-content');

        const heading = textCenterDiv.querySelector('h2');
        if (heading) {
          contentDiv.append(heading);
          moveInstrumentation(heading, contentDiv);
        }

        const descriptionWrapper = textCenterDiv.querySelector('.featurecards-featureCards-pb-5');
        if (descriptionWrapper) {
          const description = descriptionWrapper.querySelector('p');
          if (description) {
            contentDiv.append(description);
            moveInstrumentation(description, contentDiv);
          }
        }

        const buttonDiv = textCenterDiv.querySelector('.featurecards-featureCards-redirected_btn');
        if (buttonDiv) {
          const button = buttonDiv.querySelector('button');
          if (button) {
            const buttonWrapper = document.createElement('div');
            buttonWrapper.classList.add('single-feature-card-button');
            buttonWrapper.append(button);
            moveInstrumentation(button, buttonWrapper);
            contentDiv.append(buttonWrapper);
          }
        }
        singleFeatureCard.append(contentDiv);
        moveInstrumentation(textCenterDiv, contentDiv);
      }
      section.append(singleFeatureCard);
      moveInstrumentation(featureCardLink, singleFeatureCard);
      moveInstrumentation(featureCardSection, section);
    }
  }

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
