import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('latestBlogs-article_listing', 'latestBlogs-position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestBlogs-article_listing_section--first', 'latestBlogs-text-white', 'latestBlogs-text-center');

  const heading = block.querySelector('[data-aue-prop="heading"]') || block.querySelector('h2');
  if (heading) {
    heading.classList.add('latestBlogs-article_listing--title', 'latestBlogs-boing--text__heading-1', 'latestBlogs-text-white', 'latestBlogs-pb-3');
    firstSection.append(heading);
    moveInstrumentation(heading, firstSection);
  }

  const description = block.querySelector('[data-aue-prop="description"]') || block.querySelector('p');
  if (description) {
    description.classList.add('latestBlogs-article_listing--desc', 'latestBlogs-boing--text__body-2', 'latestBlogs-pb-4');
    firstSection.append(description);
    moveInstrumentation(description, firstSection);
  }

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('latestBlogs-article_listing--btnWrapper');

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const link = viewAllLink.querySelector('a');
    if (link) {
      link.classList.add('latestBlogs-boing--text__title-3', 'latestBlogs-article_listing--btn', 'latestBlogs-analytics_cta_click');
      buttonWrapper.append(link);
      moveInstrumentation(link, buttonWrapper);
    }
  }

  firstSection.append(buttonWrapper);
  mainWrapper.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestBlogs-article_listing_section--second', 'latestBlogs-d-flex');

  const articleItems = block.querySelectorAll('[data-aue-model="article"]');
  articleItems.forEach((itemNode) => {
    const cardLink = itemNode.querySelector('a');
    if (cardLink) {
      cardLink.classList.add('latestBlogs-article_listing--cardWrapper', 'latestBlogs-analytics_cta_click');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestBlogs-article_listing--cards');

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestBlogs-article_listing--cardImageWrapper');

      const image = itemNode.querySelector('[data-aue-prop="image"] img');
      if (image) {
        const picture = createOptimizedPicture(image.src, image.alt);
        picture.querySelector('img').classList.add('latestBlogs-article_listing--cardImage', 'latestBlogs-w-100', 'latestBlogs-h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(image, picture);
      }
      cardDiv.append(cardImageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestBlogs-cards_content--wrapper');

      const date = itemNode.querySelector('[data-aue-prop="date"]') || itemNode.querySelector('.latestBlogs-published_date');
      if (date) {
        date.classList.add('latestBlogs-boing--text__body-5', 'latestBlogs-p-0', 'latestBlogs-m-0', 'latestBlogs-mb-3', 'latestBlogs-published_date');
        contentWrapper.append(date);
        moveInstrumentation(date, contentWrapper);
      }

      const title = itemNode.querySelector('[data-aue-prop="title"]') || itemNode.querySelector('.latestBlogs-boing--text__body');
      if (title) {
        title.classList.add('latestBlogs-boing--text__body-2', 'latestBlogs-boing--text__body');
        contentWrapper.append(title);
        moveInstrumentation(title, contentWrapper);
      }

      cardDiv.append(contentWrapper);
      cardLink.append(cardDiv);
      secondSection.append(cardLink);
      moveInstrumentation(itemNode, cardLink);
    }
  });

  mainWrapper.append(secondSection);

  block.textContent = '';
  block.append(mainWrapper);
  block.className = 'latestBlogs-article_listing--wrapper block';
  block.dataset.blockStatus = 'loaded';
}
