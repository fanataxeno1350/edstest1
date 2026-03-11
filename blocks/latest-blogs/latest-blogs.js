import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('latestblogs-article-listing', 'position-relative');
  moveInstrumentation(block, articleListing);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-article-listing-section-first', 'text-white', 'text-center');

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-article-listing-section-second', 'd-flex');

  const rows = [...block.children];

  // First row for heading, description, ctaLink, ctaLabel, ctaIcon
  if (rows.length > 0) {
    const firstRow = rows.shift(); // Get the first row and remove it from the array
    const cells = [...firstRow.children];

    const headingElement = cells[0]?.querySelector('h1, h2, h3, h4, h5, h6');
    if (headingElement) {
      const h2 = document.createElement('h2');
      h2.classList.add('latestblogs-article-listing-title', 'boing--text__heading-1', 'text-white', 'pb-3');
      h2.setAttribute('data-aue-prop', 'heading');
      h2.append(...headingElement.childNodes);
      moveInstrumentation(headingElement, h2);
      firstSection.append(h2);
    }

    const descriptionElement = cells[1]?.querySelector('p');
    if (descriptionElement) {
      const pDesc = document.createElement('p');
      pDesc.classList.add('latestblogs-article-listing-desc', 'boing--text__body-2', 'pb-4');
      pDesc.setAttribute('data-aue-prop', 'description');
      pDesc.append(...descriptionElement.childNodes);
      moveInstrumentation(descriptionElement, pDesc);
      firstSection.append(pDesc);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('latestblogs-article-listing-btnwrapper');

    const ctaLinkElement = cells[2]?.querySelector('a');
    if (ctaLinkElement) {
      const a = document.createElement('a');
      a.classList.add('boing--text__title-3', 'latestblogs-article-listing-btn', 'analytics_cta_click');
      a.setAttribute('data-aue-prop', 'ctaLink');
      a.href = ctaLinkElement.href;
      if (ctaLinkElement.title) {
        a.title = ctaLinkElement.title;
      }

      const ctaLabelElement = cells[3]?.querySelector('p');
      if (ctaLabelElement) {
        a.setAttribute('data-aue-prop', 'ctaLabel');
        a.append(...ctaLabelElement.childNodes);
        moveInstrumentation(ctaLabelElement, a);
      } else if (ctaLinkElement.textContent) {
        a.textContent = ctaLinkElement.textContent;
      }

      const ctaIconElement = cells[4]?.querySelector('img');
      if (ctaIconElement) {
        const iconSpan = document.createElement('span');
        iconSpan.classList.add('icon-wrapper');
        const pic = createOptimizedPicture(ctaIconElement.src, ctaIconElement.alt);
        moveInstrumentation(ctaIconElement, pic.querySelector('img'));
        iconSpan.setAttribute('data-aue-prop', 'ctaIcon');
        iconSpan.append(pic);
        a.append(iconSpan);
      }
      moveInstrumentation(ctaLinkElement, a);
      ctaWrapper.append(a);
    }
    firstSection.append(ctaWrapper);
  }

  // Remaining rows for blog cards
  rows.forEach((row) => {
    const blogCardLink = row.querySelector('a');
    if (blogCardLink) {
      const cardWrapper = document.createElement('a');
      cardWrapper.classList.add('latestblogs-article-listing-cardwrapper', 'analytics_cta_click');
      cardWrapper.setAttribute('data-aue-model', 'blogCard');
      cardWrapper.href = blogCardLink.href;
      if (blogCardLink.title) {
        cardWrapper.title = blogCardLink.title;
      }
      // Transfer data-cta-label if it exists on the original link
      if (blogCardLink.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = blogCardLink.dataset.ctaLabel;
      }

      const cardsDiv = document.createElement('div');
      cardsDiv.classList.add('latestblogs-article-listing-cards');

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-article-listing-cardimage-wrapper');

      const imgElement = row.querySelector('picture, img');
      if (imgElement) {
        const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
        pic.classList.add('latestblogs-article-listing-cardimage', 'w-100', 'h-100');
        pic.querySelector('img').setAttribute('data-aue-prop', 'image');
        moveInstrumentation(imgElement, pic.querySelector('img'));
        cardImageWrapper.append(pic);
      } else {
        // Handle case where image might be within the link itself
        const linkImg = blogCardLink.querySelector('picture, img');
        if (linkImg) {
          const pic = createOptimizedPicture(linkImg.src, linkImg.alt);
          pic.classList.add('latestblogs-article-listing-cardimage', 'w-100', 'h-100');
          pic.querySelector('img').setAttribute('data-aue-prop', 'image');
          moveInstrumentation(linkImg, pic.querySelector('img'));
          cardImageWrapper.append(pic);
        }
      }
      cardsDiv.append(cardImageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-cards-content-wrapper');

      const dateElement = row.querySelector('[data-date]');
      if (dateElement) {
        const pDate = document.createElement('p');
        pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published-date');
        pDate.setAttribute('data-aue-prop', 'date');
        pDate.append(...dateElement.childNodes);
        if (dateElement.dataset.date) {
          pDate.dataset.date = dateElement.dataset.date;
        }
        moveInstrumentation(dateElement, pDate);
        contentWrapper.append(pDate);
      }

      const titleElement = row.querySelector('h1, h2, h3, h4, h5, h6, p:not([data-date])');
      if (titleElement) {
        const pTitle = document.createElement('p');
        pTitle.classList.add('boing--text__body-2', 'latestblogs-boing-text__body');
        pTitle.setAttribute('data-aue-prop', 'title');
        pTitle.append(...titleElement.childNodes);
        moveInstrumentation(titleElement, pTitle);
        contentWrapper.append(pTitle);
      }

      cardsDiv.append(contentWrapper);
      cardWrapper.append(cardsDiv);
      moveInstrumentation(blogCardLink, cardWrapper);
      secondSection.append(cardWrapper);
    }
  });

  articleListing.append(firstSection);
  articleListing.append(secondSection);
  latestBlogsWrapper.append(articleListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
}
