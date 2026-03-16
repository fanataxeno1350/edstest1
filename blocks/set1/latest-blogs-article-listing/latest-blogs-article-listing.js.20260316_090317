import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('latestBlogs-article_listing', 'position-relative');

  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('latestBlogs-article_listing_section--first', 'text-white', 'text-center');

  const title = block.querySelector('h2.latestBlogs-article_listing--title');
  if (title) {
    sectionFirst.append(title);
    moveInstrumentation(title, sectionFirst);
  }

  const description = block.querySelector('p.latestBlogs-article_listing--desc');
  if (description) {
    sectionFirst.append(description);
    moveInstrumentation(description, sectionFirst);
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestBlogs-article_listing--btnWrapper');
  const viewAllLink = block.querySelector('.latestBlogs-article_listing--btnWrapper a');
  if (viewAllLink) {
    btnWrapper.append(viewAllLink);
    moveInstrumentation(viewAllLink, btnWrapper);
  }
  sectionFirst.append(btnWrapper);

  rootDiv.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('latestBlogs-article_listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('latestBlogs-article_listing--cardWrapper', 'analytics_cta_click');
    cardLink.href = cardNode.querySelector('a')?.href || '#';
    if (cardNode.dataset.ctaLabel) {
      cardLink.dataset.ctaLabel = cardNode.dataset.ctaLabel;
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestBlogs-article_listing--cards');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestBlogs-article_listing--cardImageWrapper');
    const img = cardNode.querySelector('img[data-aue-prop="image"]');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
      imageWrapper.append(picture);
      moveInstrumentation(img, picture);
    }
    cardDiv.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestBlogs-cards_content--wrapper');

    const dateP = document.createElement('p');
    dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestBlogs-published_date');
    const authoredDate = cardNode.querySelector('[data-aue-prop="date"]');
    if (authoredDate) {
      dateP.textContent = authoredDate.textContent;
      if (authoredDate.dataset.date) {
        dateP.dataset.date = authoredDate.dataset.date;
      }
      moveInstrumentation(authoredDate, dateP);
    } else {
      // Fallback for date if data-aue-prop not found
      const dateNode = cardNode.querySelector('.latestBlogs-published_date');
      if (dateNode) {
        dateP.textContent = dateNode.textContent;
        if (dateNode.dataset.date) {
          dateP.dataset.date = dateNode.dataset.date;
        }
        moveInstrumentation(dateNode, dateP);
      }
    }
    contentWrapper.append(dateP);

    const titleP = document.createElement('p');
    titleP.classList.add('boing--text__body-2', 'boing--text__body');
    const authoredTitle = cardNode.querySelector('[data-aue-prop="title"]');
    if (authoredTitle) {
      titleP.textContent = authoredTitle.textContent;
      moveInstrumentation(authoredTitle, titleP);
    } else {
      // Fallback for title if data-aue-prop not found
      const titleNode = cardNode.querySelector('.boing--text__body-2.boing--text__body');
      if (titleNode) {
        titleP.textContent = titleNode.textContent;
        moveInstrumentation(titleNode, titleP);
      }
    }
    contentWrapper.append(titleP);

    cardDiv.append(contentWrapper);
    cardLink.append(cardDiv);
    sectionSecond.append(cardLink);
    moveInstrumentation(cardNode, cardLink);
  });

  rootDiv.append(sectionSecond);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}