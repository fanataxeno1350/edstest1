import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const title = block.querySelector('h2.latestblogs-latestBlogs-article_listing--title');
  if (title) {
    firstSection.append(title);
    moveInstrumentation(title, firstSection);
  }

  const description = block.querySelector('p.latestblogs-latestBlogs-article_listing--desc');
  if (description) {
    firstSection.append(description);
    moveInstrumentation(description, firstSection);
  }

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');
  const cta = block.querySelector('.latestblogs-latestBlogs-article_listing--btnWrapper a');
  if (cta) {
    buttonWrapper.append(cta);
    moveInstrumentation(cta, buttonWrapper);
  }
  firstSection.append(buttonWrapper);

  wrapperDiv.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
    cardLink.href = cardNode.querySelector('[data-aue-prop="link"]')?.href || '#';
    if (cardNode.dataset.ctaLabel) {
      cardLink.dataset.ctaLabel = cardNode.dataset.ctaLabel;
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');

    const img = cardNode.querySelector('img[data-aue-prop="image"]');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      cardImageWrapper.append(picture);
      moveInstrumentation(img, picture);
    }
    cardDiv.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

    const dateP = cardNode.querySelector('p[data-aue-prop="date"]');
    if (dateP) {
      contentWrapper.append(dateP);
      moveInstrumentation(dateP, contentWrapper);
    }

    const titleP = cardNode.querySelector('p[data-aue-prop="title"]');
    if (titleP) {
      contentWrapper.append(titleP);
      moveInstrumentation(titleP, contentWrapper);
    }

    cardDiv.append(contentWrapper);
    cardLink.append(cardDiv);
    secondSection.append(cardLink);
    moveInstrumentation(cardNode, cardLink);
  });

  wrapperDiv.append(secondSection);

  block.textContent = '';
  block.append(wrapperDiv);
  block.classList.add('latestblogs-latestBlogs-article_listing--wrapper');
  block.dataset.blockStatus = 'loaded';
}