import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('div');
  latestBlogsWrapper.className = 'latestblogs-latestBlogs-article_listing--wrapper';
  moveInstrumentation(block.firstElementChild, latestBlogsWrapper);

  const latestBlogsArticleListing = document.createElement('div');
  latestBlogsArticleListing.className = 'latestblogs-latestBlogs-article_listing latestblogs-position-relative';
  latestBlogsWrapper.append(latestBlogsArticleListing);

  const firstSection = document.createElement('div');
  firstSection.className = 'latestblogs-latestBlogs-article_listing_section--first latestblogs-text-white latestblogs-text-center';
  latestBlogsArticleListing.append(firstSection);

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'latestblogs-latestBlogs-article_listing--title latestblogs-boing--text__heading-1 latestblogs-text-white latestblogs-pb-3';
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.className = 'latestblogs-latestBlogs-article_listing--desc latestblogs-boing--text__body-2 latestblogs-pb-4';
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const viewAllLinkContainer = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkContainer) {
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'latestblogs-latestBlogs-article_listing--btnWrapper';

    const link = viewAllLinkContainer.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.title = link.title;
      newLink.className = 'latestblogs-boing--text__title-3 latestblogs-latestBlogs-article_listing--btn latestblogs-analytics_cta_click';
      newLink.textContent = link.textContent.trim();
      moveInstrumentation(link, newLink);
      btnWrapper.append(newLink);
    }
    moveInstrumentation(viewAllLinkContainer, btnWrapper);
    firstSection.append(btnWrapper);
  }

  const secondSection = document.createElement('div');
  secondSection.className = 'latestblogs-latestBlogs-article_listing_section--second latestblogs-d-flex';
  latestBlogsArticleListing.append(secondSection);

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.querySelector('a')?.href : '#';
    const ctaLabel = linkElement ? linkElement.querySelector('a')?.getAttribute('data-cta-label') : '';

    const cardWrapper = document.createElement('a');
    cardWrapper.href = linkHref;
    cardWrapper.className = 'latestblogs-latestBlogs-article_listing--cardWrapper latestblogs-analytics_cta_click';
    if (ctaLabel) {
      cardWrapper.setAttribute('data-cta-label', ctaLabel);
    }

    const cardDiv = document.createElement('div');
    cardDiv.className = 'latestblogs-latestBlogs-article_listing--cards';
    cardWrapper.append(cardDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'latestblogs-latestBlogs-article_listing--cardImageWrapper';
    cardDiv.append(imageWrapper);

    const imageElement = cardNode.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || '');
        picture.querySelector('img').className = 'latestblogs-latestBlogs-article_listing--cardImage latestblogs-w-100 latestblogs-h-100';
        imageWrapper.append(picture);
        moveInstrumentation(imageElement, picture);
      }
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'latestblogs-latestBlogs-cards_content--wrapper';
    cardDiv.append(contentWrapper);

    const publishDateElement = cardNode.querySelector('[data-aue-prop="publishDate"]');
    if (publishDateElement) {
      const pDate = document.createElement('p');
      pDate.className = 'latestblogs-boing--text__body-5 latestblogs-p-0 latestblogs-m-0 latestblogs-mb-3 latestblogs-latestBlogs-published_date';
      pDate.textContent = publishDateElement.textContent.trim();
      const dataDate = publishDateElement.getAttribute('data-date');
      if (dataDate) {
        pDate.setAttribute('data-date', dataDate);
      }
      contentWrapper.append(pDate);
      moveInstrumentation(publishDateElement, pDate);
    }

    const blogTitleElement = cardNode.querySelector('[data-aue-prop="title"]');
    if (blogTitleElement) {
      const pTitle = document.createElement('p');
      pTitle.className = 'latestblogs-boing--text__body-2 latestblogs-boing--text__body';
      pTitle.append(...blogTitleElement.childNodes);
      contentWrapper.append(pTitle);
      moveInstrumentation(blogTitleElement, pTitle);
    }

    secondSection.append(cardWrapper);
    moveInstrumentation(cardNode, cardWrapper);
  });

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = 'latestblogs block';
  block.dataset.blockStatus = 'loaded';
}