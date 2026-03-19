import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'latestBlogs-article_listing position-relative';

  const firstSectionDiv = document.createElement('div');
  firstSectionDiv.className = 'latestBlogs-article_listing_section--first text-white text-center';

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'latestBlogs-article_listing--title boing--text__heading-1 text-white pb-3';
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    firstSectionDiv.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.className = 'latestBlogs-article_listing--desc boing--text__body-2 pb-4';
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    firstSectionDiv.append(p);
  }

  const buttonWrapperDiv = document.createElement('div');
  buttonWrapperDiv.className = 'latestBlogs-article_listing--btnWrapper';

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const a = document.createElement('a');
    a.href = viewAllLink.href;
    a.title = viewAllLink.textContent.trim();
    a.className = 'boing--text__title-3 latestBlogs-article_listing--btn analytics_cta_click';
    a.textContent = viewAllLink.textContent.trim();
    moveInstrumentation(viewAllLink, a);
    buttonWrapperDiv.append(a);
  }
  firstSectionDiv.append(buttonWrapperDiv);
  wrapperDiv.append(firstSectionDiv);

  const secondSectionDiv = document.createElement('div');
  secondSectionDiv.className = 'latestBlogs-article_listing_section--second d-flex';

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      const cardAnchor = document.createElement('a');
      cardAnchor.href = linkElement.href;
      cardAnchor.className = 'latestBlogs-article_listing--cardWrapper analytics_cta_click';
      cardAnchor.dataset.ctaLabel = card.querySelector('[data-aue-prop="blogTitle"]')?.textContent.trim() || '';
      moveInstrumentation(linkElement, cardAnchor);

      const cardDiv = document.createElement('div');
      cardDiv.className = 'latestBlogs-article_listing--cards';

      const imageWrapperDiv = document.createElement('div');
      imageWrapperDiv.className = 'latestBlogs-article_listing--cardImageWrapper';
      const imageElement = card.querySelector('[data-aue-prop="image"]');
      if (imageElement) {
        const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
        picture.querySelector('img').className = 'latestBlogs-article_listing--cardImage w-100 h-100';
        imageWrapperDiv.append(picture);
        moveInstrumentation(imageElement, picture);
      }
      cardDiv.append(imageWrapperDiv);

      const contentWrapperDiv = document.createElement('div');
      contentWrapperDiv.className = 'latestBlogs-cards_content--wrapper';

      const dateElement = card.querySelector('[data-aue-prop="date"]');
      if (dateElement) {
        const dateP = document.createElement('p');
        dateP.className = 'boing--text__body-5 p-0 m-0 mb-3 latestBlogs-published_date';
        dateP.textContent = dateElement.textContent.trim();
        dateP.dataset.date = dateElement.dataset.date;
        moveInstrumentation(dateElement, dateP);
        contentWrapperDiv.append(dateP);
      }

      const blogTitleElement = card.querySelector('[data-aue-prop="blogTitle"]');
      if (blogTitleElement) {
        const titleP = document.createElement('p');
        titleP.className = 'boing--text__body-2 boing--text__body';
        titleP.textContent = blogTitleElement.textContent.trim();
        moveInstrumentation(blogTitleElement, titleP);
        contentWrapperDiv.append(titleP);
      }

      cardDiv.append(contentWrapperDiv);
      cardAnchor.append(cardDiv);
      secondSectionDiv.append(cardAnchor);
      moveInstrumentation(card, cardAnchor);
    }
  });

  wrapperDiv.append(secondSectionDiv);

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
