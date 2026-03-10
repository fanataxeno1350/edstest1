import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('featurecards-featureCards-cards');

  const titleDiv = block.children[0];
  if (titleDiv) {
    const h1 = titleDiv.querySelector('h1');
    if (h1) {
      const newTitleDiv = document.createElement('div');
      newTitleDiv.classList.add('featurecards-featureCards-text');
      newTitleDiv.id = 'text-68763da680';
      newTitleDiv.append(h1.cloneNode(true));
      mainDiv.append(newTitleDiv);
      moveInstrumentation(titleDiv, newTitleDiv);
    }
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featurecards-featureCards-cards-wrapper');

  [...block.children].slice(1).forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      if (link.title) newLink.title = link.title;
      if (link.target) newLink.target = link.target;
      if (link.dataset.title) newLink.dataset.title = link.dataset.title;
      newLink.classList.add(
        'featurecards-featureCards-bolteSitare_cardSection',
        'featurecards-featureCards-analytics_cta_click',
        'featurecards-featureCards-text-decoration-none',
      );
      moveInstrumentation(row, newLink);

      const wrapperDiv = document.createElement('div');
      wrapperDiv.classList.add(
        'featurecards-featureCards-d-flex',
        'featurecards-featureCards-bolteSitare_cardSection--wrapper',
      );

      const imgDiv = document.createElement('div');
      imgDiv.classList.add('featurecards-featureCards-bolteSitare_cardSection--img');
      const img = row.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add(
          'featurecards-featureCards-h-100',
          'featurecards-featureCards-w-100',
          'featurecards-featureCards-card-img',
        );
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imgDiv.append(optimizedPic);
      }
      wrapperDiv.append(imgDiv);

      const contentWrapperDiv = document.createElement('div');
      contentWrapperDiv.classList.add(
        'featurecards-featureCards-content-wrapper',
        'featurecards-featureCards-d-flex',
        'featurecards-featureCards-flex-column',
        'featurecards-featureCards-justify-content-between',
      );

      const textContentDiv = document.createElement('div');
      const h2 = row.querySelector('h2');
      if (h2) {
        const newH2 = document.createElement('h2');
        newH2.classList.add(
          'featurecards-featureCards-bolteSitare_cardSection--title',
          'featurecards-featureCards-boing--text__heading-3',
          'featurecards-featureCards-text-boing-dark',
        );
        newH2.textContent = h2.textContent;
        textContentDiv.append(newH2);
      }

      const p = row.querySelector('p');
      if (p) {
        const newP = document.createElement('p');
        newP.classList.add(
          'featurecards-featureCards-bolteSitare_cardSection--text',
          'featurecards-featureCards-boing--text__body-3',
          'featurecards-featureCards-text-boing-dark',
        );
        newP.textContent = p.textContent;
        textContentDiv.append(newP);
      }
      contentWrapperDiv.append(textContentDiv);

      const buttonDiv = document.createElement('div');
      const button = row.querySelector('button');
      if (button) {
        const newButton = document.createElement('button');
        newButton.classList.add(
          'featurecards-featureCards-bolteSitare_cardSection--btn',
          'featurecards-featureCards-text-white',
          'featurecards-featureCards-boing--text__body-4',
          'featurecards-featureCards-d-inline-block',
        );
        newButton.textContent = button.textContent;
        buttonDiv.append(newButton);
      }
      contentWrapperDiv.append(buttonDiv);

      wrapperDiv.append(contentWrapperDiv);
      newLink.append(wrapperDiv);
      cardsWrapper.append(newLink);
    }
  });

  mainDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(mainDiv);
}