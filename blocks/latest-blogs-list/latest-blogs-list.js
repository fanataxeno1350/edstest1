import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const titleElement = document.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
    h2.textContent = titleElement.textContent.trim();
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = document.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const pDesc = document.createElement('p');
    pDesc.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
    pDesc.textContent = descriptionElement.textContent.trim();
    moveInstrumentation(descriptionElement, pDesc);
    firstSection.append(pDesc);
  }

  const viewAllLinkContainer = document.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkContainer) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');

    const linkElement = viewAllLinkContainer.querySelector('a');
    if (linkElement) {
      const newLink = document.createElement('a');
      newLink.href = linkElement.href;
      newLink.title = linkElement.title || linkElement.textContent.trim();
      newLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
      newLink.textContent = linkElement.textContent.trim();
      moveInstrumentation(linkElement, newLink);
      btnWrapper.append(newLink);
    }
    moveInstrumentation(viewAllLinkContainer, btnWrapper);
    firstSection.append(btnWrapper);
  }
  mainDiv.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const linkProp = cardNode.querySelector('[data-aue-prop="link"]');
    const link = linkProp ? linkProp.querySelector('a') : null;
    const imageProp = cardNode.querySelector('[data-aue-prop="image"]');
    const image = imageProp ? imageProp.querySelector('img') : null;
    const dateProp = cardNode.querySelector('[data-aue-prop="date"]');
    const titleProp = cardNode.querySelector('[data-aue-prop="title"]');

    if (link) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = link.href;
      cardWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
      cardWrapper.dataset.ctaLabel = cardNode.dataset.ctaLabel || (titleProp ? titleProp.textContent.trim() : '');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

      if (image) {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
        const picture = createOptimizedPicture(image.src, image.alt || '', false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        imageWrapper.append(picture);
        moveInstrumentation(imageProp, imageWrapper);
        cardDiv.append(imageWrapper);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

      if (dateProp) {
        const pDate = document.createElement('p');
        pDate.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
        pDate.textContent = dateProp.textContent.trim();
        pDate.dataset.date = dateProp.dataset.date;
        moveInstrumentation(dateProp, pDate);
        contentWrapper.append(pDate);
      }

      if (titleProp) {
        const pTitle = document.createElement('p');
        pTitle.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        pTitle.textContent = titleProp.textContent.trim();
        moveInstrumentation(titleProp, pTitle);
        contentWrapper.append(pTitle);
      }
      cardDiv.append(contentWrapper);
      cardWrapper.append(cardDiv);
      moveInstrumentation(cardNode, cardWrapper);
      secondSection.append(cardWrapper);
    }
  });

  mainDiv.append(secondSection);

  block.textContent = '';
  block.append(mainDiv);
  block.classList.add('latestblogs-latestBlogs-article_listing--wrapper');
  block.dataset.blockStatus = 'loaded';
}