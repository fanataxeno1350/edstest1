import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing-section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
    h2.append(...title.childNodes);
    moveInstrumentation(title, h2);
    firstSection.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
    p.append(...description.childNodes);
    moveInstrumentation(description, p);
    firstSection.append(p);
  }

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-listing--btnWrapper');

    const a = ctaLink.querySelector('a');
    if (a) {
      const newA = document.createElement('a');
      newA.href = a.href;
      newA.title = a.title || '';
      newA.classList.add('latestblogs-boing--text__title-3', 'latestblogs-listing--btn', 'latestblogs-analytics_cta_click');
      newA.textContent = a.textContent.trim().split('\n')[0].trim(); // Get only the button text
      moveInstrumentation(a, newA);
      btnWrapper.append(newA);
    } else {
      // Fallback if the a tag is not directly inside ctaLink, but ctaLink itself is an a tag
      const newA = document.createElement('a');
      newA.href = ctaLink.textContent.trim();
      newA.title = 'View All';
      newA.classList.add('latestblogs-boing--text__title-3', 'latestblogs-listing--btn', 'latestblogs-analytics_cta_click');
      newA.textContent = 'View All';
      moveInstrumentation(ctaLink, newA);
      btnWrapper.append(newA);
    }
    firstSection.append(btnWrapper);
  }

  latestBlogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing-section--second', 'latestblogs-d-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const link = cardNode.querySelector('[data-aue-prop="link"]');
    const image = cardNode.querySelector('[data-aue-prop="image"]');
    const date = cardNode.querySelector('[data-aue-prop="date"]');
    const blogTitle = cardNode.querySelector('[data-aue-prop="blogTitle"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-listing--cardWrapper', 'latestblogs-analytics_cta_click');
    if (link && link.querySelector('a')) {
      cardWrapper.href = link.querySelector('a').href;
      cardWrapper.setAttribute('data-cta-label', blogTitle?.textContent.trim() || '');
      moveInstrumentation(link.querySelector('a'), cardWrapper);
    } else if (link) {
      cardWrapper.href = link.textContent.trim();
      cardWrapper.setAttribute('data-cta-label', blogTitle?.textContent.trim() || '');
      moveInstrumentation(link, cardWrapper);
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-listing--cards');

    if (image) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-listing--cardImageWrapper');

      const img = image.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('latestblogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(image, cardImageWrapper);
      }
      cardsDiv.append(cardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    if (date) {
      const pDate = document.createElement('p');
      pDate.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-published_date');
      pDate.textContent = date.textContent.trim();
      pDate.setAttribute('data-date', date.getAttribute('data-date') || '');
      moveInstrumentation(date, pDate);
      contentWrapper.append(pDate);
    }

    if (blogTitle) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.append(...blogTitle.childNodes);
      moveInstrumentation(blogTitle, pTitle);
      contentWrapper.append(pTitle);
    }

    cardsDiv.append(contentWrapper);
    cardWrapper.append(cardsDiv);
    moveInstrumentation(cardNode, cardWrapper);
    secondSection.append(cardWrapper);
  });

  latestBlogsListing.append(secondSection);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `latestblogs block`;
  block.dataset.blockStatus = 'loaded';
}
