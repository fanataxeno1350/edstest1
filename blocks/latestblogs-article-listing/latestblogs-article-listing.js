import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('latestBlogs-article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestBlogs-article_listing_section--first', 'text-white', 'text-center');

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    title.classList.add('latestBlogs-article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    firstSection.append(title);
    moveInstrumentation(title, firstSection);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    description.classList.add('latestBlogs-article_listing--desc', 'boing--text__body-2', 'pb-4');
    firstSection.append(description);
    moveInstrumentation(description, firstSection);
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestBlogs-article_listing--btnWrapper');

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const link = viewAllLink.querySelector('a');
    if (link) {
      link.classList.add('boing--text__title-3', 'latestBlogs-article_listing--btn', 'analytics_cta_click');
      btnWrapper.append(link);
      moveInstrumentation(link, btnWrapper);
    }
  }
  firstSection.append(btnWrapper);

  mainDiv.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestBlogs-article_listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('latestBlogs-article_listing--cardWrapper', 'analytics_cta_click');

    const url = cardNode.querySelector('[data-aue-prop="url"]');
    if (url) {
      const linkElement = url.querySelector('a');
      if (linkElement) {
        cardLink.href = linkElement.href;
        cardLink.setAttribute('data-cta-label', linkElement.textContent.trim());
        moveInstrumentation(linkElement, cardLink);
      }
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestBlogs-article_listing--cards');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestBlogs-article_listing--cardImageWrapper');

    const image = cardNode.querySelector('[data-aue-prop="image"]');
    if (image) {
      const imgElement = image.querySelector('img');
      if (imgElement) {
        const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
        picture.classList.add('latestBlogs-article_listing--cardImage', 'w-100', 'h-100');
        imageWrapper.append(picture);
        moveInstrumentation(imgElement, imageWrapper);
      }
    }
    cardDiv.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestBlogs-cards_content--wrapper');

    const date = cardNode.querySelector('[data-aue-prop="date"]');
    if (date) {
      const dateP = date.querySelector('p');
      if (dateP) {
        dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
        contentWrapper.append(dateP);
        moveInstrumentation(dateP, contentWrapper);
      }
    }

    const blogTitle = cardNode.querySelector('[data-aue-prop="title"]');
    if (blogTitle) {
      const titleP = blogTitle.querySelector('p');
      if (titleP) {
        titleP.classList.add('boing--text__body-2', 'boing--text__body');
        contentWrapper.append(titleP);
        moveInstrumentation(titleP, contentWrapper);
      }
    }
    cardDiv.append(contentWrapper);
    cardLink.append(cardDiv);
    secondSection.append(cardLink);
    moveInstrumentation(cardNode, cardLink);
  });

  mainDiv.append(secondSection);

  block.textContent = '';
  block.append(mainDiv);
  block.className = 'latestBlogs-article_listing--wrapper block';
  block.dataset.blockStatus = 'loaded';
}
