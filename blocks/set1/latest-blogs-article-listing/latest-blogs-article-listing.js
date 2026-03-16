import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('latestBlogs-article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestBlogs-article_listing_section--first', 'text-white', 'text-center');

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestBlogs-article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...heading.childNodes);
    moveInstrumentation(heading, h2);
    firstSection.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const pDesc = document.createElement('p');
    pDesc.classList.add('latestBlogs-article_listing--desc', 'boing--text__body-2', 'pb-4');
    pDesc.append(...description.childNodes);
    moveInstrumentation(description, pDesc);
    firstSection.append(pDesc);
  }

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestBlogs-article_listing--btnWrapper');
    const link = viewAllLink.querySelector('a');
    if (link) {
      link.classList.add('boing--text__title-3', 'latestBlogs-article_listing--btn', 'analytics_cta_click');
      btnWrapper.append(link);
      moveInstrumentation(viewAllLink, btnWrapper);
      firstSection.append(btnWrapper);
    }
  }

  mainDiv.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestBlogs-article_listing_section--second', 'd-flex');

  const articles = block.querySelectorAll('[data-aue-model="article"]');
  articles.forEach((articleNode) => {
    const link = articleNode.querySelector('[data-aue-prop="link"] a');
    if (link) {
      link.classList.add('latestBlogs-article_listing--cardWrapper', 'analytics_cta_click');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestBlogs-article_listing--cards');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('latestBlogs-article_listing--cardImageWrapper');
      const img = articleNode.querySelector('[data-aue-prop="image"]');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('latestBlogs-article_listing--cardImage', 'w-100', 'h-100');
        imageWrapper.append(picture);
        moveInstrumentation(img, imageWrapper);
      }
      cardDiv.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestBlogs-cards_content--wrapper');

      const publishDate = articleNode.querySelector('[data-aue-prop="publishDate"]');
      if (publishDate) {
        const pDate = document.createElement('p');
        pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestBlogs-published_date');
        pDate.textContent = publishDate.textContent;
        contentWrapper.append(pDate);
        moveInstrumentation(publishDate, pDate);
      }

      const title = articleNode.querySelector('[data-aue-prop="title"]');
      if (title) {
        const pTitle = document.createElement('p');
        pTitle.classList.add('boing--text__body-2', 'boing--text__body');
        pTitle.append(...title.childNodes);
        contentWrapper.append(pTitle);
        moveInstrumentation(title, pTitle);
      }

      cardDiv.append(contentWrapper);
      link.append(cardDiv);
      secondSection.append(link);
      moveInstrumentation(articleNode, link);
    }
  });

  mainDiv.append(secondSection);

  block.textContent = '';
  block.append(mainDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}