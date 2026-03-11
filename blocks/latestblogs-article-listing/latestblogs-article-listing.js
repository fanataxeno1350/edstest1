import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('div');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsArticleListing = document.createElement('div');
  latestblogsArticleListing.classList.add('latestblogs-article-listing', 'position-relative');
  latestblogsWrapper.append(latestblogsArticleListing);

  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('latestblogs-article-listing-section-first', 'text-white', 'text-center');

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-article-listing-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...title.childNodes);
    moveInstrumentation(title, h2);
    sectionFirst.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const pDesc = document.createElement('p');
    pDesc.classList.add('latestblogs-article-listing-desc', 'boing--text__body-2', 'pb-4');
    pDesc.append(...description.childNodes);
    moveInstrumentation(description, pDesc);
    sectionFirst.append(pDesc);
  }

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-article-listing-btnwrapper');

    const link = viewAllLink.querySelector('a');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.title = link.textContent.trim();
      a.classList.add('boing--text__title-3', 'latestblogs-article-listing-btn', 'analytics_cta_click');
      a.textContent = link.textContent.trim();
      moveInstrumentation(link, a);
      btnWrapper.append(a);
    }
    moveInstrumentation(viewAllLink, btnWrapper);
    sectionFirst.append(btnWrapper);
  }
  latestblogsArticleListing.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('latestblogs-article-listing-section-second', 'd-flex');

  const articles = block.querySelectorAll('[data-aue-model="article"]');
  articles.forEach((article) => {
    const articleLink = article.querySelector('[data-aue-prop="link"] a');
    const articleImage = article.querySelector('[data-aue-prop="image"] img');
    const publishedDate = article.querySelector('[data-aue-prop="publishedDate"]');
    const articleTitle = article.querySelector('[data-aue-prop="articleTitle"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-article-listing-cardwrapper', 'analytics_cta_click');
    if (articleLink) {
      cardWrapper.href = articleLink.href;
      cardWrapper.setAttribute('data-cta-label', articleTitle?.textContent.trim() || '');
      moveInstrumentation(articleLink, cardWrapper);
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-article-listing-cards');

    if (articleImage) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-article-listing-cardimage-wrapper');
      const picture = createOptimizedPicture(articleImage.src, articleImage.alt, false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-article-listing-cardimage', 'w-100', 'h-100');
      cardImageWrapper.append(picture);
      moveInstrumentation(articleImage, cardImageWrapper);
      cardDiv.append(cardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards-content-wrapper');

    if (publishedDate) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published-date');
      pDate.textContent = publishedDate.textContent.trim();
      const dateAttr = publishedDate.getAttribute('data-date');
      if (dateAttr) {
        pDate.setAttribute('data-date', dateAttr);
      }
      moveInstrumentation(publishedDate, pDate);
      contentWrapper.append(pDate);
    }

    if (articleTitle) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'latestblogs-boing-text__body');
      pTitle.append(...articleTitle.childNodes);
      moveInstrumentation(articleTitle, pTitle);
      contentWrapper.append(pTitle);
    }
    cardDiv.append(contentWrapper);
    cardWrapper.append(cardDiv);
    moveInstrumentation(article, cardWrapper);
    sectionSecond.append(cardWrapper);
  });

  latestblogsArticleListing.append(sectionSecond);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
