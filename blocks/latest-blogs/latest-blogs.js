import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsArticleListing = document.createElement('div');
  latestblogsArticleListing.classList.add('latestblogs-article-listing', 'position-relative');

  const latestblogsArticleListingSectionFirst = document.createElement('div');
  latestblogsArticleListingSectionFirst.classList.add('latestblogs-article-listing-section-first', 'text-white', 'text-center');

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-article-listing-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...heading.childNodes);
    moveInstrumentation(heading, h2);
    latestblogsArticleListingSectionFirst.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-article-listing-desc', 'boing--text__body-2', 'pb-4');
    p.append(...description.childNodes);
    moveInstrumentation(description, p);
    latestblogsArticleListingSectionFirst.append(p);
  }

  const latestblogsArticleListingBtnwrapper = document.createElement('div');
  latestblogsArticleListingBtnwrapper.classList.add('latestblogs-article-listing-btnwrapper');

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const a = document.createElement('a');
    a.href = viewAllLink.href;
    a.title = viewAllLink.textContent.trim();
    a.classList.add('boing--text__title-3', 'latestblogs-article-listing-btn', 'analytics_cta_click');
    a.textContent = viewAllLink.textContent.trim();
    moveInstrumentation(viewAllLink, a);
    latestblogsArticleListingBtnwrapper.append(a);
  }

  latestblogsArticleListingSectionFirst.append(latestblogsArticleListingBtnwrapper);
  latestblogsArticleListing.append(latestblogsArticleListingSectionFirst);

  const latestblogsArticleListingSectionSecond = document.createElement('div');
  latestblogsArticleListingSectionSecond.classList.add('latestblogs-article-listing-section-second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const link = card.querySelector('[data-aue-prop="link"]');
    const image = card.querySelector('[data-aue-prop="image"]');
    const date = card.querySelector('[data-aue-prop="date"]');
    const title = card.querySelector('[data-aue-prop="title"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-article-listing-cardwrapper', 'analytics_cta_click');
    if (link) {
      cardWrapper.href = link.href;
      cardWrapper.dataset.ctaLabel = title ? title.textContent.trim() : '';
      moveInstrumentation(link, cardWrapper);
    }

    const latestblogsArticleListingCards = document.createElement('div');
    latestblogsArticleListingCards.classList.add('latestblogs-article-listing-cards');

    const latestblogsArticleListingCardimageWrapper = document.createElement('div');
    latestblogsArticleListingCardimageWrapper.classList.add('latestblogs-article-listing-cardimage-wrapper');
    if (image) {
      const picture = createOptimizedPicture(image.src, image.alt);
      picture.querySelector('img').classList.add('latestblogs-article-listing-cardimage', 'w-100', 'h-100');
      latestblogsArticleListingCardimageWrapper.append(picture);
      moveInstrumentation(image, picture);
    }
    latestblogsArticleListingCards.append(latestblogsArticleListingCardimageWrapper);

    const latestblogsCardsContentWrapper = document.createElement('div');
    latestblogsCardsContentWrapper.classList.add('latestblogs-cards-content-wrapper');

    if (date) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published-date');
      pDate.textContent = date.textContent.trim();
      pDate.dataset.date = date.dataset.date;
      moveInstrumentation(date, pDate);
      latestblogsCardsContentWrapper.append(pDate);
    }

    if (title) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'latestblogs-boing-text__body');
      pTitle.append(...title.childNodes);
      moveInstrumentation(title, pTitle);
      latestblogsCardsContentWrapper.append(pTitle);
    }

    latestblogsArticleListingCards.append(latestblogsCardsContentWrapper);
    cardWrapper.append(latestblogsArticleListingCards);
    moveInstrumentation(card, cardWrapper);
    latestblogsArticleListingSectionSecond.append(cardWrapper);
  });

  latestblogsArticleListing.append(latestblogsArticleListingSectionSecond);

  block.textContent = '';
  block.append(latestblogsArticleListing);
  block.className = `latestblogs block`;
  block.dataset.blockStatus = 'loaded';
}