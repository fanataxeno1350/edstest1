import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    firstSection.append(h2);
    moveInstrumentation(titleElement, h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    firstSection.append(p);
    moveInstrumentation(descriptionElement, p);
  }

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('article_listing--btnWrapper');

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const link = document.createElement('a');
    link.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
    link.href = viewAllLink.textContent.trim();
    link.title = viewAllLink.textContent.trim();
    link.textContent = viewAllLink.textContent.trim();

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('arrow-icon');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/etc.clientlibs/itc-family-comedy/clientlibs/clientlib-boing/resources/images/sprite/sprite-boing.svg#arrow_forward');
    svg.append(use);
    link.append(svg);
    buttonWrapper.append(link);
    firstSection.append(buttonWrapper);
    moveInstrumentation(viewAllLink, link);
  }

  articleListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');

  const blogCardsContainer = block.querySelector('[data-aue-prop="blogCards"]');
  if (blogCardsContainer) {
    const blogCards = blogCardsContainer.querySelectorAll('[data-aue-model="blogCard"]');
    blogCards.forEach((cardNode) => {
      const cardLinkElement = cardNode.querySelector('[data-aue-prop="cardLink"]');
      const cardImageElement = cardNode.querySelector('[data-aue-prop="image"]');
      const cardDateElement = cardNode.querySelector('[data-aue-prop="date"]');
      const cardTitleElement = cardNode.querySelector('[data-aue-prop="cardTitle"]');

      const cardWrapper = document.createElement('a');
      cardWrapper.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
      if (cardLinkElement) {
        cardWrapper.href = cardLinkElement.textContent.trim();
        cardWrapper.setAttribute('data-cta-label', cardTitleElement ? cardTitleElement.textContent.trim() : '');
        moveInstrumentation(cardLinkElement, cardWrapper);
      }

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('article_listing--cards');

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('article_listing--cardImageWrapper');
      if (cardImageElement) {
        const img = cardImageElement.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '1536' }]);
          picture.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
          cardImageWrapper.append(picture);
        }
        moveInstrumentation(cardImageElement, cardImageWrapper);
      }
      cardDiv.append(cardImageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('cards_content--wrapper');

      if (cardDateElement) {
        const dateP = document.createElement('p');
        dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
        dateP.textContent = cardDateElement.textContent.trim();
        dateP.setAttribute('data-date', cardDateElement.textContent.trim());
        contentWrapper.append(dateP);
        moveInstrumentation(cardDateElement, dateP);
      }

      if (cardTitleElement) {
        const titleP = document.createElement('p');
        titleP.classList.add('boing--text__body-2', 'boing--text__body');
        titleP.append(...cardTitleElement.childNodes);
        contentWrapper.append(titleP);
        moveInstrumentation(cardTitleElement, titleP);
      }

      cardDiv.append(contentWrapper);
      cardWrapper.append(cardDiv);
      secondSection.append(cardWrapper);
      moveInstrumentation(cardNode, cardWrapper);
    });
  }

  articleListing.append(secondSection);
  sectionWrapper.append(articleListing);

  block.textContent = '';
  block.append(sectionWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}