import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const titleDiv = block.querySelector('.featurecards-featureCards-text');
  const cards = [...block.querySelectorAll('.featurecards-featureCards-bolteSitare_cardSection--wrapper')];

  const section = document.createElement('section');
  section.classList.add('featurecards-featureCards-feature_card--Section', 'featurecards-featureCards-feature_card', 'featurecards-featureCards-mx-auto');

  if (titleDiv) {
    const h1 = titleDiv.querySelector('h1');
    if (h1) {
      section.append(h1);
      moveInstrumentation(titleDiv, section);
    }
  }

  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('featurecards-featureCards-bolteSitare_cardSection--wrapper');

  cards.forEach((cardNode) => {
    const cardLink = cardNode.querySelector('a');
    if (cardLink) {
      const link = document.createElement('a');
      link.classList.add('featurecards-featureCards-d-flex', 'featurecards-featureCards-flex-column', 'featurecards-featureCards-analytics_cta_click', 'featurecards-featureCards-text-decoration-none');
      link.href = cardLink.href;
      link.title = cardLink.title;

      if (cardLink.target) {
        link.target = cardLink.target;
      }

      const imageDiv = document.createElement('div');
      imageDiv.classList.add('featurecards-featureCards-feature_card--image', 'featurecards-featureCards-w-100', 'featurecards-featureCards-pb-4');
      const img = cardLink.querySelector('img');
      if (img) {
        imageDiv.append(createOptimizedPicture(img.src, img.alt));
        moveInstrumentation(img, imageDiv);
      }
      link.append(imageDiv);

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('featurecards-featureCards-text-center');

      const title = cardLink.querySelector('h2');
      if (title) {
        title.classList.remove('featurecards-featureCards-bolteSitare_cardSection--title', 'featurecards-featureCards-boing--text__heading-3', 'featurecards-featureCards-text-boing-dark');
        title.classList.add('featurecards-featureCards-feature_card--title', 'featurecards-featureCards-boing--text__heading-1');
        textCenterDiv.append(title);
        moveInstrumentation(title, textCenterDiv);
      }

      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featurecards-featureCards-pb-5');
      const description = cardLink.querySelector('p');
      if (description) {
        description.classList.remove('featurecards-featureCards-bolteSitare_cardSection--text', 'featurecards-featureCards-boing--text__body-3', 'featurecards-featureCards-text-boing-dark');
        description.classList.add('featurecards-featureCards-feature_card--desc', 'featurecards-featureCards-boing--text__body-2', 'featurecards-featureCards-text-boing-dark');
        descriptionWrapper.append(description);
        moveInstrumentation(description, descriptionWrapper);
      }
      textCenterDiv.append(descriptionWrapper);

      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('featurecards-featureCards-redirected_btn', 'featurecards-featureCards-d-none');
      const button = cardLink.querySelector('button');
      if (button) {
        buttonDiv.append(button);
        moveInstrumentation(button, buttonDiv);
      }
      textCenterDiv.append(buttonDiv);

      link.append(textCenterDiv);
      cardWrapper.append(link);
      moveInstrumentation(cardNode, cardWrapper);
    }
  });

  section.append(cardWrapper);

  block.textContent = '';
  block.append(section);
  block.className = 'featurecards block';
  block.dataset.blockStatus = 'loaded';
}
