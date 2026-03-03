import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'boltesitarecardsection-bolteSitare_cardSection-bolteSitare_cardSection--wrapper';

  // Assuming the block has only one row for this card structure
  const row = block.children[0];
  if (!row) return;

  // Transfer instrumentation from the original block to the new wrapper
  moveInstrumentation(row, wrapperDiv);

  const linkElement = row.querySelector('a');
  const imgElement = row.querySelector('img');
  const titleElement = row.querySelector('h2');
  const descriptionElement = row.querySelector('p');
  const buttonElement = row.querySelector('button');

  const cardLink = document.createElement('a');
  cardLink.className = 'boltesitarecardsection-bolteSitare_cardSection-bolteSitare_cardSection boltesitarecardsection-analytics_cta_click boltesitarecardsection-text-decoration-none';
  if (linkElement) {
    cardLink.href = linkElement.href;
    cardLink.title = linkElement.title;
    cardLink.setAttribute('data-title', linkElement.getAttribute('data-title'));
  }

  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'boltesitarecardsection-bolteSitare_cardSection-bolteSitare_cardSection--img';
  if (imgElement) {
    const optimizedPic = createOptimizedPicture(imgElement.src, imgElement.alt);
    moveInstrumentation(imgElement, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').classList.add('boltesitarecardsection-bolteSitare_cardSection-h-100', 'boltesitarecardsection-bolteSitare_cardSection-w-100', 'boltesitarecardsection-bolteSitare_cardSection-card-img');
    imgWrapper.append(optimizedPic);
  }
  cardLink.append(imgWrapper);

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'boltesitarecardsection-bolteSitare_cardSection-content-wrapper boltesitarecardsection-bolteSitare_cardSection-d-flex boltesitarecardsection-bolteSitare_cardSection-flex-column boltesitarecardsection-bolteSitare_cardSection-justify-content-between';

  const textContentDiv = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.className = 'boltesitarecardsection-bolteSitare_cardSection-bolteSitare_cardSection--title boltesitarecardsection-boing--text__heading-3 boltesitarecardsection-bolteSitare_cardSection-text-boing-dark';
  if (titleElement) {
    h2.textContent = titleElement.textContent;
  }
  textContentDiv.append(h2);

  const p = document.createElement('p');
  p.className = 'boltesitarecardsection-bolteSitare_cardSection-bolteSitare_cardSection--text boltesitarecardsection-boing--text__body-3 boltesitarecardsection-bolteSitare_cardSection-text-boing-dark';
  if (descriptionElement) {
    p.textContent = descriptionElement.textContent;
  }
  textContentDiv.append(p);
  contentWrapper.append(textContentDiv);

  const buttonDiv = document.createElement('div');
  const button = document.createElement('button');
  button.className = 'boltesitarecardsection-bolteSitare_cardSection-bolteSitare_cardSection--btn boltesitarecardsection-text-white boltesitarecardsection-boing--text__body-4 boltesitarecardsection-bolteSitare_cardSection-d-inline-block';
  if (buttonElement) {
    button.textContent = buttonElement.textContent;
  }
  buttonDiv.append(button);
  contentWrapper.append(buttonDiv);

  cardLink.append(contentWrapper);
  wrapperDiv.append(cardLink);

  block.textContent = '';
  block.append(wrapperDiv);
}
