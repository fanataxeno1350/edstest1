import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('div');
  latestblogsWrapper.classList.add('latestblogs-article-listing');

  // First section: Title, Description, and CTA Button
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-article-listing-section-first', 'latestblogs-text-white', 'latestblogs-text-center');
  moveInstrumentation(block.children[0], firstSection); // Transfer instrumentation from the first row

  const titleWrapper = block.children[0].children[0];
  if (titleWrapper) {
    const title = titleWrapper.querySelector('h2');
    if (title) {
      title.classList.add('latestblogs-article-listing-title', 'latestblogs-boing-text-heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
      firstSection.append(title);
    }
  }

  const descriptionWrapper = block.children[0].children[1];
  if (descriptionWrapper) {
    const description = descriptionWrapper.querySelector('p');
    if (description) {
      description.classList.add('latestblogs-article-listing-desc', 'latestblogs-boing-text-body-2', 'latestblogs-pb-4');
      firstSection.append(description);
    }
  }

  const ctaWrapper = block.children[0].children[2];
  if (ctaWrapper) {
    const ctaLink = ctaWrapper.querySelector('a');
    if (ctaLink) {
      const btnWrapper = document.createElement('div');
      btnWrapper.classList.add('latestblogs-article-listing-btnwrapper');
      ctaLink.classList.add('latestblogs-boing-text-title-3', 'latestblogs-article-listing-btn', 'latestblogs-analytics-cta-click');
      btnWrapper.append(ctaLink);
      firstSection.append(btnWrapper);
    }
  }
  latestblogsWrapper.append(firstSection);

  // Second section: Blog Cards
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-article-listing-section-second', 'latestblogs-d-flex');

  // Loop through remaining rows (blog cards)
  [...block.children].slice(1).forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = link.href;
      cardWrapper.classList.add('latestblogs-article-listing-cardwrapper', 'latestblogs-analytics-cta-click');
      if (link.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = link.dataset.ctaLabel;
      }
      moveInstrumentation(row, cardWrapper);

      const card = document.createElement('div');
      card.classList.add('latestblogs-article-listing-cards');

      // Image
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('latestblogs-article-listing-cardimage-wrapper');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('latestblogs-article-listing-cardimage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
      }
      card.append(imageWrapper);

      // Content Wrapper (Date and Title)
      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-cards-content-wrapper');

      // Date
      const dateP = link.querySelector('p[data-date]');
      if (dateP) {
        dateP.classList.add('latestblogs-boing-text-body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-published-date');
        contentWrapper.append(dateP);
      }

      // Title
      const titleP = link.querySelector('p:not([data-date])');
      if (titleP) {
        titleP.classList.add('latestblogs-boing-text-body-2', 'latestblogs-boing-text-body');
        contentWrapper.append(titleP);
      }
      card.append(contentWrapper);
      cardWrapper.append(card);
      secondSection.append(cardWrapper);
    }
  });

  latestblogsWrapper.append(secondSection);

  block.textContent = '';
  block.append(latestblogsWrapper);
}