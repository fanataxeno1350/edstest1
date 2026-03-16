import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsArticleListingWrapper = document.createElement('div');
  latestBlogsArticleListingWrapper.classList.add('latestBlogs-article_listing', 'position-relative');

  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('latestBlogs-article_listing_section--first', 'text-white', 'text-center');

  const heading = block.querySelector('[data-aue-prop="heading"]') || block.querySelector('h2');
  if (heading) {
    heading.classList.add('latestBlogs-article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    sectionFirst.append(heading);
    moveInstrumentation(heading, sectionFirst);
  }

  const description = block.querySelector('[data-aue-prop="description"]') || block.querySelector('p');
  if (description) {
    description.classList.add('latestBlogs-article_listing--desc', 'boing--text__body-2', 'pb-4');
    sectionFirst.append(description);
    moveInstrumentation(description, sectionFirst);
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestBlogs-article_listing--btnWrapper');

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaText = block.querySelector('[data-aue-prop="ctaText"]');
  const ctaIcon = block.querySelector('[data-aue-prop="ctaIcon"]');

  const ctaAnchor = block.querySelector('.latestBlogs-article_listing--btnWrapper a');

  if (ctaAnchor) {
    ctaAnchor.classList.add('boing--text__title-3', 'latestBlogs-article_listing--btn', 'analytics_cta_click');
    btnWrapper.append(ctaAnchor);
    moveInstrumentation(ctaAnchor, btnWrapper);
  }

  if (btnWrapper.hasChildNodes()) {
    sectionFirst.append(btnWrapper);
  }

  latestBlogsArticleListingWrapper.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('latestBlogs-article_listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const cardLink = cardNode.querySelector('a');
    if (cardLink) {
      cardLink.classList.add('latestBlogs-article_listing--cardWrapper', 'analytics_cta_click');
      const cardWrapper = document.createElement('div');
      cardWrapper.classList.add('latestBlogs-article_listing--cards');

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestBlogs-article_listing--cardImageWrapper');
      const image = cardNode.querySelector('[data-aue-prop="image"]') || cardNode.querySelector('img');
      if (image) {
        const picture = createOptimizedPicture(image.src, image.alt);
        picture.querySelector('img').classList.add('latestBlogs-article_listing--cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(image, cardImageWrapper);
      }
      cardWrapper.append(cardImageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestBlogs-cards_content--wrapper');

      const publishDate = cardNode.querySelector('[data-aue-prop="publishDate"]') || cardNode.querySelector('.latestBlogs-published_date');
      if (publishDate) {
        publishDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestBlogs-published_date');
        contentWrapper.append(publishDate);
        moveInstrumentation(publishDate, contentWrapper);
      }

      const title = cardNode.querySelector('[data-aue-prop="title"]') || cardNode.querySelector('.boing--text__body-2.boing--text__body');
      if (title) {
        title.classList.add('boing--text__body-2', 'boing--text__body');
        contentWrapper.append(title);
        moveInstrumentation(title, contentWrapper);
      }

      cardWrapper.append(contentWrapper);
      cardLink.innerHTML = ''; // Clear original content to append new structure
      cardLink.append(cardWrapper);
      sectionSecond.append(cardLink);
      moveInstrumentation(cardNode, cardLink);
    }
  });

  latestBlogsArticleListingWrapper.append(sectionSecond);

  block.textContent = '';
  block.append(latestBlogsArticleListingWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
