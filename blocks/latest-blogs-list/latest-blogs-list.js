import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootWrapper = document.createElement('div');
  rootWrapper.className = 'latestblogs-latestBlogs-article_listing--wrapper';

  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'latestblogs-latestBlogs-article_listing latestblogs-position-relative';
  rootWrapper.append(innerWrapper);

  const firstSection = document.createElement('div');
  firstSection.className = 'latestblogs-latestBlogs-article_listing_section--first latestblogs-text-white latestblogs-text-center';
  innerWrapper.append(firstSection);

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.className = 'latestblogs-latestBlogs-article_listing--title latestblogs-boing--text__heading-1 latestblogs-text-white latestblogs-pb-3';
    h2.append(title);
    moveInstrumentation(title, h2);
    firstSection.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const pDesc = document.createElement('p');
    pDesc.className = 'latestblogs-latestBlogs-article_listing--desc latestblogs-boing--text__body-2 latestblogs-pb-4';
    pDesc.append(description);
    moveInstrumentation(description, pDesc);
    firstSection.append(pDesc);
  }

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'latestblogs-latestBlogs-article_listing--btnWrapper';
    const a = document.createElement('a');
    a.href = ctaLink.textContent.trim();
    a.title = ctaLink.textContent.trim(); // Assuming title is the same as href for now
    a.className = 'latestblogs-boing--text__title-3 latestblogs-latestBlogs-article_listing--btn latestblogs-analytics_cta_click';
    a.textContent = ctaLink.textContent.trim();
    btnWrapper.append(a);
    moveInstrumentation(ctaLink, a);
    firstSection.append(btnWrapper);
  }

  const secondSection = document.createElement('div');
  secondSection.className = 'latestblogs-latestBlogs-article_listing_section--second latestblogs-d-flex';
  innerWrapper.append(secondSection);

  const blogItems = block.querySelectorAll('[data-aue-model="blog"]');
  blogItems.forEach((itemNode) => {
    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const dateElement = itemNode.querySelector('[data-aue-prop="date"]');
    const headlineElement = itemNode.querySelector('[data-aue-prop="headline"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.className = 'latestblogs-latestBlogs-article_listing--cardWrapper latestblogs-analytics_cta_click';
    cardWrapper.href = linkElement ? linkElement.textContent.trim() : '#';
    if (headlineElement) {
      cardWrapper.dataset.ctaLabel = headlineElement.textContent.trim();
    }
    moveInstrumentation(linkElement, cardWrapper);

    const cardDiv = document.createElement('div');
    cardDiv.className = 'latestblogs-latestBlogs-article_listing--cards';
    cardWrapper.append(cardDiv);

    if (imageElement) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.className = 'latestblogs-latestBlogs-article_listing--cardImageWrapper';
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').className = 'latestblogs-latestBlogs-article_listing--cardImage latestblogs-w-100 latestblogs-h-100';
      cardImageWrapper.append(picture);
      moveInstrumentation(imageElement, picture);
      cardDiv.append(cardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'latestblogs-latestBlogs-cards_content--wrapper';
    cardDiv.append(contentWrapper);

    if (dateElement) {
      const pDate = document.createElement('p');
      pDate.className = 'latestblogs-boing--text__body-5 latestblogs-p-0 latestblogs-m-0 latestblogs-mb-3 latestblogs-latestBlogs-published_date';
      pDate.textContent = dateElement.textContent.trim();
      if (dateElement.dataset.date) {
        pDate.dataset.date = dateElement.dataset.date;
      }
      contentWrapper.append(pDate);
      moveInstrumentation(dateElement, pDate);
    }

    if (headlineElement) {
      const pHeadline = document.createElement('p');
      pHeadline.className = 'latestblogs-boing--text__body-2 latestblogs-boing--text__body';
      pHeadline.append(headlineElement);
      moveInstrumentation(headlineElement, pHeadline);
      contentWrapper.append(pHeadline);
    }

    secondSection.append(cardWrapper);
    moveInstrumentation(itemNode, cardWrapper);
  });

  block.textContent = '';
  block.append(rootWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}