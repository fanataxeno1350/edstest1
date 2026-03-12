import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('latestblogs-article-listing', 'position-relative');

  const sectionOne = document.createElement('div');
  sectionOne.classList.add('latestblogs-article-listing-section-first', 'text-white', 'text-center');
  rootDiv.append(sectionOne);

  const title = block.querySelector('[data-aue-prop="title"]') || block.querySelector('h2');
  if (title) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-article-listing-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...title.childNodes);
    moveInstrumentation(title, h2);
    sectionOne.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]') || block.querySelector('p:not([data-date])');
  if (description) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-article-listing-desc', 'boing--text__body-2', 'pb-4');
    p.append(...description.childNodes);
    moveInstrumentation(description, p);
    sectionOne.append(p);
  }

  const viewAllLinkContainer = document.createElement('div');
  viewAllLinkContainer.classList.add('latestblogs-article-listing-btnwrapper');
  sectionOne.append(viewAllLinkContainer);

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const a = document.createElement('a');
    a.classList.add('boing--text__title-3', 'latestblogs-article-listing-btn', 'analytics_cta_click');
    a.href = viewAllLink.href;
    a.title = viewAllLink.textContent.trim();
    a.textContent = viewAllLink.textContent.trim();
    moveInstrumentation(viewAllLink, a);
    viewAllLinkContainer.append(a);
  }

  const sectionTwo = document.createElement('div');
  sectionTwo.classList.add('latestblogs-article-listing-section-second', 'd-flex');
  rootDiv.append(sectionTwo);

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const cardLink = cardNode.querySelector('[data-aue-prop="cardLink"]');
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-article-listing-cardwrapper', 'analytics_cta_click');
    if (cardLink) {
      cardWrapper.href = cardLink.href;
      cardWrapper.dataset.ctaLabel = cardLink.textContent.trim();
      moveInstrumentation(cardLink, cardWrapper);
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-article-listing-cards');
    cardWrapper.append(cardDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestblogs-article-listing-cardimage-wrapper');
    cardDiv.append(imageWrapper);

    const image = cardNode.querySelector('[data-aue-prop="image"]');
    if (image) {
      const picture = createOptimizedPicture(image.src, image.alt);
      picture.querySelector('img').classList.add('latestblogs-article-listing-cardimage', 'w-100', 'h-100');
      imageWrapper.append(picture);
      moveInstrumentation(image, picture);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards-content-wrapper');
    cardDiv.append(contentWrapper);

    const date = cardNode.querySelector('[data-aue-prop="date"]') || cardNode.querySelector('p[data-date]');
    if (date) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published-date');
      pDate.textContent = date.textContent.trim();
      if (date.dataset.date) {
        pDate.dataset.date = date.dataset.date;
      }
      contentWrapper.append(pDate);
      moveInstrumentation(date, pDate);
    }

    const text = cardNode.querySelector('[data-aue-prop="text"]') || cardNode.querySelector('.latestblogs-boing-text__body');
    if (text) {
      const pText = document.createElement('p');
      pText.classList.add('boing--text__body-2', 'latestblogs-boing-text__body');
      pText.append(...text.childNodes);
      contentWrapper.append(pText);
      moveInstrumentation(text, pText);
    }
    sectionTwo.append(cardWrapper);
    moveInstrumentation(cardNode, cardWrapper);
  });

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
