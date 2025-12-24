import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.textContent = headingElement.textContent;
    firstSection.append(h2);
    moveInstrumentation(headingElement, h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-listing--desc', 'boing--text__body-2', 'pb-4');
    p.textContent = descriptionElement.textContent;
    firstSection.append(p);
    moveInstrumentation(descriptionElement, p);
  }

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaTextElement = block.querySelector('[data-aue-prop="ctaText"]');
  if (ctaLinkElement || ctaTextElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-listing--btnWrapper');

    const a = document.createElement('a');
    a.classList.add('boing--text__title-3', 'latestblogs-listing--btn', 'analytics_cta_click');
    if (ctaLinkElement) {
      a.href = ctaLinkElement.textContent.trim();
      moveInstrumentation(ctaLinkElement, a);
    }
    a.title = ctaTextElement ? ctaTextElement.textContent.trim() : '';
    a.textContent = ctaTextElement ? ctaTextElement.textContent.trim() : '';
    if (ctaTextElement) {
      moveInstrumentation(ctaTextElement, a);
    }
    btnWrapper.append(a);
    firstSection.append(btnWrapper);
  }

  latestBlogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('[data-aue-prop="link"]');
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-listing--cardWrapper', 'analytics_cta_click');
    if (linkElement) {
      cardWrapper.href = linkElement.textContent.trim();
      moveInstrumentation(linkElement, cardWrapper);
    }

    const titleElement = cardNode.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      cardWrapper.dataset.ctaLabel = titleElement.textContent.trim();
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-listing--cards');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestblogs-listing--cardImageWrapper');
    const imageElement = cardNode.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('latestblogs-listing--cardImage', 'w-100', 'h-100');
        imageWrapper.append(picture);
        moveInstrumentation(imageElement, picture);
      }
    }
    cardsDiv.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateElement = cardNode.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      dateP.textContent = dateElement.textContent.trim();
      const dateAttr = dateElement.getAttribute('data-date');
      if (dateAttr) {
        dateP.setAttribute('data-date', dateAttr);
      }
      contentWrapper.append(dateP);
      moveInstrumentation(dateElement, dateP);
    }

    if (titleElement) {
      const titleP = document.createElement('p');
      titleP.classList.add('boing--text__body-2', 'latestblogs--text__body');
      titleP.textContent = titleElement.textContent.trim();
      contentWrapper.append(titleP);
      moveInstrumentation(titleElement, titleP);
    }

    cardsDiv.append(contentWrapper);
    cardWrapper.append(cardsDiv);
    secondSection.append(cardWrapper);
    moveInstrumentation(cardNode, cardWrapper);
  });

  latestBlogsListing.append(secondSection);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = 'latestblogs block';
  block.dataset.blockStatus = 'loaded';
}
