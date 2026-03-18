import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsArticleListingWrapper = document.createElement('div');
  latestBlogsArticleListingWrapper.classList.add('latestBlogs-article_listing--wrapper');

  const latestBlogsArticleListing = document.createElement('div');
  latestBlogsArticleListing.classList.add('latestBlogs-article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestBlogs-article_listing_section--first', 'text-white', 'text-center');

  const heading = block.querySelector('h2.latestBlogs-article_listing--title');
  if (heading) {
    firstSection.append(heading);
    moveInstrumentation(heading, firstSection);
  }

  const description = block.querySelector('p.latestBlogs-article_listing--desc');
  if (description) {
    firstSection.append(description);
    moveInstrumentation(description, firstSection);
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestBlogs-article_listing--btnWrapper');
  const viewAllLink = block.querySelector('.latestBlogs-article_listing--btnWrapper a');
  if (viewAllLink) {
    btnWrapper.append(viewAllLink);
    moveInstrumentation(viewAllLink, btnWrapper);
  }
  firstSection.append(btnWrapper);

  latestBlogsArticleListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestBlogs-article_listing_section--second', 'd-flex');

  const articleItems = block.querySelectorAll('[data-aue-model="article"]');
  articleItems.forEach((itemNode) => {
    const cardLink = itemNode.querySelector('a');
    if (cardLink) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = cardLink.href;
      cardWrapper.classList.add('latestBlogs-article_listing--cardWrapper', 'analytics_cta_click');
      if (cardLink.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = cardLink.dataset.ctaLabel;
      }

      const card = document.createElement('div');
      card.classList.add('latestBlogs-article_listing--cards');

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestBlogs-article_listing--cardImageWrapper');
      const img = itemNode.querySelector('img');
      if (img) {
        cardImageWrapper.append(createOptimizedPicture(img.src, img.alt));
        moveInstrumentation(img, cardImageWrapper);
      }
      card.append(cardImageWrapper);

      const cardContentWrapper = document.createElement('div');
      cardContentWrapper.classList.add('latestBlogs-cards_content--wrapper');

      const date = itemNode.querySelector('p.latestBlogs-published_date');
      if (date) {
        cardContentWrapper.append(date);
        moveInstrumentation(date, cardContentWrapper);
      }

      const title = itemNode.querySelector('p.boing--text__body-2.boing--text__body');
      if (title) {
        cardContentWrapper.append(title);
        moveInstrumentation(title, cardContentWrapper);
      }

      card.append(cardContentWrapper);
      cardWrapper.append(card);
      secondSection.append(cardWrapper);
      moveInstrumentation(itemNode, cardWrapper);
    }
  });

  latestBlogsArticleListing.append(secondSection);
  latestBlogsArticleListingWrapper.append(latestBlogsArticleListing);

  block.textContent = '';
  block.append(latestBlogsArticleListingWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
