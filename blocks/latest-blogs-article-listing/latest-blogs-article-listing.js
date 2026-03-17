import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainTitle = block.querySelector('[data-aue-prop="mainTitle"]');
  const description = block.querySelector('[data-aue-prop="description"]');
  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');

  const sectionWrapper = document.createElement('div');
  sectionWrapper.classList.add('latestBlogs-article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestBlogs-article_listing_section--first', 'text-white', 'text-center');

  if (mainTitle) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestBlogs-article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...mainTitle.childNodes);
    moveInstrumentation(mainTitle, h2);
    firstSection.append(h2);
  }

  if (description) {
    const p = document.createElement('p');
    p.classList.add('latestBlogs-article_listing--desc', 'boing--text__body-2', 'pb-4');
    p.append(...description.childNodes);
    moveInstrumentation(description, p);
    firstSection.append(p);
  }

  if (viewAllLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestBlogs-article_listing--btnWrapper');

    const link = document.createElement('a');
    link.classList.add('boing--text__title-3', 'latestBlogs-article_listing--btn', 'analytics_cta_click');
    link.href = viewAllLink.href;
    link.title = viewAllLink.title || viewAllLink.textContent.trim();
    link.textContent = viewAllLink.textContent.trim();
    moveInstrumentation(viewAllLink, link);
    btnWrapper.append(link);
    firstSection.append(btnWrapper);
  }

  sectionWrapper.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestBlogs-article_listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const cardLink = cardNode.querySelector('[data-aue-prop="link"]');
    const cardImage = cardNode.querySelector('[data-aue-prop="image"]');
    const cardDate = cardNode.querySelector('[data-aue-prop="date"]');
    const cardTitle = cardNode.querySelector('[data-aue-prop="title"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestBlogs-article_listing--cardWrapper', 'analytics_cta_click');
    if (cardLink) {
      cardWrapper.href = cardLink.href;
      cardWrapper.setAttribute('data-cta-label', cardTitle ? cardTitle.textContent.trim() : '');
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestBlogs-article_listing--cards');

    if (cardImage) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestBlogs-article_listing--cardImageWrapper');
      const picture = createOptimizedPicture(cardImage.src, cardImage.alt);
      picture.querySelector('img').classList.add('latestBlogs-article_listing--cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(picture);
      moveInstrumentation(cardImage, cardImageWrapper);
      cardsDiv.append(cardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestBlogs-cards_content--wrapper');

    if (cardDate) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestBlogs-published_date');
      pDate.textContent = cardDate.textContent.trim();
      moveInstrumentation(cardDate, pDate);
      contentWrapper.append(pDate);
    }

    if (cardTitle) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'boing--text__body');
      pTitle.append(...cardTitle.childNodes);
      moveInstrumentation(cardTitle, pTitle);
      contentWrapper.append(pTitle);
    }

    cardsDiv.append(contentWrapper);
    cardWrapper.append(cardsDiv);
    moveInstrumentation(cardNode, cardWrapper);
    secondSection.append(cardWrapper);
  });

  sectionWrapper.append(secondSection);

  block.textContent = '';
  block.append(sectionWrapper);
  block.className = 'latestBlogs-article_listing--wrapper block';
  block.dataset.blockStatus = 'loaded';
}
