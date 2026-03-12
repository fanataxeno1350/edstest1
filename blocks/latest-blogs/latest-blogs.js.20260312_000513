import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
    moveInstrumentation(titleElement, h2);
    h2.append(...titleElement.childNodes);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
    moveInstrumentation(descriptionElement, p);
    p.append(...descriptionElement.childNodes);
    firstSection.append(p);
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');
  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const link = document.createElement('a');
    link.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
    link.href = viewAllLink.href;
    link.title = viewAllLink.textContent.trim();
    moveInstrumentation(viewAllLink, link);
    link.textContent = viewAllLink.textContent.trim();
    btnWrapper.append(link);
    firstSection.append(btnWrapper);
  }

  mainWrapper.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const cardLink = card.querySelector('[data-aue-prop="link"]');
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
    if (cardLink) {
      cardWrapper.href = cardLink.href;
      cardWrapper.dataset.ctaLabel = cardLink.textContent.trim();
      moveInstrumentation(cardLink, cardWrapper);
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
    const imgElement = card.querySelector('[data-aue-prop="image"]');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt || '');
      picture.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
      moveInstrumentation(imgElement, picture);
      imageWrapper.append(picture);
    }
    cardDiv.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

    const publishDateElement = card.querySelector('[data-aue-prop="publishDate"]');
    if (publishDateElement) {
      const dateP = document.createElement('p');
      dateP.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
      dateP.dataset.date = publishDateElement.dataset.date;
      moveInstrumentation(publishDateElement, dateP);
      dateP.append(...publishDateElement.childNodes);
      contentWrapper.append(dateP);
    }

    const blogTitleElement = card.querySelector('[data-aue-prop="title"]');
    if (blogTitleElement) {
      const titleP = document.createElement('p');
      titleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      moveInstrumentation(blogTitleElement, titleP);
      titleP.append(...blogTitleElement.childNodes);
      contentWrapper.append(titleP);
    }
    cardDiv.append(contentWrapper);
    cardWrapper.append(cardDiv);
    secondSection.append(cardWrapper);
    moveInstrumentation(card, cardWrapper);
  });

  mainWrapper.append(secondSection);

  block.textContent = '';
  block.append(mainWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
