import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');
  moveInstrumentation(block.firstElementChild, wrapper);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const titleH2 = document.createElement('h2');
  titleH2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
  const authoredTitle = block.querySelector('[data-aue-prop="title"]') || block.querySelector('h2');
  if (authoredTitle) {
    titleH2.textContent = authoredTitle.textContent.trim();
    moveInstrumentation(authoredTitle, titleH2);
  }
  firstSection.append(titleH2);

  const descriptionP = document.createElement('p');
  descriptionP.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
  const authoredDescription = block.querySelector('[data-aue-prop="description"]') || block.querySelector('p');
  if (authoredDescription) {
    descriptionP.textContent = authoredDescription.textContent.trim();
    moveInstrumentation(authoredDescription, descriptionP);
  }
  firstSection.append(descriptionP);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');
  const authoredLink = block.querySelector('[data-aue-prop="viewAllLink"]') || block.querySelector('.button-container a');
  if (authoredLink) {
    const viewAllLink = document.createElement('a');
    viewAllLink.href = authoredLink.href;
    viewAllLink.title = authoredLink.title || authoredLink.textContent.trim();
    viewAllLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
    viewAllLink.textContent = authoredLink.textContent.split('/content/dam')[0].trim(); // Extract text before image path
    btnWrapper.append(viewAllLink);
    moveInstrumentation(authoredLink, viewAllLink);
  }
  firstSection.append(btnWrapper);

  wrapper.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const blogLink = cardNode.querySelector('[data-aue-prop="blogLink"]') || cardNode.querySelector('a');
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
    if (blogLink) {
      cardWrapper.href = blogLink.href;
      cardWrapper.setAttribute('data-cta-label', blogLink.getAttribute('data-cta-label') || blogLink.textContent.trim());
      moveInstrumentation(blogLink, cardWrapper);
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
    const authoredImage = cardNode.querySelector('[data-aue-prop="image"]') || cardNode.querySelector('img');
    if (authoredImage) {
      const picture = createOptimizedPicture(authoredImage.src, authoredImage.alt || '', false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
      imageWrapper.append(picture);
      moveInstrumentation(authoredImage, picture);
    }
    cardDiv.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

    const dateP = document.createElement('p');
    dateP.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
    const authoredDate = cardNode.querySelector('[data-aue-prop="publishDate"]') || cardNode.querySelector('p[data-date]');
    if (authoredDate) {
      dateP.textContent = authoredDate.textContent.trim();
      dateP.setAttribute('data-date', authoredDate.getAttribute('data-date'));
      moveInstrumentation(authoredDate, dateP);
    }
    contentWrapper.append(dateP);

    const titleP = document.createElement('p');
    titleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
    const authoredCardTitle = cardNode.querySelector('[data-aue-prop="title"]') || cardNode.querySelector('.latestblogs-boing--text__body-2');
    if (authoredCardTitle) {
      titleP.textContent = authoredCardTitle.textContent.trim();
      moveInstrumentation(authoredCardTitle, titleP);
    }
    contentWrapper.append(titleP);

    cardDiv.append(contentWrapper);
    cardWrapper.append(cardDiv);
    secondSection.append(cardWrapper);
    moveInstrumentation(cardNode, cardWrapper);
  });

  wrapper.append(secondSection);

  block.textContent = '';
  block.append(wrapper);
  block.className = `latestblogs-latestBlogs-article_listing--wrapper ${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
