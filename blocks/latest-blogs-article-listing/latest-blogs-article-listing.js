import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsArticleListingWrapper = document.createElement('div');
  latestBlogsArticleListingWrapper.classList.add('latestBlogs-article_listing', 'position-relative');
  moveInstrumentation(block.querySelector(':scope > div'), latestBlogsArticleListingWrapper);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestBlogs-article_listing_section--first', 'text-white', 'text-center');
  latestBlogsArticleListingWrapper.append(firstSection);

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    title.classList.add('latestBlogs-article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    firstSection.append(title);
    moveInstrumentation(block.querySelector(':scope > div > div:nth-child(1) > h2'), title);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    description.classList.add('latestBlogs-article_listing--desc', 'boing--text__body-2', 'pb-4');
    firstSection.append(description);
    moveInstrumentation(block.querySelector(':scope > div > div:nth-child(1) > p'), description);
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestBlogs-article_listing--btnWrapper');
  firstSection.append(btnWrapper);

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const link = viewAllLink.querySelector('a');
    if (link) {
      link.classList.add('boing--text__title-3', 'latestBlogs-article_listing--btn', 'analytics_cta_click');
      btnWrapper.append(link);
      moveInstrumentation(viewAllLink, btnWrapper);
    }
  }

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestBlogs-article_listing_section--second', 'd-flex');
  latestBlogsArticleListingWrapper.append(secondSection);

  const articleCards = block.querySelectorAll('[data-aue-model="articleCard"]');
  articleCards.forEach((cardNode) => {
    const articleLink = cardNode.querySelector('[data-aue-prop="articleLink"]');
    const cardWrapper = articleLink ? articleLink.querySelector('a') : document.createElement('a');
    if (articleLink) {
      cardWrapper.href = articleLink.querySelector('a').href;
      const ctaLabel = articleLink.querySelector('a').getAttribute('title');
      if (ctaLabel) {
        cardWrapper.dataset.ctaLabel = ctaLabel;
      }
    }
    cardWrapper.classList.add('latestBlogs-article_listing--cardWrapper', 'analytics_cta_click');

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestBlogs-article_listing--cards');
    cardWrapper.append(cardsDiv);

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestBlogs-article_listing--cardImageWrapper');
    cardsDiv.append(cardImageWrapper);

    const image = cardNode.querySelector('[data-aue-prop="image"]');
    if (image) {
      const img = image.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('latestBlogs-article_listing--cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(image, cardImageWrapper);
      }
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestBlogs-cards_content--wrapper');
    cardsDiv.append(contentWrapper);

    const date = cardNode.querySelector('[data-aue-prop="date"]');
    if (date) {
      const dateP = date.querySelector('p');
      if (dateP) {
        dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestBlogs-published_date');
        contentWrapper.append(dateP);
        moveInstrumentation(date, contentWrapper);
      }
    }

    const cardTitle = cardNode.querySelector('[data-aue-prop="title"]');
    if (cardTitle) {
      const cardTitleP = cardTitle.querySelector('p');
      if (cardTitleP) {
        cardTitleP.classList.add('boing--text__body-2', 'boing--text__body');
        contentWrapper.append(cardTitleP);
        moveInstrumentation(cardTitle, contentWrapper);
      }
    }

    secondSection.append(cardWrapper);
    moveInstrumentation(cardNode, cardWrapper);
  });

  block.textContent = '';
  block.append(latestBlogsArticleListingWrapper);
  block.className = `${block.dataset.blockName} latestBlogs-article_listing--wrapper`;
  block.dataset.blockStatus = 'loaded';
}
