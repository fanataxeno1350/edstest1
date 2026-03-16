import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const articleListingWrapper = document.createElement('div');
  articleListingWrapper.classList.add('article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const authoredTitle = block.querySelector('[data-aue-prop="title"]') || block.querySelector('h2');
  if (authoredTitle) {
    titleElement.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, titleElement);
  }
  firstSection.append(titleElement);

  const descElement = document.createElement('p');
  descElement.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
  const authoredDesc = block.querySelector('[data-aue-prop="description"]') || block.querySelector('p');
  if (authoredDesc) {
    descElement.append(...authoredDesc.childNodes);
    moveInstrumentation(authoredDesc, descElement);
  }
  firstSection.append(descElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('article_listing--btnWrapper');
  const authoredLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  const linkElement = document.createElement('a');
  if (authoredLink) {
    linkElement.href = authoredLink.href;
    linkElement.title = authoredLink.title || authoredLink.textContent.trim();
    linkElement.textContent = authoredLink.textContent.trim();
    linkElement.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
    moveInstrumentation(authoredLink, linkElement);
  } else {
    // Fallback if data-aue-prop is not found but there's a link in the first section
    const fallbackLink = block.querySelector('.article_listing_section--first .button-container a');
    if (fallbackLink) {
      linkElement.href = fallbackLink.href;
      linkElement.title = fallbackLink.title || fallbackLink.textContent.trim();
      linkElement.textContent = fallbackLink.textContent.trim();
      linkElement.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
      moveInstrumentation(fallbackLink, linkElement);
    }
  }
  if (linkElement.href) {
    btnWrapper.append(linkElement);
    firstSection.append(btnWrapper);
  }

  articleListingWrapper.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');

  const articles = block.querySelectorAll('[data-aue-model="article"]');
  articles.forEach((articleNode) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('article_listing--cardWrapper', 'analytics_cta_click');

    const authoredArticleLink = articleNode.querySelector('[data-aue-prop="link"]');
    if (authoredArticleLink) {
      cardLink.href = authoredArticleLink.href;
      cardLink.setAttribute('data-cta-label', authoredArticleLink.textContent.trim());
      moveInstrumentation(authoredArticleLink, cardLink);
    } else {
      const fallbackLink = articleNode.querySelector('a');
      if (fallbackLink) {
        cardLink.href = fallbackLink.href;
        cardLink.setAttribute('data-cta-label', fallbackLink.getAttribute('data-cta-label') || fallbackLink.textContent.trim());
        moveInstrumentation(fallbackLink, cardLink);
      }
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('article_listing--cards');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('article_listing--cardImageWrapper');
    const authoredImage = articleNode.querySelector('[data-aue-prop="image"]');
    if (authoredImage) {
      const picture = createOptimizedPicture(authoredImage.src, authoredImage.alt);
      picture.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
      imageWrapper.append(picture);
      moveInstrumentation(authoredImage, imageWrapper);
    } else {
      const fallbackImg = articleNode.querySelector('img');
      if (fallbackImg) {
        const picture = createOptimizedPicture(fallbackImg.src, fallbackImg.alt);
        picture.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
        imageWrapper.append(picture);
        moveInstrumentation(fallbackImg, imageWrapper);
      }
    }
    cardDiv.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('cards_content--wrapper');

    const dateP = document.createElement('p');
    dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
    const authoredDate = articleNode.querySelector('[data-aue-prop="date"]') || articleNode.querySelector('.published_date');
    if (authoredDate) {
      dateP.textContent = authoredDate.textContent.trim();
      dateP.setAttribute('data-date', authoredDate.getAttribute('data-date') || '');
      moveInstrumentation(authoredDate, dateP);
    }
    contentWrapper.append(dateP);

    const headlineP = document.createElement('p');
    headlineP.classList.add('boing--text__body-2', 'boing--text__body');
    const authoredHeadline = articleNode.querySelector('[data-aue-prop="headline"]') || articleNode.querySelector('.boing--text__body-2:not(.published_date)');
    if (authoredHeadline) {
      headlineP.textContent = authoredHeadline.textContent.trim();
      moveInstrumentation(authoredHeadline, headlineP);
    }
    contentWrapper.append(headlineP);

    cardDiv.append(contentWrapper);
    cardLink.append(cardDiv);
    secondSection.append(cardLink);
    moveInstrumentation(articleNode, cardLink);
  });

  articleListingWrapper.append(secondSection);

  block.textContent = '';
  block.append(articleListingWrapper);
  block.className = 'article-listing block';
  block.dataset.blockStatus = 'loaded';
}
