import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
    h2.append(titleElement);
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
    p.append(descriptionElement);
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');

    const link = document.createElement('a');
    link.href = viewAllLink.href;
    link.title = viewAllLink.textContent.trim();
    link.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
    link.textContent = viewAllLink.textContent.trim();
    moveInstrumentation(viewAllLink, link);
    btnWrapper.append(link);
    firstSection.append(btnWrapper);
  }

  wrapperDiv.append(firstSection);
  moveInstrumentation(firstSection, wrapperDiv);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  const articles = block.querySelectorAll('[data-aue-model="article"]');
  articles.forEach((articleNode) => {
    const linkElement = articleNode.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      const cardWrapper = document.createElement('a');
      cardWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
      cardWrapper.href = linkElement.href;
      cardWrapper.setAttribute('data-cta-label', linkElement.textContent.trim());
      moveInstrumentation(linkElement, cardWrapper);

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');

      const imgElement = articleNode.querySelector('[data-aue-prop="image"]');
      if (imgElement) {
        const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
        picture.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        imageWrapper.append(picture);
        moveInstrumentation(imgElement, picture);
      }
      cardDiv.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

      const dateTextElement = articleNode.querySelector('[data-aue-prop="dateText"]');
      if (dateTextElement) {
        const dateP = document.createElement('p');
        dateP.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
        dateP.append(dateTextElement);
        moveInstrumentation(dateTextElement, dateP);
        contentWrapper.append(dateP);
      }

      const articleTitleElement = articleNode.querySelector('[data-aue-prop="title"]');
      if (articleTitleElement) {
        const titleP = document.createElement('p');
        titleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        titleP.append(articleTitleElement);
        moveInstrumentation(articleTitleElement, titleP);
        contentWrapper.append(titleP);
      }

      cardDiv.append(contentWrapper);
      cardWrapper.append(cardDiv);
      secondSection.append(cardWrapper);
      moveInstrumentation(articleNode, cardWrapper);
    }
  });

  wrapperDiv.append(secondSection);
  moveInstrumentation(secondSection, wrapperDiv);

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}