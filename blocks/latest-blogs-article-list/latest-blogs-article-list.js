import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('latestBlogs-article_listing', 'position-relative');

  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('latestBlogs-article_listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]') || block.querySelector('h2');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestBlogs-article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.textContent = titleElement.textContent;
    moveInstrumentation(titleElement, h2);
    sectionFirst.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]') || block.querySelector('p');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestBlogs-article_listing--desc', 'boing--text__body-2', 'pb-4');
    p.textContent = descriptionElement.textContent;
    moveInstrumentation(descriptionElement, p);
    sectionFirst.append(p);
  }

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]') || block.querySelector('.button-container a');
  if (ctaLinkElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestBlogs-article_listing--btnWrapper');

    const a = document.createElement('a');
    a.href = ctaLinkElement.href;
    a.title = ctaLinkElement.title || ctaLinkElement.textContent.trim();
    a.classList.add('boing--text__title-3', 'latestBlogs-article_listing--btn', 'analytics_cta_click');
    a.textContent = ctaLinkElement.textContent.trim();
    moveInstrumentation(ctaLinkElement, a);
    btnWrapper.append(a);
    sectionFirst.append(btnWrapper);
  }

  rootDiv.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('latestBlogs-article_listing_section--second', 'd-flex');

  const cardItems = block.querySelectorAll('[data-aue-model="latestBlogCard"]');
  cardItems.forEach((itemNode) => {
    const linkElement = itemNode.querySelector('[data-aue-prop="link"]') || itemNode.querySelector('a');
    if (linkElement) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = linkElement.href;
      cardWrapper.classList.add('latestBlogs-article_listing--cardWrapper', 'analytics_cta_click');
      if (linkElement.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = linkElement.dataset.ctaLabel;
      }

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestBlogs-article_listing--cards');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('latestBlogs-article_listing--cardImageWrapper');

      const imgElement = itemNode.querySelector('[data-aue-prop="image"] img');
      if (imgElement) {
        const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('latestBlogs-article_listing--cardImage', 'w-100', 'h-100');
        imageWrapper.append(picture);
        moveInstrumentation(imgElement, picture);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestBlogs-cards_content--wrapper');

      const dateElement = itemNode.querySelector('[data-aue-prop="date"]') || itemNode.querySelector('.latestBlogs-published_date');
      if (dateElement) {
        const dateP = document.createElement('p');
        dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestBlogs-published_date');
        dateP.textContent = dateElement.textContent;
        if (dateElement.dataset.date) {
          dateP.dataset.date = dateElement.dataset.date;
        }
        moveInstrumentation(dateElement, dateP);
        contentWrapper.append(dateP);
      }

      const headingElement = itemNode.querySelector('[data-aue-prop="heading"]') || itemNode.querySelector('.boing--text__body-2.boing--text__body');
      if (headingElement) {
        const headingP = document.createElement('p');
        headingP.classList.add('boing--text__body-2', 'boing--text__body');
        headingP.textContent = headingElement.textContent;
        moveInstrumentation(headingElement, headingP);
        contentWrapper.append(headingP);
      }

      cardDiv.append(imageWrapper, contentWrapper);
      cardWrapper.append(cardDiv);
      moveInstrumentation(itemNode, cardWrapper);
      sectionSecond.append(cardWrapper);
    }
  });

  rootDiv.append(sectionSecond);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}