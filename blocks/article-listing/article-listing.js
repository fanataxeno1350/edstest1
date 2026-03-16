import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const articleListingWrapper = document.createElement('div');
  articleListingWrapper.classList.add('article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const viewAllLinkContainer = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkContainer) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('article_listing--btnWrapper');
    const link = viewAllLinkContainer.querySelector('a');
    if (link) {
      link.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
      btnWrapper.append(link);
      moveInstrumentation(viewAllLinkContainer, btnWrapper);
    }
    firstSection.append(btnWrapper);
  }

  articleListingWrapper.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');

  const articleCards = block.querySelectorAll('[data-aue-model="articleCard"]');
  articleCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('[data-aue-prop="link"]');
    const cardLink = document.createElement('a');
    cardLink.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
    if (linkElement && linkElement.querySelector('a')) {
      const authoredLink = linkElement.querySelector('a');
      cardLink.href = authoredLink.href;
      cardLink.title = authoredLink.title;
      if (authoredLink.dataset.ctaLabel) {
        cardLink.dataset.ctaLabel = authoredLink.dataset.ctaLabel;
      }
      moveInstrumentation(authoredLink, cardLink);
    } else if (linkElement) {
        // Fallback if link is just text or a div containing the URL
        const linkText = linkElement.textContent.trim();
        if (linkText.startsWith('/') || linkText.startsWith('http')) {
            cardLink.href = linkText;
            cardLink.title = linkText;
        }
        moveInstrumentation(linkElement, cardLink);
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('article_listing--cards');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('article_listing--cardImageWrapper');
    const imageElement = cardNode.querySelector('[data-aue-prop="image"]');
    if (imageElement && imageElement.querySelector('img')) {
      const img = imageElement.querySelector('img');
      const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
      imageWrapper.append(picture);
      moveInstrumentation(imageElement, imageWrapper);
    }
    cardDiv.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('cards_content--wrapper');

    const dateElement = cardNode.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
      if (dateElement.dataset.date) {
        pDate.dataset.date = dateElement.dataset.date;
      }
      pDate.append(...dateElement.childNodes);
      moveInstrumentation(dateElement, pDate);
      contentWrapper.append(pDate);
    }

    const cardTitleElement = cardNode.querySelector('[data-aue-prop="cardTitle"]');
    if (cardTitleElement) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'boing--text__body');
      pTitle.append(...cardTitleElement.childNodes);
      moveInstrumentation(cardTitleElement, pTitle);
      contentWrapper.append(pTitle);
    }

    cardDiv.append(contentWrapper);
    cardLink.append(cardDiv);
    secondSection.append(cardLink);
    moveInstrumentation(cardNode, cardLink);
  });

  articleListingWrapper.append(secondSection);

  block.textContent = '';
  block.append(articleListingWrapper);
  block.className = 'article-listing block';
  block.dataset.blockStatus = 'loaded';
}
