import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.className = 'latestblogs-wrapper';

  const latestblogsListing = document.createElement('div');
  latestblogsListing.className = 'latestblogs-listing position-relative';

  const sectionFirst = document.createElement('div');
  sectionFirst.className = 'latestblogs-listing_section--first text-white text-center';

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'latestblogs-listing--title boing--text__heading-1 text-white pb-3';
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    sectionFirst.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.className = 'latestblogs-listing--desc boing--text__body-2 pb-4';
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    sectionFirst.append(p);
  }

  const ctaElement = block.querySelector('[data-aue-prop="cta"]');
  if (ctaElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'latestblogs-listing--btnWrapper';
    const ctaLink = ctaElement.querySelector('a');
    if (ctaLink) {
      const newCtaLink = document.createElement('a');
      newCtaLink.href = ctaLink.href;
      newCtaLink.title = ctaLink.title || ctaLink.textContent.trim();
      newCtaLink.className = 'boing--text__title-3 latestblogs-listing--btn analytics_cta_click';
      newCtaLink.textContent = ctaLink.textContent.trim();
      btnWrapper.append(newCtaLink);
      moveInstrumentation(ctaElement, btnWrapper);
      sectionFirst.append(btnWrapper);
    }
  }

  latestblogsListing.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.className = 'latestblogs-listing_section--second d-flex';

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('[data-aue-prop="link"]');
    const imageElement = cardNode.querySelector('[data-aue-prop="image"]');
    const dateElement = cardNode.querySelector('[data-aue-prop="date"]');
    const cardTitleElement = cardNode.querySelector('[data-aue-prop="cardTitle"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.className = 'latestblogs-listing--cardWrapper analytics_cta_click';

    if (linkElement) {
      const link = linkElement.querySelector('a');
      if (link) {
        cardWrapper.href = link.href;
        cardWrapper.setAttribute('data-cta-label', link.title || cardTitleElement?.textContent.trim() || link.textContent.trim());
      }
    }

    const cardDiv = document.createElement('div');
    cardDiv.className = 'latestblogs-listing--cards';

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.className = 'latestblogs-listing--cardImageWrapper';

    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
        const imgInPicture = picture.querySelector('img');
        if (imgInPicture) {
          imgInPicture.className = 'latestblogs-listing--cardImage w-100 h-100';
        }
        cardImageWrapper.append(picture);
        moveInstrumentation(imageElement, cardImageWrapper);
      }
    }
    cardDiv.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.className = 'cards-content--wrapper';

    if (dateElement) {
      const dateP = document.createElement('p');
      dateP.className = 'boing--text__body-5 p-0 m-0 mb-3 published_date';
      dateP.append(...dateElement.childNodes);
      if (dateElement.dataset.date) {
        dateP.setAttribute('data-date', dateElement.dataset.date);
      }
      cardsContentWrapper.append(dateP);
      moveInstrumentation(dateElement, dateP);
    }

    if (cardTitleElement) {
      const cardTitleP = document.createElement('p');
      cardTitleP.className = 'boing--text__body-2 boing--text__body';
      cardTitleP.append(...cardTitleElement.childNodes);
      cardsContentWrapper.append(cardTitleP);
      moveInstrumentation(cardTitleElement, cardTitleP);
    }

    cardDiv.append(cardsContentWrapper);
    cardWrapper.append(cardDiv);
    sectionSecond.append(cardWrapper);
    moveInstrumentation(cardNode, cardWrapper);
  });

  latestblogsListing.append(sectionSecond);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
