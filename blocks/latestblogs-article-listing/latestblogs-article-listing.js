import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const title = document.createElement('h2');
  title.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
  const authoredTitle = block.querySelector('[data-aue-prop="title"]') || block.querySelector('h2');
  if (authoredTitle) {
    title.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, title);
  }

  const description = document.createElement('p');
  description.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
  const authoredDescription = block.querySelector('[data-aue-prop="description"]') || block.querySelector('p');
  if (authoredDescription) {
    description.append(...authoredDescription.childNodes);
    moveInstrumentation(authoredDescription, description);
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');

  const viewAllLink = document.createElement('a');
  viewAllLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
  const authoredViewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]') || block.querySelector('.button-container a');
  if (authoredViewAllLink) {
    viewAllLink.href = authoredViewAllLink.href;
    viewAllLink.title = authoredViewAllLink.title || authoredViewAllLink.textContent.trim();
    viewAllLink.textContent = authoredViewAllLink.textContent.trim();
    moveInstrumentation(authoredViewAllLink, viewAllLink);
  }

  btnWrapper.append(viewAllLink);
  firstSection.append(title, description, btnWrapper);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  const articles = block.querySelectorAll('[data-aue-model="article"]');
  articles.forEach((articleNode) => {
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');

    const link = articleNode.querySelector('[data-aue-prop="link"]');
    if (link) {
      cardWrapper.href = link.href;
      cardWrapper.setAttribute('data-cta-label', link.textContent.trim());
      moveInstrumentation(link, cardWrapper);
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');

    const img = articleNode.querySelector('[data-aue-prop="image"]');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt || '');
      picture.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
      cardImageWrapper.append(picture);
      moveInstrumentation(img, picture);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

    const dateP = document.createElement('p');
    dateP.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
    const authoredDate = articleNode.querySelector('[data-aue-prop="date"]') || articleNode.querySelector('p[data-date]');
    if (authoredDate) {
      dateP.textContent = authoredDate.textContent.trim();
      dateP.setAttribute('data-date', authoredDate.getAttribute('data-date'));
      moveInstrumentation(authoredDate, dateP);
    }

    const headingP = document.createElement('p');
    headingP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
    const authoredHeading = articleNode.querySelector('[data-aue-prop="heading"]') || articleNode.querySelector('p:not([data-date])');
    if (authoredHeading) {
      headingP.append(...authoredHeading.childNodes);
      moveInstrumentation(authoredHeading, headingP);
    }

    contentWrapper.append(dateP, headingP);
    cardDiv.append(cardImageWrapper, contentWrapper);
    cardWrapper.append(cardDiv);
    secondSection.append(cardWrapper);
    moveInstrumentation(articleNode, cardWrapper);
  });

  rootDiv.append(firstSection, secondSection);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `latestblogs-latestBlogs-article_listing--wrapper ${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
